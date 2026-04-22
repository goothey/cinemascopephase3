// MovieGrid
// Responsive grid wrapper for a list of MovieCards.
// 2 cols mobile → 3 tablet → 4 small desktop → 5 desktop.

import { MovieCardDefault } from "./MovieCard";
import type { Movie } from "@/lib/types";

export default function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCardDefault key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
