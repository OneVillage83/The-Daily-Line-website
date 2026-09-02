# Website Status

**Last updated:** 2026-09-02  
**Current gate:** W0 — Repository & engineering foundation  
**Freeze status:** NOT READY — LOCAL PROOF PASSED; CI/TOOLCHAIN CLEANUP IN PROGRESS

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
- environment-variable contract stubbed without secrets;
- documentation/development logging policy established;
- local dependency installation completed under Node v24.11.1;
- local install reported 0 vulnerabilities;
- local `npm run typecheck` passed;
- local `npm run lint` passed;
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
- install-script warnings are explicitly governed by review policy rather than blanket approval.

## Local validation evidence — 2026-08-31

Environment and commands reported by the maintainer:

- PowerShell 7.6.5;
- Node v24.11.1;
- `npm install` -> success, 359 packages audited, 0 vulnerabilities;
- `npm run typecheck` -> success;
- `npm run lint` -> success;
- `npm run build` -> success under Next.js 16.3.3 / Turbopack;
- static output generated successfully for the public home, dashboard, and all three initial sport pages.

This satisfies the local compile/type/lint/build checkpoint.

## Current W0 blockers

### 1. Clean CI proof

The complete GitHub Actions verification workflow must finish successfully on `main` from the committed lockfile. The workflow intentionally runs:

1. `npm ci`;
2. `npm audit --audit-level=high`;
3. `npm run format:check`;
4. `npm run typecheck`;
5. `npm run lint`;
6. `npm test`;
7. `npm run build`.

A workflow file existing is not considered CI proof.

### 2. ESLint supported-major migration

The first local install resolved ESLint 9.39.5. ESLint 9 reached upstream end-of-life on 2026-08-06. Although the current lint gate passes, W0 should not formally freeze on an unsupported direct toolchain major.

Preferred resolution: migrate to a supported ESLint 10 release, regenerate the lockfile, and reproduce lint + full verification locally and in CI. A temporary exception is possible only if compatibility prevents migration and must have an explicit expiry date.

### 3. Parent-directory Turbopack warning confirmation

The original local build found a stray `E:\The-Daily-Line-Website\package-lock.json` outside the actual repository. The repository-local lockfile is now authoritative, but W0 should record one clean local build after the stray parent lockfile is removed to prove the Turbopack root warning is gone.

Do not change production architecture merely to suppress a warning caused by a local parent-directory artifact.

## W0 test-layer scope

The current repository contains mostly static shell code and no authenticated/interactive production flows. W0 therefore uses Node's built-in test runner for deterministic repository, boundary, and source-accessibility smoke tests without introducing a second test dependency solely for scaffold coverage.

W1 must add browser/component accessibility testing appropriate to real interactive UI before the design system/public shell gate is frozen.

## Remaining W0 work

1. obtain a successful clean GitHub Actions run on `main`;
2. migrate ESLint 9 -> supported ESLint 10 and update `package-lock.json`;
3. re-run the complete local verification command set after the ESLint migration;
4. confirm the stray parent-lockfile Turbopack warning is gone on a clean local build;
5. reproduce the post-migration proof in CI;
6. perform W0 freeze review and record the exact evidence/commit SHA.

## Next architecture pass after W0 proof

**W1 — Design system & public shell**

W1 should formalize tokens, typography, responsive behavior, accessibility, navigation, public information architecture, reusable cards/tables/data-density modes, loading/empty/error states, and the visual relationship between public editorial pages and the member command center.

## Important dependency with sport repos

W4 cannot freeze until the website contract has real compatibility fixtures from Daily-MLB, Daily-NFL, and Daily-NCAAF. The website can build the consumer architecture now, but the contract must be proven in both producer and consumer repositories before launch.
