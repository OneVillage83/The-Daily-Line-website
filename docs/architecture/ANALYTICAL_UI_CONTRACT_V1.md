# The Daily Line Analytical UI Contract V1

**Status:** W1 working architecture  
**Gate owner:** W1 — Design system, semantic public shell & discoverability prerequisites  
**Created:** 2026-09-03 PDT

## 1. Purpose

This document defines the reusable analytical presentation contract for The Daily Line website.

It exists so later Daily-MLB, Daily-NFL, Daily-NCAAF, publication-ingestion, settlement, performance, and member-surface work can populate a stable interface instead of inventing new visual semantics per sport or per page.

W1 owns **presentation roles and state behavior**. W1 does not invent backend meaning.

Later gates remain authoritative for:

- exact publication fields and hashing/version semantics — W4;
- sport-board field mappings and sport-native extensions — W5;
- matchup/recommendation meaning — W6;
- report/archive artifact behavior — W7;
- settlement/performance calculations — W8;
- public indexing/structured-data/crawler policy — W9;
- production operational proof — W12.

## 2. Non-negotiable separation of concerns

The interface must distinguish three different categories that are easy to accidentally collapse:

1. **Domain state** — facts about the sports-analysis product, such as PASS, AVOID, model probability, market price, publication version, settlement result.
2. **Interface/data-delivery state** — loading, empty, unavailable, stale, gated, error, corrected.
3. **Authorization state** — whether the server permits the current user to receive protected data.

These categories must not be visually or semantically substituted for one another.

Examples:

- PASS is not generic green success UI.
- AVOID is not generic red error UI.
- Gated rendering may explain access requirements but does not authorize access.
- Corrected is not an error state; it is a version/provenance state.
- Empty is not unavailable.
- Stale is not current just because values still render.

## 3. Implemented W1 primitives

### 3.1 `MetricBlock`

Purpose: compact presentation of one analytical role.

Current slots:

- label;
- value;
- optional detail/context;
- optional status;
- optional monospace value treatment.

Rules:

- numeric content uses tabular-numeral styling;
- labels describe the metric rather than marketing language;
- values are supplied by later authoritative contracts;
- a missing value must be represented as an explicit state such as `Not published` or `Unavailable`, never a plausible fake number;
- confidence, edge, no-vig probability, ROI, or similar values must not be displayed until their calculation is frozen by the responsible gate.

### 3.2 `EvidencePanel`

Purpose: repeatable provenance/replay presentation.

Uses semantic definition-list structure (`dl`, `dt`, `dd`).

Expected later field families include:

- publication time;
- data cutoff;
- publication version;
- correction state;
- model/version reference where public policy permits;
- source-run/replay reference where public policy permits;
- settlement version/state where relevant.

W1 defines the layout only. W4/W8 define exact field authority.

### 3.3 `DataTable`

Purpose: dense analytical tabular presentation without sacrificing semantics or narrow-screen access.

Required behavior implemented in the primitive:

- semantic `table`;
- semantic `caption`;
- `thead` and `tbody`;
- `scope="col"` column headers;
- `scope="row"` first-cell row headers;
- optional column descriptions;
- tabular-numeral styling;
- explicit empty-row presentation;
- horizontally scrollable wrapper;
- focusable scroll region for keyboard users;
- no automatic deletion of critical columns at narrow widths.

Future sorting/filtering must add explicit accessible sort/filter state rather than relying on visual arrows alone.

### 3.4 `DataStatePanel`

Purpose: explicit presentation of data-bearing surface state.

Controlled W1 states:

| State | Meaning | Must not be confused with |
| --- | --- | --- |
| `loading` | Structure is being retrieved/computed for display | fake placeholder data |
| `empty` | The requested valid view contains no records | provider/system failure |
| `unavailable` | Expected data cannot currently be supplied | legitimate empty slate |
| `stale` | Displayed/available state missed its freshness requirement | current data |
| `gated` | User-facing explanation that protected content requires access | authorization itself |
| `error` | The requested function failed | AVOID/domain-negative result |
| `corrected` | A later version supersedes an earlier publication/result | silent overwrite or generic failure |

Every state exposes a textual label and a non-color marker. Color is supplemental only.

## 4. Loading contract

Loading states must preserve layout comprehension without inserting plausible sports numbers.

Allowed:

- neutral structural bars;
- labels such as `Loading`;
- `aria-busy` on the affected region where appropriate;
- stable layout dimensions that reduce movement.

Forbidden:

- sample probabilities;
- sample odds;
- fake team names presented as live data;
- fake records;
- animated casino-style tickers;
- skeleton motion that ignores `prefers-reduced-motion`.

The W1 skeleton animation becomes static under reduced-motion preference.

## 5. Empty contract

An empty state means the query/view is valid but contains no records.

Examples:

- no sealed publication yet;
- no games on the selected slate;
- no settled rows in the selected range;
- no artifact of the requested kind.

An empty surface should explain why the absence is expected when that reason is known.

## 6. Unavailable contract

Unavailable means data was expected but cannot currently be supplied.

Examples may later include:

- upstream provider unavailable;
- accepted publication artifact missing required projection material;
- website read-model projection temporarily unavailable.

