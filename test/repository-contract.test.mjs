import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const packageJson = JSON.parse(await source("../package.json"));
const sportsSource = await source("../src/lib/sports.ts");
const siteSource = await source("../src/lib/site.ts");
const performancePage = await source("../src/app/performance/page.tsx");
const dashboardPage = await source("../src/app/dashboard/page.tsx");
const sportPage = await source("../src/app/sports/[sport]/page.tsx");

const initialSports = [
  ["mlb", "Daily-MLB"],
  ["nfl", "Daily-NFL"],
  ["ncaaf", "Daily-NCAAF"],
];

test("Node runtime remains on the supported Node 24 line", () => {
  assert.equal(packageJson.engines.node, ">=24.0.0 <25");
});

test("foundation verification scripts remain defined", () => {
  for (const script of ["build", "lint", "typecheck", "test", "format:check", "verify"]) {
    assert.equal(typeof packageJson.scripts[script], "string", `${script} script must exist`);
  }
});

test("initial sport registry includes MLB, NFL, and NCAAF", () => {
  for (const [slug, productName] of initialSports) {
    assert.match(sportsSource, new RegExp(`slug:\\s*\"${slug}\"`));
    assert.match(sportsSource, new RegExp(`productName:\\s*\"${productName}\"`));
  }
});

test("website package does not introduce direct SQLite pipeline access", () => {
  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  for (const forbiddenDependency of ["better-sqlite3", "sqlite3", "sql.js"]) {
    assert.equal(
      Object.hasOwn(allDependencies, forbiddenDependency),
      false,
      `${forbiddenDependency} would violate the website publication boundary`,
    );
  }
});

test("W1 metadata helper centralizes canonical and Open Graph primitives", () => {
  assert.match(siteSource, /alternates:\s*\{/);
  assert.match(siteSource, /canonical/);
  assert.match(siteSource, /openGraph:\s*\{/);
  assert.match(siteSource, /robots:/);
});

test("thin or private-adjacent W1 surfaces remain noindex until authoritative", () => {
  assert.match(performancePage, /index:\s*false/);
  assert.match(dashboardPage, /index:\s*false/);
  assert.match(sportPage, /index:\s*false/);
});

test("W1 stable public route files exist", async () => {
  for (const path of [
    "../src/app/sports/page.tsx",
    "../src/app/methodology/page.tsx",
    "../src/app/performance/page.tsx",
    "../src/app/membership/page.tsx",
  ]) {
    const contents = await source(path);
    assert.ok(contents.length > 0, `${path} must be readable`);
  }
});
