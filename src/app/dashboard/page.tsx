import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatusChip } from "@/components/status-chip";
import { createPageMetadata } from "@/lib/site";
import { DAILY_SPORTS } from "@/lib/sports";

export const metadata = createPageMetadata({
  title: "Member Dashboard",
  description: "The Daily Line member command-center shell.",
  path: "/dashboard",
  index: false,
});

export default function DashboardPage() {
  return (
    <main id="main-content">
      <div className="page-shell">
        <SiteHeader />
        <PageHeader
          eyebrow="Member command center"
          title="Dashboard architecture is online."
          description={
            <p>
              Identity and entitlements are intentionally not mocked as real access. W2 and W3 will connect authenticated users and verified membership state.
            </p>
          }
          aside={<StatusChip tone="neutral">Preview shell</StatusChip>}
        />

        <section className="dashboard-grid" aria-label="Daily sport dashboard previews">
          {DAILY_SPORTS.map((sport) => (
            <Link href={`/sports/${sport.slug}`} className="dashboard-tile" key={sport.slug}>
              <span>{sport.shortName}</span>
              <strong>{sport.productName}</strong>
              <small>Preview shell · data not yet published</small>
            </Link>
          ))}
        </section>

        <div className="notice-panel">
          <p className="eyebrow">Authorization boundary</p>
          <h2>This page does not simulate a signed-in customer.</h2>
          <p>
            The visual shell can be built during W1, but real account sessions and server-side sport entitlements remain W2/W3 responsibilities.
          </p>
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
