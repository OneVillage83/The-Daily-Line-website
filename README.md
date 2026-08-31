# The Daily Line Website

Production web platform for **The Daily Line** — the public website, member dashboard, and publication surface for Daily-MLB, Daily-NFL, Daily-NCAAF, and future Daily sports products.

> **Product principle:** the website is a consumer of sealed publication artifacts. It does not reach into sport-pipeline working databases or partially completed runs.

## Current status

**Website architecture phase: W0 — Foundation**

The repository was initialized on 2026-08-31. The goal is to build the full production architecture in parallel with the first three sport pipelines so the website is launch-ready when Daily-MLB, Daily-NFL, and Daily-NCAAF are ready to publish.

## Initial sports

- Daily-MLB
- Daily-NFL
- Daily-NCAAF

The architecture is intentionally sport-agnostic so future products (NBA, NCAAB, NHL, soccer, women's sports, and others) can be added without redesigning the platform.

## Product surfaces

### Public

- Home / brand landing page
- Sport landing pages
- Today's public slate / teaser views
- Performance and historical results
- Methodology and transparency
- Pricing / membership
- Report and article archive
- About / FAQ / responsible-use information
- Legal / privacy / terms
- SEO landing pages and structured metadata

### Authenticated member experience

- Member dashboard
- Entitlement-aware sport navigation
- Daily slate board
- Matchup dossiers
- Model-vs-market views
- Recommendation Gate results
- Reports / infographics / downloadable publication artifacts
- Performance history
- Saved preferences / account settings

## Architecture principles

1. **Publication boundary is immutable.**
   Each sport pipeline publishes one sealed, versioned web payload / publication manifest for a completed publication run. The website never assembles a slate from mutable pipeline tables.

2. **No partial slate exposure.**
   A publication becomes visible only after its manifest is complete, validated, sealed, and promoted to a publishable state.

3. **Sport adapters, not sport-specific site forks.**
   MLB, NFL, NCAAF, and later sports implement a shared publication contract plus explicitly versioned sport extensions.

4. **Whop is initially the commerce / subscription authority.**
   The Daily Line website owns the product experience; Whop can own checkout, subscription state, affiliates, and commerce events. Entitlements are projected into the website through verified webhook / reconciliation flows rather than trusted from the browser.

5. **Website identity is independent from commerce identity.**
   Authentication, user profile, preferences, and website sessions belong to the website. Commerce-provider customer IDs and memberships are linked records.

6. **Server-side authorization.**
   Paid publication content is authorized on the server. UI hiding is not considered access control.

7. **Auditability over convenience.**
   Publication ingestion, entitlement changes, settlement updates, and administrative publication actions retain durable evidence and timestamps.

8. **Performance history is reproducible.**
   Historical recommendations and results are rendered from immutable publication + settlement records so previously published advice cannot silently change.

9. **Mobile-first, information-dense design.**
   The site must work as a fast mobile product while scaling to a denser desktop command-center layout.

10. **No secrets in client code or repository history.**
    Provider credentials, webhook secrets, database service credentials, and administrative keys remain server-only.

## Baseline technology

- Next.js 16.3.x Active LTS (App Router)
- React + TypeScript
- Node.js 24 LTS
- Tailwind CSS
- shadcn/ui-compatible component architecture
- PostgreSQL / Supabase for website-owned relational state
- Supabase Auth for website identity unless an architecture review later proves a different provider materially better
- Vercel-compatible deployment architecture
- Whop integration for commerce and initial membership authority

Version pins are maintained in `package.json`; this README describes the supported architecture family rather than replacing lockfile authority.

## Repository layout

```text
src/
  app/                 Next.js routes, layouts, route handlers
  components/          reusable presentation and product components
  features/            domain-oriented feature modules
  lib/                 shared runtime libraries
  server/              server-only application services
  styles/              design tokens / shared styling
  types/               cross-module TypeScript contracts

docs/
  architecture/        production architecture specifications
  contracts/           publication/API contracts
  decisions/           architecture decision records (ADRs)
  operations/          deployment, runbooks, incident/recovery docs
  product/             UX/product behavior specifications
  status/              implementation status and freeze gates
```

## Planned website architecture gates

- **W0 — Repository & engineering foundation**
- **W1 — Design system & public shell**
- **W2 — Identity, sessions & account model**
- **W3 — Commerce / Whop entitlement authority**
- **W4 — Publication contract & ingestion boundary**
- **W5 — Sport registry & Daily board framework**
- **W6 — Matchup dossier / recommendation presentation**
- **W7 — Reports, infographics & publication archive**
- **W8 — Settlement / performance history**
- **W9 — SEO, content, analytics & attribution**
- **W10 — Admin / operations / observability**
- **W11 — Security, privacy, legal & abuse hardening**
- **W12 — Production deployment / launch readiness**

A gate is not considered complete merely because the UI exists. Each gate requires its implementation, tests, documentation, failure behavior, and operational evidence.

## Source-of-truth boundary

```text
Daily-MLB ─────┐
Daily-NFL ─────┼──> sealed publication artifacts ──> Website ingestion ──> Website DB/API ──> UI
Daily-NCAAF ───┘

Whop ─────────────> verified commerce events/reconciliation ────────────────> Entitlements
Supabase Auth ────> identity/session ───────────────────────────────────────> Authorization
```

The website may cache or normalize published data for fast reads, but the sealed upstream artifact remains the evidence of what the sport pipeline actually published.

## Documentation rule

Every material architecture or behavior change must update the relevant specification and the repository development log in the same change. Decisions that constrain future implementation receive an ADR.

## Brand

**The Daily Line**  
**SEE THE DATA. FIND THE EDGE.**

Primary domain planned for the product: `thedailyline.bet`.

---

This repository is for the website product surface. Sport prediction/model internals remain in their respective Daily sport repositories and shared cross-sport infrastructure remains in The Daily Data Core where appropriate.
