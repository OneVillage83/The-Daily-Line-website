import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const layout = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
const header = await readFile(new URL("../src/components/site-header.tsx", import.meta.url), "utf8");
const home = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const dashboard = await readFile(new URL("../src/app/dashboard/page.tsx", import.meta.url), "utf8");

test("root document declares the site language", () => {
  assert.match(layout, /<html\s+lang="en">/);
});

test("primary navigation has an accessible label", () => {
  assert.match(header, /<nav[^>]+aria-label="Primary navigation"/);
});

test("brand home link has an explicit accessible name", () => {
  assert.match(header, /aria-label="The Daily Line home"/);
});

test("major application surfaces expose a main landmark", () => {
  assert.match(home, /<main>/);
  assert.match(dashboard, /<main>/);
});

test("current public shell does not use empty hash links", () => {
  assert.doesNotMatch(home, /href="#"/);
  assert.doesNotMatch(header, /href="#"/);
});
