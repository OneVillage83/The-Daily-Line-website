import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="The Daily Line home">
        <span className="brand-mark" aria-hidden="true">DL</span>
        <span>
          <strong>The Daily Line</strong>
          <small>See the data. Find the edge.</small>
        </span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        <Link href="/#sports">Sports</Link>
        <Link href="/#methodology">Methodology</Link>
        <Link href="/#membership">Membership</Link>
        <Link className="nav-cta" href="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}
