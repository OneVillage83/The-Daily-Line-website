# ADR-0002 — SEO + GEO/AEO Discoverability Is Core Architecture

**Status:** Accepted  
**Date:** 2026-09-02

## Context

The Daily Line will publish original sports-model predictions, market comparisons, methodology, historical results, and performance evidence. Users may discover this material through conventional search engines as well as generative/answer-engine systems that retrieve and cite web sources.

If discoverability is postponed until after the product is built, the website may accumulate weak URL structure, client-only public content, inconsistent terminology, insufficient public-safe historical evidence, or publication schemas that cannot later support durable prediction/result pages without redesign.

## Decision

SEO + GEO/AEO discoverability is a first-class cross-cutting website architecture requirement rather than a late marketing add-on.

The dedicated implementation gate remains W9, but earlier gates must preserve the prerequisites:

- W1 establishes semantic/crawlable public information architecture and metadata primitives;
- W4 preserves immutable publication fields needed for durable public-safe evidence projections;
- W7 ensures artifacts have appropriate canonical/indexing and HTML companion strategy;
- W8 freezes reproducible settlement/performance semantics before public performance claims;
- W9 implements crawler policy, sitemaps, canonical/structured metadata, internal linking, public methodology/glossary/evidence surfaces, search/AI referral measurement, and provider-guidance validation;
- W12 proves intended crawlability/indexing behavior on the production domain.

The site will prioritize unique primary-source material, human usefulness, historical integrity, and clear entity semantics over speculative "LLM hacks." No special AI file such as `llms.txt` is considered required or ranking-authoritative without a later evidence review.

Crawler controls for search discovery and provider model training are treated as separate policy decisions where providers expose separate controls.

## Consequences

### Positive

- discoverability requirements influence the data model before publication history is frozen;
- individual predictions/results can become durable primary-source URLs without reading mutable sport databases;
- methodology and performance claims can be linked to reproducible evidence;
- accessibility, semantic HTML, and retrieval quality reinforce one another;
- the site can measure both conventional organic discovery and available AI/answer-engine referral traffic;
- future sport products inherit the same discoverability architecture.

### Costs

- W1/W4/W7/W8 must carry additional requirements before W9 begins;
- public/member data projections require deliberate product-policy boundaries;
- crawler and provider guidance must be periodically revalidated because external behavior changes;
- performance pages cannot be rushed before settlement semantics are trustworthy.

## Rejected alternatives

### Treat AI discoverability as a post-launch marketing task

Rejected because critical prerequisites live in URL design, publication contracts, historical persistence, rendering, and performance semantics.

### Build separate machine-only pages for LLMs

Rejected because this creates duplication, integrity risk, potential spam/doorway behavior, and divergence from the human-facing source of truth.

### Depend on `llms.txt` or another AI-specific text file as the primary mechanism

Rejected because current major-platform guidance does not establish such a file as a universal ranking or inclusion requirement. It may be reconsidered later if provider support and measurable value become clear.

## Related documents

- `docs/architecture/WEBSITE_ARCHITECTURE_V1.md`
- `docs/architecture/SEO_GEO_DISCOVERABILITY_V1.md`
- `docs/status/WEBSITE_STATUS.md`
- `docs/DEVELOPMENT_LOG.md`
