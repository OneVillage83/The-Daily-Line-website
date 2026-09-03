import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-brand">
        <strong>The Daily Line</strong>
        <span>© 2026 · Sports intelligence, not guarantees.</span>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <Link href="/sports">Sports</Link>
        <Link href="/methodology">Methodology</Link>
        <Link href="/performance">Performance</Link>
        <Link href="/membership">Membership</Link>
      </nav>
    </footer>
  );
}
