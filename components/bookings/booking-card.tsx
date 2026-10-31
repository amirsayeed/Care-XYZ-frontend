"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Button, Modal } from "@heroui/react";
import { cancelBookingAction } from "@/lib/actions/bookings";
import { StatusBadge } from "@/components/bookings/status-badge";
import type { Booking } from "@/types/api";

export function BookingCard({ booking }: { booking: Booking }) {
  const [pending, startTransition] = useTransition();
  const canCancel = booking.status === "pending";

  const handleConfirmCancel = () => {
    startTransition(async () => {
      await cancelBookingAction(booking._id);
    });
  };

  return (
    <article className="rounded-2xl bg-white p-6 ring-1 ring-gray-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{booking.serviceName}</h2>
          <p className="mt-1 text-sm text-gray-600">
            {booking.area}, {booking.city}, {booking.district}, {booking.division}
          </p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-gray-500">Duration</dt>
          <dd className="mt-0.5 text-gray-900">{booking.duration} day(s)</dd>
        </div>
        <div>
          <dt className="text-gray-500">Total cost</dt>
          <dd className="mt-0.5 font-semibold text-gray-900">
            ৳{booking.totalCost.toLocaleString()}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/my-bookings/${booking._id}`}
          className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          View details
        </Link>

        {canCancel && (
          <Modal>
            <Button variant="secondary" isDisabled={pending}>
              {pending ? "Cancelling..." : "Cancel booking"}
            </Button>

            <Modal.Backdrop>
              <Modal.Container>
                <Modal.Dialog className="sm:max-w-[400px]">
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Heading>Cancel this booking?</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-sm text-gray-600">
                      This can&apos;t be undone. You can always book again later.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Keep booking
                    </Button>
                    <Button slot="close" onPress={handleConfirmCancel}>
                      Yes, cancel
                    </Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        )}
      </div>
    </article>
  );
}