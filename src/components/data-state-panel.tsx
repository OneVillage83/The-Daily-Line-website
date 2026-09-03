import type { ReactNode } from "react";
import { StatusChip } from "@/components/status-chip";

export type DataStateKind =
  | "loading"
  | "empty"
  | "unavailable"
  | "stale"
  | "gated"
  | "error"
  | "corrected";

const STATE_PRESENTATION: Record<
  DataStateKind,
  {
    label: string;
    marker: string;
    tone: "info" | "neutral" | "warning" | "danger";
  }
> = {
  loading: { label: "Loading", marker: "…", tone: "info" },
  empty: { label: "Empty", marker: "Ø", tone: "neutral" },
  unavailable: { label: "Unavailable", marker: "!", tone: "warning" },
  stale: { label: "Stale", marker: "△", tone: "warning" },
  gated: { label: "Gated", marker: "LOCK", tone: "neutral" },
  error: { label: "Error", marker: "×", tone: "danger" },
  corrected: { label: "Corrected", marker: "↺", tone: "info" },
};

export function DataStatePanel({
  kind,
  title,
  description,
  detail,
  action,
}: {
  kind: DataStateKind;
  title: string;
  description: ReactNode;
  detail?: ReactNode;
  action?: ReactNode;
}) {
  const presentation = STATE_PRESENTATION[kind];
  const isLoading = kind === "loading";

  return (
    <article className={`data-state data-state-${kind}`} aria-busy={isLoading || undefined}>
      <div className="data-state-topline">
        <span className="data-state-marker" aria-hidden="true">
          {presentation.marker}
        </span>
        <StatusChip tone={presentation.tone}>{presentation.label}</StatusChip>
      </div>
      <div className="data-state-copy">
        <h3>{title}</h3>
        <div className="data-state-description">{description}</div>
      </div>
      {isLoading ? (
        <div className="data-state-skeleton" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      ) : null}
      {detail ? <div className="data-state-detail">{detail}</div> : null}
      {action ? <div className="data-state-action">{action}</div> : null}
    </article>
  );
}
