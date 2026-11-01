import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { FooterLinks } from "@/components/layout/footer-links";
import { SUPPORT_EMAIL } from "@/lib/site";

const linkClass = "transition hover:text-white";

function FooterColumn({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="text-xl font-bold text-white">
            Care.xyz
          </Link>
          <span className="mt-3 block h-1 w-10 rounded-full bg-blue-500" />
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Making caregiving easy, secure, and accessible for children, elderly
            family members, and anyone who needs care at home.
          </p>
        </div>

        <FooterColumn title="Explore">
          <li>
            <Link href="/#services" className={linkClass}>
              Our services
            </Link>
          </li>
          <li>
            <Link href="/#why-care" className={linkClass}>
              Why Care.xyz
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title="Account">
          <Suspense fallback={null}>
            <FooterLinks />
          </Suspense>
        </FooterColumn>

        <FooterColumn title="Contact" id="contact">
          <li>
            <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass}>
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li className="text-gray-400">
            Booking questions? Email us and include your booking ID.
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Care.xyz. All rights reserved.</p>
          <p>Trusted care for children, elderly relatives, and sick family members.</p>
        </div>
      </div>
    </footer>
  );
}