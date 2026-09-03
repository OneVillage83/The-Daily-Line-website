import type { ReactNode } from "react";
import { StatusChip } from "@/components/status-chip";

export type EvidenceItem = {
  label: string;
  value: ReactNode;
  meta?: ReactNode;
};

export function EvidencePanel({
  eyebrow = "Evidence",
  title,
  description,
  items,
  status,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  items: readonly EvidenceItem[];
  status?: ReactNode;
}) {
  return (
    <section className="evidence-panel" aria-label={`${title} evidence`}>
      <div className="evidence-panel-header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h3>{title}</h3>
        </div>
        {status ? <StatusChip>{status}</StatusChip> : null}
      </div>
      {description ? <div className="evidence-panel-description">{description}</div> : null}
      <dl className="evidence-list">
        {items.map((item) => (
          <div className="evidence-row" key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              <span>{item.value}</span>
              {item.meta ? <small>{item.meta}</small> : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
