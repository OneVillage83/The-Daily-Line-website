import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatusChip } from "@/components/status-chip";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Methodology",
  description:
    "How The Daily Line separates point-in-time analysis, sealed publication evidence, recommendation gates, and later settlement tracking.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <main id="main-content">
      <div className="page-shell">
        <SiteHeader />
        <PageHeader
          eyebrow="Methodology"
          title="Prediction first. Recommendation second. Evidence preserved."
          description={
            <p>
              The Daily Line is designed so the prediction process, publication process, and later grading process remain separable and auditable. This page describes the product architecture; exact sport-model methods will be documented by each Daily sport as those systems freeze.
            </p>
          }
          aside={<StatusChip tone="info">Architecture methodology</StatusChip>}
        />

        <section className="public-section">
          <div className="prose-stack">
            <h2>1. Point-in-time analysis</h2>
            <p>
              A prediction is only meaningful if it reflects information that was actually available when the decision was made. Daily sport pipelines therefore preserve point-in-time evidence and cutoff semantics rather than reconstructing historical predictions with later knowledge.
            </p>

            <h2>2. Every eligible game is modeled</h2>
            <p>
              The Recommendation Gate is not the model itself. The intended architecture models the eligible slate first, then applies product-level rules that may classify an opportunity as PASS or AVOID. This lets later evaluation distinguish model quality from recommendation policy.
            </p>

            <h2>3. The website receives sealed publication evidence</h2>
            <p>
              The website does not read mutable sport-pipeline working databases. A sport pipeline completes its analysis, produces a versioned publication artifact, and seals the artifact before website ingestion. That boundary prevents users from seeing a half-completed slate or historical state that silently changes underneath them.
            </p>

            <h2>4. Market context is separate from model probability</h2>
            <p>
              A model estimate and a market price answer different questions. The product should present those concepts distinctly and only compute labels such as implied probability, no-vig probability, or edge when their calculation is explicitly defined by the relevant contract.
            </p>

            <h2>5. Corrections are versions, not silent rewrites</h2>
            <p>
              If a published artifact requires correction, the original publication remains part of the evidence chain. Corrections should be represented by explicit versions or events so performance history can be reproduced from what was actually published.
            </p>

            <h2>6. Settlement is its own authority</h2>
            <p>
              Later performance reporting must use frozen settlement semantics rather than ad-hoc manual judgment. W8 owns the full performance and settlement architecture; broad public performance claims will not be published until that evidence path is reproducible.
            </p>
          </div>
        </section>

        <section className="public-section" aria-labelledby="terms-heading">
          <div className="public-section-header">
            <p className="eyebrow">Terminology contract</p>
            <h2 id="terms-heading">Words should mean the same thing everywhere.</h2>
            <p>W1 establishes consistent interface language before later data contracts populate these fields.</p>
          </div>
          <dl className="definition-list">
            <div className="definition-row">
              <dt>Model probability</dt>
              <dd>The probability produced by the relevant model under its defined version and information cutoff.</dd>
            </div>
            <div className="definition-row">
              <dt>Market / implied probability</dt>
              <dd>A market-derived probability representation. Exact treatment, including vig removal, must be explicitly defined where used.</dd>
            </div>
            <div className="definition-row">
              <dt>Recommendation Gate</dt>
              <dd>A post-prediction product decision layer that can classify an opportunity without deleting the underlying prediction from historical evaluation.</dd>
            </div>
            <div className="definition-row">
              <dt>Publication time</dt>
              <dd>The timestamp associated with the sealed website-facing publication state, distinct from later settlement or correction events.</dd>
            </div>
            <div className="definition-row">
              <dt>Data cutoff</dt>
              <dd>The latest information time allowed into the relevant prediction state under that sport's point-in-time rules.</dd>
            </div>
            <div className="definition-row">
              <dt>Settlement</dt>
              <dd>The later outcome-grading state produced under the frozen settlement rules for that market or prediction type.</dd>
            </div>
          </dl>
        </section>

        <div className="notice-panel">
          <p className="eyebrow">Scope note</p>
          <h2>Methodology will become more specific as each sport freezes.</h2>
          <p>
            This public page intentionally avoids inventing model formulas, accuracy claims, or data sources that have not yet been frozen in the underlying sport repositories.
          </p>
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
