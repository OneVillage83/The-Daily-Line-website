import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const host = "127.0.0.1";
const port = 3210;
const baseUrl = `http://${host}:${port}`;
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

let stdout = "";
let stderr = "";

const server = spawn(
  npmCommand,
  ["run", "start", "--", "--hostname", host, "--port", String(port)],
  {
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

server.stdout.on("data", (chunk) => {
  stdout += chunk.toString();
});

server.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js server exited before readiness.\n${stdout}\n${stderr}`);
    }

    try {
      const response = await fetch(`${baseUrl}/`, { redirect: "manual" });
      if (response.ok) return;
    } catch {
      // Expected while the production server is starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Timed out waiting for production server.\n${stdout}\n${stderr}`);
}

async function fetchPage(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  return {
    response,
    html: await response.text(),
  };
}

function assertCommonShell(html, path) {
  assert.match(html, /<html[^>]+lang="en"/i, `${path} must declare English document language`);
  assert.match(html, /href="#main-content"[^>]*>\s*Skip to main content/i, `${path} must expose the skip link`);
  assert.match(html, /<main[^>]+id="main-content"/i, `${path} must expose the main landmark target`);
  assert.match(html, /<nav[^>]+aria-label="Primary navigation"/i, `${path} must expose primary navigation`);

  for (const href of ["/sports", "/methodology", "/performance", "/membership", "/dashboard"]) {
    assert.match(html, new RegExp(`href="${href.replace("/", "\\/")}"`), `${path} must link to ${href}`);
  }
}

function assertCanonical(html, expectedUrl, path) {
  assert.match(html, /<link[^>]+rel="canonical"/i, `${path} must emit a canonical link`);
  assert.ok(html.includes(expectedUrl), `${path} canonical must reference ${expectedUrl}`);
}

function assertIndexable(html, path) {
  assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i, `${path} must not emit noindex`);
}

function assertNoIndex(html, path) {
  assert.match(html, /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i, `${path} must emit noindex`);
}

try {
  await waitForServer();

  const publicPages = [
    ["/sports", "https://thedailyline.bet/sports"],
    ["/methodology", "https://thedailyline.bet/methodology"],
    ["/membership", "https://thedailyline.bet/membership"],
  ];

  for (const [path, canonical] of publicPages) {
    const { response, html } = await fetchPage(path);
    assert.equal(response.status, 200, `${path} must render successfully`);
    assertCommonShell(html, path);
    assertCanonical(html, canonical, path);
    assertIndexable(html, path);
  }

  const noIndexPages = [
    ["/performance", "https://thedailyline.bet/performance"],
    ["/dashboard", "https://thedailyline.bet/dashboard"],
    ["/sports/mlb", "https://thedailyline.bet/sports/mlb"],
    ["/sports/nfl", "https://thedailyline.bet/sports/nfl"],
    ["/sports/ncaaf", "https://thedailyline.bet/sports/ncaaf"],
  ];

  for (const [path, canonical] of noIndexPages) {
    const { response, html } = await fetchPage(path);
    assert.equal(response.status, 200, `${path} must render successfully`);
    assertCommonShell(html, path);
    assertCanonical(html, canonical, path);
    assertNoIndex(html, path);
  }

  const performance = await fetchPage("/performance");
  assert.match(performance.html, /<table[^>]*class="data-table"/i, "performance must render the semantic table primitive");
  assert.match(performance.html, /<caption>/i, "performance table must render a caption");
  assert.match(performance.html, /scope="col"/i, "performance table must render column-header scope");
  assert.match(performance.html, /role="region"[^>]+tabindex="0"/i, "performance table overflow must be keyboard focusable");
  assert.match(performance.html, /aria-busy="true"/i, "loading state must render aria-busy");
  assert.doesNotMatch(performance.html, /\b\d{1,3}\.\d+%\b/, "performance shell must not render fabricated percentage metrics");

  const missing = await fetchPage("/this-route-does-not-exist");
  assert.equal(missing.response.status, 404, "unknown route must return HTTP 404");
  assertCommonShell(missing.html, "/this-route-does-not-exist");
  assert.match(missing.html, /That Daily Line page does not exist/i, "404 must render the branded not-found state");

  console.log("Rendered production-page checks passed.");
} finally {
  if (server.exitCode === null) {
    server.kill("SIGTERM");
  }
}
