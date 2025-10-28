#!/usr/bin/env node
/**
 * 批量为 guides 页面添加 BreadcrumbJsonLd
 *
 * 使用方法：node scripts/add-breadcrumbs-to-guides.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const guidesDir = join(__dirname, "../app/(marketing)/guides");

function getAllGuideFiles(dir) {
  const files = [];
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      const pagePath = join(fullPath, "page.tsx");
      try {
        statSync(pagePath);
        files.push(pagePath);
      } catch {
        // No page.tsx in this directory
      }
    }
  }

  return files;
}

function extractPageTitle(content) {
  // 尝试从多个地方提取标题

  // 1. 从 metadata title 提取
  const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
  if (titleMatch) {
    return titleMatch[1].replace(/ \| PixCloak$/, "").trim();
  }

  // 2. 从 H1 提取
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return "Guide";
}

function getUrlFromPath(filePath) {
  const relativePath = filePath.replace(guidesDir, "").replace(/\\/g, "/");
  const slug = relativePath.replace(/\/page\.tsx$/, "");
  return `/guides${slug}`;
}

function addBreadcrumbToFile(filePath) {
  let content = readFileSync(filePath, "utf-8");

  // 检查是否已经有 BreadcrumbJsonLd
  if (content.includes("BreadcrumbJsonLd")) {
    return { skipped: true, reason: "Already has breadcrumb" };
  }

  const url = getUrlFromPath(filePath);
  const title = extractPageTitle(content);

  // 1. 添加 import
  if (!content.includes("import { BreadcrumbJsonLd }")) {
    content = content.replace(
      /import { FaqJsonLd } from ['"]@\/components\/SeoJsonLd['"];/,
      `import { FaqJsonLd } from '@/components/SeoJsonLd';\nimport { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';`
    );
  }

  // 2. 找到 export default function 并添加 BreadcrumbJsonLd
  const functionMatch = content.match(
    /export default function \w+\(\) \{\s*return \(/
  );
  if (!functionMatch) {
    return { skipped: true, reason: "Cannot find function pattern" };
  }

  const breadcrumbCode = `
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: '${title.replace(/'/g, "\\'")}', url: '${url}' }
      ]} />`;

  // 替换函数开始部分
  content = content.replace(
    /export default function (\w+)\(\) \{\s*return \(\s*<div/,
    `export default function $1() {\n  return (\n    <>${breadcrumbCode}\n      <div`
  );

  // 3. 在结尾添加闭合标签
  content = content.replace(
    /(<\/FaqJsonLd>\s*<\/div>\s*)\);/,
    `$1\n    </>\n  );`
  );

  writeFileSync(filePath, content, "utf-8");
  return { skipped: false, title, url };
}

function main() {
  console.log("🔍 Scanning guides directory...\n");

  const files = getAllGuideFiles(guidesDir);
  console.log(`Found ${files.length} guide pages\n`);

  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    const relativePath = file.replace(guidesDir, "").replace(/\\/g, "/");
    const result = addBreadcrumbToFile(file);

    if (result.skipped) {
      console.log(`⏭️  ${relativePath} - ${result.reason}`);
      skipped++;
    } else {
      console.log(`✅ ${relativePath}`);
      console.log(`   Title: ${result.title}`);
      console.log(`   URL: ${result.url}\n`);
      updated++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`✅ Updated: ${updated} files`);
  console.log(`⏭️  Skipped: ${skipped} files`);
  console.log(`📁 Total: ${files.length} files\n`);

  console.log("🎉 Done! Remember to:");
  console.log("1. Review the changes");
  console.log("2. Run linter: npm run lint");
  console.log("3. Test build: npm run build");
  console.log("4. Commit changes\n");
}

main();
