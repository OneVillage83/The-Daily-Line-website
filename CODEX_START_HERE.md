# CODEX START HERE — The Daily Line Website

This file is the fast handoff for coding agents. It does not replace the authoritative architecture documents.

## Read before changing code

1. `README.md`
2. `AGENTS.md`
3. `docs/architecture/WEBSITE_ARCHITECTURE_V1.md`
4. `docs/architecture/SEO_GEO_DISCOVERABILITY_V1.md`
5. `docs/contracts/PUBLICATION_CONTRACT_V1.md`
6. `docs/decisions/ADR-0001-publication-boundary.md`
7. `docs/decisions/ADR-0002-discoverability-is-core-architecture.md`
8. `docs/status/WEBSITE_STATUS.md`
9. `docs/DEVELOPMENT_LOG.md`

## Current phase

W0 — Repository & engineering foundation.

Do not claim W0 frozen until both local and GitHub CI evidence are clean and all status blockers are resolved.

## Required verification before proposing a completed change

Run from the repository root:

```bash
npm ci
npm run format:check
npm run typecheck
npm run lint
npm test
npm run build
```

For dependency/security work, also run:

```bash
npm audit --audit-level=high
```

## Non-negotiable product boundaries

- The website consumes sealed, versioned publication artifacts.
- Never connect a production website request directly to mutable Daily-MLB, Daily-NFL, Daily-NCAAF, or future sport working databases.
- Never fabricate picks, performance, subscriber counts, access state, historical records, ratings, reviews, citations, or authority claims.
- Paid authorization is server-side. Client hiding is not authorization.
- Public search/AI discoverability never overrides member entitlements or data-licensing restrictions.
- Historical publication evidence is append/version based, never silently rewritten.
- Public-safe prediction/results/performance surfaces must be replayable from accepted website publication evidence, not hand-edited hindsight summaries.
- Shared schemas must preserve sport-native semantics rather than forcing false equivalence.
- Public terminology for probability, market comparison, edge, confidence, Recommendation Gate, publication time, and settlement must remain consistent across surfaces.
- SEO + GEO/AEO discoverability is a cross-cutting architecture requirement, not optional W9 cleanup. Preserve its W1/W4/W7/W8 prerequisites when modifying earlier gates.
- Build discoverability from useful primary-source content, semantic/crawlable HTML, stable URLs, metadata, internal linking, and reproducible evidence. Do not create machine-only doorway pages, keyword stuffing, mass query permutations, or speculative LLM hacks.
- Do not assume `llms.txt` or another AI-specific file is required or ranking-authoritative. Any adoption requires a later evidence review.
- Search-discovery crawler policy and provider model-training crawler policy are separate decisions where providers expose separate controls.
- External search/AI provider behavior changes. Revalidate official guidance during W9 implementation and W12 launch review rather than hard-coding old assumptions.
- Secrets remain server-only and out of source control.

## Change discipline

A material behavior or architecture change must update `docs/DEVELOPMENT_LOG.md` and any affected architecture/status/contract document in the same change. A durable architectural decision requires an ADR.

Prefer small, reviewable commits. Do not bypass a failing gate to make CI green.
