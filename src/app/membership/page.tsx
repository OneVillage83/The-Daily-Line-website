import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatusChip } from "@/components/status-chip";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Membership",
  description:
    "How The Daily Line plans sport and bundle access while keeping the website as the primary member product experience.",
  path: "/membership",
});

export default function MembershipPage() {
  return (
    <main id="main-content">
      <div className="page-shell">
        <SiteHeader />
        <PageHeader
          eyebrow="Membership"
          title="One account. Access shaped around the sports you follow."
          description={
            <p>
              The website is being designed as the main member experience while commerce remains a separate authority. Pricing and live checkout are intentionally not invented before W3 freezes the entitlement integration.
            </p>
          }
          aside={<StatusChip tone="brand">Commerce integration: W3</StatusChip>}
        />

        <section className="public-section" aria-labelledby="membership-model-heading">
          <div className="public-section-header">
            <p className="eyebrow">Access model</p>
            <h2 id="membership-model-heading">Identity and entitlement are different jobs.</h2>
            <p>
              Signing in establishes who a user is. Entitlement establishes which sport or bundle that user may access. The website will keep those concerns separate so billing providers do not become the site's identity model.
            </p>
          </div>
          <div className="public-card-grid">
            <article className="content-card">
              <p className="eyebrow">Identity</p>
              <h3>Website account and session.</h3>
              <p>W2 will own account identity, sessions, profile state, and the security rules around authenticated website use.</p>
            </article>
            <article className="content-card">
              <p className="eyebrow">Commerce</p>
              <h3>Billing remains an external authority.</h3>
              <p>The initial architecture keeps Whop responsible for checkout and subscription lifecycle while the website verifies and projects that state.</p>
            </article>
            <article className="content-card">
              <p className="eyebrow">Entitlements</p>
              <h3>Server-side access by sport or bundle.</h3>
              <p>Examples include sport-level access such as MLB or NFL and future bundles. Client-side hiding will never be treated as authorization.</p>
            </article>
          </div>
        </section>

        <section className="membership-panel">
          <div>
            <p className="eyebrow">Current status</p>
            <h2>Membership UX can be designed now without pretending billing is connected.</h2>
            <p>
              W1 defines the visual and information architecture. W2 and W3 later attach real identity, session, commerce, and entitlement authority.
            </p>
          </div>
          <div className="membership-actions">
            <StatusChip tone="warning">Pricing not frozen</StatusChip>
            <Link className="button button-primary" href="/dashboard">
              Preview member shell
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
