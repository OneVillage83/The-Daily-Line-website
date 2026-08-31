# ADR-0001: Website consumes sealed publication artifacts

- **Status:** Accepted
- **Date:** 2026-08-31

## Context

The Daily Line sport pipelines have their own acquisition, modeling, odds/market, recommendation, and persistence concerns. A website that queries those mutable stores directly would couple customer-visible state to pipeline implementation details and could expose incomplete runs.

## Decision

The website consumes a sealed, immutable, versioned publication artifact produced after a sport pipeline completes its publication gate.

The website verifies and persists that artifact, derives website-owned read models, and promotes the publication atomically.

## Consequences

### Positive

- no partial slate exposure;
- reproducible historical publication state;
- sport pipelines may evolve internally without constantly breaking the website;
- easier replay/debugging;
- clear ownership and trust boundary;
- future mobile/app clients can consume the same website API/read models.

### Costs

- requires a real publication contract and compatibility testing;
- requires ingestion/projector infrastructure;
- duplicates some normalized data between producer and website stores;
- corrections need explicit version semantics.

These costs are accepted because publication correctness is more important than minimizing the number of persistence layers.
