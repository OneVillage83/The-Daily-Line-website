# Development Log

Material repository changes are logged here in chronological order. Architecture decisions that constrain future work also receive an ADR.

## 2026-09-02 — W0 formally frozen; W1 activated

### Final local reproduction

After the unsuccessful ESLint 10 experiment, the maintainer restored `package.json` and `package-lock.json` to repository authority, pulled `main`, and ran the final W0 reproduction on the exact committed dependency graph.

Evidence:

- `npm ci` completed successfully under Node v24.11.1;
- `npm audit --audit-level=high` reported 0 vulnerabilities;
- `npm ls` confirmed the committed lint graph: `eslint@9.39.5`, `eslint-config-next@16.3.3`, `eslint-plugin-react@7.37.5`;
- `npm run verify` passed end to end;
- repository format checks passed for 31 text files;
- TypeScript passed;
- ESLint passed on the committed compatible stack;
- Node tests passed 9/9;
- production Next.js build passed and generated `/`, `/dashboard`, `/sports/mlb`, `/sports/nfl`, and `/sports/ncaaf` plus framework routes;
- the previous parent-directory Turbopack root warning was absent;
- final `git status` reported `nothing to commit, working tree clean` and the branch up to date with `origin/main`.

### Matching CI proof

GitHub Actions CI #18 / run `33722166331` completed successfully on exact evidence commit:

`c0bd7fa9bc48e96d4c8b7a12ccd68f2b2aec8084`

This gives W0 matching local and clean-checkout CI proof on the same committed repository state.

### Freeze decision

W0 — Repository & engineering foundation is **FROZEN**.

Added `docs/status/W0_FREEZE_2026-09-02.md` as the durable freeze record containing:

- exact evidence commit and CI run;
- local reproduction evidence;
- ESLint 10 compatibility exception;
- frozen W0 capabilities;
- deliberately deferred later-gate work;
- W1 handoff constraints.

Updated `docs/status/WEBSITE_STATUS.md` to make W1 the active gate.

### W1 handoff

W1 — Design system, semantic public shell & discoverability prerequisites is now active.

W1 inherits all W0 invariants, especially the sealed publication boundary, no-direct-pipeline-database rule, server-side authorization principle, no-fabricated-data rule, immutable evidence/replay direction, CI requirements, and documentation discipline.

W1 must add the complete reusable design-system/public-shell layer, responsive behavior, semantic/canonical/metadata primitives, representative application states, and browser/component accessibility coverage before its own freeze review.

## 2026-09-02 23:05 PDT — W0 CI passed; ESLint 10 compatibility exception recorded

### CI evidence

GitHub Actions CI run #9 completed successfully on `main` at commit `af22c9cef6f98a238392d4d0de1b6a173311a506` from a clean checkout using the committed lockfile. The workflow passed `npm ci`, high/critical audit gating, format checks, TypeScript, ESLint, Node smoke tests, and the production Next.js build.

### ESLint 10 migration attempt

The maintainer tested `eslint@10.9.0` locally instead of leaving the ESLint 9 support warning uninvestigated.

Results:

- npm emitted peer-resolution override warnings during the ESLint 10 install;
- `npm audit --audit-level=high` still reported 0 vulnerabilities;
- formatting and TypeScript checks passed;
- all 9 Node smoke tests passed;
- the production Next.js build passed and the prior parent-lockfile/Turbopack root warning was absent;
- `npm run lint` failed while loading `react/display-name` because the React ESLint plugin uses a rule-context API that changed in ESLint 10;
- `npm run verify` therefore failed at the lint step as expected.

### Upstream compatibility finding

Current Next.js 16.3.3 `eslint-config-next` depends on `eslint-plugin-react`. The current React plugin line advertises ESLint peer support through ESLint 9 rather than ESLint 10. The actual local crash confirms that forcing the major would produce a broken lint gate.

Decision:

- retain the committed ESLint 9-compatible stack temporarily;
- do not use `--force`, `--legacy-peer-deps`, or an unproven compatibility shim solely to claim ESLint 10 support;
- treat this as a documented **dev-tooling compatibility exception**, not as a production runtime exception;
- keep Dependabot enabled and re-evaluate when the Next.js/React lint chain publishes verified ESLint 10 compatibility, and at minimum before W12 launch freeze.

