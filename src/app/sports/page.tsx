import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SportCard } from "@/components/sport-card";
import { StatusChip } from "@/components/status-chip";
import { createPageMetadata } from "@/lib/site";
import { DAILY_SPORTS } from "@/lib/sports";

export const metadata = createPageMetadata({
  title: "Sports",
  description:
    "Explore The Daily Line's sport-native analysis products, beginning with Daily-MLB, Daily-NFL, and Daily-NCAAF.",
  path: "/sports",
});

export default function SportsPage() {
  return (
    <main id="main-content">
      <div className="page-shell">
        <SiteHeader />
        <PageHeader
          eyebrow="Daily sports"
          title="Shared standards. Sport-native intelligence."
          description={
            <p>
              Each Daily sport owns its own modeling and evidence pipeline while publishing through one controlled website boundary. The interface stays consistent without pretending baseball and football are the same analytical problem.
            </p>
          }
          aside={<StatusChip tone="brand">Initial desks: 3</StatusChip>}
        />

        <section className="public-section" aria-labelledby="initial-sports-heading">
          <div className="public-section-header">
            <p className="eyebrow">Initial launch set</p>
            <h2 id="initial-sports-heading">Daily-MLB, Daily-NFL, and Daily-NCAAF</h2>
            <p>
              These routes are product shells until their sport pipelines deliver validated sealed publications. No sample picks or invented performance are shown in their place.
            </p>
          </div>
          <div className="sport-grid">
            {DAILY_SPORTS.map((sport) => (
              <SportCard key={sport.slug} sport={sport} />
            ))}
          </div>
        </section>

        <section className="public-section" aria-labelledby="shared-rules-heading">
          <div className="public-section-header">
            <p className="eyebrow">Shared publication rules</p>
            <h2 id="shared-rules-heading">Consistency where it matters.</h2>
          </div>
          <div className="public-card-grid">
            <article className="content-card">
              <p className="eyebrow">01 / Point in time</p>
              <h3>Use only information available before the relevant cutoff.</h3>
              <p>Later information cannot be allowed to rewrite what the model could have known when a prediction was produced.</p>
            </article>
            <article className="content-card">
              <p className="eyebrow">02 / Sealed output</p>
              <h3>Publish a finished artifact, not mutable working state.</h3>
              <p>The website consumes versioned publication evidence rather than querying a sport pipeline while that pipeline is still changing.</p>
            </article>
            <article className="content-card">
              <p className="eyebrow">03 / Track the full slate</p>
              <h3>Recommendation filtering does not erase predictions.</h3>
              <p>PASS and AVOID are post-prediction product states. Historical evaluation must preserve the underlying modeled slate.</p>
            </article>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
