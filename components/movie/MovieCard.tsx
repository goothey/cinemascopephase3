"use client";

// MovieCard — Compound Component (Phase 3)
// ---------------------------------------------------------------------------
// Unchanged compound API from Phase 2:
//   <MovieCard movie={movie}>
//     <MovieCard.Poster />
//     <MovieCard.Info />
//   </MovieCard>
//
// Phase 3 additions:
//  - next/image for poster (auto lazy-loading, AVIF/WebP, responsive sizes)
//  - memo on the root to skip re-renders when props are unchanged

import Link from "next/link";
import Image from "next/image";
import {
  createContext,
  memo,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useWatchlist } from "@/context/WatchlistContext";
import { tmdbImage } from "@/lib/tmdb";
import RatingStars from "@/components/ui/RatingStars";
import type { Movie } from "@/lib/types";

const CardContext = createContext<Movie | null>(null);

function useCardMovie(): Movie {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("MovieCard sub-components must be used inside <MovieCard>");
  return ctx;
}

// ------- Root --------
function MovieCardRootBase({
  movie,
  children,
  href,
}: {
  movie: Movie;
  children: ReactNode;
  href?: string;
}) {
  const [hover, setHover] = useState(false);
  const link = href ?? `/movies/${movie.id}`;

  return (
    <CardContext.Provider value={movie}>
      <Link
        href={link}
        prefetch={false}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative block rounded-xl overflow-hidden border transition-all duration-300"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: hover ? "var(--accent)" : "var(--border)",
          transform: hover ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {children}
      </Link>
    </CardContext.Provider>
  );
}
const MovieCardRoot = memo(MovieCardRootBase);

// ------- Poster --------
function Poster() {
  const movie = useCardMovie();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const posterUrl = tmdbImage(movie.poster_path, "w500");
  const inWatchlist = isInWatchlist(movie.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div
      className="relative"
      style={{
        aspectRatio: "2/3",
        backgroundColor: "var(--surface-hover)",
      }}
    >
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover"
          loading="lazy"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect
              x="2"
              y="4"
              width="20"
              height="16"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <polygon
              points="10,8.5 10,15.5 16,12"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
        </div>
      )}

      {/* Rating badge */}
      {movie.vote_average > 0 && (
        <div
          className="absolute top-2 left-2 rounded-md px-2 py-1 z-10"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
        >
          <RatingStars score={movie.vote_average} />
        </div>
      )}

      {/* Watchlist toggle button */}
      <button
        onClick={handleToggle}
        className="absolute top-2 right-2 p-2 rounded-full transition-all z-10"
        style={{
          backgroundColor: inWatchlist ? "var(--accent)" : "rgba(0,0,0,0.7)",
          color: inWatchlist ? "#ffffff" : "var(--text-primary)",
        }}
        aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
        title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={inWatchlist ? "currentColor" : "none"}
          />
        </svg>
      </button>
    </div>
  );
}

// ------- Info --------
function Info() {
  const movie = useCardMovie();
  return (
    <div className="p-3">
      <h3
        className="text-sm font-semibold truncate"
        style={{ color: "var(--text-primary)" }}
        title={movie.title}
      >
        {movie.title}
      </h3>
      <p
        className="text-xs mt-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : "TBA"}
      </p>
    </div>
  );
}

// ------- Actions --------
function Actions({ children }: { children: ReactNode }) {
  return (
    <div
      className="px-3 pb-3 pt-0 flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

const MovieCard = Object.assign(MovieCardRoot, {
  Poster,
  Info,
  Actions,
});

export default MovieCard;

// Convenience default composition used across most grids.
export const MovieCardDefault = memo(function MovieCardDefault({
  movie,
}: {
  movie: Movie;
}) {
  return (
    <MovieCard movie={movie}>
      <MovieCard.Poster />
      <MovieCard.Info />
    </MovieCard>
  );
});
