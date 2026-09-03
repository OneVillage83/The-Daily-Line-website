# Development Log

Material repository changes are logged here in chronological order. Architecture decisions that constrain future work also receive an ADR.

## 2026-09-03 — W1 analytical UI + rendered production verification checkpoint

### Scope completed

Continued W1 from the first design-system/public-shell checkpoint and implemented the reusable analytical presentation layer required before Daily-MLB, Daily-NFL, and Daily-NCAAF publications are connected.

The work deliberately defines interface roles without inventing backend values or prematurely freezing W4/W8 semantics.

### Analytical architecture authority

Added `docs/architecture/ANALYTICAL_UI_CONTRACT_V1.md`.

The contract separates three categories that must not be conflated:

1. sports/domain state;
2. interface/data-delivery state;
3. server authorization state.

Explicit decisions:

- PASS is not generic green success UI;
- AVOID is not generic red error UI;
- gated rendering is explanatory only and is not authorization;
- empty and unavailable are distinct states;
- stale content must not silently appear current;
- corrected content is a provenance/version state rather than a silent overwrite or generic failure;
- shared presentation primitives must preserve sport-native semantics instead of forcing false equivalence.

### New reusable primitives

Added:

- `src/components/metric-block.tsx`;
- `src/components/evidence-panel.tsx`;
- `src/components/data-table.tsx`;
- `src/components/data-state-panel.tsx`.

`MetricBlock` provides compact analytical metric/value/context presentation with tabular-numeral styling.

`EvidencePanel` uses semantic `dl` / `dt` / `dd` structure for publication time, cutoff, version, correction, replay/provenance, and later settlement slots.

`DataTable` provides:

- semantic `table` structure;
- caption support;
- `thead` / `tbody`;
- column-header `scope="col"` source contract;
- row-header `scope="row"` source contract for populated rows;
- focusable horizontal overflow region;
- column descriptions;
- explicit empty-row behavior;
- information-preserving narrow-screen behavior rather than deleting critical columns.

`DataStatePanel` defines controlled states for:

- loading;
- empty;
- unavailable;
- stale;
- gated;
- error;
- corrected.

Every state includes textual meaning plus a non-color marker. Loading uses structural skeletons rather than plausible sports numbers.

### Analytical styling

Added `src/app/w1-analytics.css` and loaded it from the root layout.

Implemented:

- metric grid scaling from four columns to two to one;
- state grid scaling from three columns to two to one;
- stacked evidence rows on compact layouts;
- horizontally scrollable/focusable analytical tables;
- tabular numerals;
- explicit analytical focus behavior;
- reduced-motion-safe loading skeletons.

The skeleton animation becomes static under `prefers-reduced-motion`.

### Performance-shell contract demonstration

Refactored `/performance` to exercise W1 analytical primitives while preserving the no-fabricated-data rule.

The page remains `noindex` and uses only explicit non-values such as:

- `Not published`;
- `Not available`;
- `Awaiting sealed publication`;
- an empty performance ledger with defined columns and zero rows.

No fake probabilities, odds, win rates, ROI, records, settlement outcomes, or historical claims were introduced.

The page now demonstrates:

- analytical metric slots;
- evidence/provenance slots;
- table semantics;
- loading/empty/unavailable/stale/gated/error/corrected state patterns.

### Source-contract test expansion

Added `test/w1-analytical-primitives.test.mjs`.

The test suite now checks:

- all controlled W1 data states exist;
- loading exposes `aria-busy`;
- data-table semantic structure exists;
- table overflow is keyboard focusable;
- evidence uses definition-list semantics;
- analytical numeric styling uses tabular numerals;
- loading skeletons honor reduced motion;
- Performance exercises the state contracts without fabricated percentage/ROI data.

GitHub Actions CI #56 / run `33735201562` passed on commit:

`ad9592861da261ab6e0bc07ea3819106872d0962`

### Production-rendered integration verification

Added `scripts/check-rendered-pages.mjs` and `npm run test:rendered`.

The test launches the built Next.js production server directly with Node and inspects actual HTTP-rendered output rather than only source text.

It verifies:

- `<html lang="en">` output;
- skip-link to `#main-content` pairing;
- main landmark target;
- labeled primary navigation;
- stable navigation links;
- canonical URLs;
- index/noindex policy;
- public/member-adjacent route HTTP success;
- rendered analytical table and caption;
- rendered column-header semantics;
- keyboard-focusable table overflow region;
- rendered loading `aria-busy` state;
- absence of fabricated percentage metrics on Performance;
- HTTP 404 status and branded not-found content.

`npm run verify` now runs:

1. repository format check;
2. TypeScript;
3. ESLint;
4. Node tests;
5. production Next.js build;
6. rendered production-page verification.

CI now includes a dedicated `Verify rendered production pages` step after the build.

The server harness was adjusted to launch Next directly under `process.execPath` rather than via `npm run start`, avoiding unnecessary child-process/orphan behavior and improving Windows/Linux parity.

### CI proof

GitHub Actions CI #66 / run `33735782096` completed successfully on commit:

