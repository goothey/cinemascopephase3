// app/watchlist/page.tsx — Watchlist (server wrapper for metadata)
import type { Metadata } from "next";
import WatchlistPage from "./page.client";

export const metadata: Metadata = {
  title: "My Watchlist",
  description: "Your personal CinemaScope watchlist — saved in your browser.",
};

export default function Page() {
  return <WatchlistPage />;
}
