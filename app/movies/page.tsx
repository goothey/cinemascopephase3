// app/movies/page.tsx — Browse (server wrapper for metadata)
import type { Metadata } from "next";
import MoviesPage from "./page.client";

export const metadata: Metadata = {
  title: "Browse Movies",
  description:
    "Browse the full CinemaScope collection. Filter by genre, sort by popularity or rating, and search any title.",
};

export default function Page() {
  return <MoviesPage />;
}
