# The Daily Line SEO + GEO/AEO Discoverability Architecture V1

**Status:** working architecture  
**Created:** 2026-09-02  
**Scope:** traditional search, generative/answer-engine discovery, entity authority, crawlability, public evidence surfaces, and discoverability measurement

## 1. Purpose

The Daily Line must be designed to be discoverable not only through conventional search-result pages, but also through generative and answer-engine systems that retrieve, summarize, compare, cite, or link web sources.

For this repository, the working umbrella term is **SEO + GEO/AEO discoverability**:

- **SEO** — conventional search-engine optimization and technical search eligibility;
- **GEO/AEO** — optimization for generative and answer-oriented retrieval experiences;
- **entity authority** — making The Daily Line and each Daily sport product consistently identifiable as a source for sports-model methodology, published predictions, market comparisons, and independently reproducible historical performance.

This is not treated as a late marketing plugin. It is a production architecture requirement that affects information architecture, publication persistence, rendering, metadata, evidence design, accessibility, analytics, and content operations.

## 2. Core principle

The strategy is not to create pages for machines at the expense of people. The strategy is to make high-value human-facing material easy for search systems and retrieval systems to crawl, understand, distinguish, and cite.

The site should earn discoverability by publishing unique primary-source material that only The Daily Line can authoritatively provide: its own sealed predictions, timestamps, methodology, model-market comparisons, recommendation decisions, settlement history, audits, corrections, and aggregated performance derived from immutable evidence.

## 3. Architectural objectives

The website should make it straightforward for an external retrieval system to answer questions such as:

- What is The Daily Line?
- What is Daily-MLB / Daily-NFL / Daily-NCAAF?
- How does The Daily Line calculate or present no-vig probability?
- Does The Daily Line publish historical model performance?
- What did The Daily Line predict for a specific game before kickoff/first pitch?
- What data was available at the time of publication?
- How did a published recommendation settle?
- How does model confidence differ from market-implied probability?
- What is The Daily Line's performance in a clearly defined, reproducible subset of historical recommendations?

The source pages for these answers must be canonical, durable, timestamped, internally linked, and based on website-owned immutable publication evidence.

## 4. Discoverability layers

### 4.1 Technical crawl and index layer

Requirements:

- public pages return useful server-rendered/static HTML where practical;
- important public text is not available only after opaque client-side interaction;
- robots policy is deliberate and version-controlled;
- XML sitemaps are generated from canonical public resources;
- canonical URLs are explicit;
- redirects are stable and intentional;
- public pages have descriptive titles and metadata;
- duplicate/thin route proliferation is prevented;
- HTTP status behavior is correct for removed, redirected, private, or missing content;
- CDN/WAF/bot controls must not accidentally block intended search crawlers;
- preview/snippet controls are explicitly managed for pages where excerpts should or should not be surfaced.

Crawler policy must distinguish discovery/search crawling from any separate training controls offered by a provider. Do not assume that allowing or blocking one crawler token governs every use by that provider.

### 4.2 Semantic and entity layer

Every public surface should consistently establish:

```text
The Daily Line
  -> sports analytics / prediction publication platform
  -> Daily-MLB
  -> Daily-NFL
  -> Daily-NCAAF
  -> future Daily sport products
```

Entity consistency requirements:

- one canonical brand name: `The Daily Line`;
- stable sport product names such as `Daily-MLB`;
- consistent organization descriptions across About, methodology, metadata, structured data, and external profiles;
- durable author/editor identities where editorial authorship is applicable;
- stable terminology for model probability, market probability, no-vig probability, edge, confidence, recommendation gate, publication timestamp, and settlement;
- glossary pages for domain-specific terms used throughout the product;
- links between sport pages, methodology, performance, individual publications, and explanatory resources.

Structured data may be added where it accurately represents visible page content and is supported by the relevant search platform. Structured data is supplemental machine-readable context, not a substitute for clear visible content.

### 4.3 Primary-source evidence layer

The strongest long-term discoverability asset is the historical corpus produced by The Daily Line itself.

Publicly eligible prediction/performance pages should be generated from immutable website publication evidence rather than hand-authored summaries that can drift from what was actually published.

Where product/privacy/commerce rules permit public exposure, a prediction record can include machine- and human-readable fields such as:

- sport;
- event identity;
- teams/participants;
- scheduled event time;
- publication timestamp and timezone;
- publication/version identity;
- model probability;
- market implied probability where licensed/permitted;
- no-vig probability where derived and permitted;
- model-market difference/edge;
- recommendation state;
- recommendation-gate reasoning or public-safe summary;
- material pre-event evidence categories considered;
- later settlement outcome;
- correction/version history;
- links to methodology and metric definitions.

This does **not** imply that every paid field becomes public. Public evidence projections must be deliberately defined. The architecture should expose enough primary-source information to establish provenance and authority without bypassing member entitlements.

## 5. Canonical public information architecture

Target public URL families should support both user navigation and durable retrieval. Exact route names may change during W1/W9 design, but the conceptual resources are required.

