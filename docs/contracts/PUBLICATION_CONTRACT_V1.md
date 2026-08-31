# Publication Contract V1 — Draft Architecture Contract

**Status:** DRAFT / NOT FROZEN  
**Owner boundary:** Daily sport producer -> The Daily Line website consumer  
**Created:** 2026-08-31

## Purpose

Define the unit that a Daily sport pipeline may publish to the website. This prevents the web product from coupling itself to internal pipeline tables or transient in-memory output.

V1 is an architecture contract. Exact JSON Schema, signatures, field taxonomies, settlement identity, and per-sport extension schemas are W4 freeze work.

## Required envelope concepts

Every accepted publication must carry, at minimum:

- `contract_version`
- `publication_id`
- `sport`
- `league`
- `publication_kind`
- `slate_date`
- `source_run_id`
- `source_run_completed_at`
- `generated_at`
- `sealed_at`
- `content_hash`
- `producer_version`
- `data_cutoff_at`
- `timezone_policy`
- `games[]`
- `artifacts[]`
- `manifest`

## Identity rules

`publication_id` identifies the logical sealed publication. The content hash identifies the exact bytes/content accepted as evidence.

The website must reject ambiguous reuse of one publication ID with different content unless the contract explicitly represents a version/correction relationship.

Retries of the same publication ID and same content hash are idempotent.

## Time semantics

A publication must expose enough timestamp information for the website to show users when the analysis was produced and to prove that pre-event information was not silently replaced later.

All machine timestamps use unambiguous ISO-8601 instants. Display timezone is a presentation concern and must not alter identity.

## Shared game concepts

The cross-sport layer is expected to include concepts such as:

- stable upstream/source game identity;
- scheduled start time;
- home/away or sport-appropriate participants;
- publication status;
- model outputs;
- market observations that are explicitly timestamped;
- recommendation/gate output;
- human-readable explanation fields derived by the producing system;
- sport extension payload.

The exact cross-sport type must be conservative. Fields that do not share semantics across sports stay inside versioned sport extensions.

## Artifact concepts

Artifact references may include:

- report PDF;
- infographic;
- machine-readable export;
- future presentation assets.

Each artifact record must eventually define identity, content type, checksum, size, authorization class, and durable object reference or upload mechanism.

## Acceptance rules

The website ingestion service will eventually verify:

1. caller/authentication;
2. contract version support;
3. schema validity;
4. publication identity;
5. hash/checksum integrity;
6. required timing semantics;
7. sport registration;
8. artifact consistency;
9. duplicate/replay behavior;
10. transactionally persistent evidence before promotion.

A syntactically valid payload is not automatically publishable.

## Visibility rule

Normal customer read paths may see only publications that reached the website's publishable/published state. Receipt of a payload does not itself make content visible.

## Corrections

Corrections must be explicit versions/events linked to prior publication evidence. Historical published claims cannot be overwritten without an audit trail.

## Freeze prerequisites

Before `PUBLICATION_CONTRACT_V1` becomes frozen, W4 must provide:

- exact JSON Schema / TypeScript types;
- canonical serialization/hash rules;
- publication and correction identity rules;
- sport extension registration/versioning;
- artifact upload/reference protocol;
- auth/signature/replay rules;
- exact database authority/immutability rules;
- ingestion state machine;
- projector/replay tests;
- fixture payloads from MLB, NFL, and NCAAF;
- contract compatibility tests in producer and consumer repos.
