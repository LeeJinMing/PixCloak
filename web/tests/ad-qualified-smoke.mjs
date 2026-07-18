import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const origin = process.env.TEST_ORIGIN;
assert.ok(origin, "TEST_ORIGIN is required");

const response = await fetch(`${origin}/guides/compress-image-under-100kb`);
const html = await response.text();
assert.equal(response.headers.has("content-security-policy"), false, "ads-qualified build must not send the incompatible resource CSP");
assert.match(response.headers.get("strict-transport-security") || "", /max-age=/i);
assert.match(html, /data-ads-available="true"/);
assert.match(html, /name="google-adsense-account" content="ca-pub-1234567890123456"/);

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});

try {
  const pendingContext = await browser.newContext();
  const pendingPage = await pendingContext.newPage();
  await pendingPage.route(/pagead2\.googlesyndication\.com/, (route) => route.abort());
  await pendingPage.goto(`${origin}/guides/compress-image-under-100kb`, { waitUntil: "networkidle" });
  assert.equal(await pendingPage.locator('script[src*="pagead2.googlesyndication.com"]').count(), 0, "AdSense loaded before consent");
  assert.equal(await pendingPage.locator("body").getAttribute("data-ads"), "off");
  assert.equal(await pendingPage.locator("[data-ad-placeholder]").count(), 2);
  assert.equal(await pendingPage.locator("[data-ad-placeholder].ad-slot-after-answer").evaluate((element) => element.getBoundingClientRect().height), 120);
  await pendingContext.close();

  const allowedContext = await browser.newContext();
  await allowedContext.addInitScript(() => localStorage.setItem("pixcloak-consent-v1", "all"));
  const allowedPage = await allowedContext.newPage();
  await allowedPage.route(/pagead2\.googlesyndication\.com/, (route) => route.abort());
  await allowedPage.goto(`${origin}/guides/compress-image-under-100kb`, { waitUntil: "domcontentloaded" });
  await allowedPage.waitForFunction(() => document.body.dataset.ads === "on");
  await allowedPage.waitForFunction(() => document.querySelector('script[src*="pagead2.googlesyndication.com"]'));
  assert.equal(await allowedPage.locator("ins.adsbygoogle").count(), 2);
  assert.equal(await allowedPage.locator('.ad-slot-after-answer ins.adsbygoogle').getAttribute("data-ad-slot"), "1234567890");

  for (const path of ["/", "/safe-share", "/upload-ready", "/compress", "/privacy", "/embed/compress", "/tools/aspect-pad", "/not-a-real-page"]) {
    await allowedPage.goto(`${origin}${path}`, { waitUntil: "domcontentloaded" });
    assert.equal(await allowedPage.locator("[data-ad-placeholder]").count(), 0, `${path} must not contain ads`);
  }
  await allowedContext.close();
} finally {
  await browser.close();
}

console.log("Ads-qualified production smoke passed: consent, guide-only slots, CSP mode, and excluded pages verified.");
