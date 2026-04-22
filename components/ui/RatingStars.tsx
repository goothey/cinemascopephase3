// RatingStars
// Displays a 0-10 TMDB rating as a numeric badge with a star icon.
// Demonstrates conditional styling — the color tier depends on the score.

export default function RatingStars({ score }: { score: number }) {
  // Conditional styling based on rating tier
  const color =
    score >= 8 ? "var(--gold)" : score >= 7 ? "#a0d870" : "var(--text-secondary)";

  return (
    <span className="inline-flex items-center gap-1">
      <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      <span className="text-sm font-semibold" style={{ color }}>
        {score.toFixed(1)}
      </span>
    </span>
  );
}
