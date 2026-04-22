"use client";

// app/error.tsx — root error boundary (Phase 3)
// ---------------------------------------------------------------------------
// Catches any render error thrown from a client component tree and shows a
// graceful fallback. Required for production-quality UX.

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to the console — in production this would route to a logging service.
    console.error(error);
  }, [error]);

  return (
    <div
      className="rounded-2xl border p-10 text-center"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      <h2
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        Something went wrong
      </h2>
      <p
        className="text-sm mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        {error.message || "An unexpected error occurred."}
      </p>
      <Button variant="primary" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
