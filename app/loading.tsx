// app/loading.tsx — root loading UI (Phase 3)
// ---------------------------------------------------------------------------
// Automatically shown by Next.js during route transitions until the page
// is ready. Prevents jarring "blank page" moments.

export default function Loading() {
  return (
    <div
      className="rounded-2xl border h-[440px] animate-pulse"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    />
  );
}
