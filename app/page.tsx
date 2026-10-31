import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { FeaturesSection } from "@/components/home/features-section";
import { ServicesSection } from "@/components/home/services-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import type { Metadata } from "next";
import { HERO_IMAGE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Care.xyz | Babysitting, elderly care, and home care",
  },
  description:
    "Book trusted caregivers for children, elderly parents, and sick family members. Clear daily pricing and invoices by email.",
  openGraph: {
    title: "Care.xyz | Trusted care for your family",
    description:
      "Book trusted caregivers for children, elderly parents, and sick family members.",
    images: [HERO_IMAGE_URL],
  },
};

const Loading = () => (
  <p className="py-20 text-center text-gray-500">Loading...</p>
);

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturesSection />

      <Suspense fallback={<Loading />}>
        <ServicesSection />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <TestimonialsSection />
      </Suspense>
    </main>
  );
}