`0ef7aa943ffede0c8e232f695994e96e59fe0f00`

Every repository-verification step passed:

- checkout;
- Node setup;
- `npm ci`;
- high/critical dependency audit;
- repository formatting;
- TypeScript;
- ESLint;
- Node tests;
- production Next.js build;
- rendered production-page verification.

### Agent/CI handoff updates

Updated `CODEX_START_HERE.md` so agents must read the design-system and analytical-UI architecture and must run `npm run test:rendered` as part of verification.

The CI job name is now gate-neutral `Repository verification` rather than the obsolete `W0 verification` label.

### Gate decision

W1 remains **NOT READY** for freeze.

The major implementation work is now present. Remaining W1 work is primarily actual rendered/manual proof:

- desktop/tablet/mobile visual review;
- keyboard focus-order and focus-visibility review;
- touch-target review;
- table overflow usability review;
- contrast review against rendered UI;
- explicit decision on whether a browser-engine automation dependency is proportionate for the current mostly-static W1 shell;
- final maintainer-local `npm ci`, audit, full `npm run verify`, and clean Git status;
- final clean CI candidate;
- W1 freeze record.

## 2026-09-02 — W1 design system / semantic public shell checkpoint

### Design-system authority

Added `docs/architecture/DESIGN_SYSTEM_V1.md` to define W1 as a reusable product-system pass rather than one-off page styling.

The design system documents:

- modern sports-intelligence publication + professional analysis-terminal visual thesis;
- brand yellow versus semantic-state color roles;
- typography, spacing, density, layout, responsive, and motion rules;
- reusable shell/navigation/action/status/card/table/evidence patterns;
- loading, empty, unavailable, stale, gated, error, and correction requirements;
- visible focus, keyboard use, reduced motion, touch targets, non-color status cues, and future browser/component coverage;
- stable public URL, canonical, metadata, and conservative indexability policy;
- stable terminology for model probability, market/implied probability, Recommendation Gate, publication time, data cutoff, settlement, and corrections.

### Implemented W1 primitives

Added/refactored:

- semantic CSS token layer in `src/app/globals.css`;
- global skip link and `#main-content` targets;
- visible `:focus-visible` styling;
- reduced-motion handling;
- responsive public navigation preserved on compact/mobile layouts;
- `SiteFooter`;
- `PageHeader`;
- semantic `StatusChip` variants;
- reusable `EmptyState`;
- `SportCard` onto the shared status system;
- central `src/lib/site.ts` metadata helper.

### Stable public information architecture

Added stable routes:

- `/sports`;
- `/methodology`;
- `/performance`;
- `/membership`.

Also added branded 404 handling and refactored homepage, dashboard, and dynamic sport pages onto the shared W1 shell.

No invented model formulas, pricing, performance, picks, subscriber data, or access state were added.

### Discoverability/indexability behavior

The metadata helper centralizes canonical URLs, Open Graph basics, and robots intent.

Conservative policy:

- `/performance` is `noindex` until W8 produces settlement-backed authority;
- `/dashboard` is `noindex`;
- dynamic sport pages are `noindex` while publication-empty;
- substantive public architecture pages may remain indexable.

### Test expansion

Expanded Node source/contract tests for:

- skip-link/main pairing;
- semantic primary navigation;
- stable public IA;
- focus-visible and reduced-motion CSS;
- major W1 public surfaces;
- canonical/Open Graph/robots primitives;
- noindex policy;
- preserved W0 Node/runtime/sport-registry/no-direct-SQLite boundaries.

The first full W1 refactor run failed on two `react/no-unescaped-entities` lint errors in Membership and Methodology copy. The rule was not disabled; the two lines were corrected.

GitHub Actions CI #45 / run `33724238548` then completed successfully on commit:

`5def4cf820d197ca4ad263c2c4603b944e6dd253`

### Gate decision

W1 remained open for analytical primitives, rendered accessibility/integration proof, responsive review, and final freeze evidence.

## 2026-09-02 — W0 formally frozen; W1 activated

### Final local reproduction

After the unsuccessful ESLint 10 experiment, the maintainer restored `package.json` and `package-lock.json` to repository authority, pulled `main`, and ran the final W0 reproduction on the exact committed graph.

Evidence:

- `npm ci` passed under Node v24.11.1;
- `npm audit --audit-level=high` reported 0 vulnerabilities;
- `npm ls` confirmed `eslint@9.39.5`, `eslint-config-next@16.3.3`, `eslint-plugin-react@7.37.5`;
- `npm run verify` passed end to end;
- repository format checks passed;
- TypeScript passed;
- ESLint passed;
- Node tests passed 9/9;
- production Next.js build passed;
- the parent-directory Turbopack warning was absent;
- `git status` was clean and up to date with `origin/main`.

### Matching CI proof

GitHub Actions CI #18 / run `33722166331` completed successfully on exact evidence commit:

`c0bd7fa9bc48e96d4c8b7a12ccd68f2b2aec8084`

### Freeze decision

W0 — Repository & engineering foundation was formally **FROZEN**.

