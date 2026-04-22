// TMDB API Layer — Phase 3 (LIVE API)
// ---------------------------------------------------------------------------
// Phase 2 used stubbed functions returning mock data. Phase 3 replaces those
// bodies with real fetch() calls to TMDB. The function signatures and return
// types are unchanged — every page and component continues to work with no
// modifications.
//
// All responses are cached for 1 hour via Next.js's built-in fetch cache
// (`next: { revalidate: 3600 }`), which meaningfully reduces TMDB load and
// speeds up repeat views.

import type { Movie, Genre } from "./types";

const API_BASE = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY && typeof window === "undefined") {
  console.warn(
    "[TMDB] NEXT_PUBLIC_TMDB_API_KEY is not set. Copy .env.example to .env.local and add your key."
  );
}

/** Minimal shape of a TMDB movie in list/detail responses. */
interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
}

/**
 * Generic TMDB GET helper. Attaches api_key, handles query params, and uses
 * Next's data cache so identical requests are deduped across renders.
 */
async function tmdbFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
  revalidate: number = 3600
): Promise<T> {
  const url = new URL(`${API_BASE}${path}`);
  url.searchParams.set("api_key", API_KEY ?? "");
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

/** Normalize TMDB movies to the app's Movie type. */
function normalize(m: TmdbMovie): Movie {
  return {
    id: m.id,
    title: m.title,
    poster_path: m.poster_path,
    backdrop_path: m.backdrop_path,
    vote_average: Number((m.vote_average ?? 0).toFixed(1)),
    release_date: m.release_date ?? "",
    overview: m.overview ?? "",
    genre_ids: m.genre_ids ?? (m.genres?.map((g) => g.id) ?? []),
    genres: m.genres,
    runtime: m.runtime,
    tagline: m.tagline,
  };
}

/** GET /trending/movie/week */
export async function getTrending(): Promise<Movie[]> {
  const data = await tmdbFetch<{ results: TmdbMovie[] }>("/trending/movie/week");
  return data.results.map(normalize);
}

/** GET /movie/top_rated */
export async function getTopRated(): Promise<Movie[]> {
  const data = await tmdbFetch<{ results: TmdbMovie[] }>("/movie/top_rated", {
    language: "en-US",
    page: 1,
  });
  return data.results.map(normalize);
}

/** GET /movie/now_playing */
export async function getNowPlaying(): Promise<Movie[]> {
  const data = await tmdbFetch<{ results: TmdbMovie[] }>("/movie/now_playing", {
    language: "en-US",
    page: 1,
  });
  return data.results.map(normalize);
}

/** GET /discover/movie — used by the Movies browse page. */
export async function getAllMovies(
  options: { genreId?: number | null; sortBy?: string; page?: number } = {}
): Promise<Movie[]> {
  const sortMap: Record<string, string> = {
    popularity: "popularity.desc",
    rating: "vote_average.desc",
    release_date: "primary_release_date.desc",
    title: "original_title.asc",
  };
  const data = await tmdbFetch<{ results: TmdbMovie[] }>("/discover/movie", {
    language: "en-US",
    sort_by: sortMap[options.sortBy ?? "popularity"] ?? "popularity.desc",
    with_genres: options.genreId ?? undefined,
    "vote_count.gte": 100,
    page: options.page ?? 1,
    include_adult: "false",
  });
  return data.results.map(normalize);
}

/** GET /movie/{id} */
export async function getMovieById(id: number): Promise<Movie | null> {
  try {
    const movie = await tmdbFetch<TmdbMovie>(`/movie/${id}`, { language: "en-US" });
    return normalize(movie);
  } catch {
    return null;
  }
}

/** GET /movie/{id}/recommendations */
export async function getRecommendations(id: number): Promise<Movie[]> {
  try {
    const data = await tmdbFetch<{ results: TmdbMovie[] }>(
      `/movie/${id}/recommendations`,
      { language: "en-US", page: 1 }
    );
    return data.results.slice(0, 10).map(normalize);
  } catch {
    return [];
  }
}

/** GET /search/movie — shorter cache because search results are user-driven. */
export async function searchMovies(query: string): Promise<Movie[]> {
  const q = query.trim();
  if (!q) return [];
  const data = await tmdbFetch<{ results: TmdbMovie[] }>(
    "/search/movie",
    { query: q, include_adult: "false", language: "en-US", page: 1 },
    60 // 1-minute cache for search
  );
  return data.results.map(normalize);
}

/** GET /genre/movie/list */
export async function getGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list", {
    language: "en-US",
  });
  return data.genres;
}

/** Build a TMDB image URL at the requested size. */
export function tmdbImage(
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500"
): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