### Remaining W0 step

The maintainer must discard only the uncommitted ESLint 10 package/lockfile experiment, run `npm ci`, then `npm audit --audit-level=high` and `npm run verify` on the exact committed graph. A clean `git status` plus that passing local reproduction will permit the W0 freeze review.

## 2026-09-02 16:28 PDT — SEO + GEO/AEO discoverability architecture added

### Architecture decision

SEO plus generative/answer-engine discoverability is now a first-class cross-cutting website architecture requirement rather than a post-launch marketing task.

Added:

- `docs/architecture/SEO_GEO_DISCOVERABILITY_V1.md`;
- `docs/decisions/ADR-0002-discoverability-is-core-architecture.md`.

### Core strategy

The website will pursue discoverability through unique, useful, primary-source Daily Line material rather than speculative LLM-ranking tricks. The long-term public authority corpus can include approved methodology, glossary, research/model-audit content, canonical pre-event prediction evidence, results, corrections, and reproducible performance aggregates derived from immutable website publication evidence.

The strategy explicitly rejects:

- machine-only doorway pages;
- keyword stuffing;
- mass-generated permutations for every possible AI/search query;
- fabricated reviews, citations, ratings, performance, or external authority;
- making paid/licensed data public solely for crawler access;
- treating `llms.txt` or another AI-specific text file as a required/ranking-authoritative mechanism without a later evidence review;
- assuming search-discovery crawler controls and provider model-training controls are the same policy decision.

### Cross-gate integration

Updated `docs/architecture/WEBSITE_ARCHITECTURE_V1.md` so discoverability prerequisites are carried before W9:

- W1 now owns semantic/crawlable public information architecture, metadata primitives, canonical public URL conventions, and reusable evidence presentation patterns;
- W4 must preserve immutable fields needed for approved replayable public-safe evidence projections;
- W5/W6 must preserve stable metric/entity terminology across public and member surfaces;
- W7 must define canonical/indexing behavior and HTML companion strategy for artifacts where binaries alone are a weak public source surface;
- W8 must freeze reproducible settlement/performance semantics before broad discoverable performance claims;
- W9 is now explicitly **SEO + GEO/AEO discoverability, content & analytics** and owns crawler policy, sitemaps, canonical/redirect behavior, metadata, supported structured data, internal linking, public authority/evidence surfaces, search-console/webmaster integration, AI/search referral instrumentation, benchmark-query observability, and provider-guidance validation;
- W12 must prove production crawl/index behavior and continued protection of private/member surfaces.

### Repository handoff/status integration

Updated:

- `README.md` with the discoverability architecture and revised gate names/responsibilities;
- `CODEX_START_HERE.md` so coding agents must read the new architecture/ADR and preserve the cross-gate requirements;
- `docs/status/WEBSITE_STATUS.md` with the accepted decision, completed documentation work, and the new W1/W4 requirements.

The discoverability architecture does not add a new W0 implementation blocker. It defines authority for future gate design. W1 begins the prerequisites; W9 owns the dedicated implementation/freeze pass; W12 owns production validation.

### External-guidance baseline checked

The architecture was checked against current official provider guidance on 2026-09-02 before being committed.

Relevant current guidance included:

- OpenAI: public sites can appear in ChatGPT search; `OAI-SearchBot` access matters for content to be included in summaries/snippets; search placement is not guaranteed; OpenAI documents search discovery and `GPTBot` training controls separately;
- Google Search: ordinary SEO fundamentals remain foundational for AI Overviews/AI Mode; no special AI-specific schema or machine-readable file is required; Google's 2026 generative-AI guidance emphasizes unique, non-commodity, people-first content and warns against GEO/AEO gimmicks and scaled low-value query targeting.

These external rules are not frozen repository truth. W9 implementation and W12 launch review must revalidate current official documentation because crawler names, reporting, and product behavior can change.

## 2026-09-02 — W0 repository/CI hardening

### Repository authority finalized from local proof

