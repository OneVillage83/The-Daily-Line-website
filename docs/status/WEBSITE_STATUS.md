# Website Status

**Last updated:** 2026-09-02  
**Current gate:** W0 — Repository & engineering foundation  
**Freeze status:** NOT READY — LOCAL TOOLCHAIN PROOF PASSED; REPOSITORY/CI PROOF PENDING

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
- production build confirmed the dynamic sport routes are statically generated from the sport registry;
- first real build generated `package-lock.json` and applied Next.js TypeScript scaffold updates locally.

## Local validation evidence — 2026-08-31

Environment and commands reported by the maintainer:

- PowerShell 7.6.5;
- Node v24.11.1;
- `npm install` -> success, 359 packages audited, 0 vulnerabilities;
- `npm run typecheck` -> success;
- `npm run lint` -> success;
- `npm run build` -> success under Next.js 16.3.3 / Turbopack;
- static output generated successfully for the public home, dashboard, and all three initial sport pages.

This satisfies the local compile/type/lint/build checkpoint but does **not** freeze W0 because the generated lockfile and Next.js scaffold changes are not yet committed to repository authority and CI has not reproduced the proof from a clean checkout.

## Known local housekeeping item

The local build reported that Next.js found a `package-lock.json` at `E:\The-Daily-Line-Website\package-lock.json`, outside the actual Git repository at `E:\The-Daily-Line-Website\The-Daily-Line-website`.

That outer lockfile is not repository authority and should be removed if it is only the artifact created by the earlier accidental `npm` invocation from the parent directory. The authoritative lockfile is the one generated **inside** the Git repository.

Do not work around this local-path warning by changing production architecture unless the warning persists after the stray parent lockfile is removed.

## Remaining W0 work

1. commit/push the repository-local `package-lock.json`;
2. commit the exact `tsconfig.json` and `next-env.d.ts` changes produced by the successful Next.js build after reviewing their diff;
3. remove the stray parent-directory `package-lock.json` and re-run build once to confirm the Turbopack root warning disappears;
4. add automated CI using clean checkout + `npm ci` + typecheck + lint + build;
5. add formatting policy/tooling;
6. add unit/component test framework and first deterministic smoke tests;
7. define and implement the first accessibility smoke-test layer;
8. add dependency/security update policy, including how install-script warnings are reviewed rather than blindly approved;
9. add `CODEX_START_HERE.md` / agent handoff instructions before Codex is used for material implementation work;
10. reproduce the full proof in CI from the committed lockfile;
11. freeze W0 only after local + clean CI evidence agree.

## Next architecture pass after W0 proof

**W1 — Design system & public shell**

W1 should formalize tokens, typography, responsive behavior, accessibility, navigation, public information architecture, reusable cards/tables/data-density modes, loading/empty/error states, and the visual relationship between public editorial pages and the member command center.

## Important dependency with sport repos

W4 cannot freeze until the website contract has real compatibility fixtures from Daily-MLB, Daily-NFL, and Daily-NCAAF. The website can build the consumer architecture now, but the contract must be proven in both producer and consumer repositories before launch.
