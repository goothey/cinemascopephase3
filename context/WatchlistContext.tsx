"use client";

// WatchlistContext
// ---------------------------------------------------------------------------
// Global state for the user's saved movies. Persists to localStorage so the
// watchlist survives page refreshes and browser restarts. Consumed by
// MovieCard (toggle button) and the /watchlist page (display).

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { Movie } from "@/lib/types";

interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | null>(null);
const STORAGE_KEY = "cinemascope-watchlist";

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load persisted watchlist on mount (client only).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setWatchlist(JSON.parse(saved));
    } catch {
      // Ignore corrupted storage
    }
    setIsLoaded(true);
  }, []);

  // Persist any change to the watchlist.
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist, isLoaded]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prev) =>
      prev.find((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInWatchlist = (movieId: number) =>
    watchlist.some((m) => m.id === movieId);

  const clearWatchlist = () => setWatchlist([]);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        clearWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return ctx;
}
