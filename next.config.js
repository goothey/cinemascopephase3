/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // next/image is used throughout for automatic optimization:
  // lazy loading, responsive sizing, and modern formats (AVIF/WebP).
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
