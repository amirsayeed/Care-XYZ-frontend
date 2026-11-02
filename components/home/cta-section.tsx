import Link from "next/link";
import { getSessionToken } from "@/lib/session";

export async function CtaSection() {
  const isSignedIn = Boolean(await getSessionToken());

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-14 text-center text-white shadow-lg md:px-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {isSignedIn ? "Need care today?" : "Ready to book care for your family?"}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-blue-50">
          {isSignedIn
            ? "Choose a service and book in a few steps."
            : "Create a free account, choose a service, and get your invoice in minutes."}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {isSignedIn ? (
            <Link
              href="/my-bookings"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              My bookings
            </Link>
          ) : (
            <Link
              href="/register"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Create account
            </Link>
          )}

          <Link
            href="#services"
            className="rounded-lg bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/40 transition hover:bg-white/20"
          >
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}