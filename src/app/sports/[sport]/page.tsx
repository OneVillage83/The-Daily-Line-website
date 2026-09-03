import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatusChip } from "@/components/status-chip";
import { createPageMetadata } from "@/lib/site";
import { DAILY_SPORTS, getSportBySlug } from "@/lib/sports";

export function generateStaticParams() {
  return DAILY_SPORTS.map((sport) => ({ sport: sport.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sport: string }>;
}): Promise<Metadata> {
  const { sport: sportSlug } = await params;
  const sport = getSportBySlug(sportSlug);

  if (!sport) {
    return {};
  }

  return createPageMetadata({
    title: sport.productName,
    description: sport.description,
    path: `/sports/${sport.slug}`,
    index: false,
  });
}

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport: sportSlug } = await params;
  const sport = getSportBySlug(sportSlug);

  if (!sport) notFound();

  return (
    <main id="main-content">
      <div className="page-shell">
        <SiteHeader />
        <PageHeader
          eyebrow={sport.leagueName}
          title={sport.productName}
          description={<p>{sport.description}</p>}
          aside={<StatusChip tone="neutral">Publication adapter pending</StatusChip>}
        />

        <section className="preview-board" aria-label={`${sport.productName} board preview`}>
          <div className="preview-board-header">
            <div>
              <span className="eyebrow">Daily board</span>
              <h2>Publication contract preview</h2>
            </div>
            <span>No fabricated picks or records</span>
          </div>
          <EmptyState
            eyebrow="Sealed publication required"
            title={`Waiting for the first sealed ${sport.shortName} publication.`}
            description={
              <p>
                When the sport pipeline is connected, this surface will render only validated publication artifacts promoted through the website ingestion boundary.
              </p>
            }
            action={
              <Link className="button button-secondary" href="/methodology">
                Read the publication methodology
              </Link>
            }
          />
        </section>

        <section className="public-section" aria-labelledby={`${sport.slug}-future-surface`}>
          <div className="public-section-header">
            <p className="eyebrow">W5 / W6 handoff</p>
            <h2 id={`${sport.slug}-future-surface`}>The shell is ready for sport-native evidence, not generic placeholder cards.</h2>
            <p>
              Later gates will attach the daily board, matchup dossier, market context, recommendation state, provenance, and publication timing defined by the frozen website/sport contracts.
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
