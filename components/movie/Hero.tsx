"use client";

// Hero — Phase 3
// Uses next/image with `priority` for the hero backdrop so LCP is fast.

import Link from "next/link";
import Image from "next/image";
import { tmdbImage } from "@/lib/tmdb";
import Button from "@/components/ui/Button";
import RatingStars from "@/components/ui/RatingStars";
import type { Movie } from "@/lib/types";

export default function Hero({ movie }: { movie: Movie }) {
  const backdrop = tmdbImage(movie.backdrop_path, "original");

  return (
    <section
      className="relative rounded-2xl overflow-hidden border"
      style={{
        borderColor: "var(--border)",
        minHeight: "440px",
        backgroundColor: "var(--surface)",
      }}
    >
      {backdrop && (
        <Image
          src={backdrop}
          alt={movie.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.75) 40%, rgba(10,10,15,0.2) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative px-6 sm:px-10 py-10 sm:py-16 max-w-2xl z-10">
        <span
          className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--accent)" }}
        >
          Featured
        </span>
        <h1
          className="text-3xl sm:text-5xl font-extrabold leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {movie.title}
        </h1>
        {movie.tagline && (
          <p
            className="mt-3 text-base italic"
            style={{ color: "var(--text-secondary)" }}
          >
            “{movie.tagline}”
          </p>
        )}
        <div className="flex items-center gap-4 mt-4">
          <RatingStars score={movie.vote_average} />
          {movie.release_date && (
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {new Date(movie.release_date).getFullYear()}
            </span>
          )}
          {movie.runtime && (
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </span>
          )}
        </div>
        <p
          className="mt-4 text-sm sm:text-base max-w-xl line-clamp-3"
          style={{ color: "var(--text-secondary)" }}
        >
          {movie.overview}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link href={`/movies/${movie.id}`}>
            <Button variant="primary" size="lg">
              ▶ View Details
            </Button>
          </Link>
          <Link href="/movies">
            <Button variant="secondary" size="lg">
              Browse Movies
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
