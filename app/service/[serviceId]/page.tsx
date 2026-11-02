import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch, ApiError, CATALOG_REVALIDATE } from "@/lib/api";
import { getSessionToken } from "@/lib/session";
import type { Service } from "@/types/api";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
  }: {
    params: Promise<{ serviceId: string }>;
  }): Promise<Metadata> {
    const { serviceId } = await params;
  
    try {
      const service = await apiFetch<Service>(`/api/services/${serviceId}`, {
        revalidate: CATALOG_REVALIDATE,
      });

      return {
        title: service.title,
        description: service.description,
        openGraph: {
          title: `${service.title} | Care.xyz`,
          description: service.description,
          images: [service.imageUrl],
        },
      };
    } catch {
      // If the service can't be loaded, the page itself shows 404
      return { title: "Service not found" };
    }
  }


function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.296a1 1 0 010 1.408l-7.5 7.5a1 1 0 01-1.408 0l-3.5-3.5a1 1 0 111.408-1.408L8.5 12.09l6.796-6.795a1 1 0 011.408 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

async function ServiceContent({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;

  let service: Service;
  try {
    service = await apiFetch<Service>(`/api/services/${serviceId}`, {
      revalidate: CATALOG_REVALIDATE,
    });
  } catch (error) {
    if (error instanceof ApiError && (error.status === 400 || error.status === 404)) {
      notFound();
    }
    throw error;
  }

  const isSignedIn = Boolean(await getSessionToken());
  const bookingPath = `/booking/${service._id}`;
  const bookHref = isSignedIn
    ? bookingPath
    : `/login?next=${encodeURIComponent(bookingPath)}`;

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{service.title}</span>
      </nav>

      <article className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Care service
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 leading-relaxed text-gray-600">{service.description}</p>

          {service.features?.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">What&apos;s included</h2>
              <ul className="mt-4 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10 rounded-2xl bg-teal-50/80 p-6 ring-1 ring-teal-100">
            <p className="text-sm text-gray-500">Price</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">
              ৳{service.hourlyRate}
              <span className="text-base font-normal text-gray-500"> / day</span>
            </p>

            <Link
              href={bookHref}
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Book this service
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export default function ServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
        <ServiceContent params={params} />
      </Suspense>
    </main>
  );
}