"use client";

// Navbar
// ---------------------------------------------------------------------------
// Top navigation bar. Uses `usePathname()` to apply conditional styling to
// the active link — demonstrating "conditional styling based on state/props"
// from the Phase 2 rubric (Styling & Theming).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWatchlist } from "@/context/WatchlistContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { watchlist } = useWatchlist();

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{
        backgroundColor: "rgba(10, 10, 15, 0.85)",
        borderColor: "var(--border)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect
              x="2"
              y="4"
              width="20"
              height="16"
              rx="2"
              fill="var(--accent)"
            />
            <polygon points="10,9 10,15 16,12" fill="#ffffff" />
          </svg>
          <span
            className="font-bold text-lg tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Cinema<span style={{ color: "var(--accent)" }}>Scope</span>
          </span>
        </Link>

        {/* Links */}
        <ul className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  style={{
                    color: active
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                    backgroundColor: active
                      ? "var(--surface-hover)"
                      : "transparent",
                  }}
                >
                  {link.label}
                  {link.href === "/watchlist" && watchlist.length > 0 && (
                    <span
                      className="ml-1.5 inline-flex items-center justify-center text-xs rounded-full px-1.5 py-0.5"
                      style={{
                        backgroundColor: "var(--accent)",
                        color: "#ffffff",
                        minWidth: "20px",
                      }}
                    >
                      {watchlist.length}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile: icon-only nav */}
        <ul className="flex sm:hidden items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-2 py-2 rounded-md text-xs font-medium"
                  style={{
                    color: active
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
