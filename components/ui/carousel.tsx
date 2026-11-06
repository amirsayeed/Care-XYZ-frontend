"use client";

import { useRef, type ReactNode } from "react";

export function Carousel({ label, children }: { label: string; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll by most of the visible width, so the user keeps some context
  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: track.clientWidth * 0.8 * direction, behavior: "smooth" });
  };

  return (
    <div aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Previous reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Next reviews"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
        >
          ›
        </button>
      </div>
    </div>
  );
}