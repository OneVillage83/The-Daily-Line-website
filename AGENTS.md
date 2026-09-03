# The Daily Line Website — Agent Instructions

Read `README.md`, `docs/architecture/WEBSITE_ARCHITECTURE_V1.md`, `docs/status/WEBSITE_STATUS.md`, `docs/status/W0_FREEZE_2026-09-02.md`, and relevant ADRs/contracts before changing architecture.

## Non-negotiable rules

1. Do not make the website query mutable Daily sport pipeline databases.
2. Do not bypass the sealed publication boundary for convenience.
3. Do not fabricate picks, records, subscriber counts, performance, or live access state in product UI.
4. Do not treat client-side hiding as authorization.
5. Do not commit secrets or real provider credentials.
6. Do not silently change historical publication evidence.
7. Preserve sport-native semantics instead of forcing unrelated concepts into a universal schema.
8. Material architecture/behavior changes must update documentation and `docs/DEVELOPMENT_LOG.md` in the same change.
9. Architecture decisions that constrain future work require an ADR.
10. A phase/gate is not frozen until tests and operational evidence support it.
11. W0 is frozen; later work must preserve its invariants unless a documented decision explicitly supersedes them with replacement proof.
12. Do not force ESLint 10 while the current Next.js/React lint chain remains incompatible; follow the documented temporary tooling exception.

## Current priority

Execute W1 — Design system, semantic public shell & discoverability prerequisites.

Build reusable production architecture rather than one-off page polish. W1 must cover design tokens, typography, responsive behavior, semantic/crawlable navigation, canonical and metadata primitives, reusable cards/tables/status/evidence patterns, loading/empty/error/gated states, accessibility behavior/testing, and a coherent public-editorial/member-command-center visual language.

Do not jump ahead into ad-hoc production integrations that create debt against W2-W4 identity, entitlement, and publication boundaries.
