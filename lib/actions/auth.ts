"use server";

import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { setSessionCookie, clearSessionCookie } from "@/lib/session";
import type { AuthResponse } from "@/types/api";

export type AuthState = { error?: string } | undefined;

// Only allow relative paths, so a crafted link can't send users to another site
function safeRedirect(value: FormDataEntryValue | null): string {
  const path = typeof value === "string" ? value : "";
  return path.startsWith("/") && !path.startsWith("//") ? path : "/";
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const next = safeRedirect(formData.get("next"));

  let result: AuthResponse;
  try {
    result = await apiFetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
  } catch (error) {
    return {
      error: error instanceof ApiError ? error.message : "Something went wrong",
    };
  }

  await setSessionCookie(result.token);
  redirect(next);
}

export async function registerAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const next = safeRedirect(formData.get("next"));

  let result: AuthResponse;
  try {
    result = await apiFetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        contact: formData.get("contact"),
        nid: formData.get("nid"),
        password: formData.get("password"),
      }),
    });
  } catch (error) {
    return {
      error: error instanceof ApiError ? error.message : "Something went wrong",
    };
  }

  await setSessionCookie(result.token);
  redirect(next);
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/");
}