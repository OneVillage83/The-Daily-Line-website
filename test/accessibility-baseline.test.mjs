import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const layout = await source("../src/app/layout.tsx");
const styles = await source("../src/app/globals.css");
const header = await source("../src/components/site-header.tsx");

const majorSurfaces = await Promise.all([
  source("../src/app/page.tsx"),
  source("../src/app/dashboard/page.tsx"),
  source("../src/app/sports/page.tsx"),
  source("../src/app/sports/[sport]/page.tsx"),
  source("../src/app/methodology/page.tsx"),
  source("../src/app/performance/page.tsx"),
  source("../src/app/membership/page.tsx"),
]);

test("root document declares the site language", () => {
  assert.match(layout, /<html\s+lang="en">/);
});

test("root shell provides a keyboard skip link", () => {
  assert.match(layout, /className="skip-link"\s+href="#main-content"/);
});

test("primary navigation has an accessible label", () => {
  assert.match(header, /<nav[^>]+aria-label="Primary navigation"/);
});

test("brand home link has an explicit accessible name", () => {
  assert.match(header, /aria-label="The Daily Line home"/);
});

test("primary public information architecture remains in semantic navigation", () => {
  for (const href of ["/sports", "/methodology", "/performance", "/membership", "/dashboard"]) {
    assert.match(header, new RegExp(`href:\\s*\"${href}\"|href=\"${href}\"`));
  }
});

test("major application surfaces expose the skip-link target on main", () => {
  for (const surface of majorSurfaces) {
    assert.match(surface, /<main\s+id="main-content">/);
  }
});

test("current public shell does not use empty hash links", () => {
  for (const surface of [header, ...majorSurfaces]) {
    assert.doesNotMatch(surface, /href="#"/);
  }
});

test("global styles provide visible keyboard focus treatment", () => {
  assert.match(styles, /:focus-visible\s*\{/);
  assert.match(styles, /--color-focus:/);
});

test("global styles honor reduced-motion preferences", () => {
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});
