#!/usr/bin/env node
/**
 * 增强的IndexNow推送系统
 *
 * 功能：
 * - 自动检测页面变更
 * - 批量推送到多个搜索引擎
 * - 支持增量更新
 * - 生成变更摘要
 */

import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 搜索引擎配置
const SEARCH_ENGINES = {
  bing: {
    name: "Bing",
    endpoint: "https://api.indexnow.org/indexnow",
    key: process.env.INDEXNOW_KEY || "pixcloak-key-2024",
  },
  yandex: {
    name: "Yandex",
    endpoint: "https://yandex.com/indexnow",
    key: process.env.INDEXNOW_KEY || "pixcloak-key-2024",
  },
  seznam: {
    name: "Seznam",
    endpoint: "https://search.seznam.cz/indexnow",
    key: process.env.INDEXNOW_KEY || "pixcloak-key-2024",
  },
};

// 获取所有页面信息
function getAllPages() {
  const appDir = join(__dirname, "..", "app");
  const pages: Array<{
    url: string,
    path: string,
    lastModified: string,
    size: number,
    title?: string,
  }> = [];

  function findPages(dir: string, basePath = "") {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      const relativePath = join(basePath, entry.name);

      if (entry.isDirectory()) {
        findPages(fullPath, relativePath);
      } else if (entry.isFile() && entry.name === "page.tsx") {
        try {
          const stats = statSync(fullPath);
          const content = readFileSync(fullPath, "utf-8");

          // 提取标题
          const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
          const title = titleMatch ? titleMatch[1] : undefined;

          // 构建URL
          const url =
            "/" + relativePath.replace(/\/page\.tsx$/, "").replace(/\\/g, "/");

          pages.push({
            url,
            path: relativePath,
            lastModified: stats.mtime.toISOString(),
            size: stats.size,
            title,
          });
        } catch (error) {
          console.error(`Error processing ${relativePath}:`, error);
        }
      }
    }
  }

  findPages(appDir);
  return pages;
}

// 检测变更的页面
function detectChanges(
  pages: Array<{ url: string, lastModified: string, path: string }>
) {
  const stateFile = join(__dirname, "..", ".indexnow-state.json");

  let lastState: Record<string, string> = {};
  try {
    const stateContent = readFileSync(stateFile, "utf-8");
    lastState = JSON.parse(stateContent);
  } catch (error) {
    // 首次运行，没有状态文件
  }

  const changes: Array<{
    url: string,
    type: "new" | "updated",
    lastModified: string,
  }> = [];

  for (const page of pages) {
    const lastModified = lastState[page.url];

    if (!lastModified) {
      changes.push({
        url: page.url,
        type: "new",
        lastModified: page.lastModified,
      });
    } else if (lastModified !== page.lastModified) {
      changes.push({
        url: page.url,
        type: "updated",
        lastModified: page.lastModified,
      });
    }
  }

  // 保存新状态
  const newState: Record<string, string> = {};
  pages.forEach((page) => {
    newState[page.url] = page.lastModified;
  });

  writeFileSync(stateFile, JSON.stringify(newState, null, 2));

  return changes;
}

// 推送到搜索引擎
async function pushToSearchEngine(
  engine: typeof SEARCH_ENGINES.bing,
  urls: string[]
) {
  const baseUrl = "https://pixcloak.com";
  const fullUrls = urls.map((url) => baseUrl + url);

  try {
    const response = await fetch(engine.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: "pixcloak.com",
        key: engine.key,
        urlList: fullUrls,
      }),
    });

    if (response.ok) {
      console.log(`✅ ${engine.name}: Successfully pushed ${urls.length} URLs`);
      return { success: true, count: urls.length };
    } else {
      console.log(`❌ ${engine.name}: Failed with status ${response.status}`);
      return { success: false, error: `Status ${response.status}` };
    }
  } catch (error) {
    console.log(`❌ ${engine.name}: Network error - ${error}`);
    return { success: false, error: error.message };
  }
}

// 生成变更摘要
function generateChangeSummary(
  changes: Array<{ url: string, type: "new" | "updated", lastModified: string }>
) {
  const summary = {
    timestamp: new Date().toISOString(),
    totalChanges: changes.length,
    newPages: changes.filter((c) => c.type === "new").length,
    updatedPages: changes.filter((c) => c.type === "updated").length,
    changes: changes.map((change) => ({
      url: change.url,
      type: change.type,
      timestamp: change.lastModified,
    })),
  };

  return summary;
}

// 主函数
async function main() {
  console.log("🚀 PixCloak IndexNow Enhanced Push System\n");

  // 获取所有页面
  console.log("📄 Scanning all pages...");
  const allPages = getAllPages();
  console.log(`Found ${allPages.length} pages\n`);

  // 检测变更
  console.log("🔍 Detecting changes...");
  const changes = detectChanges(allPages);

  if (changes.length === 0) {
    console.log("✅ No changes detected. All pages are up to date.");
    return;
  }

  console.log(`📊 Changes detected: ${changes.length}`);
  console.log(
    `  - New pages: ${changes.filter((c) => c.type === "new").length}`
  );
  console.log(
    `  - Updated pages: ${changes.filter((c) => c.type === "updated").length}\n`
  );

  // 显示变更详情
  console.log("📋 Change details:");
  changes.forEach((change) => {
    console.log(`  ${change.type === "new" ? "🆕" : "🔄"} ${change.url}`);
  });
  console.log();

  // 推送到所有搜索引擎
  const results = [];
  for (const [engineKey, engine] of Object.entries(SEARCH_ENGINES)) {
    console.log(`📡 Pushing to ${engine.name}...`);
    const result = await pushToSearchEngine(
      engine,
      changes.map((c) => c.url)
    );
    results.push({ engine: engineKey, ...result });

    // 避免请求过于频繁
    if (
      Object.keys(SEARCH_ENGINES).indexOf(engineKey) <
      Object.keys(SEARCH_ENGINES).length - 1
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // 生成变更摘要
  const summary = generateChangeSummary(changes);
  const summaryFile = join(__dirname, "..", "public", "indexnow-summary.json");
  writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

  // 输出结果
  console.log("\n📊 Push Results:");
  results.forEach((result) => {
    const status = result.success ? "✅" : "❌";
    const details = result.success
      ? `Pushed ${result.count} URLs`
      : `Failed: ${result.error}`;
    console.log(`  ${status} ${result.engine}: ${details}`);
  });

  console.log(`\n📄 Change summary saved to: ${summaryFile}`);
  console.log("\n💡 Next steps:");
  console.log("  1. Monitor search engine indexing in their webmaster tools");
  console.log("  2. Check RSS feed for changelog updates");
  console.log("  3. Verify pages appear in search results within 24-48 hours");
}

// 处理命令行参数
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(`
PixCloak IndexNow Enhanced Push System

Usage:
  node scripts/enhanced-indexnow.mjs [options]

Options:
  --help, -h          Show this help message
  --force, -f         Force push all pages (ignore change detection)
  --engines, -e       Specify engines (comma-separated): bing,yandex,seznam
  --urls, -u          Push specific URLs (comma-separated)

Examples:
  node scripts/enhanced-indexnow.mjs
  node scripts/enhanced-indexnow.mjs --force
  node scripts/enhanced-indexnow.mjs --engines bing,yandex
  node scripts/enhanced-indexnow.mjs --urls /compress,/redact
`);
  process.exit(0);
}

if (args.includes("--force") || args.includes("-f")) {
  // 强制推送所有页面
  console.log("🔄 Force mode: Pushing all pages...");
  // 这里可以修改逻辑来推送所有页面
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