```text
/
/about/
/methodology/
/glossary/
/research/
/performance/
/results/

/sports/mlb/
/sports/mlb/methodology/
/sports/mlb/performance/
/sports/mlb/results/
/sports/mlb/predictions/<canonical-event-or-publication-id>/

/sports/nfl/...
/sports/ncaaf/...
```

Future resources may include model-audit, research-note, data-methodology, and historical-filter pages when they add genuine user value and can be reproduced from authoritative data.

Do not create thousands of near-duplicate keyword permutations solely to target possible AI/search queries.

## 6. Answer-friendly content without "AI bait"

Public explanatory content should make important questions easy to answer directly while remaining natural for human readers.

Preferred pattern:

1. descriptive page title;
2. concise definition/answer near the relevant heading;
3. deeper explanation;
4. methodology/evidence;
5. examples using real or clearly labeled illustrative data;
6. links to related primary-source records;
7. updated/reviewed timestamps where material changes over time.

Examples of legitimate explanatory resources:

- What is no-vig probability?
- What does model-market edge mean?
- What is the Recommendation Gate?
- How are historical predictions graded?
- How does The Daily Line prevent hindsight edits?

These pages exist because users need the explanations, not because a specific LLM prompt was observed.

## 7. Content quality and provenance requirements

Public claims should be defensible and attributable.

For material factual/model-performance claims:

- link to the underlying Daily Line evidence where possible;
- identify the sample definition and date range;
- disclose exclusions or incomplete data;
- distinguish model prediction accuracy from betting profitability;
- distinguish retrospective analysis from pre-event publication;
- never silently replace a historical claim;
- show correction/version history where material;
- cite authoritative external sources for definitions or third-party factual claims when useful;
- avoid unsupported superlatives such as "most accurate" or "best" unless the comparison and evidence genuinely support them.

## 8. Rendering requirements

Discoverability must be considered during component design.

Public pages should favor:

- semantic headings;
- semantic tables for tabular records;
- accessible link text;
- text equivalents for important chart conclusions;
- stable DOM structure for primary content;
- meaningful alt text for informative images;
- ARIA only where native semantics are insufficient;
- responsive layouts that preserve content hierarchy;
- server-rendered metadata;
- progressive enhancement rather than content that exists only after JavaScript execution when avoidable.

Accessibility and machine interpretability are aligned requirements here; neither should be treated as a workaround for the other.

## 9. Structured metadata plan

W9 should define and test page-appropriate metadata, potentially including supported Schema.org types such as Organization, WebSite, WebPage, Article, BreadcrumbList, Dataset, or other applicable types only when they truthfully describe the visible resource and comply with current platform documentation.

The site must not add fabricated ratings, reviews, authors, datasets, events, or other structured-data properties merely to pursue enhanced search treatment.

Required baseline metadata includes:

- title;
- description;
- canonical URL;
- social/Open Graph metadata;
- publication/update timestamps where appropriate;
- index/follow/snippet policy;
- stable preferred image when a page warrants one.

## 10. Robots and AI/search crawler policy

W9 must produce an explicit crawler-policy matrix and automated tests for it.

At minimum, the matrix should document:

- Googlebot/search eligibility policy;
- OpenAI search discovery policy, including `OAI-SearchBot` according to then-current OpenAI documentation;
- separate policy decisions for provider training crawlers such as `GPTBot`, where applicable;
- Bing and other major discovery crawlers relevant at launch;
- private/member/admin paths that must remain non-public regardless of crawler identity;
- CDN/WAF allow/deny behavior;
- sitemap inclusion/exclusion behavior.

Crawler names and provider policies are external dependencies and can change. They must be revalidated against official provider documentation during W9 implementation and before launch.

No assumption is made that an `llms.txt` or similar AI-specific text file improves ranking or is required. Such files may only be adopted after a documented evidence/compatibility review; they are not an architecture dependency.

## 11. Publication-to-web discoverability projection

The publication ingestion architecture should support a public projection without coupling public pages to mutable sport databases.

```text
sealed sport publication
        |
        v
website immutable publication evidence
        |
        +--> member read model
        |
        +--> public-safe evidence/read model
                 |
                 +--> event prediction page
                 +--> sport results archive
                 +--> performance aggregations
                 +--> methodology-linked examples
```

The public projection must be versioned and replayable from accepted publication evidence.

This gives search/retrieval systems durable URLs while preserving the same historical-integrity rules that protect member-facing data.

## 12. Performance and results as authority surfaces

W8 and W9 are deliberately coupled.

W8 owns immutable settlement/performance semantics. W9 owns the discoverable presentation and metadata built on top of those semantics.

Performance pages must allow a reader to understand:

- what population is being measured;
- what time period is covered;
- whether the statistic represents all predictions, recommendations only, PASS only, a sport, market type, confidence band, etc.;
- sample size;
- calculation method;
- correction policy;
- when the page was last recomputed.

Where feasible, aggregates should link down to the records that compose them.

## 13. External authority and citation strategy

