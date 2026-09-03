# The Daily Line Design System V1

**Status:** W1 working architecture  
**Gate owner:** W1 — Design system, semantic public shell & discoverability prerequisites  
**Last updated:** 2026-09-02 PDT

## 1. Purpose

This document defines the visual, semantic, responsive, accessibility, and reusable-component architecture for The Daily Line website.

The goal is not merely to make the site look polished. The goal is to establish a durable interface system that can support:

- public editorial/discovery surfaces;
- sport landing pages;
- dense daily prediction boards;
- matchup dossiers;
- reports and infographics;
- performance/settlement history;
- member/account surfaces;
- admin/operations surfaces later;
- future sports without redesigning the product from scratch.

W1 must therefore design for both **editorial clarity** and **analytical density**.

## 2. Product visual thesis

The Daily Line should feel like a modern sports intelligence publication and professional analysis terminal—not a casino, meme account, generic SaaS dashboard, or sportsbook clone.

Primary qualities:

1. **Editorial authority** — strong hierarchy, readable explanations, restrained presentation.
2. **Analytical precision** — compact numeric information, consistent status semantics, visible provenance/time state.
3. **Sports energy without casino noise** — bold scale and yellow brand energy, but no flashing odds-board aesthetic or gratuitous neon.
4. **Transparent state** — loading, unavailable, gated, stale, corrected, and unpublished states must be visually explicit.
5. **One system across sports** — shared interface primitives with room for sport-native labels and metrics.

Working visual direction remains the existing dark editorial/data-terminal aesthetic with The Daily Line yellow as the primary brand accent.

## 3. Brand principles

### 3.1 Core brand statement

**SEE THE DATA. FIND THE EDGE.**

This is a product promise about access to analysis and evidence. It must never be presented as a guarantee of betting outcomes.

### 3.2 Brand mark usage

The compact `DL` mark may be used in navigation and tight product surfaces. The full `The Daily Line` name should remain available as text for accessibility, search/entity consistency, and contexts where the compact mark alone is ambiguous.

### 3.3 Yellow usage

Brand yellow is reserved primarily for:

- brand identity;
- primary actions;
- active/current states;
- high-value highlights;
- key numeric emphasis where semantics permit.

Yellow must not become a generic color for every positive outcome because that destroys its brand role.

## 4. Color architecture

The CSS token layer is semantic. Components should prefer semantic token names instead of hard-coded hex values.

### 4.1 Foundation tokens

- `--color-bg`: primary page background.
- `--color-surface-1`: primary raised/dense surface.
- `--color-surface-2`: secondary surface.
- `--color-surface-inverse`: light/inverse editorial panel.
- `--color-text`: primary text.
- `--color-text-muted`: secondary explanatory text.
- `--color-text-subtle`: tertiary metadata.
- `--color-border`: default divider/border.
- `--color-border-strong`: emphasized border.
- `--color-brand`: Daily Line yellow.
- `--color-brand-hover`: yellow interaction state.
- `--color-focus`: keyboard-focus indicator.

### 4.2 Semantic state tokens

Semantic colors are separate from brand color:

- `--color-positive`: favorable/passed/settled-positive state where appropriate;
- `--color-negative`: failed/negative/settled-negative state where appropriate;
- `--color-warning`: stale/caution/needs-review state;
- `--color-info`: informational state;
- `--color-neutral`: unavailable/not-applicable/unknown state.

Never rely on color alone. Every semantic state must also expose text, iconography, shape, or another non-color cue.

### 4.3 Contrast policy

Normal text, controls, and focus indicators should target WCAG AA contrast or better. Data visualizations must be reviewable independently because chart contrast differs from body-text contrast.

## 5. Typography architecture

W1 intentionally avoids making the base build dependent on a remote font request. A future self-hosted licensed/open font may replace the stack without changing semantic roles.

### 5.1 Families

- **Display / UI sans:** system sans stack for headings, navigation, and prose.
- **Data / mono:** system monospace stack for IDs, timestamps, hashes, run state, odds snapshots, and tightly aligned technical metadata.

### 5.2 Semantic roles

Typography should be expressed by role:

