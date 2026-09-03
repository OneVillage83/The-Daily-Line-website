import { DataStatePanel } from "@/components/data-state-panel";
import { DataTable } from "@/components/data-table";
import { EmptyState } from "@/components/empty-state";
import { EvidencePanel } from "@/components/evidence-panel";
import { MetricBlock } from "@/components/metric-block";
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

const PERFORMANCE_COLUMNS = [
  {
    key: "publication",
    label: "Publication",
    description: "Sealed website publication identity",
  },
  {
    key: "model",
    label: "Model probability",
    description: "Published model estimate",
    align: "right" as const,
  },
  {
    key: "market",
    label: "Market",
    description: "Published market comparison",
    align: "right" as const,
  },
  {
    key: "gate",
    label: "Gate",
    description: "Recommendation Gate state",
    align: "center" as const,
  },
  {
    key: "settlement",
    label: "Settlement",
    description: "Outcome under frozen grading rules",
    align: "center" as const,
  },
] as const;

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

        <section className="analytics-section" aria-labelledby="metric-contract-heading">
          <div className="analytics-section-header">
            <p className="eyebrow">Metric contract</p>
            <h2 id="metric-contract-heading">The interface has slots before it has numbers.</h2>
            <p>
              W1 defines consistent analytical roles now so later gates can populate them from frozen contracts without redesigning the product around one sport or one data source.
            </p>
          </div>
          <div className="metric-grid">
            <MetricBlock
              label="Model probability"
              value="Not published"
              detail="Populated only from accepted publication evidence."
            />
            <MetricBlock
              label="Market comparison"
              value="Not published"
              detail="Calculation semantics must be defined before display."
            />
            <MetricBlock
              label="Recommendation Gate"
              value="Not published"
              detail="PASS and AVOID remain domain states, not generic success or failure colors."
            />
            <MetricBlock
              label="Settlement"
              value="Not available"
              detail="W8 must freeze grading authority before historical claims appear here."
            />
          </div>
        </section>

        <section className="analytics-section" aria-labelledby="evidence-contract-heading">
          <div className="analytics-section-header">
            <p className="eyebrow">Provenance contract</p>
            <h2 id="evidence-contract-heading">Every displayed claim needs a traceable state.</h2>
            <p>
              The final field values come from later publication and settlement contracts. W1 establishes the reusable evidence layout and terminology without inventing those values.
            </p>
          </div>
          <EvidencePanel
            title="Publication evidence"
            status="Awaiting data"
            description={
              <p>
                These fields are presentation slots only. The website will fill them from validated immutable publication evidence after W4 is proven against the sport repositories.
              </p>
            }
            items={[
              { label: "Publication time", value: "Awaiting sealed publication" },
              { label: "Data cutoff", value: "Awaiting sealed publication" },
              { label: "Publication version", value: "Awaiting sealed publication" },
              { label: "Correction state", value: "No publication loaded" },
              { label: "Replay reference", value: "Awaiting approved public evidence" },
            ]}
          />
        </section>

        <section className="analytics-section" aria-labelledby="table-contract-heading">
          <div className="analytics-section-header">
            <p className="eyebrow">Table contract</p>
            <h2 id="table-contract-heading">Dense data without deleting context on smaller screens.</h2>
            <p>
              Analytical tables preserve semantic headers and allow keyboard-safe horizontal review rather than hiding critical columns merely to fit a narrow viewport.
            </p>
          </div>
          <DataTable
            caption="Settlement-backed performance ledger"
            description="Column architecture is defined, but rows remain empty until immutable publication and settlement evidence exist."
            columns={PERFORMANCE_COLUMNS}
            rows={[]}
            emptyMessage="No settlement-backed performance rows are available yet."
          />
        </section>

        <section className="analytics-section" aria-labelledby="state-contract-heading">
          <div className="analytics-section-header">
            <p className="eyebrow">State contract</p>
            <h2 id="state-contract-heading">Empty, stale, gated, broken, and corrected are not the same thing.</h2>
            <p>
              Data-bearing surfaces must explain their actual condition so users are never asked to infer whether a blank or old view is current, unavailable, restricted, or corrected.
            </p>
          </div>
          <div className="data-state-grid">
            <DataStatePanel
              kind="loading"
              title="Loading structure without fake numbers"
              description={<p>Skeletons communicate shape while avoiding placeholder probabilities or prices that could be mistaken for real analysis.</p>}
            />
            <DataStatePanel
              kind="empty"
              title="Legitimately no data"
              description={<p>An empty state explains that no sealed publication, slate, or settled history exists for the current view.</p>}
            />
            <DataStatePanel
              kind="unavailable"
              title="Data temporarily unavailable"
              description={<p>Provider or system unavailability is distinguished from a legitimate empty slate so missing data is not silently normalized.</p>}
            />
            <DataStatePanel
              kind="stale"
              title="Freshness cannot be assumed"
              description={<p>A stale surface must show that its freshness requirement was missed and preserve the relevant cutoff or age when known.</p>}
            />
            <DataStatePanel
              kind="gated"
              title="Membership is required"
              description={<p>The interface may explain access requirements, but server-side authorization remains the actual security boundary.</p>}
            />
            <DataStatePanel
              kind="error"
              title="The requested view failed"
              description={<p>User-facing errors describe the failed function without exposing secrets, stack traces, provider tokens, or internal infrastructure details.</p>}
            />
            <DataStatePanel
              kind="corrected"
              title="A later version supersedes the original"
              description={<p>Corrections surface their version relationship instead of silently rewriting the historical publication that users originally received.</p>}
            />
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
