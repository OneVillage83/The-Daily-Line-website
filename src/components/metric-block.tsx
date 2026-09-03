import type { ReactNode } from "react";
import { StatusChip } from "@/components/status-chip";

export function MetricBlock({
  label,
  value,
  detail,
  status,
  mono = false,
}: {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  status?: ReactNode;
  mono?: boolean;
}) {
  return (
    <article className="metric-block">
      <div className="metric-block-topline">
        <span className="metric-label">{label}</span>
        {status ? <StatusChip>{status}</StatusChip> : null}
      </div>
      <div className={`metric-value${mono ? " metric-value-mono" : ""}`}>{value}</div>
      {detail ? <div className="metric-detail">{detail}</div> : null}
    </article>
  );
}
