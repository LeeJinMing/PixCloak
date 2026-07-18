import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const origin = process.env.TEST_ORIGIN || "http://127.0.0.1:3019";
const testCookie = process.env.TEST_COOKIE;
const executablePath = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
  ...(testCookie ? { extraHTTPHeaders: { cookie: testCookie } } : {}),
});
const pages = ["/", "/safe-share", "/upload-ready"];
const results = [];

try {
  for (const path of pages) {
    const page = await context.newPage();
    await page.addInitScript(() => {
      window.__pixcloakVitals = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        window.__pixcloakVitals.lcp = entries.at(-1)?.startTime || 0;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__pixcloakVitals.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(`${origin}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const interactionMs = await page.evaluate(async () => {
      const target = document.querySelector("a, button");
      if (!target) return 0;
      const started = performance.now();
      target.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
      target.dispatchEvent(new PointerEvent("pointerup", { bubbles: true }));
      return new Promise((resolve) => requestAnimationFrame(() => resolve(performance.now() - started)));
    });
    const vitals = await page.evaluate(() => window.__pixcloakVitals);
    assert.ok(vitals.lcp > 0 && vitals.lcp <= 2500, `${path} LCP ${vitals.lcp.toFixed(1)}ms exceeds 2500ms`);
    assert.ok(vitals.cls <= 0.1, `${path} CLS ${vitals.cls.toFixed(4)} exceeds 0.1`);
    assert.ok(interactionMs <= 200, `${path} interaction latency ${interactionMs.toFixed(1)}ms exceeds 200ms`);
    const adReservation = await page.evaluate(() => {
      document.body.dataset.adsAvailable = "true";
      const heights = [...document.querySelectorAll("[data-ad-placeholder]")].map((element) => element.getBoundingClientRect().height);
      document.body.dataset.adsAvailable = "false";
      return heights;
    });
    assert.ok(adReservation.every((height) => height >= 120), `${path} ad slots do not reserve 120px when ads are available`);
    results.push({ path, lcpMs: Math.round(vitals.lcp), cls: Number(vitals.cls.toFixed(4)), interactionProxyMs: Math.round(interactionMs), adReservation });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ passed: results.length, note: "Interaction latency is a lab proxy; production INP requires field data.", results }, null, 2));
