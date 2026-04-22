"use client";

// app/movies/[id]/page.tsx — Dynamic Movie Details Route (Phase 3)
// ---------------------------------------------------------------------------
// Phase 3 additions:
//  - Live TMDB calls for the movie + recommendations
//  - next/image for the backdrop and poster
//  - Graceful not-found handling

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import GenreBadge from "@/components/ui/GenreBadge";
import RatingStars from "@/components/ui/RatingStars";
import MovieGrid from "@/components/movie/MovieGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyState from "@/components/ui/EmptyState";
import { getMovieById, getRecommendations, tmdbImage } from "@/lib/tmdb";
import { useWatchlist } from "@/context/WatchlistContext";
import type { Movie } from "@/lib/types";

export default function MovieDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const movieId = Number(params?.id);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [recs, setRecs] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    if (!Number.isFinite(movieId)) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([getMovieById(movieId), getRecommendations(movieId)])
      .then(([m, r]) => {
        setMovie(m);
        setRecs(r);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <div
        className="rounded-2xl border h-[420px] animate-pulse"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      />
    );
  }

  if (!movie) {
    return (
      <EmptyState
        title="Movie not found"
        description="We couldn't find the movie you were looking for."
        action={
          <Link href="/movies">
            <Button variant="primary">Browse Movies</Button>
          </Link>
        }
      />
    );
  }

  const inWatchlist = isInWatchlist(movie.id);
  const backdrop = tmdbImage(movie.backdrop_path, "original");
  const poster = tmdbImage(movie.poster_path, "w500");
  // Prefer the live `genres` array from /movie/{id}; fall back to empty.
  const genreNames = (movie.genres ?? []).map((g) => g.name);

  return (
    <div className="space-y-12">
      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        ← Back
      </button>

      {/* Details hero */}
      <section
        className="relative rounded-2xl overflow-hidden border"
        style={{
          borderColor: "var(--border)",
          minHeight: "500px",
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(10,10,15,0.98) 0%, rgba(10,10,15,0.85) 40%, rgba(10,10,15,0.3) 100%)",
          }}
        />

        <div className="relative p-6 sm:p-10 flex flex-col sm:flex-row gap-6 sm:gap-10">
          {/* Poster */}
          <div
            className="relative w-48 sm:w-64 shrink-0 rounded-xl overflow-hidden border self-start"
            style={{
              borderColor: "var(--border)",
              aspectRatio: "2/3",
            }}
          >
            {poster ? (
              <Image
                src={poster}
                alt={movie.title}
                fill
                sizes="(max-width: 640px) 50vw, 256px"
                className="object-cover"
                priority
              />
            ) : (
              <div
                className="w-full h-full"
                style={{ backgroundColor: "var(--surface-hover)" }}
              />
            )}
          </div>

          {/* Meta */}
          <div className="flex-1 min-w-0 pt-2 sm:pt-10">
            <h1
              className="text-3xl sm:text-4xl font-extrabold"
              style={{ color: "var(--text-primary)" }}
            >
              {movie.title}
            </h1>
            {movie.tagline && (
              <p
                className="mt-2 italic"
                style={{ color: "var(--text-secondary)" }}
              >
                “{movie.tagline}”
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <RatingStars score={movie.vote_average} />
              <span
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {new Date(movie.release_date).getFullYear()}
              </span>
              {movie.runtime && (
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
            </div>

            {genreNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {genreNames.map((g) => (
                  <GenreBadge key={g} name={g} />
                ))}
              </div>
            )}

            <p
              className="mt-5 text-base max-w-3xl leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {movie.overview}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                variant={inWatchlist ? "secondary" : "primary"}
                size="lg"
                onClick={() =>
                  inWatchlist
                    ? removeFromWatchlist(movie.id)
                    : addToWatchlist(movie)
                }
              >
                {inWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
              </Button>
              <Link href="/movies">
                <Button variant="ghost" size="lg">
                  Browse More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {recs.length > 0 && (
        <section>
          <SectionHeader
            title="You Might Also Like"
            subtitle="Similar movies in the same genres"
          />
          <MovieGrid movies={recs} />
        </section>
      )}
    </div>
  );
}