User-facing copy must avoid exposing tokens, stack traces, private infrastructure names, or security-sensitive internals.

Unavailable must never silently downgrade to an empty result.

## 7. Stale-data contract

Freshness-sensitive content must not silently remain visually current after its freshness requirement is missed.

When exact contract fields exist, a stale surface should expose relevant context such as:

- as-of timestamp;
- data cutoff;
- publication timestamp;
- last successful refresh;
- stale reason where safe and useful.

W1 owns visual treatment. Later gates define which timestamps are authoritative for each product surface.

## 8. Gated contract

A gated component is explanatory UI only.

Rules:

- server-side authorization decides whether protected data is returned;
- gated UI may describe the required sport/bundle membership;
- client-side state must not contain hidden protected payloads merely because CSS does not show them;
- public crawlers must not receive protected licensed/member data through an alternate rendering path;
- later W2/W3 work owns identity and entitlement authority.

## 9. Error contract

Errors communicate that the requested function failed.

Rules:

- explain the failed user task rather than dumping internal exception text;
- offer a retry/navigation action only when it is meaningful;
- preserve correlation/reference IDs only if they are safe and useful for support;
- do not expose secrets, environment variables, SQL, private service URLs, or stack traces;
- do not use an error state for a model recommendation such as AVOID.

## 10. Correction contract

Corrections are provenance/version events.

The interface must eventually be capable of presenting:

- that a correction exists;
- which version is current;
- relationship to the superseded publication/result;
- correction time/reason where policy permits;
- preserved original historical evidence.

The corrected state must never imply that the original publication has been deleted from audit history.

W4/W8 freeze the exact correction identity and persistence semantics.

## 11. Metric terminology contract

W1 reserves consistent display roles for the following terms but does not define their formulas:

- model probability;
- implied probability;
- no-vig probability;
- market price/line;
- model vs. market;
- edge/difference;
- confidence;
- Recommendation Gate;
- PASS;
- AVOID;
- publication time;
- data cutoff;
- settlement;
- correction/version.

If a later backend does not define one of these terms precisely, the website must omit or relabel that field rather than infer a meaning from appearance.

## 12. Sport-native semantics

Shared primitives do not require identical fields across sports.

The common layer provides:

- layout;
- metadata slots;
- state behavior;
- typography;
- evidence patterns;
- accessibility behavior.

Sport repositories remain free to expose sport-native metrics and market types through explicit extensions.

Examples of false equivalence to avoid:

- forcing baseball pitcher state into an NFL quarterback-shaped field;
- treating all market types as if they settle identically;
- using one generic `confidence` concept for unrelated model outputs without a common definition.

## 13. Performance-shell W1 demonstration policy

The current `/performance` route is `noindex` and contains no fabricated performance record.

W1 uses it to demonstrate the analytical contract with explicit non-values such as:

- `Not published`;
- `Not available`;
- `Awaiting sealed publication`;
- an empty data table with defined columns but zero rows.

This is intentional. The route remains non-authoritative until W8 freezes settlement/performance semantics and real accepted evidence exists.

## 14. Accessibility contract

Analytical primitives must preserve:

- semantic structure;
- keyboard focus visibility;
- non-color state cues;
- tabular numerals for scanability;
- usable horizontal overflow;
- touch-safe controls when actions exist;
- reduced-motion support;
- descriptive labels and captions;
- explicit empty/state text.

Source-level W1 tests currently guard the semantic markup and CSS behavior. Browser/component accessibility automation remains a W1 freeze prerequisite and is not satisfied by source tests alone.

## 15. Responsive contract

Analytical density changes by layout failure, not by deleting meaning.

Current behavior:

- metric grids reduce from four columns to two and then one;
- state grids reduce from three columns to two and then one;
- evidence definition rows stack on narrow screens;
- tables retain columns and use horizontal scrolling;
- text remains readable without globally shrinking the application.

Later sport-specific board designs may introduce alternate card/table presentations only if information parity is preserved.

## 16. Security and privacy boundaries

These components are presentation primitives and must never weaken W0 boundaries.

They must not:

- query mutable Daily sport working databases;
- bypass the sealed publication ingestion boundary;
- authorize users;
- expose secrets;
- expose licensed/private fields to public surfaces merely for search visibility;
- silently mutate historical publication evidence.

## 17. Test authority

W1 source-contract tests cover:

- presence of all controlled data states;
- loading `aria-busy` behavior;
- semantic table/caption/header structure;
- keyboard-focusable table overflow region;
- definition-list evidence semantics;
- tabular-numeral styling;
- reduced-motion skeleton behavior;
- representative non-fabricated Performance-shell examples.

These tests supplement, but do not replace, later browser/component accessibility testing and local responsive visual proof.

## 18. Remaining W1 work after this contract

Before W1 freeze:

1. complete browser/component accessibility testing strategy and implementation;
2. prove rendered keyboard/focus behavior;
3. perform desktop/tablet/mobile visual review of the shared shell and analytical primitives;
4. correct any browser-level accessibility or responsive defects;
5. run final local `npm ci`, audit, full verification, and visual/browser proof;
6. obtain clean CI on the final W1 candidate;
7. create a durable W1 freeze record with exact evidence commit/run.
