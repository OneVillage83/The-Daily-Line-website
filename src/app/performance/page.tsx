import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatusChip } from "@/components/status-chip";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Performance",
  description:
    "The Daily Line performance surface will publish reproducible results only after settlement and historical reporting rules are frozen.",
  path: "/performance",
  index: false,
});

export default function PerformancePage() {
  return (
    <main id="main-content">
      <div className="page-shell">
        <SiteHeader />
        <PageHeader
          eyebrow="Performance"
          title="Track what was published, not a rewritten highlight reel."
          description={
            <p>
              The performance system is deliberately not displaying sample win rates, ROI, records, or backfilled claims. W8 will freeze settlement and historical aggregation rules before this page becomes a public performance authority.
            </p>
          }
          aside={<StatusChip tone="warning">No public record yet</StatusChip>}
        />

        <section className="public-section" aria-labelledby="performance-standard-heading">
          <div className="public-section-header">
            <p className="eyebrow">Reporting standard</p>
            <h2 id="performance-standard-heading">What this page must eventually prove.</h2>
          </div>
          <div className="public-card-grid">
            <article className="content-card">
              <p className="eyebrow">Published state</p>
              <h3>Results trace back to the actual sealed prediction.</h3>
              <p>Historical reporting should be derived from accepted publication evidence rather than recreated from memory or current model output.</p>
            </article>
            <article className="content-card">
              <p className="eyebrow">Settlement authority</p>
              <h3>Every market type uses explicit grading rules.</h3>
              <p>Pushes, cancellations, corrections, line-specific outcomes, and sport-specific settlement details must follow frozen rules.</p>
            </article>
            <article className="content-card">
              <p className="eyebrow">Full context</p>
              <h3>Recommendation outcomes do not erase the model slate.</h3>
              <p>Performance views should make it possible to evaluate both raw model predictions and the Recommendation Gate where policy permits.</p>
            </article>
          </div>
        </section>

        <section className="preview-board" aria-label="Performance data status">
          <div className="preview-board-header">
            <div>
              <span className="eyebrow">Public performance ledger</span>
              <h2>Settlement-backed history</h2>
            </div>
            <span>W8 authority required</span>
          </div>
          <EmptyState
            eyebrow="Evidence not yet frozen"
            title="No performance numbers will be fabricated for the shell."
            description={
              <p>
                Once publication ingestion and settlement authority are complete, this surface will render reproducible performance from immutable website evidence.
              </p>
            }
          />
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
