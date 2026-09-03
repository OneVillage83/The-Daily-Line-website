# Website Status

**Last updated:** 2026-09-02 23:05 PDT  
**Current gate:** W0 — Repository & engineering foundation  
**Freeze status:** NOT READY — CLEAN CI PASSED; FINAL LOCAL REPRODUCTION PENDING

## Completed

- repository initialized;
- production architecture charter established;
- baseline runtime selected: Next.js 16.3.3 / React 19.2.8 / Node 24 LTS;
- strict TypeScript application scaffold added;
- Tailwind 4 CSS pipeline configured;
- public homepage shell added;
- dashboard shell added without fake authentication/entitlements;
- sport registry added for Daily-MLB, Daily-NFL, Daily-NCAAF;
- dynamic sport preview routes added;
- Publication Contract V1 draft added;
- ADR-0001 accepted for sealed publication boundary;
- SEO + GEO/AEO discoverability architecture V1 added;
- ADR-0002 accepted: discoverability is a cross-cutting core architecture requirement rather than post-launch marketing cleanup;
- W1/W4/W7/W8/W9/W12 responsibilities updated so crawlability, public-safe evidence, reproducible performance, canonical artifact strategy, dedicated discoverability implementation, and launch crawl/index proof are carried by the correct gates;
- explicit policy added that public search/AI discoverability cannot bypass member entitlements/licensing;
- explicit policy added to prioritize unique primary-source evidence and human usefulness over doorway pages, mass query permutations, fabricated authority, or speculative LLM-specific hacks;
- explicit policy added to separate provider search-discovery crawler controls from provider model-training crawler controls where applicable;
- `llms.txt` or similar AI-specific files are not treated as required/ranking-authoritative without later evidence review;
- environment-variable contract stubbed without secrets;
- documentation/development logging policy established;
- local dependency installation completed under Node v24.11.1;
- local install reported 0 vulnerabilities;
- local `npm run typecheck` passed;
- local `npm run lint` passed on the committed ESLint 9/Next.js 16.3.3-compatible stack;
- local `npm run build` passed and produced `/`, `/dashboard`, `/sports/mlb`, `/sports/nfl`, and `/sports/ncaaf` plus framework routes;
- production build confirmed dynamic sport routes are statically generated from the sport registry;
- repository-local `package-lock.json` committed as dependency-resolution authority;
- exact Next.js-generated `tsconfig.json` and `next-env.d.ts` changes committed;
- dependency-free repository formatting gate added;
- Node 24 built-in test runner added as the W0 deterministic test baseline;
- repository-contract smoke tests added, including a guard against direct SQLite pipeline coupling;
- source-level accessibility smoke tests added for document language, navigation labeling, landmarks, brand-link naming, and empty-hash links;
- GitHub Actions CI added with immutable action SHA pins, exact Node 24.11.1, `npm ci`, audit, format, typecheck, lint, tests, and production build;
- Dependabot added for weekly npm and GitHub Actions update proposals;
- dependency/supply-chain security policy added;
- Codex/agent handoff added in `CODEX_START_HERE.md`;
- install-script warnings are explicitly governed by review policy rather than blanket approval;
- clean GitHub Actions run #9 completed successfully on commit `af22c9cef6f98a238392d4d0de1b6a173311a506` using the committed lockfile;
- parent-directory stray lockfile was confirmed absent, and a subsequent production build completed without the earlier Turbopack root warning;
- ESLint 10 migration was tested locally and rejected because the current Next.js 16.3.3 lint dependency chain is not ESLint-10-compatible.

## Local validation evidence — 2026-08-31 / 2026-09-02

Environment and commands reported by the maintainer:

- PowerShell 7.6.5;
- Node v24.11.1;
- dependency installation succeeded;
- `npm audit --audit-level=high` -> 0 vulnerabilities;
- `npm run format:check` -> passed;
- `npm run typecheck` -> passed;
- `npm test` -> 9/9 passed;
- `npm run build` -> passed under Next.js 16.3.3 / Turbopack;
- production build after removal/absence of the stray parent lockfile produced no Turbopack root warning;
- ESLint 10.9.0 installation produced peer-resolution overrides and `npm run lint` failed in `eslint-plugin-react` with an ESLint 10 rule-context API incompatibility.

