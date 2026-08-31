import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { DAILY_SPORTS } from "@/lib/sports";

export const metadata = { title: "Member Dashboard" };

export default function DashboardPage() {
  return (
    <main>
      <div className="page-shell">
        <SiteHeader />
        <section className="inner-hero">
          <p className="eyebrow">Member command center</p>
          <h1>Dashboard architecture is online.</h1>
          <p>
            Identity and entitlements are intentionally not mocked as real access. W2 and W3 will connect authenticated users and verified membership state.
          </p>
        </section>
        <section className="dashboard-grid">
          {DAILY_SPORTS.map((sport) => (
            <Link href={`/sports/${sport.slug}`} className="dashboard-tile" key={sport.slug}>
              <span>{sport.shortName}</span>
              <strong>{sport.productName}</strong>
              <small>Preview shell · data not yet published</small>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
