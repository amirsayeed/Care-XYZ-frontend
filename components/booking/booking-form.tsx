"use client";

import { useActionState, useState } from "react";
import { createBookingAction } from "@/lib/actions/bookings";
import { ErrorMessage, Field, inputClass, primaryButtonClass } from "@/components/ui/form";
import type { LocationTree, Service } from "@/types/api";
import { LocationSelect } from "@/components/ui/location-select";

const sectionClass = "rounded-2xl bg-white p-6 ring-1 ring-gray-200";
const sectionTitleClass = "mb-5 text-base font-semibold text-gray-900";

export function BookingForm({
  service,
  locations,
}: {
  service: Service;
  locations: LocationTree;
}) {
  const [state, formAction, pending] = useActionState(createBookingAction, undefined);

  const [duration, setDuration] = useState<number | "">(1);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const districts = locations.divisions.find((d) => d.name === division)?.districts ?? [];
  const cities = districts.find((d) => d.name === district)?.cities ?? [];
  const areas = cities.find((c) => c.name === city)?.areas ?? [];

  const validDuration = typeof duration === "number" && duration > 0 ? duration : 0;
  const total = validDuration * service.hourlyRate;

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <input type="hidden" name="serviceId" value={service._id} />

      <div className="space-y-6">
        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Duration</h2>
          <Field label="Number of days" htmlFor="duration">
            <input
              id="duration"
              name="duration"
              type="number"
              min={1}
              required
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value === "" ? "" : Number(e.target.value))
              }
              className={inputClass}
            />
          </Field>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Location</h2>
            <div className="grid gap-5 md:grid-cols-2">
            <LocationSelect
            label="Division"
            name="division"
            placeholder="Select division"
            items={locations.divisions.map((d) => d.name)}
            value={division}
            onChange={(value) => {
                setDivision(value);
                setDistrict("");
                setCity("");
                setArea("");
            }}
            />

            <LocationSelect
            label="District"
            name="district"
            placeholder="Select district"
            items={districts.map((d) => d.name)}
            value={district}
            isDisabled={!division}
            onChange={(value) => {
                setDistrict(value);
                setCity("");
                setArea("");
            }}
            />

            <LocationSelect
            label="City"
            name="city"
            placeholder="Select city"
            items={cities.map((c) => c.name)}
            value={city}
            isDisabled={!district}
            onChange={(value) => {
                setCity(value);
                setArea("");
            }}
            />

            <LocationSelect
            label="Area"
            name="area"
            placeholder="Select area"
            items={areas}
            value={area}
            isDisabled={!city}
            onChange={setArea}
            />

            <div className="md:col-span-2">
            <Field label="Full address" htmlFor="address" hint="House number, road, and nearby landmark">
                <textarea
                id="address"
                name="address"
                required
                minLength={5}
                rows={3}
                className={inputClass}
                />
            </Field>
            </div>
            </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
          <div>
            <p className="text-sm text-gray-500">Service</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{service.title}</p>
            <p className="mt-1 text-sm text-gray-600">
              ৳{service.hourlyRate} × {validDuration} day(s)
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <p className="text-sm text-gray-500">Total</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              ৳{total.toLocaleString()}
            </p>
          </div>

          <ErrorMessage message={state?.error} />

          <button type="submit" disabled={pending} className={primaryButtonClass}>
            {pending ? "Confirming..." : "Confirm booking"}
          </button>

          <p className="text-center text-xs text-gray-500">
            An invoice will be emailed to you after booking.
          </p>
        </div>
      </aside>
    </form>
  );
}