Added `docs/status/W0_FREEZE_2026-09-02.md` containing the evidence commit/run, local reproduction, ESLint compatibility exception, frozen capabilities, deferred work, and W1 handoff.

## 2026-09-02 23:05 PDT — W0 CI passed; ESLint 10 compatibility exception recorded

### CI evidence

A clean GitHub Actions run passed from the committed lockfile after W0 hardening.

### ESLint 10 migration attempt

The maintainer tested `eslint@10.9.0` instead of leaving the support warning uninvestigated.

Results:

- npm emitted peer-resolution override warnings;
- audit still reported 0 vulnerabilities;
- formatting and TypeScript passed;
- all 9 Node smoke tests passed;
- production build passed;
- lint failed inside `eslint-plugin-react` while loading `react/display-name` because the plugin used a pre-ESLint-10 rule-context API.

Decision:

- retain the ESLint 9-compatible stack temporarily;
- do not use `--force`, `--legacy-peer-deps`, or an unproven shim;
- treat it as a dev-tooling compatibility exception, not a production runtime exception;
- keep Dependabot enabled;
- re-evaluate when the Next.js/React lint chain is verified ESLint-10-compatible and at minimum before W12 freeze.

## 2026-09-02 16:28 PDT — SEO + GEO/AEO discoverability architecture added

### Architecture decision

SEO plus generative/answer-engine discoverability became a first-class cross-cutting website architecture requirement rather than post-launch marketing cleanup.

Added:

- `docs/architecture/SEO_GEO_DISCOVERABILITY_V1.md`;
- `docs/decisions/ADR-0002-discoverability-is-core-architecture.md`.

### Strategy

The website will pursue discoverability through useful primary-source Daily Line material, semantic/crawlable HTML, stable URLs, metadata, internal linking, and reproducible evidence rather than speculative LLM-ranking tricks.

Explicitly rejected:

- machine-only doorway pages;
- keyword stuffing;
- mass-generated query permutations;
- fabricated reviews/citations/ratings/performance;
- publishing licensed/member data solely for crawler access;
- assuming `llms.txt` or another AI-specific file is ranking-authoritative without evidence;
- treating search-discovery crawler controls and model-training controls as the same policy.

### Cross-gate ownership

- W1: semantic public IA, metadata/canonical primitives, evidence presentation prerequisites;
- W4: immutable fields needed for replayable public-safe projections;
- W5/W6: stable metric/entity terminology;
- W7: canonical/indexing and HTML companion strategy for artifacts;
- W8: settlement/performance semantics before broad public claims;
- W9: dedicated SEO/GEO/AEO implementation and measurement;
- W12: production crawl/index and private-surface protection proof.

Current provider guidance was checked during this architecture pass, but W9/W12 must revalidate it because external behavior changes.

## 2026-09-02 — W0 repository/CI hardening

### Repository authority

Committed:

- repository-local `package-lock.json`;
- Next.js-generated `tsconfig.json` changes;
- refreshed `next-env.d.ts`.

### Verification infrastructure

Added:

- `npm test`;
- `npm run format:check`;
- aggregate `npm run verify`;
- dependency-free repository-format checks;
- Node 24 smoke tests;
- source accessibility checks;
- GitHub Actions CI with exact Node v24.11.1;
- `npm ci`, audit, format, TypeScript, ESLint, tests, and production build gates;
- immutable GitHub Action SHA pins;
- weekly Dependabot proposals.

### Documentation/agent operations

Added:

- `CODEX_START_HERE.md`;
- dependency/supply-chain security policy;
- install-script review policy rather than blanket approval.

W0 remained open until clean CI, parent-lock warning resolution, and the ESLint-major migration/exception review were completed.

## 2026-09-02 — W0 local proof recorded

The maintainer reported:

- PowerShell 7.6.5;
- Node v24.11.1;
- successful dependency installation;
- 0 vulnerabilities;
- passing typecheck;
- passing lint;
- passing production build;
- generated home/dashboard/MLB/NFL/NCAAF routes.

The first build also exposed a stray parent-directory `package-lock.json`; later builds confirmed that warning was gone after the stray artifact was absent.

## 2026-08-31 — W0 repository initialization

### Added

- initial README and production architecture charter;
- Next.js/React/TypeScript scaffold;
- dark editorial/data-terminal visual direction with yellow brand accent;
- homepage;
- dashboard shell;
- Daily-MLB, Daily-NFL, Daily-NCAAF registry and preview routes;
- website architecture V1;
- Publication Contract V1 draft;
- ADR-0001 sealed publication boundary;
- W0 status/freeze checklist;
- environment example and no-secret rule.

### Initial decisions

- website is the primary product surface;
- Whop remains initial commerce/membership authority projected into website entitlements;
- website identity remains separate from commerce identity;
- paid authorization is server-side;
- sport pipelines publish sealed artifacts rather than exposing mutable databases;
- initial UI does not fabricate picks, performance, or entitlements.

Initial repository creation had not yet been locally installed/built; subsequent W0 checkpoints recorded that proof.