- committed the repository-local `package-lock.json` generated by the successful Node 24 install;
- committed the exact `tsconfig.json` and `next-env.d.ts` changes generated by Next.js during the first production build.

### Verification infrastructure added

- added `npm test`, `npm run format:check`, and aggregate `npm run verify` scripts without changing the dependency graph;
- added dependency-free repository-format verification;
- added Node 24 built-in test-runner smoke tests for runtime/script contracts, initial sport registration, and the rule that the website must not introduce direct SQLite pipeline access;
- added source-level accessibility smoke checks for language declaration, navigation labeling, main landmarks, accessible brand naming, and empty-hash links;
- added GitHub Actions CI using exact Node v24.11.1 and the committed lockfile;
- CI performs `npm ci`, high/critical audit gating, format checks, TypeScript, ESLint, tests, and a production Next.js build;
- GitHub Actions dependencies are pinned by immutable commit SHA rather than floating tags;
- added weekly Dependabot proposals for npm and GitHub Actions.

### Documentation/agent operations

- added `CODEX_START_HERE.md` with required reading, verification commands, and non-negotiable product boundaries;
- added dependency/supply-chain security policy;
- documented that install-script warnings require review rather than blind approval.

### Supported-toolchain finding

The local install resolved ESLint 9.39.5 and emitted an unsupported-version warning. Upstream ESLint 9 reached end-of-life on 2026-08-06. W0 therefore remained open pending an attempted migration to a supported ESLint 10 release or a narrowly documented temporary exception if compatibility prevented migration. That migration was subsequently attempted and the compatibility exception is now documented above.

### Freeze decision

W0 remained **NOT READY** until a clean `main` CI run existed, the supported ESLint-major issue was resolved or documented, the local parent-lockfile/Turbopack warning was confirmed gone, and local + CI proof agreed. Clean CI has now passed; only the final local reproduction on the committed graph remains.

## 2026-09-02 — W0 local proof recorded

### Validation evidence from 2026-08-31 local run

- PowerShell 7.6.5;
- Node v24.11.1;
- dependency installation succeeded;
- 359 packages audited with 0 vulnerabilities reported;
- `npm run typecheck` passed;
- `npm run lint` passed;
- `npm run build` passed under Next.js 16.3.3 / Turbopack;
- production output generated the home page, dashboard, and static sport routes for MLB, NFL, and NCAAF.

### Build-generated local changes

The first successful Next.js build generated or modified repository-local build-authority files:

- `package-lock.json` generated by `npm install`;
- `tsconfig.json` updated by Next.js to include generated development route types;
- `next-env.d.ts` refreshed by Next.js.

These exact files were subsequently committed as repository authority during the hardening pass above.

### Local-path warning

The build also detected a separate `package-lock.json` in the parent directory outside the Git repository. This was consistent with the earlier accidental `npm` invocation from the parent directory. The parent lockfile is not website repository authority. A later production build completed without the warning after the stray parent artifact was absent.

### Freeze decision at local checkpoint

Local toolchain proof was satisfied, but repository reproducibility and CI proof were still required. Those controls were added in the subsequent hardening pass above.

## 2026-08-31 — W0 repository initialization

### Added

- initial repository README and production architecture charter;
- Next.js/React/TypeScript application scaffold;
- initial Daily Line dark editorial/data-terminal visual direction with yellow brand accent;
- public homepage;
- member dashboard shell;
- Daily-MLB, Daily-NFL, Daily-NCAAF sport registry and preview routes;
- website architecture V1 working specification;
- Publication Contract V1 draft;
- ADR-0001 sealed publication boundary;
- W0 status/freeze checklist;
- environment example and no-secret repository rule.

### Decisions

- website is the primary product surface;
- Whop remains the initial commerce/membership authority, projected into website entitlements;
- website identity is separate from commerce identity;
- paid authorization occurs server-side;
- sport pipelines publish sealed artifacts instead of exposing their mutable databases to the website;
- no fabricated picks, performance records, or entitlements are used in the initial UI scaffold.

### Validation status at initialization

The repository was created remotely in this pass. Dependency installation/build/typecheck/lint proof had not yet been run at initialization; that proof was subsequently completed locally and recorded above.
