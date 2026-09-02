import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const sportsSource = await readFile(new URL("../src/lib/sports.ts", import.meta.url), "utf8");

const initialSports = [
  ["mlb", "Daily-MLB"],
  ["nfl", "Daily-NFL"],
  ["ncaaf", "Daily-NCAAF"],
];

test("Node runtime remains on the supported Node 24 line", () => {
  assert.equal(packageJson.engines.node, ">=24.0.0 <25");
});

test("W0 verification scripts are defined", () => {
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
