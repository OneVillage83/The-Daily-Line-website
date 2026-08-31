# Website Status

**Last updated:** 2026-08-31  
**Current gate:** W0 — Repository & engineering foundation  
**Freeze status:** NOT READY

## Completed in this pass

- repository initialized;
- production architecture charter established;
- current baseline runtime selected: Next.js 16.3.3 / React 19.2.8 / Node 24 LTS;
- strict TypeScript application scaffold added;
- Tailwind 4 CSS pipeline configured;
- public homepage shell added;
- dashboard shell added without fake authentication/entitlements;
- sport registry added for Daily-MLB, Daily-NFL, Daily-NCAAF;
- dynamic sport preview routes added;
- Publication Contract V1 draft added;
- ADR-0001 accepted for sealed publication boundary;
- environment-variable contract stubbed without secrets;
- documentation/development logging policy established.

## Remaining W0 work

1. generate and commit lockfile using Node 24 LTS;
2. install dependencies and run `npm run typecheck`, `npm run lint`, and `npm run build`;
3. correct any scaffold/version-specific issues found by the real toolchain;
4. add automated CI with pinned dependency installation;
5. add formatting policy/tooling;
6. add unit/component test framework and first smoke tests;
7. add accessibility smoke tooling strategy;
8. add security/dependency update policy;
9. add `CODEX_START_HERE.md` / agent handoff instructions if Codex becomes part of this repo workflow;
10. freeze W0 only after a clean local + CI proof exists.

## Next architecture pass after W0 proof

**W1 — Design system & public shell**

W1 should formalize tokens, typography, responsive behavior, accessibility, navigation, public information architecture, reusable cards/tables/data-density modes, loading/empty/error states, and the visual relationship between public editorial pages and the member command center.

## Important dependency with sport repos

W4 cannot freeze until the website contract has real compatibility fixtures from Daily-MLB, Daily-NFL, and Daily-NCAAF. The website can build the consumer architecture now, but the contract must be proven in both producer and consumer repositories before launch.
