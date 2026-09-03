import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SportCard } from "@/components/sport-card";
import { StatusChip } from "@/components/status-chip";
import { DAILY_SPORTS } from "@/lib/sports";

export default function Home() {
  return (
    <main id="main-content">
      <div className="page-shell">
        <SiteHeader />

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Sports intelligence, published daily</p>
            <h1>
              See the data.
              <br />
              <span>Find the edge.</span>
            </h1>
            <p className="hero-lede">
              The Daily Line is being built as one transparent home for model forecasts, market context, matchup research, recommendation gates, and long-run performance—across every Daily sport.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/sports">
                Explore the first sports
              </Link>
              <Link className="button button-secondary" href="/methodology">
                How the system works
              </Link>
            </div>
          </div>

          <div className="terminal-card" aria-label="Publication architecture preview">
            <div className="terminal-header">
              <span>DAILY LINE / PUBLICATION STATUS</span>
              <span className="live-dot">BUILD</span>
            </div>
            <div className="terminal-body">
              {DAILY_SPORTS.map((sport, index) => (
                <div className="terminal-row" key={sport.slug}>
                  <span className="terminal-index">0{index + 1}</span>
                  <span>{sport.productName}</span>
                  <strong>PIPELINE → SEALED WEB PAYLOAD</strong>
                </div>
              ))}
            </div>
            <div className="terminal-footer">
              <span>Immutable publication boundary</span>
              <span>No partial slates</span>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Core product principles">
          <span>Every game modeled</span>
          <span>Model vs. market</span>
          <span>PASS / AVOID still tracked</span>
          <span>Historical results preserved</span>
        </section>

        <section className="section" id="sports">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The first three desks</p>
              <h2>One platform. Sport-native intelligence.</h2>
            </div>
            <p>
              Shared publication and product standards underneath; sport-specific modeling and research where the game demands it.
            </p>
          </div>
          <div className="sport-grid">
            {DAILY_SPORTS.map((sport) => (
              <SportCard key={sport.slug} sport={sport} />
            ))}
          </div>
          <div className="inline-actions">
            <Link className="text-link" href="/sports">
              View the sports architecture <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <section className="section split-section" id="methodology">
          <div>
            <p className="eyebrow">Publication architecture</p>
            <h2>A finished answer, not a half-built pipeline snapshot.</h2>
          </div>
          <div>
            <div className="principle-list">
              <div>
                <span>01</span>
                <p>
                  <strong>Analyze.</strong> Each Daily sport completes its own point-in-time data, model, market, and recommendation workflow.
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>Seal.</strong> The sport publishes one versioned, hashed artifact representing exactly what the website is allowed to show.
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Publish.</strong> The website ingests that artifact atomically, authorizes access, and preserves the published state for later grading.
                </p>
              </div>
            </div>
            <div className="inline-actions">
              <Link className="text-link" href="/methodology">
                Read the methodology architecture <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="membership-panel" id="membership">
          <div>
            <p className="eyebrow">Membership</p>
            <h2>Your sports. One Daily Line account.</h2>
            <p>
              The member system is being designed so access can be granted by sport or bundle while the website remains the main product experience.
            </p>
          </div>
          <div className="membership-actions">
            <StatusChip tone="warning">Commerce integration: W3</StatusChip>
            <Link className="button button-primary" href="/membership">
              See membership architecture
            </Link>
            <Link className="text-link" href="/dashboard">
              Preview member shell <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
