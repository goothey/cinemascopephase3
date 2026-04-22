"use client";

// app/movies/page.tsx — Browse Movies (Phase 3: live TMDB)
// ---------------------------------------------------------------------------
// Phase 3 changes:
//  - Live TMDB calls (discover/movie + search/movie)
//  - Server-side filtering/sorting: when the genre or sort changes, we refetch
//    instead of filtering a static in-memory array
//  - Debounced search so we don't hammer TMDB on every keystroke
//  - useMemo still used to avoid unnecessary re-renders

import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/movie/FilterBar";
import SearchInput from "@/components/movie/SearchInput";
import MovieGrid from "@/components/movie/MovieGrid";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { getAllMovies, searchMovies } from "@/lib/tmdb";
import { useFilters } from "@/context/FilterContext";
import type { Movie } from "@/lib/types";

/** Custom debounce hook — returns a value that only updates after `delay` ms of idle. */
function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function MoviesPage() {
  const { selectedGenre, sortBy, searchQuery, resetFilters } = useFilters();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounced(searchQuery, 350);

  // Fetch whenever filters or debounced search change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        const data = debouncedSearch.trim()
          ? await searchMovies(debouncedSearch)
          : await getAllMovies({ genreId: selectedGenre, sortBy });
        if (!cancelled) setMovies(data);
      } catch (e) {
        if (!cancelled) {
          setError("Failed to load movies. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, selectedGenre, sortBy]);

  // Memoized display list (no client-side filter needed — TMDB already filtered).
  const visible = useMemo(() => movies, [movies]);

  return (
    <div>
      <SectionHeader
        title="Browse Movies"
        subtitle="Explore the CinemaScope collection — live from TMDB"
        action={<SearchInput />}
      />

      <FilterBar />

      {error ? (
        <EmptyState
          title="Something went wrong"
          description={error}
          action={
            <Button variant="primary" onClick={() => location.reload()}>
              Try again
            </Button>
          }
        />
      ) : loading ? (
        <LoadingSkeleton count={10} />
      ) : visible.length === 0 ? (
        <EmptyState
          title={
            debouncedSearch
              ? `No results for "${debouncedSearch}"`
              : "No movies match your filters"
          }
          description="Try adjusting your search, genre, or sort options."
          action={
            <Button variant="secondary" onClick={resetFilters}>
              Reset filters
            </Button>
          }
        />
      ) : (
        <>
          <p
            className="text-sm mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Showing{" "}
            <span style={{ color: "var(--text-primary)" }}>
              {visible.length}
            </span>{" "}
            {visible.length === 1 ? "movie" : "movies"}
          </p>
          <MovieGrid movies={visible} />
        </>
      )}
    </div>
  );
}
