"use client";

// MovieCarousel
// Horizontally scrollable strip of movie cards, used on the Home page for
// "Trending", "Top Rated" etc. Uses native overflow-x scrolling — no
// third-party carousel library needed.

import { useRef } from "react";
import { MovieCardDefault } from "./MovieCard";
import type { Movie } from "@/lib/types";

export default function MovieCarousel({ movies }: { movies: Movie[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll buttons (desktop only) */}
      <button
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 items-center justify-center rounded-full border"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        ←
      </button>
      <button
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 items-center justify-center rounded-full border"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        →
      </button>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="shrink-0 w-40 sm:w-44 md:w-48"
          >
            <MovieCardDefault movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