## Clean CI evidence

GitHub Actions CI run #9 on `main` / commit `af22c9cef6f98a238392d4d0de1b6a173311a506` completed successfully.

The workflow reproduced from a clean checkout:

1. `npm ci`;
2. `npm audit --audit-level=high`;
3. `npm run format:check`;
4. `npm run typecheck`;
5. `npm run lint`;
6. `npm test`;
7. `npm run build`.

This satisfies the clean-repository CI proof requirement for W0.

## ESLint compatibility exception

ESLint 9 reached upstream end-of-life on 2026-08-06. A migration to ESLint 10.9.0 was attempted rather than ignored.

The migration is currently blocked by the framework-recommended lint dependency chain:

- `eslint-config-next@16.3.3` declares ESLint `>=9.0.0`, but depends on `eslint-plugin-react`;
- the current `eslint-plugin-react` line advertises peer support through ESLint 9, not ESLint 10;
- the actual local ESLint 10 run failed while loading `react/display-name` because the plugin uses the pre-ESLint-10 rule-context API.

Decision for W0: retain the committed ESLint 9-compatible stack as a **temporary dev-tooling compatibility exception**. Do not use `--force`, `--legacy-peer-deps`, or compatibility shims solely to claim an ESLint 10 migration.

Risk controls:

- ESLint is development/build tooling, not a production runtime dependency;
- `npm audit --audit-level=high` reports 0 vulnerabilities on the current lockfile;
- Dependabot remains enabled so compatible Next.js / React lint-chain updates are surfaced;
- the exception must be re-evaluated when Next.js or `eslint-plugin-react` publishes a verified ESLint 10-compatible chain, and at minimum during the next dependency-maintenance pass before W12 launch freeze.

This compatibility exception is documented and is **not a W0 freeze blocker** by itself.

## W0 test-layer scope

The current repository contains mostly static shell code and no authenticated/interactive production flows. W0 therefore uses Node's built-in test runner for deterministic repository, boundary, and source-accessibility smoke tests without introducing a second test dependency solely for scaffold coverage.

W1 must add browser/component accessibility testing appropriate to real interactive UI before the design system/public shell gate is frozen.

## Remaining W0 work

1. restore the maintainer's local working tree from the unsuccessful ESLint 10 experiment to the committed `package.json` / `package-lock.json`;
2. run `npm ci` to reproduce the exact committed dependency graph locally;
3. run `npm audit --audit-level=high` and `npm run verify` locally on that exact graph;
4. confirm `git status` is clean;
5. perform W0 freeze review and record the exact evidence/commit SHA.

The accepted discoverability architecture does not add a new W0 freeze blocker because it is documentation/architecture authority for future gates. Implementation proof begins in W1 and is completed in the dedicated W9 pass plus W12 production validation.

## Next architecture pass after W0 proof

**W1 — Design system, semantic public shell & discoverability prerequisites**

W1 should formalize tokens, typography, responsive behavior, accessibility, navigation, public information architecture, reusable cards/tables/data-density modes, loading/empty/error states, and the visual relationship between public editorial pages and the member command center.

W1 must also formalize the discoverability prerequisites required by ADR-0002:

- semantic/crawlable public navigation and content hierarchy;
- canonical public URL conventions;
- metadata primitives;
- reusable evidence/table/chart patterns with textual interpretation;
- stable The Daily Line and Daily sport entity/metric terminology;
- public templates that remain useful in rendered HTML without depending on opaque client-only state.

W1 does not need to finish the entire SEO/GEO implementation; W9 owns the dedicated crawler, sitemap, canonical, structured-data, content-taxonomy, referral-measurement, and provider-validation pass.

## Important dependency with sport repos

W4 cannot freeze until the website contract has real compatibility fixtures from Daily-MLB, Daily-NFL, Daily-NCAAF. The website can build the consumer architecture now, but the contract must be proven in both producer and consumer repositories before launch.

ADR-0002 adds one further W4 requirement: producer/consumer contract design must preserve the immutable fields needed for an approved replayable public-safe evidence projection. This does not mean paid/licensed fields automatically become public; the public projection remains a website product-policy decision.
