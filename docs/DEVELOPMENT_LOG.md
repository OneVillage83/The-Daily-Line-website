# Development Log

Material repository changes are logged here in chronological order. Architecture decisions that constrain future work also receive an ADR.

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

### Validation status

The repository was created remotely in this pass. Dependency installation/build/typecheck/lint proof still needs to be run with the pinned Node 24 toolchain before W0 can freeze.
