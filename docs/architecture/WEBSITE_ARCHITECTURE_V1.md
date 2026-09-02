# The Daily Line Website Architecture V1

**Status:** working architecture  
**Created:** 2026-08-31  
**Scope:** production website, member product, publication ingestion, access control, historical presentation, and search/generative discoverability

## 1. Purpose

The Daily Line website is the customer-facing publication and account system for all Daily sports. It must be independently deployable from the sport pipelines and must never require direct reads from a sport pipeline's mutable operational database.

The architecture is designed now for the first three products — Daily-MLB, Daily-NFL, and Daily-NCAAF — while preserving explicit extension points for later sports.

Search and generative/answer-engine discoverability are treated as production architecture concerns rather than post-launch marketing additions. The dedicated discoverability specification is `docs/architecture/SEO_GEO_DISCOVERABILITY_V1.md` and ADR-0002 makes its cross-gate prerequisites authoritative.

## 2. System boundaries

### Website owns

- public website and SEO/GEO/AEO discoverability surfaces;
- website user identity and sessions;
- user profile and preferences;
- commerce-account linkage;
- normalized entitlement state used for authorization;
- immutable copies/references of accepted publication artifacts;
- website read models derived from accepted publications;
- public-safe evidence/read-model projections derived from accepted publications;
- report/infographic catalog metadata;
- publication visibility state;
- historical display and settlement presentation;
- methodology, glossary, research, performance, and other public authority surfaces;
- canonical URL, metadata, sitemap, crawler-policy, and structured-data behavior;
- search/AI referral and discoverability analytics owned by the website;
- analytics/attribution events owned by the website;
- administrative publication and entitlement audit trails.

### Sport pipelines own

- data acquisition and point-in-time evidence;
- feature construction;
- models and predictions;
- market/odds processing;
- weather/injury/sport-specific inputs;
- recommendation gates;
- pipeline-quality evidence;
- creation and sealing of the authoritative publication artifact.

### The Daily Data Core owns where appropriate

- cross-sport upstream infrastructure and contracts that are not website-specific, such as shared odds/weather foundations.

### Commerce provider owns initially

- checkout;
- billing;
- subscription lifecycle;
- refunds/cancellations;
- affiliate/commerce capabilities selected for launch.

The website projects verified commerce state into website entitlements.

## 3. High-level flow

```text
SPORT PIPELINE
  acquire -> model -> recommend -> validate -> seal
                                      |
                                      v
                         Publication Artifact Vn
                                      |
                              authenticated ingest
                                      |
                                      v
WEBSITE
  verify -> dedupe -> validate contract -> persist evidence -> build read model -> promote
                                                                  |
                                                                  +--> member surfaces
                                                                  |
                                                                  +--> public-safe evidence surfaces
                                                                         |
                                                                         v
                                                               search / AI retrieval

COMMERCE
  webhook + reconciliation -> commerce event log -> entitlement projection -> authorization

IDENTITY
  auth -> website user -> linked commerce identities -> effective entitlements
```

## 4. Publication atomicity

A slate must not become partially visible because one table, game, report, or artifact arrived before another. The ingestion unit is one publication envelope.

Required state progression:

`RECEIVED -> VERIFIED -> VALIDATED -> PERSISTED -> READY -> PUBLISHED`

Failure states are terminal for that ingestion attempt and retain evidence. Replays are idempotent by publication identity + content hash.

Promotion to `PUBLISHED` is the only state that changes normal customer visibility.

## 5. Identity and authorization

Authentication proves who the user is. Entitlements answer what the user may access. These are separate concerns.

A website user can link zero or more commerce identities. Effective access is computed server-side from active entitlement records. Client state is presentation only.

Initial entitlement examples:

- `sport:mlb`
- `sport:nfl`
- `sport:ncaaf`
- `bundle:all_access`
- future staff/admin roles kept separate from paid product entitlement

No paid artifact endpoint may rely on a hidden button or client-side route guard as its authorization boundary.

