# Website Status

**Last updated:** 2026-09-02 PDT  
**Current gate:** W1 — Design system, semantic public shell & discoverability prerequisites  
**W1 freeze status:** NOT READY — FIRST IMPLEMENTATION CHECKPOINT PASSED CI  
**Latest W1 checkpoint commit:** `5def4cf820d197ca4ad263c2c4603b944e6dd253`  
**Latest W1 checkpoint CI:** GitHub Actions CI #45 / run `33724238548` — SUCCESS  
**W0 freeze status:** FROZEN  
**W0 evidence commit:** `c0bd7fa9bc48e96d4c8b7a12ccd68f2b2aec8084`  
**W0 freeze record:** `docs/status/W0_FREEZE_2026-09-02.md`

## W0 foundation

W0 — Repository & engineering foundation is formally frozen. Its durable evidence package is `docs/status/W0_FREEZE_2026-09-02.md`.

Frozen W0 guarantees include:

- Next.js 16.3.3 / React 19.2.8 / Node 24 baseline;
- strict TypeScript and Tailwind 4 application scaffold;
- repository-local lockfile authority;
- clean-checkout GitHub Actions CI using `npm ci`;
- audit, format, typecheck, lint, test, and production-build gates;
- initial accessibility/source smoke tests;
- sealed immutable publication-boundary architecture;
- no direct website coupling to mutable Daily sport working databases;
- server-side authorization principle;
- no fabricated picks, records, performance, subscriber counts, or entitlement state;
- dependency/supply-chain review policy and Dependabot;
- documentation/development-log/agent handoff discipline;
- SEO + GEO/AEO discoverability as a cross-cutting architecture requirement.

## ESLint compatibility exception carried forward

The repository intentionally remains on `eslint@9.39.5` while the current Next.js 16.3.3 / React lint dependency chain remains incompatible with ESLint 10.

The project tested `eslint@10.9.0`; npm emitted peer-resolution overrides and lint failed inside `eslint-plugin-react` while loading `react/display-name`. Do not use `--force`, `--legacy-peer-deps`, or an unproven compatibility shim simply to claim ESLint 10 support.

Controls remain:

- lint and high/critical audit gating in CI;
- Dependabot enabled;
- re-evaluate when the framework/plugin chain has verified ESLint 10 compatibility;
- re-evaluate at minimum before W12 launch freeze.

This is a development-tooling compatibility exception, not a production-runtime exception and not a reopened W0 blocker.

## W1 first implementation checkpoint — completed

The first W1 pass has moved the repository from a page-specific visual scaffold toward a reusable product system.

### Design-system architecture

Added `docs/architecture/DESIGN_SYSTEM_V1.md` defining:

- product visual thesis: modern sports intelligence publication + professional analysis terminal;
- brand usage and Daily Line yellow role;
- semantic color tokens distinct from recommendation/result semantics;
- typography roles for editorial, analytical, tabular, metadata, status, and numeric content;
- 4px-derived spacing and responsive layout system;
- editorial vs analytical density modes;
- reusable shell/navigation/action/status/card/table/evidence patterns;
- loading, empty, unavailable, stale, gated, error, and correction-state requirements;
- keyboard/focus/reduced-motion/contrast/table accessibility requirements;
- restrained motion policy;
- stable public URL/indexability/metadata rules;
- public-vs-member visual relationship;
- stable product terminology;
- W1 implementation order and freeze criteria.

### Implemented design tokens and global interaction behavior

`src/app/globals.css` now contains reusable semantic tokens for:

- background/surface/text/border roles;
- brand/focus and semantic state colors;
- sans/monospace roles;
- spacing, radii, shadows, width, reading measure, and transitions.

It also implements:

- visible `:focus-visible` treatment;
- skip-link styling;
- responsive public navigation that remains available instead of hiding the public IA on mobile;
- reduced-motion handling;
- reusable button, status-chip, card, prose, definition-list, notice, empty-state, public-section, dashboard, and publication-preview patterns.

### Shared UI primitives

Added/refactored reusable primitives:

- `SiteHeader`;
- `SiteFooter`;
- `PageHeader`;
- `StatusChip` with brand/success/warning/danger/info/neutral tones;
- `EmptyState`;
- `SportCard` using the semantic status primitive.

