#!/usr/bin/env node
/**
 * 修复批量添加 BreadcrumbJsonLd 时缺失的闭合标签
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

function fixFile(filePath) {
  let content = readFileSync(filePath, "utf-8");

  // 检查是否有 BreadcrumbJsonLd 但缺少正确的闭合
  if (!content.includes("BreadcrumbJsonLd")) {
    return { skipped: true, reason: "No BreadcrumbJsonLd" };
  }

  // 检查是否已经正确闭合
  if (content.match(/\s*<\/>\s*\);/)) {
    return { skipped: true, reason: "Already fixed" };
  }

  // 修复缺失的闭合标签
  // 查找模式：</div>\n  );\n}
  // 替换为：</div>\n    </>\n  );\n}
  const pattern = /(<\/div>\s*)\);\s*\}/;
  if (pattern.test(content)) {
    content = content.replace(pattern, "$1\n    </>\n  );\n}");
    writeFileSync(filePath, content, "utf-8");
    return { skipped: false };
  }

  return { skipped: true, reason: "Pattern not found" };
}

function main() {
  console.log("🔧 Fixing missing closing tags...\n");

  const files = getAllGuideFiles(guidesDir);
  console.log(`Found ${files.length} guide pages\n`);

  let fixed = 0;
  let skipped = 0;

  for (const file of files) {
    const relativePath = file.replace(guidesDir, "").replace(/\\/g, "/");
    const result = fixFile(file);

    if (result.skipped) {
      console.log(`⏭️  ${relativePath} - ${result.reason}`);
      skipped++;
    } else {
      console.log(`✅ ${relativePath} - Fixed`);
      fixed++;
    }
  }

  console.log("\n📊 Summary:");
  console.log(`✅ Fixed: ${fixed} files`);
  console.log(`⏭️  Skipped: ${skipped} files`);
  console.log(`📁 Total: ${files.length} files\n`);

  if (fixed > 0) {
    console.log("🎉 Done! Please commit and push the fixes.");
  }
}

main();
