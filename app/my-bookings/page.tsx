import { Suspense } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { BookingCard } from "@/components/bookings/booking-card";
import type { Booking } from "@/types/api";

function EmptyBookings() {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-gray-200">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
        <svg
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-9 0h10a2 2 0 012 2v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"
          />
        </svg>
      </span>

      <h2 className="mt-6 text-xl font-semibold text-gray-900">No bookings yet</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-600">
        When you book a caregiver, it will appear here with its status, cost, and
        invoice details.
      </p>

      <Link
        href="/#services"
        className="mt-8 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Browse services
      </Link>
    </div>
  );
}

async function BookingsList() {
  const bookings = await apiFetch<Booking[]>("/api/bookings", { auth: true });

  if (bookings.length === 0) {
    return <EmptyBookings />;
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