import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="page-header">
      <div className="page-header-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description ? <div className="page-header-description">{description}</div> : null}
      </div>
      {aside ? <div className="page-header-aside">{aside}</div> : null}
    </section>
  );
}
