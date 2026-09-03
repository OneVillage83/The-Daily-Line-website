# Website Status

**Last updated:** 2026-09-03 PDT  
**Current gate:** W1 — Design system, semantic public shell & discoverability prerequisites  
**W1 freeze status:** NOT READY — ANALYTICAL UI + RENDERED VERIFICATION PASSED CI  
**Latest W1 checkpoint commit:** `0ef7aa943ffede0c8e232f695994e96e59fe0f00`  
**Latest W1 checkpoint CI:** GitHub Actions CI #66 / run `33735782096` — SUCCESS  
**W0 freeze status:** FROZEN  
**W0 evidence commit:** `c0bd7fa9bc48e96d4c8b7a12ccd68f2b2aec8084`  
**W0 freeze record:** `docs/status/W0_FREEZE_2026-09-02.md`

## W0 foundation

W0 — Repository & engineering foundation remains formally frozen. Preserve its invariants unless a later documented architecture decision intentionally supersedes them.

Frozen W0 guarantees include:

- Next.js 16.3.3 / React 19.2.8 / Node 24 baseline;
- strict TypeScript and Tailwind 4 scaffold;
- repository-local lockfile authority;
- clean-checkout CI using `npm ci`;
- audit, format, typecheck, lint, test, and production-build gates;
- sealed immutable publication boundary;
- no direct website coupling to mutable Daily sport working databases;
- server-side authorization principle;
- no fabricated picks, records, performance, subscriber counts, or entitlement state;
- dependency/supply-chain policy and Dependabot;
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

## W1 completed design-system/public-shell work

### Architecture authority

W1 now has two dedicated interface architecture documents:

- `docs/architecture/DESIGN_SYSTEM_V1.md` — brand, tokens, typography, density, layout, responsive, accessibility, state, navigation, metadata, public/member visual language, and freeze criteria;
- `docs/architecture/ANALYTICAL_UI_CONTRACT_V1.md` — analytical metric, evidence, table, state, authorization-separation, freshness, correction, and sport-native presentation rules.

### Design tokens / global shell

`src/app/globals.css` provides reusable semantic tokens and shell behavior for:

- background/surface/text/border/brand/state roles;
- sans and monospace roles;
- spacing/radius/elevation/width roles;
- visible `:focus-visible` treatment;
- global skip link;
- mobile-preserved public navigation;
- reduced-motion support;
- reusable editorial/public/member patterns.

### Stable information architecture

Current stable routes include:

- `/`;
- `/sports`;
- `/sports/{sport}`;
- `/methodology`;
- `/performance`;
- `/membership`;
- `/dashboard` as member entry;
- branded semantic 404 handling.

Homepage, dashboard, sport shells, methodology, performance, membership, and sports index use shared W1 primitives.

### Metadata / discoverability prerequisites

`src/lib/site.ts` centralizes:

- site identity;
- metadata base;
- canonical URLs;
- Open Graph basics;
- robots/indexing intent.

Conservative current indexability policy:

- substantive public architecture pages may be indexable;
- `/performance` remains `noindex` until W8 produces settlement-backed authority;
- `/dashboard` remains `noindex`;
- sport pages remain `noindex` while publication-empty.

## W1 analytical UI checkpoint — completed

The analytical layer now explicitly separates:

1. sports/domain state;
2. interface/data-delivery state;
3. server authorization state.

This prevents later mistakes such as treating PASS as generic success, AVOID as generic error, gated rendering as authorization, or corrected data as a silent overwrite.

### Reusable analytical primitives

Implemented:

- `MetricBlock` — compact metric/value/context presentation with tabular-numeral behavior;
- `EvidencePanel` — semantic `dl`/`dt`/`dd` publication/provenance slots;
- `DataTable` — captioned semantic table, source-level row/column header contracts, focusable horizontal overflow, explicit empty rows, and narrow-screen information preservation;
- `DataStatePanel` — controlled loading/empty/unavailable/stale/gated/error/corrected states.

### Controlled data-state system

W1 now implements explicit UI states for:

- loading;
- empty;
- unavailable;
- stale;
- gated;
- error;
- corrected.

Every state exposes textual meaning and a non-color marker. Loading uses structural skeletons instead of plausible numbers and honors `prefers-reduced-motion`.

### Analytical responsive styling

`src/app/w1-analytics.css` provides:

