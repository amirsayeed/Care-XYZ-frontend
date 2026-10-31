import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { getSessionToken } from "@/lib/session";

export async function SiteHeader() {
  const isSignedIn = Boolean(await getSessionToken());

  return (
    <header className="border-b border-gray-200">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Care.xyz
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {isSignedIn ? (
            <>
              <Link href="/my-bookings" className="hover:underline">
                My bookings
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}