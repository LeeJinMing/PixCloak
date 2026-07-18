import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3019";
const testCookie = process.env.TEST_COOKIE;
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const fixture = path.join(root, "tests", "fixtures", "coverage", "noisy-1024x768.jpg");
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
  ...(testCookie ? { extraHTTPHeaders: { cookie: testCookie } } : {}),
});
await context.addInitScript(() => {
  Object.defineProperty(Navigator.prototype, "webdriver", { configurable: true, get: () => false });
});
const page = await context.newPage();
const insightRequests = [];

page.on("request", (request) => {
  if (request.url().includes("/_vercel/insights/")) {
    insightRequests.push({ method: request.method(), url: request.url(), body: request.postData() || "" });
  }
});

try {
  await page.goto(`${origin}/upload-ready?kb=20`, { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: "Make an image fit the upload requirement", exact: true }).waitFor();
  assert.equal(await page.locator("body").getAttribute("data-analytics"), "off");
  assert.equal(await page.getByRole("button", { name: "Allow analytics", exact: true }).count(), 1, "analytics consent choice is missing");
  await page.waitForTimeout(750);
  assert.equal(insightRequests.length, 0, "Vercel Analytics loaded before consent");

  const scriptResponsePromise = page.waitForResponse((response) => response.url().includes("/_vercel/insights/script.js"));
  await page.getByRole("button", { name: "Allow analytics", exact: true }).click();
  await page.waitForFunction(() => document.body.dataset.analytics === "on");
  await page.waitForFunction(() => [...document.scripts].some((script) => script.src.includes("/_vercel/insights/")));
  const scriptResponse = await scriptResponsePromise;
  assert.equal(scriptResponse.status(), 200, `Vercel Analytics script returned ${scriptResponse.status()}; enable Web Analytics for this project`);
  const scriptContentType = scriptResponse.headers()["content-type"] || "";
  const scriptSource = await scriptResponse.text();
  assert.match(scriptContentType, /javascript/i, `Analytics script returned unexpected content type ${scriptContentType}`);
  await page.waitForTimeout(500);

  await page.locator("#file-input").setInputFiles(fixture);
  await page.getByRole("button", { name: "Compress", exact: true }).click();
  await page.waitForFunction(() => document.body.innerText.includes("under limit") && document.body.innerText.includes("verified"));
  await page.waitForTimeout(1000);

  assert.ok(
    insightRequests.some((request) => request.method === "POST"),
    `no consented Analytics event request was observed; requests: ${insightRequests.map((request) => `${request.method} ${request.url}`).join(", ")}; runtime: ${JSON.stringify(await page.evaluate(() => ({ va: typeof window.va, vam: window.vam, queueLength: Array.isArray(window.vaq) ? window.vaq.length : null })))}; scriptBytes: ${scriptSource.length}; scriptStart: ${scriptSource.slice(0, 240).replace(/\s+/g, " ")}`,
  );
  const customEventBodies = insightRequests.filter((request) => request.method === "POST").map((request) => request.body).join("\n");
  assert.doesNotMatch(customEventBodies, /noisy-1024x768\.jpg|EXIF|GPS|IPTC|XMP/i, "analytics payload contains identifying image data");
  assert.doesNotMatch(customEventBodies, /\"(?:width|height|filename|file_name|metadata)\"\s*:/i, "analytics payload contains a prohibited custom property");

  console.log(JSON.stringify({
    passed: true,
    insightRequests: insightRequests.length,
    eventRequests: insightRequests.filter((request) => request.method === "POST").length,
    consentBeforeLoad: true,
    prohibitedPropertiesObserved: false,
  }, null, 2));
} finally {
  await browser.close();
}
