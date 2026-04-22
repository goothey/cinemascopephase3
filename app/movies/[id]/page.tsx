// app/movies/[id]/page.tsx — Movie Details (server wrapper with dynamic metadata)
// ---------------------------------------------------------------------------
// generateMetadata runs on the server for each movie id and produces
// per-movie title/description/OG tags — great for SEO and social sharing.

import type { Metadata } from "next";
import { getMovieById } from "@/lib/tmdb";
import MovieDetailsPage from "./page.client";

interface Params {
  params: { id: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const id = Number(params.id);
  if (!Number.isFinite(id)) {
    return { title: "Movie not found" };
  }
  const movie = await getMovieById(id);
  if (!movie) {
    return { title: "Movie not found" };
  }

  return {
    title: movie.title,
    description: movie.overview?.slice(0, 160) ?? undefined,
    openGraph: {
      title: `${movie.title} · CinemaScope`,
      description: movie.overview?.slice(0, 200) ?? undefined,
      images: movie.backdrop_path
        ? [`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`]
        : undefined,
      type: "video.movie",
    },
  };
}

export default function Page() {
  return <MovieDetailsPage />;
}
