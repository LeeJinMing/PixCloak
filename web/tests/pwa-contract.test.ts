import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const expectedEnglishShortcuts = ["/safe-share", "/upload-ready", "/tools/pdf-to-image", "/tools/image-to-pdf"];
const expectedChineseShortcuts = ["/zh/redact", "/zh/compress", "/zh/tools/pdf-to-image", "/zh/tools/image-to-pdf"];

async function manifest(name: string) {
  return JSON.parse(await readFile(new URL(`../public/${name}`, import.meta.url), "utf8"));
}

test("English and Chinese manifests share one app identity and expose four localized shortcuts", async () => {
  const [english, chinese] = await Promise.all([manifest("manifest.webmanifest"), manifest("manifest.zh.webmanifest")]);
  assert.equal(english.id, "/");
  assert.equal(chinese.id, english.id);
  assert.equal(english.start_url, "/");
  assert.equal(chinese.start_url, "/zh");
  assert.deepEqual(english.shortcuts.map((item: { url: string }) => item.url), expectedEnglishShortcuts);
  assert.deepEqual(chinese.shortcuts.map((item: { url: string }) => item.url), expectedChineseShortcuts);
  for (const item of [english, chinese]) {
    assert.equal(item.display, "standalone");
    assert.ok(item.icons.some((icon: { sizes: string }) => icon.sizes === "192x192"));
    assert.ok(item.icons.some((icon: { sizes: string }) => icon.sizes === "512x512"));
    assert.equal(item.shortcuts.length, 4);
  }
});

test("all manifest icons exist in the public directory", async () => {
  const [english, chinese] = await Promise.all([manifest("manifest.webmanifest"), manifest("manifest.zh.webmanifest")]);
  const paths = new Set<string>();
  for (const item of [english, chinese]) {
    for (const icon of item.icons) paths.add(icon.src);
    for (const shortcut of item.shortcuts) for (const icon of shortcut.icons || []) paths.add(icon.src);
  }
  await Promise.all([...paths].map((src) => access(new URL(`../public${src}`, import.meta.url))));
});

test("layouts link the localized manifests and mount the install experience", async () => {
  const [rootLayout, zhLayout, installSource, benefitSource, serviceWorker, consentSource] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/zh/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/PwaInstall.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/PwaBenefits.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
    readFile(new URL("../components/ConsentServices.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(rootLayout, /manifest: "\/manifest\.webmanifest"/);
  assert.match(rootLayout, /<SwRegister \/>/);
  assert.match(rootLayout, /<PwaInstall \/>/);
  assert.match(zhLayout, /manifest: "\/manifest\.zh\.webmanifest"/);
  assert.match(installSource, /安装应用/);
  assert.match(installSource, /Install app/);
  assert.match(installSource, /pwa_installed/);
  assert.match(benefitSource, /常用工具直接从桌面打开/);
  assert.match(benefitSource, /An internet connection is still required/);
  assert.doesNotMatch(benefitSource, /offline/i);
  assert.match(serviceWorker, /ASSETS\.includes\(url\.pathname\)/);
  assert.doesNotMatch(serviceWorker, /mode === "navigate"/);
  assert.doesNotMatch(consentSource, /\.unregister\(/);
});

test("home pages give the specialized upload workflow and PWA benefits a controlled hierarchy", async () => {
  const [home, zhHome] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/zh/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(home, /workflow-card--special/);
  assert.match(home, /<PwaBenefits locale="en" \/>/);
  assert.match(zhHome, /workflow-card--special/);
  assert.match(zhHome, /<PwaBenefits locale="zh" \/>/);
});

test("indexed PDF export copy matches the implemented local formats", async () => {
  const source = await readFile(new URL("../app/tools/pdf-to-image/page.tsx", import.meta.url), "utf8");
  assert.match(source, /PDF to Image—Export Pages as PNG, JPG or WebP/);
  assert.doesNotMatch(source, /public CDN|privacy guaranteed|Process images offline/);
  assert.match(source, /Choose PNG for lossless captures, or export JPEG or WebP/);
});
