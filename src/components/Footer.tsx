export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border bg-bg-card/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} Ankit Kumar Singh.
        </p>
        <p className="text-xs text-text-muted/60 font-mono tracking-wide">
          Built with ♥ using React + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