The Daily Line should pursue legitimate external corroboration, not manufactured mention spam.

Long-term authority work can include:

- genuinely useful research/public methodology pages that others can cite;
- public datasets or reproducible aggregate exports when licensing and product strategy permit;
- expert-authored explanations;
- transparent model audits;
- participation in relevant sports analytics communities;
- earned coverage and references from independent publishers;
- consistent official profiles and brand/entity information.

Paid/spammy mention generation, fake reviews, mass low-value guest posts, or fabricated third-party authority are prohibited.

## 14. Measurement architecture

Traditional ranking alone is not the success metric.

W9 should establish measurements for:

- Google Search Console search visibility;
- available Google generative-AI reporting/features at implementation time;
- Bing Webmaster/search equivalents where useful;
- organic landing-page traffic;
- query/category impressions and clicks;
- crawl/index health;
- referral traffic from answer engines/LLM search products where referral information is available;
- ChatGPT referrals (OpenAI currently documents `utm_source=chatgpt.com` for ChatGPT search referral links; revalidate at implementation time);
- conversions/registrations attributable to organic and AI-referral sources;
- citations/mentions sampled across a maintained benchmark query set;
- incorrect entity associations or stale citations that require remediation.

The benchmark query set should include branded, category, methodology, comparison, historical-performance, and sport-specific questions. It is an observability tool, not a license to mass-produce pages matching every query string.

## 15. W-gate integration

### W1 — Design system & public shell

Must establish:

- semantic public information architecture;
- accessible/crawlable navigation;
- metadata primitives;
- heading/content hierarchy;
- reusable evidence/table/chart patterns with textual interpretation;
- public URL conventions.

### W4 — Publication contract & ingestion boundary

Must preserve fields required to build durable, timestamped public-safe evidence projections without rereading sport working databases.

### W5/W6 — Board and matchup presentation

Must maintain stable concepts and terminology so public/member views do not describe the same metrics inconsistently.

### W7 — Artifact/archive system

Must define canonical metadata, indexing policy, and HTML companion surfaces for artifacts where a PDF/image alone would be a poor discoverability surface.

### W8 — Settlement/performance

Must freeze reproducible performance semantics before public discoverability pages claim model history or results.

### W9 — SEO + GEO/AEO + content + analytics

Owns the complete implementation pass:

- robots/crawler policy;
- XML sitemaps;
- canonical and redirect policy;
- metadata/structured-data components;
- search-console/webmaster verification;
- crawl/index tests;
- public methodology/glossary/content taxonomy;
- public primary-source prediction/results/performance surfaces approved by product policy;
- internal-link architecture;
- AI/search referral instrumentation;
- benchmark-query observability;
- launch validation against then-current official search/AI platform documentation.

### W12 — Launch readiness

Must prove the production domain is crawlable as intended, private/member paths remain protected, sitemaps/canonicals resolve correctly, and analytics/search verification are operational.

## 16. W9 freeze evidence

W9 is not complete until there is evidence for at least:

1. canonical/metadata tests;
2. robots and sitemap tests;
3. structured-data validation for implemented types;
4. representative server-rendered HTML inspection;
5. internal-link crawl or equivalent broken-link proof;
6. noindex/private-path regression checks;
7. search-console/webmaster verification where available;
8. public evidence/performance pages reproduced from immutable website data;
9. referral attribution checks;
10. documented review of current OpenAI, Google, Bing, and other selected provider guidance;
11. accessibility checks for discoverable public templates;
12. a written freeze decision in `docs/status/WEBSITE_STATUS.md` and `docs/DEVELOPMENT_LOG.md`.

## 17. Current official-guidance baseline

This V1 architecture was informed by official guidance available on 2026-09-02, including:

- OpenAI publisher/search guidance stating that public sites can appear in ChatGPT search, that `OAI-SearchBot` access matters for summaries/snippets, and that search placement is not guaranteed;
- OpenAI guidance distinguishing search discovery controls from `GPTBot` training controls;
- Google Search guidance stating that normal SEO fundamentals remain foundational for AI Overviews/AI Mode and that no special AI-specific schema or machine-readable file is required;
- Google's 2026 generative-AI optimization guidance emphasizing unique, non-commodity, people-first content and warning against GEO/AEO gimmicks and scaled low-value query targeting.

External-provider behavior is not repository authority. W9 and launch review must re-check the live official documentation rather than relying indefinitely on this snapshot.

## 18. Non-goals

This architecture does not promise:

- guaranteed ranking in ChatGPT, Gemini, Grok, Google, Bing, or any other system;
- guaranteed citation by a particular LLM;
- keyword stuffing;
- machine-only doorway pages;
- mass-generated query permutations;
- fake authority or fabricated external mentions;
- public disclosure of member-only or licensed data merely for crawlability;
- allowing model-training crawlers by default as a prerequisite for search discoverability;
- treating `llms.txt` as a ranking mechanism without evidence.

The objective is a durable, high-integrity source corpus that is useful enough to people that search and generative retrieval systems have strong reasons to surface it.
