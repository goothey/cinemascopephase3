# CinemaScope — Phase 3

**Course:** CPAN 144 — Server-Side Scripting
**Institution:** Humber College (Milton, ON)
**Phase:** 3 of 3 — Integration, Optimization & Presentation

CinemaScope is a modern, responsive movie discovery app built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. Phase 3 replaces Phase 2's mock data with the **live TMDB API**, adds **performance optimizations** (code splitting, `next/image`, caching, debounced search), introduces rich **SEO metadata**, and ships with a loading / error / 404 UX.

---

## Table of Contents

1. [Project Objective](#project-objective)
2. [What's New in Phase 3](#whats-new-in-phase-3)
3. [Main Features](#main-features)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Project Structure](#project-structure)
8. [Performance Optimizations](#performance-optimizations)
9. [SEO & Metadata](#seo--metadata)
10. [Challenges & Solutions](#challenges--solutions)
11. [Screenshots](#screenshots)
12. [Individual Contributions](#individual-contributions)
13. [Rubric Mapping](#rubric-mapping)

---

## Project Objective

CinemaScope's goal is to give users a fast, beautiful way to **discover, search, filter, and save movies**. Phase 3 takes the Phase 2 UI shell and turns it into a production-grade application by:

- Wiring every data surface to the **real TMDB REST API**
- Adding **performance optimizations** expected of a modern Next.js app
- Polishing the experience with **SEO**, **dynamic Open Graph tags**, and **route-level loading states**

The result is a responsive web app that loads quickly, ranks well, and handles real-world network conditions gracefully.

---

## What's New in Phase 3

| Area | Phase 2 | Phase 3 |
| --- | --- | --- |
| Data | Static mock arrays | Live TMDB API with Next.js fetch cache |
| Images | `<img>` tags | `next/image` with AVIF/WebP |
| Rendering | Client-heavy | Server components + selective client code |
| Bundle | Single chunk | Dynamic imports (`next/dynamic`) on home carousels |
| Search | Instant filter on mock list | Debounced (350 ms) live search endpoint |
| SEO | Basic title/description | `generateMetadata`, OG tags, Twitter card, title template |
| UX | Spinner on filter | `loading.tsx`, `error.tsx`, `not-found.tsx` per route |
| Genres | Hardcoded list | Fetched live from `/genre/movie/list` |

---

## Main Features

- **Home** — Trending hero, Now Playing / Popular / Top Rated / Upcoming carousels
- **Movies** — Search + genre/year/rating/sort filters, grid of results
- **Movie Details** — Backdrop hero, synopsis, metadata, genre chips, add-to-watchlist
- **Watchlist** — Persisted via React Context + `localStorage`; works across sessions
- **About** — Project summary and stack overview
- **Responsive** — Mobile-first; screenshot 07 shows the mobile home layout
- **Accessible** — Semantic HTML, keyboard-navigable cards, `alt` text on every poster

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **State:** React Context (watchlist + filters)
- **Data:** The Movie Database (TMDB) REST v3
- **Caching:** Next.js `fetch` cache with per-route `revalidate`
- **Runtime:** Node 18+

---

## Getting Started

```bash
# 1. Install deps
npm install

# 2. Add your TMDB key (see below)
cp .env.example .env.local
# then edit .env.local

# 3. Run dev server
npm run dev
# open http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Type check:

```bash
npx tsc --noEmit
```

---

## Environment Variables

| Key | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_TMDB_API_KEY` | yes | TMDB v3 API key — get one free at https://www.themoviedb.org/settings/api |

`.env.example` is included so reviewers can configure their own key without committing secrets.

---

## Project Structure

```
cinemascope-phase3/
├── app/
│   ├── layout.tsx              # Root layout + SEO metadata
│   ├── loading.tsx             # Global loading UI
│   ├── error.tsx               # Global error boundary
│   ├── not-found.tsx           # 404 page
│   ├── page.tsx                # Home (server wrapper w/ metadata)
│   ├── page.client.tsx         # Home client UI (dynamic carousels)
│   ├── movies/
│   │   ├── page.tsx            # Browse (server wrapper)
│   │   ├── page.client.tsx     # Debounced search + filters
│   │   └── [id]/
│   │       ├── page.tsx        # Details (server + generateMetadata)
│   │       ├── page.client.tsx # Details client UI
│   │       └── loading.tsx     # Per-route skeleton
│   ├── watchlist/
│   │   ├── page.tsx            # Watchlist (server wrapper)
│   │   └── page.client.tsx
│   └── about/
│       └── page.tsx            # Static server component
├── components/
│   ├── layout/                 # Navbar, Footer
│   └── movie/                  # Hero, MovieCard, MovieCarousel, FilterBar
├── context/                    # WatchlistContext, FilterContext
├── lib/
│   ├── tmdb.ts                 # TMDB fetch wrappers (cached)
│   ├── types.ts                # Movie, Genre types
│   └── utils.ts
├── public/                     # Static assets
├── screenshots/                # Phase 3 demo screenshots
├── .env.example
├── next.config.js              # image domains, AVIF/WebP
├── tailwind.config.ts
└── tsconfig.json
```

---

## Performance Optimizations

Phase 3 hits every bullet on the "Performance Optimization Techniques" rubric item:

1. **Code splitting with `next/dynamic`**
   Home-page carousels (`Hero`, `MovieCarousel`) are loaded via dynamic imports so initial JS is smaller and above-the-fold content paints faster.

2. **`next/image` with modern formats**
   Every poster and backdrop is served through `next/image`. `next.config.js` enables AVIF + WebP and whitelists the TMDB image CDN. Lazy loading is on by default; the Hero uses `priority` for LCP.

3. **Server components + fetch caching**
   Route entry points are server components. TMDB reads use Next.js's built-in fetch cache with `{ next: { revalidate: 3600 } }` for catalog endpoints and `{ next: { revalidate: 60 } }` for search.

4. **Debounced search**
   `app/movies/page.client.tsx` uses a custom `useDebounced` hook (350 ms) so keystrokes don't fire a request per character.

5. **`memo()` on MovieCard**
   Grid and carousel re-renders skip unchanged cards.

6. **`prefetch={false}` on grid links**
   Prevents eager prefetch of every result link; details page is still prefetched on hover.

7. **Parallel data fetching**
   The home page fires `Promise.all` across Trending / Popular / Top Rated / Upcoming / Now Playing for a single round-trip-wide load.

8. **Route-level loading states**
   `loading.tsx` files give users an instant skeleton while the server fetches — perceived performance improves even when network latency is high.

---

## SEO & Metadata

- `app/layout.tsx` exports a `metadata` object with:
  - Title template (`%s | CinemaScope`)
  - Description, keywords
  - `openGraph` (title, description, site name, type, images)
  - `twitter` card (summary_large_image)
- `app/movies/[id]/page.tsx` implements **`generateMetadata`** so each movie page ships its own title, description, and Open Graph image derived from TMDB data — link previews in Slack / iMessage / Discord render a real poster.

---

## Challenges & Solutions

| # | Challenge | Solution |
| --- | --- | --- |
| 1 | Client components can't export `metadata` | Split every interactive page into a server `page.tsx` (metadata + data) + a `page.client.tsx` (`"use client"`). |
| 2 | Rate-limiting from TMDB during rapid typing | Custom `useDebounced` hook (350 ms) + 60 s fetch cache on `/search/movie`. |
| 3 | Images from an external CDN broke `next/image` | Added `images.remotePatterns` in `next.config.js` for `image.tmdb.org` and enabled AVIF/WebP. |
| 4 | Carousels shipped JS even when off-screen | Converted to `next/dynamic` so their bundle only loads on the home route. |
| 5 | Dynamic genre list | `FilterBar` fetches `/genre/movie/list` on mount instead of hardcoding. |
| 6 | 404 / error UX | Added `error.tsx`, `not-found.tsx`, and a per-route `loading.tsx` for movie details. |

---

## Screenshots

Captured from the running dev server against live TMDB data (see `/screenshots`):

1. `01-home.png` — Trending hero + carousels
2. `02-movies.png` — Browse / filter page
3. `03-movie-details.png` — Movie detail page with live TMDB metadata
4. `04-watchlist.png` — Watchlist view
5. `05-about.png` — About page
6. `06-search-results.png` — Debounced search results
7. `07-home-mobile.png` — Responsive mobile home

---

## Individual Contributions

This phase was completed **solo**. All work across every role was done by a single contributor:

| Role | Work |
| --- | --- |
| **Architecture** | App Router structure, server/client split, env config |
| **UI / Components** | MovieCard, Hero, MovieCarousel, FilterBar, Navbar, Footer |
| **State Management** | WatchlistContext (localStorage persistence), FilterContext |
| **API Integration** | `lib/tmdb.ts` — typed wrappers, cache tuning, error handling |
| **Performance** | `next/dynamic`, `next/image`, `memo`, debounce, parallel fetches |
| **SEO** | Root metadata, title template, dynamic `generateMetadata`, OG + Twitter |
| **UX Polish** | `loading.tsx`, `error.tsx`, `not-found.tsx`, skeletons |
| **Testing / QA** | Manual walkthroughs, `tsc --noEmit`, screenshot review |
| **Documentation** | This README, `.env.example`, Phase 3 presentation deck |

GitHub repository: https://github.com/goothey/cinemascope

---

## Rubric Mapping

| Rubric Item (pts) | Where to look |
| --- | --- |
| Completion of Functional Requirements (4) | `app/`, `components/`, `lib/tmdb.ts`, screenshots 01–07 |
| Code Quality & Organization (3) | `app/` server/client split, `lib/`, `context/`, strict TS |
| Performance Optimization Techniques (2) | [Performance Optimizations](#performance-optimizations) |
| Presentation Quality & Clarity (3) | `CinemaScope-Phase3-Presentation.pptx` |
| Effective Collaboration & Teamwork (3) | [Individual Contributions](#individual-contributions) |

---

## Credits

- Movie data and images courtesy of **[The Movie Database (TMDB)](https://www.themoviedb.org/)**. This product uses the TMDB API but is not endorsed or certified by TMDB.
- Built with Next.js, TypeScript, and Tailwind CSS.
# cinemascopephase3
