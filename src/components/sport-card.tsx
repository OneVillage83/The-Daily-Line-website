import Link from "next/link";
import type { DailySport } from "@/lib/sports";

export function SportCard({ sport }: { sport: DailySport }) {
  return (
    <article className="sport-card">
      <div className="sport-card-topline">
        <span className="sport-code">{sport.shortName}</span>
        <span className="status-chip">Architecture in progress</span>
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
