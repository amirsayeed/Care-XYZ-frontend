import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { StatusBadge } from "@/components/bookings/status-badge";
import type { Booking } from "@/types/api";

const dateFormat: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="text-sm font-medium text-gray-900 sm:text-right">{value}</dd>
    </div>
  );
}

async function BookingContent({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  let booking: Booking;
  try {
    booking = await apiFetch<Booking>(`/api/bookings/${bookingId}`, { auth: true });
  } catch (error) {
    // 400 for malformed IDs, 404 for unknown or not owned bookings
    if (error instanceof ApiError && (error.status === 400 || error.status === 404)) {
      notFound();
    }
    throw error;
  }

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
      <div className="flex flex-col gap-3 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">Booking ID</p>
          <p className="mt-1 font-mono text-sm text-gray-900">{booking._id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-900">{booking.serviceName}</h2>

      <dl className="mt-4 divide-y divide-gray-100">
        <DetailRow label="Duration" value={`${booking.duration} day(s)`} />
        <DetailRow label="Total cost" value={`৳${booking.totalCost.toLocaleString()}`} />
        <DetailRow
          label="Location"
          value={`${booking.area}, ${booking.city}, ${booking.district}, ${booking.division}`}
        />
        <DetailRow label="Address" value={booking.address} />
        <DetailRow
          label="Invoice email"
          value={booking.invoiceSent ? "Sent" : "Not sent"}
        />
        <DetailRow
          label="Booked on"
          value={new Date(booking.createdAt).toLocaleString("en-GB", dateFormat)}
        />
        <DetailRow
          label="Last updated"
          value={new Date(booking.updatedAt).toLocaleString("en-GB", dateFormat)}
        />
      </dl>
    </div>
  );
}

export default function BookingDetailsPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/my-bookings" className="text-sm font-medium text-blue-600 hover:underline">
        ← Back to my bookings
      </Link>

      <h1 className="mb-8 mt-4 text-3xl font-bold tracking-tight text-gray-900">
        Booking details
      </h1>

      <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
        <BookingContent params={params} />
      </Suspense>
    </main>
  );
}