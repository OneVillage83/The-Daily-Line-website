import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <main id="main-content">
      <div className="page-shell">
        <SiteHeader />
        <section className="preview-board" aria-label="Page not found">
          <EmptyState
            eyebrow="404"
            title="That Daily Line page does not exist."
            description={
              <p>
                The route may have moved, may not be published yet, or may never have existed. No substitute data has been generated for it.
              </p>
            }
            action={
              <Link className="button button-primary" href="/">
                Return home
              </Link>
            }
          />
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}
