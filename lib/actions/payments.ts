"use server";

import { redirect } from "next/navigation";
import { apiFetch } from "@/lib/api";

export async function payBookingAction(formData: FormData) {
  const bookingId = String(formData.get("bookingId") ?? "");

  let checkoutUrl: string | undefined;
  try {
    const result = await apiFetch<{ url: string | null }>(
      `/api/payments/checkout/${bookingId}`,
      { method: "POST", auth: true }
    );
    checkoutUrl = result.url ?? undefined;
  } catch {
    redirect("/my-bookings?payment=failed");
  }

  if (!checkoutUrl) {
    redirect("/my-bookings?payment=failed");
  }

  // Send the user to Stripe's hosted payment page
  redirect(checkoutUrl);
}