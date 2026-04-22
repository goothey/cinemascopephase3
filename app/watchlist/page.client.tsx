"use client";

// app/watchlist/page.tsx — My Watchlist
// ---------------------------------------------------------------------------
// Reads from WatchlistContext (no own fetching) and renders the saved movies
// as a grid. Demonstrates state sharing between components across routes.

import Link from "next/link";
import MovieGrid from "@/components/movie/MovieGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import { useWatchlist } from "@/context/WatchlistContext";

export default function WatchlistPage() {
  const { watchlist, clearWatchlist } = useWatchlist();

  return (
    <div>
      <SectionHeader
        title="My Watchlist"
        subtitle={
          watchlist.length > 0
            ? `${watchlist.length} movie${watchlist.length === 1 ? "" : "s"} saved`
            : "Save movies to watch later"
        }
        action={
          watchlist.length > 0 ? (
            <Button variant="secondary" onClick={clearWatchlist}>
              Clear All
            </Button>
          ) : undefined
        }
      />

      {watchlist.length === 0 ? (
        <EmptyState
          title="Your watchlist is empty"
          description="Browse movies and tap the bookmark icon to add them here. Your list is saved in this browser."
          action={
            <Link href="/movies">
              <Button variant="primary">Browse Movies</Button>
            </Link>
          }
        />
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </div>
  );
}
