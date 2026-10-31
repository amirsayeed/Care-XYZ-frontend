import { Suspense } from "react";
import Image from "next/image";
import { HeroActions } from "@/components/home/hero-actions";
import { HERO_IMAGE_URL } from "@/lib/site";

const highlights = [
  "Easy online booking",
  "Clear pricing per day",
  "Invoice sent by email",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={HERO_IMAGE_URL}
        alt="A caregiver spending time with an elderly person"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-gray-900/30" />

      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white backdrop-blur">
          Babysitting · Elderly care · Home care
        </p>

        <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
          Care that feels like family
        </h1>
        <p className="mt-5 max-w-xl text-lg text-gray-200">
          Trusted caregivers for your children, elderly parents, and family
          members who need support at home.
        </p>

        <Suspense fallback={<div className="mt-8 h-12" />}>
          <HeroActions />
        </Suspense>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-200">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}