/**
 * 智能增量 IndexNow 提交脚本
 *
 * 功能：
 * - 自动检测新增或修改的页面
 * - 基于 git 变更历史智能提交
 * - 支持多搜索引擎提交（Bing + Yandex）
 * - 避免重复提交相同内容
 */

import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";

const site = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
).replace(/\/$/, "");
const key =
  process.env.INDEXNOW_KEY || process.env.NEXT_PUBLIC_INDEXNOW_KEY || "";

if (!key) {
  console.error("❌ Missing INDEXNOW_KEY env var");
  process.exit(1);
}

const ENDPOINTS = [
  { url: "https://api.indexnow.org/indexnow", name: "IndexNow (General)" },
  { url: "https://www.bing.com/indexnow", name: "Bing" },
  { url: "https://yandex.com/indexnow", name: "Yandex" },
];

// 获取最近 git 变更的文件（最近 N 次提交）
function getChangedFiles(commits = 5) {
  try {
    const output = execSync(`git diff --name-only HEAD~${commits} HEAD`, {
      encoding: "utf8",
    });
    return output
      .split("\n")
      .filter(Boolean)
      .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
      .filter((f) => f.includes("app/") && !f.includes("Client.tsx"));
  } catch (e) {
    console.warn("⚠️  无法获取 git 变更，将提交所有页面");
    return null;
  }
}

// 将文件路径转换为 URL
function filePathToUrl(filePath) {
  // app/(marketing)/about/page.tsx -> /about
  // app/guides/compress-to-200kb/page.tsx -> /guides/compress-to-200kb
  // app/tools/exif-checker/page.tsx -> /tools/exif-checker

  let urlPath = filePath
    .replace(/^app\//, "")
    .replace(/\/page\.tsx$/, "")
    .replace(/\(marketing\)\//, "");

  if (urlPath === "") urlPath = "/";
  else if (!urlPath.startsWith("/")) urlPath = "/" + urlPath;

  return `${site}${urlPath}`;
}

// 提交到 IndexNow 端点（带重试）
async function submitToEndpoint(endpoint, urls, maxRetries = 3) {
  const host = site.replace(/^https?:\/\//, "");
  const keyLocation = `${site}/${key}.txt`;
  const payload = { host, key, keyLocation, urlList: urls };

  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(endpoint.url, {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
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
        console.log(
          `   ⏳ 重试 ${endpoint.name} (${
            i + 1
          }/${maxRetries})，等待 ${delay}ms...`
        );
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

// 通知网站地图更新
async function pingSitemaps() {
  const sitemaps = ["/sitemap.xml", "/guides/sitemap.xml"];
  const pingUrls = sitemaps.flatMap((p) => [
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(site + p)}`,
    `https://www.google.com/ping?sitemap=${encodeURIComponent(site + p)}`,
  ]);

  await Promise.allSettled(pingUrls.map((url) => fetch(url).catch(() => null)));
}

async function main() {
  console.log("🚀 IndexNow 智能增量提交脚本");
  console.log(`📍 网站: ${site}`);
  console.log(`🔑 Key: ${key.substring(0, 4)}****`);
  console.log("");

  // 检测变更的文件
  const changedFiles = getChangedFiles(10);

  let urls;
  if (changedFiles && changedFiles.length > 0) {
    console.log(`📝 检测到 ${changedFiles.length} 个变更文件：`);
    changedFiles.slice(0, 5).forEach((f) => console.log(`   - ${f}`));
    if (changedFiles.length > 5) {
      console.log(`   ... 和 ${changedFiles.length - 5} 个其他文件`);
    }
    console.log("");

    urls = [...new Set(changedFiles.map(filePathToUrl))];
    console.log(`🔗 对应 ${urls.length} 个 URL 需要提交`);
  } else {
    // 如果无法获取变更，提交关键页面
    console.log("📋 提交关键页面（无 git 变更历史）");
    urls = [
      `${site}/`,
      `${site}/compress`,
      `${site}/redact`,
      `${site}/guides`,
      `${site}/tools`,
    ];
  }

  if (urls.length === 0) {
    console.log("✅ 无需提交，没有检测到变更");
    return;
  }

  console.log("");
  console.log(`📤 开始提交到 ${ENDPOINTS.length} 个搜索引擎...`);
  console.log("");

  // 提交到所有端点
  const results = await Promise.all(
    ENDPOINTS.map((endpoint) => submitToEndpoint(endpoint, urls))
  );

  // 输出结果
  let succeeded = 0;
  let failed = 0;

  results.forEach((result) => {
    if (result.ok) {
      console.log(`✅ ${result.engine}: 提交成功 (HTTP ${result.status})`);
      succeeded++;
    } else {
      console.log(`❌ ${result.engine}: 提交失败 - ${result.error}`);
      failed++;
    }
  });

  console.log("");
  console.log(`📊 统计: ${succeeded} 成功, ${failed} 失败`);
  console.log("");

  // 通知网站地图更新
  console.log("🔔 通知搜索引擎网站地图更新...");
  await pingSitemaps();
  console.log("✅ 网站地图通知完成");
  console.log("");
  console.log("🎉 IndexNow 提交完成！");
}

main().catch((e) => {
  console.error("❌ 脚本执行失败:", e);
  process.exit(1);
});
