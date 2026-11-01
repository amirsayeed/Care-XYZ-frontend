import type { ApiResponse } from "@/types/api";
import { getSessionToken } from "@/lib/session";

// Catalog data (services, locations, testimonials) changes rarely, so cache it for a day
export const CATALOG_REVALIDATE = 60 * 60 * 24;

export class ApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiFetchOptions extends Omit<RequestInit, "headers"> {
  auth?: boolean;
  headers?: Record<string, string>;
  /** Seconds to cache the response. Omit for live data such as bookings. */
  revalidate?: number;
}

export async function apiFetch<T>(
  path: string,
  { auth = false, headers = {}, revalidate, ...init }: ApiFetchOptions = {}
): Promise<T> {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) {
    throw new Error("API_URL is not defined in .env.local");
  }

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (auth) {
    const token = await getSessionToken();
    if (!token) {
      throw new ApiError("Not authenticated", 401);
    }
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: finalHeaders,
    ...(revalidate !== undefined
      ? { next: { revalidate } }
      : { cache: "no-store" as const }),
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok || !json?.success) {
    throw new ApiError(json?.message ?? "Request failed", res.status);
  }

  return json.data as T;
}