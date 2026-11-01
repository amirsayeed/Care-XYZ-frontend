"use client";

import { useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { primaryNav } from "@/lib/nav";
import { AccountMenu, getInitials } from "@/components/layout/account-menu";

interface SiteNavProps {
  user: { name: string; email: string } | null;
}

const buttonPrimary =
  "rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700";
const buttonOutline =
  "rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50";

export function SiteNav({ user }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={close} className="text-xl font-bold text-blue-600">
          Care.xyz
        </Link>

        <ul className="hidden items-center gap-7 text-sm font-medium text-gray-700 md:flex">
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-blue-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          {user ? (
            <AccountMenu name={user.name} email={user.email} />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className={buttonOutline}>
                Sign in
              </Link>
              <Link href="/register" className={buttonPrimary}>
                Create account
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-gray-200 px-6 py-5 md:hidden">
          <ul className="space-y-4 text-base font-medium text-gray-800">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} className="block hover:text-blue-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-gray-100 pt-6">
            {user ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                    {getInitials(user.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="truncate text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/my-bookings"
                  onClick={close}
                  className="block font-medium text-gray-800 hover:text-blue-600"
                >
                  My bookings
                </Link>

                <form action={logoutAction}>
                  <button type="submit" className={`${buttonOutline} w-full`}>
                    Log out
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href="/login" onClick={close} className={`${buttonOutline} text-center`}>
                  Sign in
                </Link>
                <Link href="/register" onClick={close} className={`${buttonPrimary} text-center`}>
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}