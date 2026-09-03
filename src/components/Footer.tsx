// Build-time constant: Vite inlines `import.meta.env.BASE_URL`/define at
// build time, but `new Date().getFullYear()` would execute on the client on
// every render. Using a literal keeps the rendered HTML deterministic and
// lets Vercel's static prerender produce a single fixed value.
const COPYRIGHT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border bg-bg-card/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-text-muted">
          © {COPYRIGHT_YEAR} Ankit Kumar Singh.
        </p>
        <p className="text-xs text-text-muted/60 font-mono tracking-wide">
          Built with ♥ using React + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
