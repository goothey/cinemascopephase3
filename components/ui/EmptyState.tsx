// EmptyState
// Shown when a list/collection has no results. Reused by Watchlist and
// filtered Movies page.

import { ReactNode } from "react";

export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-xl border py-16 px-6"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--surface)",
      }}
    >
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="var(--text-secondary)"
          strokeWidth="1.5"
        />
        <path
          d="M8 9l3 2-3 2V9z"
          fill="var(--text-secondary)"
          opacity="0.6"
        />
      </svg>
      <h3
        className="mt-4 text-lg font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="mt-2 text-sm max-w-md"
          style={{ color: "var(--text-secondary)" }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
