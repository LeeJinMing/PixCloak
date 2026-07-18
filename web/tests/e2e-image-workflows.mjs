import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import JSZip from "jszip";
import { PDFDocument } from "pdf-lib";
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixtures = path.join(root, "tests", "fixtures", "coverage");
const baseUrl = process.env.PIXCLOAK_E2E_URL || "http://127.0.0.1:3019";
const testCookie = process.env.TEST_COOKIE;
const chrome = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const temp = path.join(os.tmpdir(), "pixcloak-e2e");
await mkdir(temp, { recursive: true });
const pdfFixturePath = path.join(temp, "two-page-source.pdf");
const pdfFixture = await PDFDocument.create();
pdfFixture.addPage([320, 240]).drawText("PixCloak page one", { x: 40, y: 140, size: 20 });
pdfFixture.addPage([240, 320]).drawText("PixCloak page two", { x: 35, y: 180, size: 18 });
await writeFile(pdfFixturePath, await pdfFixture.save());

const browser = await chromium.launch({ executablePath: chrome, headless: true, args: ["--no-sandbox", "--disable-gpu"] });
const context = await browser.newContext({
  acceptDownloads: true,
  viewport: { width: 1280, height: 900 },
  ...(testCookie ? { extraHTTPHeaders: { cookie: testCookie } } : {}),
});
await context.addInitScript(() => localStorage.setItem("pixcloak-consent-v1", "essential"));
const page = await context.newPage();
const imageUploads = [];
const browserErrors = [];
page.on("console", (message) => { if (["error", "warning"].includes(message.type())) browserErrors.push(`${message.type()}: ${message.text()}`); });
page.on("pageerror", (error) => browserErrors.push(`pageerror: ${error.message}`));
page.on("request", (request) => {
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) imageUploads.push({ method: request.method(), url: request.url(), bytes: request.postDataBuffer()?.length || 0 });
});

async function resultDetails() {
  await page.waitForFunction(() => {
    const image = document.querySelector('img[alt="compressed-0"]');
    return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
  });
  return page.evaluate(() => {
    const image = document.querySelector('img[alt="compressed-0"]');
    const link = image?.closest("a[download]");
    const text = image?.parentElement?.parentElement?.innerText || "";
    if (!(image instanceof HTMLImageElement) || !(link instanceof HTMLAnchorElement)) return null;
    const sizeMatch = text.match(/([\d.]+)\s*(B|KB|MB)/i);
    if (!sizeMatch) return null;
    const value = Number(sizeMatch[1]);
    const unit = sizeMatch[2].toUpperCase();
    const size = unit === "MB" ? value * 1024 * 1024 : unit === "KB" ? value * 1024 : value;
    return { size, type: link.download.endsWith(".jpg") || link.download.endsWith(".jpeg") ? "image/jpeg" : link.download.endsWith(".webp") ? "image/webp" : "image/png", width: image.naturalWidth, height: image.naturalHeight, text };
  });
}

async function waitForRedactionCanvas(width = 1024, height = 768) {
  await page.waitForFunction(({ expectedWidth, expectedHeight }) => {
    const element = document.querySelector("canvas");
    return element instanceof HTMLCanvasElement && element.width === expectedWidth && element.height === expectedHeight;
  }, { expectedWidth: width, expectedHeight: height });
  const canvas = page.locator("canvas");
  await canvas.scrollIntoViewIfNeeded();
  return canvas;
}

async function drawRedaction(canvas, start = 0.2, end = 0.4) {
  const box = await canvas.boundingBox();
  assert.ok(box, "redaction canvas missing");
  await page.mouse.move(box.x + box.width * start, box.y + box.height * start);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * end, box.y + box.height * end, { steps: 5 });
  await page.mouse.up();
  await page.waitForFunction(() => {
    const button = Array.from(document.querySelectorAll("button")).find((item) => item.textContent?.trim() === "Clear");
    return button instanceof HTMLButtonElement && !button.disabled;
  });
}

