import Link from "next/link";
import { getSessionToken } from "@/lib/session";

const primaryClass =
  "rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700";
const secondaryClass =
  "rounded-lg bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white/20";

export async function HeroActions() {
  const isSignedIn = Boolean(await getSessionToken());

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Link href="#services" className={primaryClass}>
        Browse services
      </Link>

      {isSignedIn ? (
        <Link href="/my-bookings" className={secondaryClass}>
          My bookings
        </Link>
      ) : (
        <Link href="/register" className={secondaryClass}>
          Create account
        </Link>
      )}
    </div>
  );
}