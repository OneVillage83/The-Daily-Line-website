import Link from "next/link";

const PUBLIC_NAV = [
  { href: "/sports", label: "Sports" },
  { href: "/methodology", label: "Methodology" },
  { href: "/performance", label: "Performance" },
  { href: "/membership", label: "Membership" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="The Daily Line home">
        <span className="brand-mark" aria-hidden="true">
          DL
        </span>
        <span>
          <strong>The Daily Line</strong>
          <small>See the data. Find the edge.</small>
        </span>
      </Link>

      <nav className="primary-nav" aria-label="Primary navigation">
        {PUBLIC_NAV.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <Link className="nav-cta" href="/dashboard">
          Dashboard
        </Link>
      </nav>
    </header>
  );
}
