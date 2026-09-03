# Website Status

**Last updated:** 2026-09-02 PDT  
**Current gate:** W1 — Design system, semantic public shell & discoverability prerequisites  
**W0 freeze status:** FROZEN  
**W0 evidence commit:** `c0bd7fa9bc48e96d4c8b7a12ccd68f2b2aec8084`  
**W0 freeze record:** `docs/status/W0_FREEZE_2026-09-02.md`

## W0 freeze decision

W0 — Repository & engineering foundation is formally frozen.

The final freeze review found matching local and clean-CI evidence on the same committed repository state:

- final local reproduction used the exact committed lockfile after restoring the unsuccessful ESLint 10 experiment;
- `npm ci` passed under Node v24.11.1;
- `npm audit --audit-level=high` reported 0 vulnerabilities;
- `npm run verify` passed end to end;
- repository format check passed for 31 text files;
- TypeScript passed;
- ESLint passed on the committed compatible stack;
- Node tests passed 9/9;
- production Next.js build passed and generated the home, dashboard, MLB, NFL, and NCAAF route set;
- the previous parent-directory Turbopack root warning was absent;
- final local `git status` reported the working tree clean and up to date with `origin/main`;
- GitHub Actions CI #18 / run `33722166331` completed successfully on exact evidence commit `c0bd7fa9bc48e96d4c8b7a12ccd68f2b2aec8084`.

See `docs/status/W0_FREEZE_2026-09-02.md` for the complete evidence package, exception record, frozen capabilities, and W1 handoff.

## Frozen W0 foundation

W0 established:

- Next.js 16.3.3 / React 19.2.8 / Node 24 baseline;
- strict TypeScript application scaffold;
- Tailwind 4 CSS pipeline;
- repository-local `package-lock.json` as dependency-resolution authority;
- public homepage shell;
- dashboard shell without fabricated authentication/entitlements;
- Daily-MLB, Daily-NFL, Daily-NCAAF sport registry and static sport routes;
- sealed immutable publication-boundary architecture;
- Publication Contract V1 draft;
- ADR-0001 sealed publication boundary;
- SEO + GEO/AEO discoverability architecture V1;
- ADR-0002 discoverability as a cross-cutting architecture requirement;
- environment-variable contract without secrets;
- dependency-free repository formatting gate;
- Node 24 built-in deterministic smoke-test baseline;
- source-level accessibility smoke checks;
- guard against direct SQLite/sport-pipeline coupling;
- GitHub Actions clean-checkout CI using `npm ci`;
- high/critical audit gating;
- immutable GitHub Action SHA pins;
- weekly Dependabot proposals;
- dependency/supply-chain security policy;
- `CODEX_START_HERE.md` and agent handoff discipline;
- timestamped/material-change development logging policy.

## ESLint compatibility exception carried forward

The repository intentionally remains on `eslint@9.39.5` for now.

ESLint 10.9.0 was tested locally. npm produced peer-resolution warnings and lint failed inside the current React ESLint plugin while loading `react/display-name`. The current Next.js 16.3.3 lint dependency chain is therefore not yet verified ESLint-10-compatible.

Controls:

- do not use `--force`, `--legacy-peer-deps`, or unproven shims solely to force ESLint 10;
- Dependabot remains enabled;
- audit and lint stay mandatory CI gates;
- re-evaluate when the Next.js / React lint chain publishes verified ESLint 10 compatibility;
- re-evaluate at minimum before W12 launch freeze.

This is a documented development-tooling compatibility exception, not a production-runtime exception and not a reopened W0 blocker.

## Active W1 scope

**W1 — Design system, semantic public shell & discoverability prerequisites** is now active.

W1 must produce a complete, reusable, production-oriented design and public-shell system rather than isolated page styling.

Required W1 areas include:

1. design tokens: color, typography, spacing, radii, borders, elevation, motion, density, responsive breakpoints;
2. typography hierarchy for editorial, analytical, tabular, metadata, status, and numeric/probability content;
3. semantic public navigation and information architecture;
4. canonical public URL conventions and metadata primitives;
5. responsive desktop/tablet/mobile behavior;
6. reusable cards, data tables, metric blocks, status chips, callouts, tabs, controls, and evidence presentation patterns;
7. loading, empty, unavailable, error, stale-data, gated, and correction states;
8. public-versus-member visual language without making client-side hiding an authorization mechanism;
9. accessible keyboard/focus/contrast/landmark behavior;
10. browser/component accessibility testing appropriate to interactive UI;
11. stable Daily Line terminology for probability, market comparison, edge, confidence, Recommendation Gate, publication time, and settlement;
12. crawlable semantic HTML and textual interpretation for evidence/tables/charts where public;
13. public templates that remain useful without opaque client-only rendering;
14. a coherent visual relationship between the editorial public site and the member command center.

W1 does **not** implement fake live data, fake picks, fake performance, fake access states, or direct connections to mutable sport databases.

## W1 freeze prerequisites

W1 will not freeze merely because the pages look polished. Freeze requires:

- formal token/design-system documentation;
- implemented reusable primitives;
- responsive public shell and navigation;
- semantic/canonical/metadata primitives;
- accessibility checks beyond W0 source smoke tests;
- representative loading/empty/error/gated states;
- tests and CI proof;
- development-log updates;
- no regression against W0 architecture invariants.

## Cross-gate dependencies

W4 cannot freeze until the website contract has real compatibility fixtures from Daily-MLB, Daily-NFL, and Daily-NCAAF. The website can build the consumer architecture now, but the publication contract must be proven in both producer and consumer repositories before launch.

ADR-0002 additionally requires W4 to preserve immutable fields needed for approved replayable public-safe evidence projections. Paid/licensed fields do not become public automatically; public projection remains a website product-policy decision.

W9 owns the dedicated crawler, sitemap, canonical, structured-data, content-taxonomy, internal-linking, referral-measurement, search-console/webmaster, benchmark-query, and current-provider-guidance validation pass. W12 owns final production crawl/index and private-surface protection proof.
