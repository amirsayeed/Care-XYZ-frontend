import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/session";
import {
  GOOGLE_NEXT_COOKIE,
  GOOGLE_STATE_COOKIE,
  redirectUri,
  safeNext,
} from "@/lib/google-oauth";

const appUrl = () => process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

function fail(stage: string, detail?: unknown) {
  console.error(`[google-callback] failed at "${stage}"`, detail ?? "");
  return NextResponse.redirect(new URL("/login?error=google", appUrl()));
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const store = await cookies();
  const expectedState = store.get(GOOGLE_STATE_COOKIE)?.value;
  const next = safeNext(store.get(GOOGLE_NEXT_COOKIE)?.value);

  store.delete(GOOGLE_STATE_COOKIE);
  store.delete(GOOGLE_NEXT_COOKIE);

  if (searchParams.has("error")) {
    return fail("google returned error", searchParams.get("error"));
  }
  if (!code || !state) {
    return fail("missing code or state");
  }
  if (state !== expectedState) {
    return fail("state mismatch", { hasStateCookie: Boolean(expectedState) });
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: redirectUri(),
      grant_type: "authorization_code",
    }),
    cache: "no-store",
  });

  if (!tokenRes.ok) {
    return fail("token exchange", await tokenRes.text());
  }

  const { id_token } = (await tokenRes.json()) as { id_token?: string };
  if (!id_token) {
    return fail("no id_token in response");
  }

  const backendRes = await fetch(`${process.env.API_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: id_token }),
    cache: "no-store",
  });

  const json = (await backendRes.json().catch(() => null)) as {
    success: boolean;
    data?: { token: string };
    message?: string;
  } | null;

  if (!backendRes.ok || !json?.success || !json.data) {
    return fail("backend /api/auth/google", {
      status: backendRes.status,
      message: json?.message,
    });
  }

  await setSessionCookie(json.data.token);
  return NextResponse.redirect(new URL(next, appUrl()));
}