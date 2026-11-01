export const GOOGLE_STATE_COOKIE = "google_oauth_state";
export const GOOGLE_NEXT_COOKIE = "google_oauth_next";

export function redirectUri(): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;
}

// Only allow relative paths, so the callback can't redirect off-site
export function safeNext(value: string | null | undefined): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}