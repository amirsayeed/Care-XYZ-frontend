import { Suspense } from "react";
import { Hero } from "@/components/home/hero";
import { FeaturesSection } from "@/components/home/features-section";
import { ServicesSection } from "@/components/home/services-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import type { Metadata } from "next";
import { HERO_IMAGE_URL } from "@/lib/site";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { CtaSection } from "@/components/home/cta-section";
import { Spinner } from "@/components/ui/spinner";

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
  <div className="flex justify-center py-20">
    <Spinner />
  </div>
);

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturesSection />

      <Suspense fallback={<Loading />}>
        <ServicesSection />
      </Suspense>
      
      <HowItWorksSection />

      <Suspense fallback={<Loading />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<div className="px-6 py-10" />}>
        <CtaSection />
      </Suspense>
    </main>
  );
}