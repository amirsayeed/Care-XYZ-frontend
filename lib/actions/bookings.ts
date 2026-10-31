"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";


export type BookingState = { error?: string } | undefined;

export async function createBookingAction(
  _prev: BookingState,
  formData: FormData
): Promise<BookingState> {
  try {
    await apiFetch<unknown>("/api/bookings", {
      method: "POST",
      auth: true,
      body: JSON.stringify({
        serviceId: formData.get("serviceId"),
        duration: Number(formData.get("duration")),
        division: formData.get("division"),
        district: formData.get("district"),
        city: formData.get("city"),
        area: formData.get("area"),
        address: formData.get("address"),
      }),
    });
  } catch (error) {
    return {
      error: error instanceof ApiError ? error.message : "Something went wrong",
    };
  }

  redirect("/my-bookings");
}


export async function cancelBookingAction(bookingId: string) {
    try {
      await apiFetch<unknown>(`/api/bookings/${bookingId}/cancel`, {
        method: "PATCH",
        auth: true,
      });
    } catch (error) {
      throw error instanceof ApiError
        ? error
        : new Error("Could not cancel booking");
    }
  
    revalidatePath("/my-bookings");
}