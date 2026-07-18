import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium, firefox, webkit } from "playwright-core";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3019";
const testCookie = process.env.TEST_COOKIE;
const fixture = path.join(root, "tests", "fixtures", "coverage", "noisy-1024x768.jpg");
const candidates = [
  { name: "Chrome", type: chromium, path: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" },
  { name: "Edge", type: chromium, path: process.env.EDGE_PATH || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" },
  { name: "Firefox", type: firefox },
  { name: "WebKit", type: webkit },
];
const installed = candidates.filter((candidate) => !candidate.path || existsSync(candidate.path));
assert.ok(installed.length > 0, "No supported local browser found");
const results = [];

for (const candidate of installed) {
  const browser = await candidate.type.launch({ ...(candidate.path ? { executablePath: candidate.path } : {}), headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    ...(testCookie ? { extraHTTPHeaders: { cookie: testCookie } } : {}),
  });
  await context.addInitScript(() => localStorage.setItem("pixcloak-consent-v1", "essential"));
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  try {
    await page.goto(`${origin}/upload-ready?kb=20`, { waitUntil: "domcontentloaded" });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${candidate.name} upload page overflows`);
    await page.locator("#file-input").setInputFiles(fixture);
    await page.getByRole("button", { name: "Compress", exact: true }).click();
    await page.waitForFunction(() => document.body.innerText.includes("under limit") && document.body.innerText.includes("verified"));
    await page.goto(`${origin}/safe-share`, { waitUntil: "domcontentloaded" });
    await page.locator("#redact-file-input").setInputFiles(fixture);
    await page.waitForFunction(() => {
      const canvas = document.querySelector("canvas");
      return canvas instanceof HTMLCanvasElement && canvas.width > 0 && canvas.height > 0;
    });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${candidate.name} Safe Share page overflows`);
    assert.deepEqual(errors, [], `${candidate.name} page errors: ${errors.join(" | ")}`);
    results.push({ browser: candidate.name, hardCap: "passed", safeShareDecode: "passed", mobileOverflow: "passed" });
  } finally {
    await browser.close();
  }
}

console.log(JSON.stringify({ passed: results.length, results }, null, 2));
