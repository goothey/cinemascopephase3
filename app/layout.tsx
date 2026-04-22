// app/layout.tsx — Root layout (Phase 3)
// ---------------------------------------------------------------------------
// Houses the global providers, navbar, and footer, and exports rich SEO
// metadata (title template, description, Open Graph tags).

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { WatchlistProvider } from "@/context/WatchlistContext";
import { FilterProvider } from "@/context/FilterContext";

export const metadata: Metadata = {
  title: {
    default: "CinemaScope — Discover Your Next Favorite Movie",
    template: "%s · CinemaScope",
  },
  description:
    "CinemaScope is a Next.js movie discovery app built for CPAN 144. Browse trending, top-rated, and now-playing movies from TMDB, search any title, and save favorites to your watchlist.",
  keywords: [
    "movies",
    "TMDB",
    "Next.js",
    "CinemaScope",
    "movie discovery",
    "CPAN 144",
  ],
  authors: [{ name: "CinemaScope Team" }],
  openGraph: {
    title: "CinemaScope — Discover Your Next Favorite Movie",
    description:
      "Browse trending, top-rated, and now-playing movies. Search any title and save favorites to your watchlist.",
    type: "website",
    siteName: "CinemaScope",
  },
  twitter: {
    card: "summary_large_image",
    title: "CinemaScope",
    description: "Movie discovery app built with Next.js",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WatchlistProvider>
          <FilterProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 fade-in">
                {children}
              </main>
              <Footer />
            </div>
          </FilterProvider>
        </WatchlistProvider>
      </body>
    </html>
  );
}
