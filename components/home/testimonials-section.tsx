import Image from "next/image";
import { apiFetch, CATALOG_REVALIDATE } from "@/lib/api";
import { Carousel } from "@/components/ui/carousel";
import type { Testimonial } from "@/types/api";

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <p aria-label={`${rating} out of 5 stars`} className="text-lg tracking-wide">
      <span className="text-amber-400">{"★".repeat(filled)}</span>
      <span className="text-gray-300">{"★".repeat(5 - filled)}</span>
    </p>
  );
}

export async function TestimonialsSection() {
  const testimonials = await apiFetch<Testimonial[]>("/api/testimonials", {
    revalidate: CATALOG_REVALIDATE,
  });

  return (
    <section className="bg-white/60 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">What families say</h2>
          <p className="mt-3 text-gray-600">Real feedback from people who booked care through Care.xyz.</p>
        </div>

        <div className="mt-12">
          <Carousel label="Customer testimonials">
            {testimonials.map((t) => (
              <figure
                key={t._id}
                className="flex min-w-[85%] snap-start flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 md:min-w-[calc(33.333%-1rem)]"
              >
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 leading-relaxed text-gray-700">
                  “{t.review}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Image
                    src={t.userPhoto}
                    alt={t.userName}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-gray-900">{t.userName}</span>
                </figcaption>
              </figure>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}