"use client";

// FilterContext
// ---------------------------------------------------------------------------
// Holds the user's current browse filters (genre, sort, search query) for
// the /movies page. Keeping this in a context (instead of a single page's
// local state) lets us share the filter state across FilterBar, SearchInput,
// and MovieGrid as separate, reusable components.

import { createContext, useContext, useState, ReactNode } from "react";
import type { SortOption } from "@/lib/types";

interface FilterContextType {
  selectedGenre: number | null;
  setSelectedGenre: (id: number | null) => void;
  sortBy: SortOption;
  setSortBy: (s: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const resetFilters = () => {
    setSelectedGenre(null);
    setSortBy("popularity");
    setSearchQuery("");
  };

  return (
    <FilterContext.Provider
      value={{
        selectedGenre,
        setSelectedGenre,
        sortBy,
        setSortBy,
        searchQuery,
        setSearchQuery,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return ctx;
}
