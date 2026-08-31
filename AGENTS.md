# The Daily Line Website — Agent Instructions

Read `README.md`, `docs/architecture/WEBSITE_ARCHITECTURE_V1.md`, `docs/status/WEBSITE_STATUS.md`, and relevant ADRs/contracts before changing architecture.

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

## Current priority

Complete W0 proof, then execute W1 design-system/public-shell architecture. Do not jump ahead into ad-hoc production integrations that create debt against W2-W4 identity, entitlement, and publication boundaries.