Public discoverability does not override entitlements. Public-safe projections must be explicitly defined; member-only/licensed fields do not become public merely because a crawler could index them.

## 6. Data model domains

Planned website-owned domains:

- `identity`: profiles and auth linkage
- `commerce`: provider customers, memberships, raw event evidence
- `entitlements`: effective access projections and grant/revoke history
- `publications`: immutable accepted publication envelopes and versions
- `publication_read_models`: query-optimized normalized presentation data
- `public_evidence`: public-safe, replayable projections used for canonical prediction/results/performance surfaces where product policy permits
- `artifacts`: reports, infographics, downloads, hashes, object locations
- `settlement`: grading references and historical outcomes
- `content`: articles/methodology/glossary/FAQ/research where database-backed content is justified
- `discoverability`: canonical/redirect/index policy and provider-validation state where persistence is useful
- `audit`: administrative and machine actions

Exact PostgreSQL DDL is intentionally deferred to the W2-W4 design passes so identity, entitlement, publication, and public-projection semantics are frozen before tables become authority.

## 7. Sport registry

Website navigation and generic surfaces use a registry rather than hard-coded conditional branches throughout the application. A sport adapter can extend the shared publication model with explicitly versioned sport-native fields.

Shared fields should describe concepts that genuinely mean the same thing across sports. We should not force NFL and MLB details into a misleading universal schema merely to reduce type count.

Public methodology, glossary, prediction, result, and performance surfaces should use the same registry terminology so external systems do not encounter contradictory sport/entity naming.

## 8. Read path

Normal page requests should read website-owned read models, not parse large raw publication payloads on every request. Raw/sealed payloads remain durable evidence and replay authority.

A publication projector converts the accepted artifact into versioned website read models transactionally. Projectors must be replayable.

Where a publication has an approved public representation, a separate public-safe projector should derive that representation from the same accepted evidence. Search/public pages must not bypass the publication boundary by reading sport working databases.

## 9. Historical integrity

The website must distinguish:

- what was published before an event;
- later market movement;
- official/selected settlement outcome;
- any administrative correction.

Corrections append evidence and produce explicit versions; they do not silently mutate the historical claim that was originally shown.

The same rule applies to discoverable public history. Search-facing prediction and performance pages must never rewrite pre-event claims to match later outcomes.

## 10. Security baseline

- server-only provider/service credentials;
- verified webhook signatures;
- authenticated publication ingest;
- replay protection/idempotency;
- rate limits on public/auth/ingest surfaces as appropriate;
- strict authorization for paid artifacts;
- security headers and CSP design before production;
- least-privilege database roles and RLS where exposed through Supabase Data API;
- immutable/auditable evidence for entitlement and publication transitions;
- no secrets in logs;
- dependency/security update process;
- private/member/admin paths remain non-public regardless of crawler identity;
- crawler allowlisting must not weaken authentication or authorization boundaries.

## 11. Reliability baseline

Production design must include:

- health/readiness checks;
- structured logs with request/publication correlation IDs;
- ingestion metrics and failure alerts;
- webhook dead-letter/retry handling;
- periodic commerce reconciliation to recover missed webhooks;
- database backup/restore proof;
- publication replay proof;
- public-evidence projection replay proof where implemented;
- rollback-safe deploys;
- stale-publication behavior that fails visibly rather than pretending data is current;
- crawl/index regressions detectable before or shortly after deployment.

## 12. UX architecture

The product has two visual modes within one system:

1. **Public editorial layer:** brand, trust, education, methodology, performance, search/SEO/GEO/AEO discoverability, membership conversion.
2. **Member command center:** denser daily boards, filters, matchup dossiers, model-market comparison, gates, report access, historical analysis.

Both share design tokens, navigation, accessibility rules, metric terminology, and the same publication read models/evidence authority.

Public pages must preserve meaningful textual/semantic content even when charts, infographics, or interactive controls are added. Accessibility, human readability, and machine interpretability should reinforce one another.

## 13. SEO + GEO/AEO discoverability baseline

The authoritative detailed requirements live in `docs/architecture/SEO_GEO_DISCOVERABILITY_V1.md`.

