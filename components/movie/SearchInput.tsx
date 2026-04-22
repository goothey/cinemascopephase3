"use client";

// SearchInput
// Controlled search box bound to FilterContext.searchQuery.

import { useFilters } from "@/context/FilterContext";

export default function SearchInput() {
  const { searchQuery, setSearchQuery } = useFilters();

  return (
    <div className="relative w-full sm:max-w-sm">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "var(--text-secondary)" }}
      >
        <circle cx="11" cy="11" r="7" strokeWidth="2" />
        <line
          x1="16.5"
          y1="16.5"
          x2="21"
          y2="21"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <input
        type="text"
        placeholder="Search movies…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-9 pr-3 py-2 rounded-md text-sm border outline-none focus:ring-2"
        style={{
          backgroundColor: "var(--surface)",
          color: "var(--text-primary)",
          borderColor: "var(--border)",
        }}
      />
    </div>
  );
}
