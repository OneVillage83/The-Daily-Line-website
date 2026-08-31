import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { DAILY_SPORTS, getSportBySlug } from "@/lib/sports";

export function generateStaticParams() {
  return DAILY_SPORTS.map((sport) => ({ sport: sport.slug }));
}

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport: sportSlug } = await params;
  const sport = getSportBySlug(sportSlug);

  if (!sport) notFound();

  return (
    <main>
      <div className="page-shell">
        <SiteHeader />
        <section className="inner-hero sport-hero">
          <p className="eyebrow">{sport.leagueName}</p>
          <h1>{sport.productName}</h1>
          <p>{sport.description}</p>
          <span className="status-chip">Publication adapter not connected yet</span>
        </section>

        <section className="preview-board" aria-label={`${sport.productName} board preview`}>
          <div className="preview-board-header">
            <div>
              <span className="eyebrow">Daily board</span>
              <h2>Publication contract preview</h2>
            </div>
            <span>No fabricated picks or records</span>
          </div>
          <div className="empty-publication-state">
            <strong>Waiting for the first sealed {sport.shortName} publication.</strong>
            <p>
              When the sport pipeline is connected, this surface will render only validated publication artifacts promoted through the website ingestion boundary.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