async function redactionRegionMetrics() {
  return page.locator("canvas").evaluate((canvas) => {
    if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Canvas unavailable");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context unavailable");
    const x = Math.round(canvas.width * 0.22);
    const y = Math.round(canvas.height * 0.22);
    const width = Math.round(canvas.width * 0.16);
    const height = Math.round(canvas.height * 0.16);
    const { data } = ctx.getImageData(x, y, width, height);
    const colors = new Set();
    let adjacentDelta = 0;
    let adjacentPairs = 0;
    for (let row = 0; row < height; row += 1) {
      for (let column = 0; column < width; column += 1) {
        const index = (row * width + column) * 4;
        colors.add(`${data[index]},${data[index + 1]},${data[index + 2]}`);
        if (column + 1 < width) {
          const next = index + 4;
          adjacentDelta += Math.abs(data[index] - data[next]) + Math.abs(data[index + 1] - data[next + 1]) + Math.abs(data[index + 2] - data[next + 2]);
          adjacentPairs += 1;
        }
      }
    }
    return { uniqueColors: colors.size, adjacentDelta: adjacentDelta / Math.max(1, adjacentPairs) };
  });
}

const checks = [];
try {
  for (const kb of [100, 200, 500, 1024]) {
    await page.goto(`${baseUrl}/upload-ready?kb=${kb}`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction((expected) => {
      const targetLabel = Array.from(document.querySelectorAll("label")).find((label) => label.textContent?.includes("Target (KB)"));
      return targetLabel?.querySelector("input")?.value === expected;
    }, String(kb));
    assert.equal(await page.getByLabel("Target (KB)").inputValue(), String(kb), `Under ${kb}KB preset was not applied`);
  }
  for (const longest of [1080, 1920, 2048]) {
    await page.goto(`${baseUrl}/upload-ready?longest=${longest}&preset=${longest}px`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction((expected) => {
      const select = document.querySelector("#resize-select");
      const input = document.querySelector('input[type="number"]');
      return select instanceof HTMLSelectElement && select.value === "longest" && input instanceof HTMLInputElement && input.value === expected;
    }, String(longest));
    assert.equal(await page.locator("#resize-select").inputValue(), "longest", `${longest}px resize mode was not applied`);
    assert.equal(await page.locator('input[type="number"]').first().inputValue(), String(longest), `${longest}px value was not applied`);
  }
  await page.locator("#resize-select").selectOption("exact");
  await page.getByRole("button", { name: "4:5", exact: true }).click();
  const exactInputs = page.locator('input[type="number"]');
  assert.equal(await exactInputs.nth(0).inputValue(), "1080");
  assert.equal(await exactInputs.nth(1).inputValue(), "1350");
  checks.push({ name: "upload presets and custom aspect ratio", result: "passed" });

  await page.goto(`${baseUrl}/upload-ready?kb=20`, { waitUntil: "domcontentloaded" });
  await page.locator("#file-input").setInputFiles(path.join(fixtures, "noisy-1024x768.png"));
  await page.getByRole("button", { name: "Compress", exact: true }).click();
  await page.waitForFunction(() => document.body.innerText.includes("under limit") && document.body.innerText.includes("verified"));
  const hardCap = await resultDetails();
  assert.ok(hardCap, "hard-cap result missing");
  assert.ok(hardCap.size <= 20 * 1024, `hard-cap result exceeded 20KB: ${hardCap.size}`);
  assert.ok(hardCap.width > 0 && hardCap.height > 0, "hard-cap result did not decode");
  assert.match(await page.locator("body").innerText(), /target 20(?:\.0+)? KB.*under limit.*verified/s);
  checks.push({ name: "hard KB cap and decode verification", result: hardCap });

  for (const [mime, target] of [["image/webp", 15], ["image/png", 50]]) {
    await page.locator("#format-select").selectOption(mime);
    await page.getByLabel("Target (KB)").fill(String(target));
    await page.getByRole("button", { name: "Compress", exact: true }).click();
    const formatResult = await resultDetails();
    assert.ok(formatResult && formatResult.size <= target * 1024, `${mime} exceeded ${target}KB`);
    assert.equal(formatResult.type, mime);
    checks.push({ name: `${mime} hard cap`, result: formatResult });
  }

  await page.locator("#format-select").selectOption("image/jpeg");
  await page.getByLabel("Target (KB)").fill("1");
  await page.getByRole("button", { name: "Compress", exact: true }).click();
  await page.waitForFunction(() => Boolean(document.querySelector('img[alt="compressed-0"]')) || Boolean(document.querySelector('[role="alert"]')));
  const tinyText = await page.locator("body").innerText();
  if (tinyText.includes("under limit")) {
    const tinyResult = await resultDetails();
    assert.ok(tinyResult && tinyResult.size <= 1024, `1KB target exceeded: ${tinyResult?.size}`);
  } else {
    assert.match(tinyText, /Failed:.*Unable to produce an image under 1 KB/s);
  }
  checks.push({ name: "extreme 1KB target succeeds or returns explicit failure", result: "passed" });

  await page.getByLabel("Target (KB)").fill("20");

  await page.locator("#file-input").setInputFiles([
    path.join(fixtures, "noisy-1024x768.jpg"),
    path.join(fixtures, "corrupt-random.png"),
  ]);
  await page.getByRole("button", { name: "Compress", exact: true }).click();
  await page.getByRole("button", { name: "Retry failed (1)", exact: true }).waitFor({ state: "visible" });
  assert.equal(await page.locator('a[download][href^="blob:"]').count(), 1);
  checks.push({ name: "batch failure isolation and retry", result: "passed" });

  await page.locator("#file-input").setInputFiles(path.join(fixtures, "sample-iphone.heic"));
  await page.getByRole("button", { name: "Compress", exact: true }).click();
  try {
    await page.waitForFunction(() => document.body.innerText.includes("under limit") || document.body.innerText.includes("Failed:"), undefined, { timeout: 90000 });
  } catch (error) {
    throw new Error(`HEIC processing did not settle. Browser errors: ${browserErrors.join(" | ")}\n${await page.locator("body").innerText()}`, { cause: error });
  }
  const heicPageText = await page.locator("body").innerText();
  assert.match(heicPageText, /under limit.*verified/s, heicPageText);
  const heicResult = await resultDetails();
  assert.ok(heicResult && heicResult.type === "image/jpeg", `HEIC output type was ${heicResult?.type}`);
  checks.push({ name: "HEIC to JPEG", result: heicResult });

  const cancelFiles = Array.from({ length: 10 }, () => path.join(fixtures, "noisy-1024x768.png"));
  await page.locator("#file-input").setInputFiles(cancelFiles);
  await page.getByRole("button", { name: "Compress", exact: true }).click();
  const cancel = page.getByRole("button", { name: "Cancel", exact: true });
  await cancel.waitFor({ state: "visible" });
  await cancel.click();
  await page.waitForFunction(() => !Array.from(document.querySelectorAll("button")).some((button) => button.textContent?.trim() === "Cancel") && document.body.innerText.includes("Retry failed"));
  checks.push({ name: "batch cancellation", result: "passed" });

  const clipboardBytes = Array.from(await readFile(path.join(root, "tests", "fixtures", "png", "fixture-01-16x16.png")));
  await page.addInitScript(({ bytes }) => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        read: async () => [{
          types: ["image/png"],
          getType: async () => new Blob([new Uint8Array(bytes)], { type: "image/png" }),
        }],
      },
    });
  }, { bytes: clipboardBytes });
  await page.goto(`${baseUrl}/safe-share`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Paste image", exact: true }).click();
  await waitForRedactionCanvas(16, 16);
  assert.match(await page.locator("body").innerText(), /1 file\(s\) selected/);
  checks.push({ name: "safe-share clipboard paste", result: "passed" });

  await page.goto(`${baseUrl}/safe-share`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.locator("#redact-file-input").setInputFiles(path.join(fixtures, "gps-large-1024x768.jpg"));
  const canvas = await waitForRedactionCanvas();
  await drawRedaction(canvas);
  assert.equal(await page.getByRole("button", { name: "Clear", exact: true }).isEnabled(), true, "redaction box was not recorded");
  const exportButton = page.getByRole("button", { name: "Export JPG", exact: true });
  const [download] = await Promise.all([page.waitForEvent("download"), exportButton.click()]);
  const redactedPath = path.join(temp, "redacted-output.jpg");
  await download.saveAs(redactedPath);
  const pixel = execFileSync("magick", [redactedPath, "-format", "%[pixel:p{307,230}]", "info:"], { encoding: "utf8" }).trim();
  assert.match(pixel, /(?:0,0,0|gray\(0\)|#000000)/i, `redaction was not baked at expected pixel: ${pixel}`);

  await page.goto(`${baseUrl}/tools/exif-checker`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.locator("#metadata-file").setInputFiles(redactedPath);
  await page.waitForFunction(() => document.body.innerText.includes("EXIF: not found") && document.body.innerText.includes("GPS: not found") && document.body.innerText.includes("XMP: not found") && document.body.innerText.includes("IPTC: not found"));
  checks.push({ name: "redaction baked and metadata absent", result: pixel });

  for (const mode of ["pixelate", "blur"]) {
    await page.goto(`${baseUrl}/safe-share`, { waitUntil: "networkidle" });
    await page.locator("#redact-file-input").setInputFiles(path.join(fixtures, "noisy-1024x768.png"));
    const effectCanvas = await waitForRedactionCanvas();
    const before = await redactionRegionMetrics();
    await page.locator("#mode-select").selectOption(mode);
    await drawRedaction(effectCanvas);
    const after = await redactionRegionMetrics();
    if (mode === "pixelate") {
      assert.ok(after.uniqueColors < before.uniqueColors * 0.25, `pixelation did not reduce local color detail: ${JSON.stringify({ before, after })}`);
    } else {
      assert.ok(after.adjacentDelta < before.adjacentDelta * 0.75, `blur did not reduce local high-frequency detail: ${JSON.stringify({ before, after })}`);
    }
    checks.push({ name: `${mode} redaction is visibly baked into canvas`, result: { before, after } });
  }

  await page.goto(`${baseUrl}/safe-share`, { waitUntil: "networkidle" });
  await page.locator("#redact-file-input").setInputFiles([
    path.join(fixtures, "gps-large-1024x768.jpg"),
    path.join(fixtures, "noisy-1024x768.jpg"),
  ]);
  await waitForRedactionCanvas();
  await page.locator(".file-queue button").nth(1).click();
  await waitForRedactionCanvas();
  const [zipDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Export ZIP (batch)", exact: true }).click(),
  ]);
  const zipPath = path.join(temp, "safe-share-batch.zip");
  await zipDownload.saveAs(zipPath);
  const archive = await JSZip.loadAsync(await readFile(zipPath));
  const archiveEntries = Object.values(archive.files).filter((entry) => !entry.dir);
  assert.equal(archiveEntries.length, 2, `Safe Share ZIP contained ${archiveEntries.length} files`);
  for (const entry of archiveEntries) {
    assert.match(entry.name, /-redacted\.jpg$/);
    const bytes = await entry.async("nodebuffer");
    assert.match(execFileSync("magick", ["identify", "-"], { input: bytes, encoding: "utf8" }), /JPEG/i);
  }
  checks.push({ name: "safe-share reviewed batch ZIP", result: archiveEntries.map((entry) => entry.name) });

  await page.goto(`${baseUrl}/tools/heic-converter`, { waitUntil: "networkidle" });
  await page.locator('input[type="file"]').setInputFiles(path.join(fixtures, "sample-iphone.heic"));
  await page.getByRole("button", { name: "Convert", exact: true }).click();
  await page.getByText("Done (1)", { exact: true }).waitFor({ state: "visible" });
  checks.push({ name: "standalone HEIC converter shared engine", result: "passed" });

  await page.goto(`${baseUrl}/tools/resize-image`, { waitUntil: "networkidle" });
  await page.locator('input[type="file"]').setInputFiles(path.join(fixtures, "noisy-1024x768.png"));
  await page.getByRole("button", { name: "Resize Images", exact: true }).click();
  await page.getByText("Resized Images (1)", { exact: true }).waitFor({ state: "visible" });
  checks.push({ name: "standalone resize shared engine", result: "passed" });

  await page.goto(`${baseUrl}/tools/png-jpg-converter`, { waitUntil: "networkidle" });
  await page.locator('input[type="file"]').setInputFiles(path.join(fixtures, "noisy-1024x768.png"));
  await page.getByRole("button", { name: "Convert Images", exact: true }).click();
  await page.getByText("Converted Images (1)", { exact: true }).waitFor({ state: "visible" });
  checks.push({ name: "standalone PNG/JPEG converter shared engine", result: "passed" });

  await page.goto(`${baseUrl}/upload-pack`, { waitUntil: "networkidle" });
  const uploadPackInputs = page.locator('.upload-pack-slot input[type="file"]');
  await uploadPackInputs.nth(0).setInputFiles(path.join(fixtures, "noisy-1024x768.jpg"));
  await uploadPackInputs.nth(1).setInputFiles(path.join(fixtures, "noisy-1024x768.jpg"));
  await page.getByRole("button", { name: "Prepare selected files", exact: true }).click();
  await page.waitForFunction(() => document.body.innerText.match(/Verified for the entered requirements/g)?.length === 2);
  assert.match(await page.locator("body").innerText(), /600×600[\s\S]*300×100/);
  const [uploadPackDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download both as ZIP", exact: true }).click(),
  ]);
  const uploadPackPath = path.join(temp, "upload-pack.zip");
  await uploadPackDownload.saveAs(uploadPackPath);
  const uploadPackArchive = await JSZip.loadAsync(await readFile(uploadPackPath));
  const uploadPackEntries = Object.values(uploadPackArchive.files).filter((entry) => !entry.dir);
  assert.equal(uploadPackEntries.length, 2);
  checks.push({ name: "photo and signature exact-dimension upload pack", result: uploadPackEntries.map((entry) => entry.name) });

  await page.goto(`${baseUrl}/tools/image-to-pdf`, { waitUntil: "networkidle" });
  await page.locator('.image-pdf-tool input[type="file"]').setInputFiles([
    path.join(fixtures, "valid-01.jpg"),
    path.join(fixtures, "valid-02.jpg"),
  ]);
  assert.equal(await page.locator(".image-pdf-list li").count(), 2);
  await page.getByRole("button", { name: "Move up", exact: true }).nth(1).click();
  assert.match(await page.locator(".image-pdf-list li").first().innerText(), /valid-02\.jpg/);
  await page.getByRole("button", { name: "Create and verify PDF", exact: true }).click();
  await page.waitForFunction(() => document.body.innerText.includes("PDF header, page count, and final bytes verified") || Boolean(document.querySelector('[role="alert"]')));
  const imagesPdfPageText = await page.locator("body").innerText();
  assert.match(imagesPdfPageText, /PDF header, page count, and final bytes verified/, imagesPdfPageText);
  const [imagesPdfDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /Download PDF · 2 pages/ }).click(),
  ]);
  const imagesPdfPath = path.join(temp, "pixcloak-images.pdf");
  await imagesPdfDownload.saveAs(imagesPdfPath);
  const imagesPdfBytes = await readFile(imagesPdfPath);
  assert.equal((await PDFDocument.load(imagesPdfBytes)).getPageCount(), 2);
  assert.doesNotMatch(imagesPdfBytes.toString("latin1"), /valid-0[12]\.jpg/);
  checks.push({ name: "ordered images to verified two-page PDF", result: `${imagesPdfBytes.length} bytes` });

  await page.goto(`${baseUrl}/tools/pdf-to-image`, { waitUntil: "networkidle" });
  await page.getByLabel("End page").fill("2");
  await page.getByLabel("Output format").selectOption("image/jpeg");
  await page.locator('.pdf-export-tool input[type="file"]').setInputFiles(pdfFixturePath);
  await page.getByRole("button", { name: "Export page images", exact: true }).click();
  await page.waitForFunction(() => document.querySelectorAll(".pdf-page-result").length === 2);
  const pdfImageEntries = await page.evaluate(() => Array.from(document.querySelectorAll(".pdf-page-result")).map((link) => ({
    name: link.getAttribute("download"),
    href: link.getAttribute("href"),
    text: link.textContent,
  })));
  assert.deepEqual(pdfImageEntries.map((entry) => entry.name), ["page-001.jpg", "page-002.jpg"]);
  for (const entry of pdfImageEntries) {
    assert.match(entry.href || "", /^blob:/);
    assert.match(entry.text || "", /\d+×\d+/);
  }
  checks.push({ name: "selected PDF page range to verified JPEG results", result: pdfImageEntries.map((entry) => entry.name) });

  await page.goto(`${baseUrl}/tools/exif-checker`, { waitUntil: "networkidle" });
  await page.locator("#metadata-file").setInputFiles([
    path.join(fixtures, "gps-location.jpg"),
    path.join(fixtures, "png-xmp.png"),
    path.join(fixtures, "webp-exif.webp"),
  ]);
  await page.waitForFunction(() => document.querySelectorAll(".metadata-result").length === 3);
  await page.getByRole("button", { name: "Clean and verify 3 images", exact: true }).click();
  await page.waitForFunction(() => document.body.innerText.match(/Clean export verified/g)?.length === 3);
  assert.equal(await page.getByRole("button", { name: "Download verified ZIP (3)", exact: true }).isVisible(), true);
  assert.match(await page.locator("body").innerText(), /pixels preserved without re-encoding/);
  checks.push({ name: "batch lossless-first metadata cleanup and verified ZIP", result: "3 verified outputs" });

  assert.deepEqual(imageUploads, [], `image-related non-GET requests were observed: ${JSON.stringify(imageUploads)}`);
  checks.push({ name: "no image data network upload", result: "passed" });
  console.log(JSON.stringify({ passed: checks.length, checks }, null, 2));
} finally {
  await browser.close();
}
