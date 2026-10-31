import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "Care.xyz",
    template: "%s | Care.xyz",
  },
  description: "Trusted babysitting, elderly care, and sick-person care services.",
  openGraph: {
    siteName: "Care.xyz",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
    <body className="flex min-h-screen flex-col antialiased">
      <Suspense fallback={<header className="h-16 border-b border-gray-200" />}>
        <SiteHeader />
      </Suspense>
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </body>
    </html>
  );
}