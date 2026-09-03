import Link from "next/link";
import type { DailySport } from "@/lib/sports";
import { StatusChip } from "@/components/status-chip";

export function SportCard({ sport }: { sport: DailySport }) {
  return (
    <article className="sport-card">
      <div className="sport-card-topline">
        <span className="sport-code">{sport.shortName}</span>
        <StatusChip tone="neutral">Publication adapter pending</StatusChip>
      </div>
      <div>
        <p className="eyebrow">{sport.leagueName}</p>
        <h3>{sport.productName}</h3>
        <p>{sport.description}</p>
      </div>
      <Link className="text-link" href={`/sports/${sport.slug}`}>
        Open sport preview <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
