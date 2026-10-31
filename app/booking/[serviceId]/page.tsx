import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { BookingForm } from "@/components/booking/booking-form";
import type { LocationTree, Service } from "@/types/api";

async function BookingContent({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;

  let service: Service;
  let locations: LocationTree;

  try {
    [service, locations] = await Promise.all([
      apiFetch<Service>(`/api/services/${serviceId}`),
      apiFetch<LocationTree>("/api/locations"),
    ]);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 400 || error.status === 404)) {
      notFound();
    }
    throw error;
  }

  return <BookingForm service={service} locations={locations} />;
}

export default function BookingPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm font-medium text-blue-600">Booking</p>
      <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
        Complete your booking
      </h1>
      <p className="mt-2 text-gray-600">
        Choose how long you need care and where it should take place.
      </p>

      <div className="mt-10">
        <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
          <BookingContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}