- `display-xl`: homepage/product hero;
- `display-lg`: primary page title;
- `heading-lg`: section title;
- `heading-md`: component/card title;
- `body-lg`: important explanatory copy;
- `body`: default prose;
- `body-sm`: secondary explanation;
- `label`: compact uppercase/semibold UI label;
- `meta`: provenance/time/version/supporting metadata;
- `data`: tabular numeric/technical content.

### 5.3 Numeric behavior

Probabilities, prices, percentages, records, scores, timestamps, and table metrics should use tabular numerals where the font supports them.

## 6. Spacing and sizing

Use a 4px-derived spacing system so component spacing remains composable.

Core progression:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120`

Avoid arbitrary one-off spacing except where optical correction is documented.

Interactive targets should generally provide at least approximately 44px of usable height/area on touch layouts.

## 7. Layout system

### 7.1 Content width

Primary site content uses a centered maximum-width shell around 1240–1280px with responsive gutters.

### 7.2 Reading measure

Long-form explanatory content should not span the full analytical canvas. Prose uses a readable measure around 65–75 characters where possible.

### 7.3 Density modes

The product needs two density modes at the component-pattern level:

- **Editorial / comfortable:** marketing, methodology, membership, reports.
- **Analytical / compact:** daily boards, matchup tables, performance, operations.

Do not solve analytical density by shrinking all text indiscriminately.

### 7.4 Breakpoints

Breakpoints should follow layout failure rather than device marketing names. Initial working bands:

- wide desktop: > 1200px;
- desktop/tablet: 900–1200px;
- compact/tablet: 640–899px;
- mobile: < 640px.

Components may use their own responsive behavior when needed.

## 8. Core reusable primitives

W1 should provide reusable primitives before later gates build feature-specific views.

### 8.1 Site shell

- `SiteHeader`
- `SiteFooter`
- `PageHeader`
- content width/container patterns
- section spacing/divider patterns

### 8.2 Navigation

Public navigation must remain semantically present and crawlable at all supported viewport sizes. Do not hide the entire information architecture on mobile merely to make the header smaller.

Primary information architecture:

- Home
- Sports
- Methodology
- Performance
- Membership
- Dashboard / member entry

Future research/content areas may be added when substantive content exists.

### 8.3 Actions

- primary button/link;
- secondary button/link;
- quiet/text link;
- destructive action later where admin/account flows require it.

Disabled appearance must not be used as a substitute for authorization.

### 8.4 Status primitives

Status chips/badges must use controlled semantic variants such as:

- brand/current;
- success;
- warning;
- danger;
- info;
- neutral.

Examples of future state labels:

- Published
- Sealed
- Corrected
- Settled
- Pending
- Stale
- Unavailable
- Gated
- AVOID
- PASS

Recommendation semantics are product/domain state and should not be conflated with generic success/error UI state.

### 8.5 Cards/surfaces

Reusable surface families:

- editorial card;
- sport/product card;
- metric/stat card;
- evidence/provenance card;
- recommendation card;
- alert/correction card;
- inverse/light editorial panel.

### 8.6 Data tables

Future board/performance tables require:

- semantic `table`, `thead`, `tbody`, `th`, `caption` use;
- keyboard-safe horizontal overflow;
- sticky headers only where tested;
- tabular numerals;
- explicit sort state when sorting exists;
- textual labels for abbreviated columns;
- responsive alternatives that preserve information rather than deleting critical columns;
- no reliance on red/green alone.

### 8.7 Evidence patterns

Prediction/performance evidence needs repeatable presentation for:

- publication timestamp;
- data cutoff;
- publication version;
- correction state;
- model probability;
- market/implied probability;
- edge/difference;
- Recommendation Gate state;
- settlement/result state;
- provenance/replay reference where public policy permits it.

The exact fields are frozen by later contracts, but W1 defines visual slots and terminology discipline now.

## 9. Application states

Every data-bearing surface must eventually support the following without inventing placeholder data:

### 9.1 Loading

Use skeleton/structural loading states. Never insert fake-looking numbers that can be confused for predictions.

### 9.2 Empty

Explain why no data exists and what action/state is expected next.

Examples:

- no sealed publication yet;
- no games on slate;
- no settled history in selected range.

### 9.3 Unavailable

Distinguish temporary provider/system unavailability from a legitimate empty state.

### 9.4 Stale

If freshness matters, surface the age/cutoff and label the state. Do not silently display stale data as current.

### 9.5 Gated

A gated UI may explain that membership is required, but server authorization remains authoritative. Client rendering never becomes the security boundary.

### 9.6 Error

Errors should state what failed in user-meaningful terms without exposing secrets or internal stack traces.

### 9.7 Correction

Corrected publications/results should surface correction/version information. Never silently overwrite historical claims.

## 10. Accessibility requirements

W0 provides source smoke checks. W1 expands the accessibility contract.

Required behavior:

- visible `:focus-visible` treatment;
- semantic headings and landmarks;
- one logical primary `main` region per page;
- navigation labels where multiple nav regions exist;
- keyboard-accessible interactive controls;
- reduced-motion preference support;
- adequate touch targets;
- non-color status cues;
- descriptive link text;
- accessible names for icon-only controls;
- table semantics for analytical data;
- live-region use only where truly needed;
- no forced motion for essential comprehension.

Before W1 freezes, add browser/component accessibility coverage appropriate to interactive UI.

## 11. Motion

Motion is restrained and informational.

Allowed purposes:

- focus/hover feedback;
- disclosure/open-close transitions;
- state changes;
- subtle entrance where it does not delay comprehension.

Avoid:

- continuous casino-style animation;
- flashing odds/pick emphasis;
- motion required to understand data;
- large parallax effects on analytical surfaces.

Honor `prefers-reduced-motion`.

## 12. Public discoverability primitives

W1 owns the primitives needed by later W9 work.

### 12.1 Stable public URLs

Top-level public concepts receive stable paths rather than depending only on homepage anchors.

Initial public IA:

- `/`
- `/sports`
- `/sports/{sport}`
- `/methodology`
- `/performance`
- `/membership`

Member surfaces such as `/dashboard` are separate from public discovery surfaces.

### 12.2 Metadata helper

Use a central site configuration/helper for:

- page titles;
- descriptions;
- canonical URLs;
- Open Graph basics;
- robots indexing intent.

Do not copy/paste inconsistent metadata objects across dozens of pages.

### 12.3 Indexability policy

A route should not be indexed merely because it exists.

Thin placeholder/data-not-yet-available surfaces may use `noindex` until substantive public content is present. This is especially important for performance and sport pages before real public-safe publication evidence exists.

### 12.4 Semantic HTML

Important public claims and explanations must exist in crawlable/rendered HTML rather than only inside opaque client-state widgets.

## 13. Public vs. member visual relationship

The Daily Line should feel like one product with two density modes, not two unrelated websites.

Public/editorial surfaces emphasize:

- explanation;
- methodology;
- evidence context;
- product discovery;
- long-form readability.

Member surfaces emphasize:

- current slate;
- recommendation/evidence density;
- filters and state;
- quick scanning;
- personal entitlements/preferences later.

Both share typography, color, spacing, status language, and provenance patterns.

## 14. Content and terminology rules

Use consistent terms across surfaces:

- model probability;
- implied probability;
- no-vig probability where actually computed;
- market price/line;
- model vs. market;
- edge/difference only with an exact defined calculation;
- confidence only with a defined model/product meaning;
- Recommendation Gate;
- PASS;
- AVOID;
- publication time;
- data cutoff;
- settlement;
- correction/version.

Do not use a visually impressive label if the backend contract does not define what it means.

## 15. W1 implementation sequence

Recommended sequence:

1. freeze CSS design tokens and global accessibility primitives;
2. add site configuration and reusable metadata helper;
3. refactor site header/navigation to preserve public IA on mobile;
4. add shared footer/page-header/status/empty-state primitives;
5. establish stable top-level public routes;
6. refactor homepage/dashboard/sport shells onto shared primitives;
7. add representative loading/empty/error/gated/correction patterns;
8. add browser/component accessibility tooling and tests;
9. verify responsive behavior and semantic/canonical metadata;
10. update W1 status and perform freeze review.

## 16. W1 freeze criteria

W1 is not frozen until:

- design tokens are documented and implemented;
- public navigation/IA is stable and responsive;
- reusable primitives replace obvious one-off duplication;
- canonical/metadata primitives exist;
- public/member visual language is coherent;
- representative application states exist;
- keyboard/focus/reduced-motion behavior is implemented;
- browser/component accessibility coverage is added;
- typecheck/lint/tests/build pass locally and in CI;
- no W0 invariant regresses;
- material changes are logged.
