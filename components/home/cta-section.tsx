import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";

const actionClass =
  "rounded-lg px-6 py-3 font-semibold shadow-sm transition";
const primaryOnDark = `${actionClass} bg-white text-blue-700 hover:bg-blue-50`;
const secondaryOnDark = `${actionClass} bg-white/10 text-white ring-1 ring-white/40 hover:bg-white/20`;

export async function CtaSection() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-14 text-center text-white shadow-lg md:px-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
            Get started
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to book care for your family?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-50">
            Create a free account, choose a service, and get your invoice in minutes.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/register" className={primaryOnDark}>
              Create account
            </Link>
            <Link href="#services" className={secondaryOnDark}>
              Browse services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const firstName = user.name.split(" ")[0];

  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 to-teal-600 px-8 py-14 text-center text-white shadow-lg md:px-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-100">
          Welcome back
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Hi {firstName}, who needs care today?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-teal-50">
          Pick a service for your child, parent, or family member, or review the
          bookings you already have.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="#services" className={primaryOnDark}>
            Book a service
          </Link>
          <Link href="/my-bookings" className={secondaryOnDark}>
            View my bookings
          </Link>
        </div>
      </div>
    </section>
  );
}