The root layout now provides a global keyboard skip link to `#main-content`.

### Stable public information architecture

The public navigation now uses stable semantic routes:

- `/sports`;
- `/methodology`;
- `/performance`;
- `/membership`;
- `/dashboard` as the member-entry shell.

Added substantive public surfaces:

- `/sports` — initial sport index and shared publication rules;
- `/methodology` — point-in-time, prediction-vs-recommendation, sealed publication, market-context, correction, settlement, and terminology architecture;
- `/performance` — transparent no-fabricated-performance placeholder with settlement-backed reporting requirements;
- `/membership` — identity/commerce/entitlement architecture without invented pricing;
- branded semantic `not-found` state.

Homepage, dashboard, and dynamic sport routes were refactored onto the shared W1 shell/primitives.

### Metadata / discoverability prerequisites

Added `src/lib/site.ts` as central site and metadata authority for:

- site name/tagline/description;
- site URL resolution;
- canonical URLs;
- Open Graph basics;
- explicit robots/indexing intent.

Current indexability policy is conservative:

- substantive public architecture pages may be indexable;
- `/performance` is `noindex` until settlement-backed performance authority exists;
- `/dashboard` is `noindex`;
- current sport pages are `noindex` while they remain publication-empty shells.

This avoids manufacturing thin search surfaces or fake authority before the data contracts exist.

### W1 source-level test expansion

The Node test baseline now checks:

- root language;
- skip-link presence;
- labeled primary navigation;
- accessible brand link;
- stable public IA in semantic navigation;
- `#main-content` target across major surfaces;
- no empty hash links;
- focus-visible treatment;
- reduced-motion support;
- central canonical/Open Graph/robots metadata primitives;
- `noindex` policy for thin/private-adjacent surfaces;
- stable public route files;
- preserved W0 Node/runtime/sport-registry/no-SQLite contracts.

### CI evidence

The first post-refactor CI run correctly failed at lint because two JSX apostrophes violated `react/no-unescaped-entities`. The code was corrected rather than suppressing the rule.

GitHub Actions CI #45 / run `33724238548` then completed successfully on commit:

`5def4cf820d197ca4ad263c2c4603b944e6dd253`

The clean checkout passed install, audit, repository formatting, TypeScript, ESLint, tests, and production build.

## Remaining W1 work

W1 is **not** a freeze candidate yet. Remaining work includes:

1. implement a formal reusable data-state primitive/system for unavailable, stale, gated, error, and correction states beyond the existing empty/notice examples;
2. define reusable analytical metric/evidence/table primitives without inventing backend values or prematurely freezing W4 schemas;
3. add component/browser testing appropriate to interactive UI;
4. add browser-level accessibility automation and keyboard/focus verification rather than relying only on source inspection;
5. verify responsive behavior at representative desktop/tablet/mobile viewport sizes;
6. verify focus/contrast/touch-target behavior against the actual rendered UI;
7. refine public/member shell composition after real browser review;
8. update the CI job label from the historical `W0 verification` wording to a gate-neutral repository verification name;
9. run the full local W1 verification from the maintainer checkout after pulling the completed W1 pass;
10. obtain clean CI on the final W1 candidate commit;
11. perform a formal W1 freeze review and create a durable W1 freeze record.

W1 will not freeze merely because the pages look polished.

## Cross-gate dependencies

W2 owns real identity/session/account behavior. W3 owns verified commerce/entitlement integration. W1 may design those states but must not simulate them as authoritative.

W4 cannot freeze until the website contract has real compatibility fixtures from Daily-MLB, Daily-NFL, and Daily-NCAAF. The website may build consumer-facing visual slots now, but must not guess/freeze producer fields to make the UI convenient.

ADR-0002 additionally requires W4 to preserve immutable fields needed for approved replayable public-safe evidence projections. Paid/licensed fields do not become public automatically; public projection remains a website product-policy decision.

W9 owns the dedicated crawler, sitemap, canonical, structured-data, content-taxonomy, internal-linking, referral-measurement, search-console/webmaster, benchmark-query, and current-provider-guidance validation pass. W12 owns final production crawl/index and private-surface protection proof.
