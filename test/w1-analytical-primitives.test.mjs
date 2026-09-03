import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dataState = await readFile(new URL("../src/components/data-state-panel.tsx", import.meta.url), "utf8");
const dataTable = await readFile(new URL("../src/components/data-table.tsx", import.meta.url), "utf8");
const evidencePanel = await readFile(new URL("../src/components/evidence-panel.tsx", import.meta.url), "utf8");
const metricBlock = await readFile(new URL("../src/components/metric-block.tsx", import.meta.url), "utf8");
const analyticsCss = await readFile(new URL("../src/app/w1-analytics.css", import.meta.url), "utf8");
const performancePage = await readFile(new URL("../src/app/performance/page.tsx", import.meta.url), "utf8");

const requiredStates = ["loading", "empty", "unavailable", "stale", "gated", "error", "corrected"];

test("analytical state primitive defines every W1 data state", () => {
  for (const state of requiredStates) {
    assert.match(dataState, new RegExp(`\\b${state}:`), `${state} state must have presentation semantics`);
  }
  assert.match(dataState, /aria-busy=\{isLoading \|\| undefined\}/);
});

test("analytical table preserves semantic table structure", () => {
  for (const token of ["<table", "<caption>", "<thead>", "<tbody>", 'scope="col"', 'scope="row"']) {
    assert.match(dataTable, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(dataTable, /role="region"/);
  assert.match(dataTable, /tabIndex=\{0\}/);
});

test("evidence presentation uses definition-list semantics", () => {
  assert.match(evidencePanel, /<dl/);
  assert.match(evidencePanel, /<dt>/);
  assert.match(evidencePanel, /<dd>/);
});

test("metric and table styles use tabular numeric behavior", () => {
  assert.match(analyticsCss, /font-variant-numeric:\s*tabular-nums/);
  assert.match(metricBlock, /metric-value/);
});

test("loading skeleton respects reduced motion", () => {
  assert.match(analyticsCss, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(analyticsCss, /\.data-state-skeleton span/);
  assert.match(analyticsCss, /animation:\s*none/);
});

test("performance shell exercises state and evidence contracts without fabricated metrics", () => {
  for (const state of requiredStates) {
    assert.match(performancePage, new RegExp(`kind=\\"${state}\\"`));
  }
  assert.match(performancePage, /value="Not published"/);
  assert.match(performancePage, /rows=\{\[\]\}/);
  assert.doesNotMatch(performancePage, /\b\d{1,3}\.\d+%\b/);
  assert.doesNotMatch(performancePage, /\bROI\s*[:=]\s*-?\d/i);
});
