// app/about/page.tsx — About (Phase 3)
// ---------------------------------------------------------------------------
// Static informational page describing the project, team, and tech stack.
// Server-rendered (no "use client") since it has no interactive state.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the CinemaScope project \u2014 CPAN 144 group project built with Next.js.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1
        className="text-3xl sm:text-4xl font-extrabold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        About CinemaScope
      </h1>
      <p
        className="text-base mb-8"
        style={{ color: "var(--text-secondary)" }}
      >
        CinemaScope is a movie discovery web application built for the{" "}
        <strong style={{ color: "var(--text-primary)" }}>CPAN 144</strong> Group
        Project at Humber College. It showcases modern React/Next.js patterns
        including routing, compound components, context-based state, and
        responsive design.
      </p>

      <div
        className="rounded-xl border p-6 mb-6"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <h2
          className="text-xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Project Phases
        </h2>
        <ul
          className="space-y-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Phase 1:</strong>{" "}
            Project proposal, Next.js setup, styled Home page.
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Phase 2:</strong>{" "}
            Routing, component layout, responsive theming, state management.
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Phase 3 (current):</strong>{" "}
            Live TMDB API integration, performance optimizations (code splitting, lazy loading, image optimization), and SEO.
          </li>
        </ul>
      </div>

      <div
        className="rounded-xl border p-6 mb-6"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <h2
          className="text-xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Tech Stack
        </h2>
        <ul
          className="space-y-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Framework:</strong>{" "}
            Next.js 14 (App Router) + React 18
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Language:</strong>{" "}
            TypeScript
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Styling:</strong>{" "}
            Tailwind CSS + CSS variable theme
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>State:</strong>{" "}
            React Context + Hooks (useState, useEffect, useMemo)
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Data source:</strong>{" "}
            TMDB live API (trending, top-rated, now-playing, search, genres)
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Optimizations:</strong>{" "}
            next/dynamic code splitting, next/image, debounced search, fetch cache
          </li>
          <li>
            <strong style={{ color: "var(--text-primary)" }}>Deployment:</strong>{" "}
            Vercel
          </li>
        </ul>
      </div>

      <div
        className="rounded-xl border p-6"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
        }}
      >
        <h2
          className="text-xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Key Features
        </h2>
        <ul
          className="space-y-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <li>• Browse trending, top-rated, and now-playing movies live from TMDB</li>
          <li>• Dynamic movie detail pages with recommendations and SEO metadata</li>
          <li>• Genre filter, sort, and debounced real-time search</li>
          <li>• Personal watchlist, persisted in localStorage</li>
          <li>• Fully responsive — mobile, tablet, desktop</li>
          <li>• Optimized performance — code splitting, image optimization, fetch cache</li>
        </ul>
      </div>
    </div>
  );
}
