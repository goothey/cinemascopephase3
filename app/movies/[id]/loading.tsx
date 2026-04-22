// Route-level loading UI for /movies/[id]
export default function LoadingDetails() {
  return (
    <div
      className="rounded-2xl border h-[500px] animate-pulse"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    />
  );
}
