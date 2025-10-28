/**
 * IndexNow 全量提交脚本（改进版）
 *
 * 功能：
 * - 从网站地图获取所有 URL
 * - 分批提交到多个搜索引擎
 * - 详细的进度报告
 * - 失败重试机制
 * - 支持 Bing, Yandex 和通用 IndexNow 端点
 */

import fs from "fs";
import path from "path";

const site = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
).replace(/\/$/, "");
const key =
  process.env.INDEXNOW_KEY || process.env.NEXT_PUBLIC_INDEXNOW_KEY || "";

if (!key) {
  console.error("❌ Missing INDEXNOW_KEY env var");
  process.exit(1);
}

const SITEMAPS = [`${site}/sitemap.xml`, `${site}/guides/sitemap.xml`];
const BATCH_SIZE = Number(process.env.BATCH_SIZE || 100);
const DELAY_MS = Number(process.env.DELAY_MS || 2000);
const SUBMIT_ALL_ENGINES = process.env.SUBMIT_ALL_ENGINES === "true";

const ENDPOINTS = [
  {
    url: "https://api.indexnow.org/indexnow",
    name: "IndexNow (General)",
    priority: true,
  },
  { url: "https://www.bing.com/indexnow", name: "Bing", priority: true },
  { url: "https://yandex.com/indexnow", name: "Yandex", priority: false },
];

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${url} ${res.status}`);
  return await res.text();
}

function parseXmlUrls(xml) {
  const urls = [];
  const re = /<loc>\s*([^<]+)\s*<\/loc>/g;
  let m;
  while ((m = re.exec(xml))) urls.push(m[1].trim());
  return urls;
}

async function getAllUrls() {
  console.log("📥 正在从网站地图获取 URLs...");
  const xmls = await Promise.all(SITEMAPS.map((u) => fetchText(u)));
  const urls = xmls.flatMap(parseXmlUrls);
  const uniq = Array.from(new Set(urls));
  console.log(`✅ 获取到 ${uniq.length} 个唯一 URL`);
  return uniq;
}

async function submitBatchToEndpoint(endpoint, urls, maxRetries = 3) {
  const host = site.replace(/^https?:\/\//, "");
  const keyLocation = `${site}/${key}.txt`;
  const payload = { host, key, keyLocation, urlList: urls };

  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(endpoint.url, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      const text = await res.text().catch(() => "");

      if (res.ok) {
        return { ok: true, status: res.status, engine: endpoint.name };
      } else {
        throw new Error(`HTTP ${res.status}: ${text}`);
      }
    } catch (e) {
      if (i < maxRetries - 1) {
        const delay = 1000 * Math.pow(2, i);
        await new Promise((r) => setTimeout(r, delay));
      } else {
        return {
          ok: false,
          status: 500,
          error: String(e),
          engine: endpoint.name,
        };
      }
    }
  }
}

async function pingSitemaps() {
  const pingUrls = SITEMAPS.flatMap((s) => [
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(s)}`,
    `https://www.google.com/ping?sitemap=${encodeURIComponent(s)}`,
  ]);
  await Promise.allSettled(pingUrls.map((url) => fetch(url).catch(() => null)));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log("🚀 IndexNow 全量提交脚本（改进版）");
  console.log(`📍 网站: ${site}`);
  console.log(`🔑 Key: ${key.substring(0, 4)}****`);
  console.log(`📦 批次大小: ${BATCH_SIZE}`);
  console.log(`⏱️  延迟: ${DELAY_MS}ms`);
  console.log("");

  const urls = await getAllUrls();
  const totalBatches = Math.ceil(urls.length / BATCH_SIZE);

  console.log("");
  console.log(`📤 开始分批提交 (共 ${totalBatches} 个批次)...`);
  console.log("");

  // 选择要提交的端点
  const endpointsToUse = SUBMIT_ALL_ENGINES
    ? ENDPOINTS
    : ENDPOINTS.filter((e) => e.priority);

  console.log(
    `🌐 目标搜索引擎: ${endpointsToUse.map((e) => e.name).join(", ")}`
  );
  console.log("");

  let totalSucceeded = 0;
  let totalFailed = 0;

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const batch = urls.slice(i, i + BATCH_SIZE);
    const progress = ((batchNum / totalBatches) * 100).toFixed(1);

    console.log(
      `📦 批次 ${batchNum}/${totalBatches} (${progress}%) - ${batch.length} URLs`
    );

    // 提交到所有端点
    const results = await Promise.all(
      endpointsToUse.map((endpoint) => submitBatchToEndpoint(endpoint, batch))
    );

    results.forEach((result) => {
      if (result.ok) {
        console.log(`   ✅ ${result.engine}: 成功 (HTTP ${result.status})`);
        totalSucceeded++;
      } else {
        console.log(`   ❌ ${result.engine}: 失败 - ${result.error}`);
        totalFailed++;
      }
    });

    if (i + BATCH_SIZE < urls.length) {
      console.log(`   ⏳ 等待 ${DELAY_MS}ms...`);
      await sleep(DELAY_MS);
    }
    console.log("");
  }

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📊 提交统计:");
  console.log(`   总批次: ${totalBatches}`);
  console.log(`   总 URLs: ${urls.length}`);
  console.log(`   成功: ${totalSucceeded} 次`);
  console.log(`   失败: ${totalFailed} 次`);
  console.log(
    `   成功率: ${(
      (totalSucceeded / (totalSucceeded + totalFailed)) *
      100
    ).toFixed(1)}%`
  );
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  console.log("🔔 通知搜索引擎网站地图更新...");
  await pingSitemaps();
  console.log("✅ 网站地图通知完成");
  console.log("");
  console.log("🎉 IndexNow 全量提交完成！");
}

main().catch((e) => {
  console.error("❌ 脚本执行失败:", e);
  process.exit(1);
});