- four/two/one-column metric density progression;
- three/two/one-column state progression;
- stacked evidence rows on narrow screens;
- non-destructive horizontally scrollable data tables;
- tabular numerals;
- explicit focus treatment;
- reduced-motion-safe loading skeletons.

### Performance-shell demonstration policy

`/performance` remains `noindex` and contains no fabricated performance record.

It demonstrates the W1 contract only with explicit non-values such as:

- `Not published`;
- `Not available`;
- `Awaiting sealed publication`;
- a defined performance table with zero rows.

No fake win rate, ROI, odds, probabilities, records, or settlement data were introduced.

## W1 test authority

### Source/contract tests

The Node test suite verifies:

- controlled W1 data-state coverage;
- loading `aria-busy` behavior;
- semantic table/caption/column/row header source contracts;
- focusable table overflow;
- evidence definition-list semantics;
- tabular-numeral styling;
- reduced-motion loading behavior;
- non-fabricated Performance-shell examples;
- metadata/indexability/public-route/W0 boundary contracts.

GitHub Actions CI #56 / run `33735201562` passed on source-contract checkpoint `ad9592861da261ab6e0bc07ea3819106872d0962`.

### Rendered production verification

Added `scripts/check-rendered-pages.mjs` and `npm run test:rendered`.

The script starts the **built production Next.js server directly under Node** and verifies actual HTTP-rendered output for:

- document language;
- skip-link/main-landmark pairing;
- primary navigation and stable IA links;
- canonical URLs;
- index/noindex policy;
- route rendering;
- rendered analytical table/caption/column-header semantics;
- keyboard-focusable table overflow region;
- rendered loading `aria-busy` state;
- no fabricated percentage metrics on Performance;
- HTTP 404 behavior and branded not-found content.

`npm run verify` now includes `npm run test:rendered` after the production build. CI also runs a dedicated post-build rendered verification step.

### Clean rendered CI proof

GitHub Actions CI #66 / run `33735782096` completed successfully on commit:

`0ef7aa943ffede0c8e232f695994e96e59fe0f00`

Every repository-verification step passed:

1. checkout;
2. Node setup;
3. locked dependency install;
4. high/critical audit gate;
5. repository format check;
6. TypeScript;
7. ESLint;
8. Node tests;
9. production Next.js build;
10. rendered production-page verification.

This gives W1 clean-checkout proof that the built server emits the expected semantic/indexability/navigation behavior.

## CI job naming

The GitHub Actions job is gate-neutral **Repository verification** rather than the obsolete W0-specific label.

## Remaining W1 work

W1 is **not** frozen yet. Remaining work is now primarily rendered/manual validation and final freeze proof:

1. perform desktop/tablet/mobile rendered visual review of the public shell and analytical primitives;
2. verify keyboard focus order, focus visibility, touch targets, overflow usability, and contrast against the actual rendered UI;
3. document the explicit decision on whether the present mostly-static W1 shell requires an additional browser-engine automation dependency before freeze, or whether current source + production-rendered integration coverage plus manual browser proof is proportionate;
4. correct any defects found by that rendered/manual review;
5. run final local `npm ci`, `npm audit --audit-level=high`, and `npm run verify` from the maintainer checkout;
6. confirm clean local Git status and no generated-authority drift;
7. obtain clean CI on the final W1 candidate commit;
8. perform formal W1 freeze review and create a durable W1 freeze record.

W1 will not freeze merely because the pages look polished or because source tests pass.

## Cross-gate dependencies

W2 owns real identity/session/account behavior. W3 owns verified commerce/entitlement integration. W1 may design those states but must not simulate them as authoritative.

W4 cannot freeze until the website contract has real compatibility fixtures from Daily-MLB, Daily-NFL, and Daily-NCAAF. The website may build consumer-facing visual slots now, but must not guess/freeze producer fields to make the UI convenient.

ADR-0002 additionally requires W4 to preserve immutable fields needed for approved replayable public-safe evidence projections. Paid/licensed fields do not become public automatically; public projection remains a website product-policy decision.

W9 owns the dedicated crawler, sitemap, canonical, structured-data, content-taxonomy, internal-linking, referral-measurement, search-console/webmaster, benchmark-query, and current-provider-guidance validation pass. W12 owns final production crawl/index and private-surface protection proof.
