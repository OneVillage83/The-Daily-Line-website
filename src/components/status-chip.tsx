import type { ReactNode } from "react";

type StatusTone = "brand" | "success" | "warning" | "danger" | "info" | "neutral";

export function StatusChip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return <span className={`status-chip status-chip-${tone}`}>{children}</span>;
}
