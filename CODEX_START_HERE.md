# CODEX START HERE — The Daily Line Website

This file is the fast handoff for coding agents. It does not replace the authoritative architecture documents.

## Read before changing code

1. `README.md`
2. `AGENTS.md`
3. `docs/architecture/WEBSITE_ARCHITECTURE_V1.md`
4. `docs/architecture/DESIGN_SYSTEM_V1.md`
5. `docs/architecture/ANALYTICAL_UI_CONTRACT_V1.md`
6. `docs/architecture/SEO_GEO_DISCOVERABILITY_V1.md`
7. `docs/contracts/PUBLICATION_CONTRACT_V1.md`
8. `docs/decisions/ADR-0001-publication-boundary.md`
9. `docs/decisions/ADR-0002-discoverability-is-core-architecture.md`
10. `docs/status/WEBSITE_STATUS.md`
11. `docs/status/W0_FREEZE_2026-09-02.md`
12. `docs/DEVELOPMENT_LOG.md`

## Current phase

W1 — Design system, semantic public shell & discoverability prerequisites.

W0 is formally frozen. Preserve its invariants and evidence unless a later documented architecture decision intentionally supersedes them.

Do not reopen W0 casually. If a W1 change alters a frozen W0 assumption, document the reason, affected evidence, regression risk, and replacement proof.

## Required verification before proposing a completed change

Run from the repository root:

```bash
npm ci
npm run format:check
npm run typecheck
npm run lint
npm test
npm run build
npm run test:rendered
```

The aggregate command is:

```bash
npm run verify
```

For dependency/security work, also run:

```bash
npm audit --audit-level=high
```

## Current toolchain exception

The committed lint graph intentionally remains on ESLint 9 because the current Next.js 16.3.3 / `eslint-plugin-react` chain failed a real ESLint 10.9.0 compatibility test.

Do not use `--force`, `--legacy-peer-deps`, or an unproven shim to force ESLint 10. Re-evaluate only when the framework/plugin chain is verified compatible, and at minimum before W12 launch freeze.

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
- Domain state such as PASS/AVOID must remain separate from generic interface success/error state.
- Empty, unavailable, stale, gated, error, and corrected states are distinct contracts; do not collapse them into a generic blank/error card.
- Gated UI is explanatory only. It must never contain protected payloads that were merely hidden on the client.
- SEO + GEO/AEO discoverability is a cross-cutting architecture requirement, not optional W9 cleanup. Preserve its W1/W4/W7/W8 prerequisites when modifying earlier gates.
- Build discoverability from useful primary-source content, semantic/crawlable HTML, stable URLs, metadata, internal linking, and reproducible evidence. Do not create machine-only doorway pages, keyword stuffing, mass query permutations, or speculative LLM hacks.
- Do not assume `llms.txt` or another AI-specific file is required or ranking-authoritative. Any adoption requires a later evidence review.
- Search-discovery crawler policy and provider model-training crawler policy are separate decisions where providers expose separate controls.
- External search/AI provider behavior changes. Revalidate official guidance during W9 implementation and W12 launch review rather than hard-coding old assumptions.
- Secrets remain server-only and out of source control.

## W1 implementation priorities

W1 must build reusable production primitives, not one-off page styling. It owns design tokens, typography, responsive behavior, semantic public navigation, canonical/metadata primitives, reusable cards/tables/status patterns, loading/empty/unavailable/stale/error/gated/corrected states, accessibility behavior, and the visual relationship between public editorial pages and the member command center.

The current W1 analytical primitives are governed by `docs/architecture/ANALYTICAL_UI_CONTRACT_V1.md`.

`npm run test:rendered` starts the built production server and verifies real rendered HTML for the public/member shell, canonical/indexing rules, core navigation, analytical table semantics, loading-state accessibility, and branded 404 behavior. This is stronger than source-only checks but does not by itself replace the remaining browser-level visual/interaction accessibility review required before W1 freeze.

## Change discipline

A material behavior or architecture change must update `docs/DEVELOPMENT_LOG.md` and any affected architecture/status/contract document in the same change. A durable architectural decision requires an ADR.

Prefer small, reviewable commits. Do not bypass a failing gate to make CI green.
