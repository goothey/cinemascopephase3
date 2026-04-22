// Shared TypeScript types for CinemaScope.
// These mirror the shape of TMDB API responses so switching from mock data
// to real TMDB calls in Phase 3 requires no type changes.

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
  /** On the full /movie/{id} detail payload, TMDB returns objects, not ids. */
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export type SortOption = "popularity" | "rating" | "release_date" | "title";
