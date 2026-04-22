// LoadingSkeleton
// Shown while async TMDB stub calls resolve. Matches the poster grid layout
// so content doesn't shift (CLS prevention).

export default function LoadingSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border animate-pulse"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <div
            style={{
              aspectRatio: "2/3",
              backgroundColor: "var(--surface-hover)",
            }}
          />
          <div className="p-3">
            <div
              className="h-4 rounded w-3/4 mb-2"
              style={{ backgroundColor: "var(--surface-hover)" }}
            />
            <div
              className="h-3 rounded w-1/3"
              style={{ backgroundColor: "var(--surface-hover)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
