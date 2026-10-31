import Link from "next/link";
import { getSessionToken } from "@/lib/session";

const linkClass = "transition hover:text-white";

export async function FooterLinks() {
  const isSignedIn = Boolean(await getSessionToken());

  const links = isSignedIn
    ? [{ href: "/my-bookings", label: "My bookings" }]
    : [
        { href: "/login", label: "Sign in" },
        { href: "/register", label: "Create account" },
      ];

  return (
    <>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </>
  );
}