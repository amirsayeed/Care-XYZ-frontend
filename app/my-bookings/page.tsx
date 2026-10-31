import { Suspense } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { BookingCard } from "@/components/bookings/booking-card";
import type { Booking } from "@/types/api";

async function BookingsList() {
  const bookings = await apiFetch<Booking[]>("/api/bookings", { auth: true });

  if (bookings.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">You have no bookings yet.</p>
        <Link href="/" className="mt-4 inline-block text-blue-600 underline">
          Browse services
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold">My bookings</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <BookingsList />
      </Suspense>
    </main>
  );
}