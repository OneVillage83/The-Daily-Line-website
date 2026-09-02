# CODEX START HERE — The Daily Line Website

This file is the fast handoff for coding agents. It does not replace the authoritative architecture documents.

## Read before changing code

1. `README.md`
2. `AGENTS.md`
3. `docs/architecture/WEBSITE_ARCHITECTURE_V1.md`
4. `docs/contracts/PUBLICATION_CONTRACT_V1.md`
5. `docs/decisions/ADR-0001-publication-boundary.md`
6. `docs/status/WEBSITE_STATUS.md`
7. `docs/DEVELOPMENT_LOG.md`

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
- Never fabricate picks, performance, subscriber counts, access state, or historical records for a production-looking surface.
- Paid authorization is server-side. Client hiding is not authorization.
- Historical publication evidence is append/version based, never silently rewritten.
- Shared schemas must preserve sport-native semantics rather than forcing false equivalence.
- Secrets remain server-only and out of source control.

## Change discipline

A material behavior or architecture change must update `docs/DEVELOPMENT_LOG.md` and any affected architecture/status/contract document in the same change. A durable architectural decision requires an ADR.

Prefer small, reviewable commits. Do not bypass a failing gate to make CI green.
