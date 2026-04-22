// GenreBadge
// Small pill displaying a genre name. Reused on MovieCard and Movie Details.

export default function GenreBadge({ name }: { name: string }) {
  return (
    <span
      className="inline-block text-xs px-2 py-0.5 rounded-full border"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
        backgroundColor: "var(--surface-hover)",
      }}
    >
      {name}
    </span>
  );
}
