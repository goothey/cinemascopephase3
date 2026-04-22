// app/page.tsx — Home (server wrapper for metadata)
import type { Metadata } from "next";
import HomePage from "./page.client";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover trending, top-rated, and now-playing movies on CinemaScope.",
};

export default function Page() {
  return <HomePage />;
}
