# Dependency & Supply-Chain Security Policy

**Created:** 2026-09-02  
**Applies to:** The Daily Line website repository

## Goals

Keep the website runtime and build chain reproducible, supported, reviewable, and recoverable without blindly following every upstream release.

## Lockfile authority

- `package-lock.json` is committed and is the dependency-resolution authority for CI and production builds.
- CI uses `npm ci`, not `npm install`.
- Dependency changes must update both `package.json` and `package-lock.json` in the same reviewed change.
- Do not hand-edit transitive dependency entries in the lockfile.

## Supported toolchain

- Production development/CI stays on a supported Node 24 LTS release until an explicit runtime migration is accepted.
- Direct dependencies and developer tooling must not remain on an end-of-life major release without an explicit, documented temporary exception.
- Framework patch/security releases are reviewed promptly; major upgrades require compatibility proof rather than automatic production promotion.

## Automated updates

Dependabot checks npm and GitHub Actions weekly. Automated pull requests are proposals, not automatic approval. Each update must pass the complete CI verification gate.

## GitHub Actions

Third-party/official actions used in privileged workflows should be pinned to immutable commit SHAs with the corresponding release documented in a comment.

The initial W0 CI pins:

- `actions/checkout` v7.0.0 by commit SHA;
- `actions/setup-node` v7.0.0 by commit SHA.

## Install scripts

Package install scripts are treated as executable supply-chain code. Do not approve a newly surfaced install script merely to remove a warning.

Before explicitly approving or depending on one:

1. identify why the package requires the script;
2. confirm the package is expected in the dependency graph;
3. inspect upstream provenance/release information where practical;
4. prove whether the build actually requires the script;
5. record the decision if an explicit allow-list is introduced.

## Vulnerability gate

W0 CI runs `npm audit --audit-level=high`. High/critical advisories block the gate until they are resolved, mitigated, or explicitly accepted with documented reasoning and scope.

A zero-audit result does not by itself establish package trust.

## Current known maintenance item

The first local W0 install resolved ESLint 9.39.5. ESLint 9 reached upstream end-of-life on 2026-08-06. The lint gate currently passes, but W0 must not be formally frozen while an unsupported direct toolchain major remains without either:

- migration to a supported ESLint major with Next.js compatibility proof; or
- a narrowly documented temporary exception with an expiry date.

The preferred path is migration, not exception.

## Review evidence for dependency changes

At minimum:

```text
npm ci
npm audit --audit-level=high
npm run format:check
npm run typecheck
npm run lint
npm test
npm run build
```

Any dependency change that affects runtime behavior should also receive targeted functional tests before merge.
