// app/not-found.tsx — 404 page (Phase 3)
// ---------------------------------------------------------------------------
// Rendered whenever a route is not found or when a page calls notFound().

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div
      className="rounded-2xl border p-12 text-center"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      <h1
        className="text-5xl font-extrabold mb-2"
        style={{ color: "var(--accent)" }}
      >
        404
      </h1>
      <h2
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        Page not found
      </h2>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        The page you're looking for doesn't exist.
      </p>
      <Link href="/">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
}