At architecture level, the website must preserve these invariants:

- conventional SEO remains foundational;
- generative/answer-engine visibility is pursued through crawlable, useful, primary-source content rather than machine-only doorway pages;
- canonical public pages should make The Daily Line, Daily sport products, methodology, metrics, predictions, results, and performance unambiguous entities/resources;
- immutable publication evidence should be capable of producing durable public-safe prediction/result pages where product policy permits;
- W8 performance semantics must be reproducible before W9 exposes performance claims broadly;
- search discovery crawler policy is explicitly documented and tested;
- provider search-discovery controls and provider model-training controls are separate decisions where providers expose separate mechanisms;
- no `llms.txt` or equivalent AI-specific file is assumed to improve rankings or be required absent documented evidence;
- current external-provider guidance must be revalidated at W9 implementation and W12 launch review;
- no ranking or citation in any external system is guaranteed.

## 14. Architecture gates

### W0 — Repository & engineering foundation
Scaffold, strict types, lint/build commands, environment contract, architecture docs, status log.

### W1 — Design system & public shell
Tokens, components, responsive shell, navigation, accessibility baseline, semantic/crawlable public information architecture, metadata primitives, canonical public URL conventions, reusable evidence presentation patterns.

### W2 — Identity, sessions & account model
Supabase project/schema, SSR auth, profiles, session middleware/proxy, account UX, tests.

### W3 — Whop commerce & entitlement authority
Verified webhook ingestion, raw event evidence, identity linking, entitlement projector, reconciliation, revocation behavior.

### W4 — Publication contract & ingestion boundary
Final contract, signatures/auth, hashes, dedupe, persistence, projectors, replay, promotion state machine, sport adapters, and preservation of fields needed for replayable public-safe evidence projections.

### W5 — Sport registry & board framework
Generic slate/board primitives plus sport-specific extension rendering and stable cross-surface metric terminology.

### W6 — Matchup dossier & recommendation presentation
Prediction, market, edge/confidence, gate reasoning, timestamps, evidence surfaces, and consistent public/member semantic definitions.

### W7 — Artifact/archive system
PDFs, infographics, downloads, archive, metadata, authorization, canonical/indexing policy, and HTML companion strategy where a standalone binary artifact is insufficient for discoverability.

### W8 — Settlement/performance
Immutable recommendation history, grading, corrections, reproducible performance calculations, public transparency semantics, and drill-down evidence needed before discoverable performance claims are frozen.

### W9 — SEO + GEO/AEO discoverability, content & analytics
Crawler policy, sitemaps, canonical URLs, redirects, metadata, structured data, internal linking, public methodology/glossary/research taxonomy, public-safe primary-source prediction/results/performance surfaces, search-console/webmaster integration, AI/search referral instrumentation, benchmark-query observability, privacy-aware analytics and attribution, and current-provider guidance validation.

### W10 — Admin/operations/observability
Admin controls, publication operations, support tools, audit UI, logs/metrics/alerts.

### W11 — Security/privacy/legal hardening
Threat model, authorization regression suite, privacy lifecycle, security headers, abuse controls, legal surfaces.

### W12 — Launch readiness
Production environment, domain, backups, recovery exercises, load/performance budgets, end-to-end launch rehearsal, production crawl/index validation, sitemap/canonical verification, and proof that private/member paths remain protected.

## 15. Explicit non-goals for the website repo

- reimplementing sport models;
- querying sport SQLite databases from production web requests;
- recomputing recommendations in the UI;
- accepting unsealed partial pipeline state;
- treating commerce webhook arrival as the only source of recoverable membership truth;
- inventing performance/pick data for visual demos that could be mistaken for real results;
- creating machine-only SEO/GEO doorway pages or mass low-value query permutations;
- fabricating ratings, reviews, authority, citations, performance claims, or third-party endorsements;
- making paid/licensed data public solely for crawler access;
- guaranteeing placement or citation in Google, ChatGPT, Gemini, Grok, Bing, or any other external retrieval system.
