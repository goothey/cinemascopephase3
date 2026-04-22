"use client";

// FilterBar — Phase 3
// ---------------------------------------------------------------------------
// Loads the genre list live from TMDB on mount and renders it as filter pills.
// Falls back to a short static list while loading.

import { useEffect, useState } from "react";
import { useFilters } from "@/context/FilterContext";
import { getGenres } from "@/lib/tmdb";
import type { Genre, SortOption } from "@/lib/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popularity", label: "Popularity" },
  { value: "rating", label: "Top Rated" },
  { value: "release_date", label: "Newest" },
  { value: "title", label: "A–Z" },
];

export default function FilterBar() {
  const {
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    resetFilters,
  } = useFilters();

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => setGenres([]));
  }, []);

  return (
    <div
      className="rounded-xl border p-4 mb-6"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      {/* Genre pills */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className="text-xs font-semibold uppercase tracking-wide mr-1"
          style={{ color: "var(--text-secondary)" }}
        >
          Genre:
        </span>
        <button
          onClick={() => setSelectedGenre(null)}
          className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
          style={{
            backgroundColor:
              selectedGenre === null
                ? "var(--accent)"
                : "var(--surface-hover)",
            color: selectedGenre === null ? "#ffffff" : "var(--text-secondary)",
          }}
        >
          All
        </button>
        {genres.map((g) => {
          const active = selectedGenre === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setSelectedGenre(active ? null : g.id)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: active
                  ? "var(--accent)"
                  : "var(--surface-hover)",
                color: active ? "#ffffff" : "var(--text-secondary)",
              }}
            >
              {g.name}
            </button>
          );
        })}
      </div>

      {/* Sort + reset */}
      <div className="flex flex-wrap items-center gap-3">
        <label
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--text-secondary)" }}
        >
          Sort by:
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="px-3 py-1.5 rounded-md text-sm border outline-none"
          style={{
            backgroundColor: "var(--surface-hover)",
            color: "var(--text-primary)",
            borderColor: "var(--border)",
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="ml-auto text-xs px-3 py-1.5 rounded-md transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
