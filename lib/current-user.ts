import { apiFetch } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import type { AuthUser } from "@/types/api";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    return await apiFetch<AuthUser>("/api/auth/me", { auth: true });
  } catch {
    // Expired or invalid token: treat the visitor as signed out
    return null;
  }
}