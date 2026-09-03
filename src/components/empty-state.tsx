import type { ReactNode } from "react";

export function EmptyState({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <strong>{title}</strong>
      <div className="empty-state-description">{description}</div>
      {action ? <div className="empty-state-action">{action}</div> : null}
    </div>
  );
}
