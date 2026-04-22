// Footer
// ---------------------------------------------------------------------------
// Site-wide footer — minimal, purely presentational, server-rendered.

export default function Footer() {
  return (
    <footer
      className="mt-20 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          © {new Date().getFullYear()} CinemaScope · CPAN 144 Group Project
        </p>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Movie data powered by{" "}
          <span style={{ color: "var(--accent)" }}>TMDB</span> · Built with
          Next.js
        </p>
      </div>
    </footer>
  );
}
