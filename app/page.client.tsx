"use client";

// app/page.tsx — Home (Phase 3)
// ---------------------------------------------------------------------------
// Performance techniques applied here:
//  - next/dynamic for below-the-fold sections (code splitting + lazy loading)
//    Each carousel is its own chunk; the initial page bundle is smaller and
//    the browser only downloads secondary chunks when they become visible.
//  - LoadingSkeleton as dynamic-import placeholder for smooth transitions.
//  - Parallel Promise.all fetches instead of sequential awaits.

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { getTrending, getTopRated, getNowPlaying } from "@/lib/tmdb";
import type { Movie } from "@/lib/types";

// Dynamic (lazy) imports — these components are only downloaded when needed.
const Hero = dynamic(() => import("@/components/movie/Hero"), {
  loading: () => (
    <div
      className="h-[440px] rounded-2xl border animate-pulse"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    />
  ),
});

const MovieCarousel = dynamic(
  () => import("@/components/movie/MovieCarousel"),
  {
    loading: () => <LoadingSkeleton count={5} />,
  }
);

export default function HomePage() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Parallel fetches — all three endpoints resolve concurrently.
    Promise.all([getTrending(), getTopRated(), getNowPlaying()])
      .then(([t, r, n]) => {
        setTrending(t);
        setTopRated(r);
        setNowPlaying(n);
      })
      .catch(() => setError("Failed to load movies. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  const featured = trending[0];

  if (error) {
    return (
      <div
        className="rounded-xl border p-8 text-center"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <p style={{ color: "var(--text-secondary)" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero */}
      {loading || !featured ? (
        <div
          className="h-[440px] rounded-2xl border animate-pulse"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        />
      ) : (
        <Hero movie={featured} />
      )}

      {/* Trending */}
      <section>
        <SectionHeader
          title="Trending This Week"
          subtitle="What everyone is watching right now"
          action={
            <Link
              href="/movies"
              className="text-sm"
              style={{ color: "var(--accent)" }}
            >
              See all →
            </Link>
          }
        />
        {loading ? (
          <LoadingSkeleton count={5} />
        ) : (
          <MovieCarousel movies={trending} />
        )}
      </section>

      {/* Top Rated */}
      <section>
        <SectionHeader
          title="Top Rated"
          subtitle="Critically acclaimed masterpieces"
        />
        {loading ? (
          <LoadingSkeleton count={5} />
        ) : (
          <MovieCarousel movies={topRated} />
        )}
      </section>

      {/* Now Playing */}
      <section>
        <SectionHeader
          title="Now Playing"
          subtitle="Catch these in theaters today"
        />
        {loading ? (
          <LoadingSkeleton count={5} />
        ) : (
          <MovieCarousel movies={nowPlaying} />
        )}
      </section>
    </div>
  );
}
