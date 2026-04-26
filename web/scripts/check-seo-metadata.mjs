#!/usr/bin/env node
/**
 * 批量检查所有页面的标题和 Meta Description 长度
 *
 * 使用方式：
 * 1. npm run check:seo
 * 2. 或者：node scripts/check-seo-metadata.mjs
 */

import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appDir = join(__dirname, "..", "app");
const issues = {
  duplicateTitles: new Map(), // Map<title, string[]>
  longDescriptions: [], // Array<{path, length}>
  shortDescriptions: [], // Array<{path, length}>
  longTitles: [], // Array<{path, title, length}>
  shortTitles: [], // Array<{path, title, length}>
};

// 递归查找所有 page.tsx 文件
function findPages(dir, basePath = "") {
  const pages = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...findPages(fullPath, join(basePath, entry.name)));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      const relativePath = join(basePath, entry.name);
      pages.push({ fullPath, relativePath });
    }
  }

  return pages;
}

// 从文件内容中提取 metadata
function extractMetadata(content) {
  const metadata = {
    title: null,
    description: null,
  };

  // 提取 title (支持双引号、单引号、反引号)
  // 排除掉步骤中的 title: "..."
  const titleMatch = content.match(/export const metadata: Metadata = \{[\s\S]*?title:\s*(['"`])((?:(?!\1)[\s\S])*)\1/);
  if (titleMatch) {
    metadata.title = titleMatch[2];
  } else {
    // fallback for dynamic metadata
    const dynamicTitleMatch = content.match(/title:\s*(['"`])((?:(?!\1)[\s\S])*)\1/);
    if (dynamicTitleMatch && !content.includes('export async function generateMetadata')) {
       metadata.title = dynamicTitleMatch[2];
    }
  }

  // 提取 description (支持双引号、单引号、反引号)
  const descMatch = content.match(/description:\s*(['"`])((?:(?!\1)[\s\S])*)\1/);
  if (descMatch) {
    metadata.description = descMatch[2];
  }

  return metadata;
}

// 检查单个文件
function checkPage(file, content) {
  const metadata = extractMetadata(content);

  if (metadata.title) {
    const title = metadata.title;
    // 与 fix-seo-metadata.mjs 一致：layout title.template 会追加 " | PixCloak"（+11）
    const cleanTitle = title.replace(/\s*\|\s*PixCloak/g, "").trim();
    const titleLength = cleanTitle.length + 11;

    if (titleLength > 60) {
      issues.longTitles.push({ path: file, title: cleanTitle, length: titleLength });
    } else if (titleLength < 30) {
      issues.shortTitles.push({ path: file, title: cleanTitle, length: titleLength });
    }

    if (!issues.duplicateTitles.has(cleanTitle)) {
      issues.duplicateTitles.set(cleanTitle, []);
    }
    issues.duplicateTitles.get(cleanTitle).push(file);
  }

  if (metadata.description) {
    const descLength = metadata.description.length;

    if (descLength > 160) {
      issues.longDescriptions.push({ path: file, length: descLength });
    } else if (descLength < 120) {
      issues.shortDescriptions.push({ path: file, length: descLength });
    }
  }
}

// 主函数
function main() {
  console.log("🔍 开始批量检查所有页面的 SEO metadata...\n");

  const allPages = findPages(appDir);
  console.log(`📄 找到 ${allPages.length} 个页面文件\n`);

  // 检查每个页面
  for (const page of allPages) {
    try {
      const content = readFileSync(page.fullPath, "utf-8");
      checkPage(page.relativePath, content);
    } catch (error) {
      console.error(`❌ 读取文件失败: ${page.relativePath}`, error.message);
    }
  }

  // 输出结果
  console.log("📊 SEO 检查结果:\n");

  // 标题重复
  console.log("🔴 标题重复问题:");
  let hasDuplicateIssues = false;
  issues.duplicateTitles.forEach((paths, title) => {
    if (paths.length > 1) {
      hasDuplicateIssues = true;
      console.log(
        `\n  标题: "${title.substring(0, 60)}${title.length > 60 ? "..." : ""}"`
      );
      console.log(`  重复 ${paths.length} 次:`);
      paths.forEach((path) => console.log(`    - ${path}`));
    }
  });
  if (!hasDuplicateIssues) {
    console.log("  ✅ 没有发现标题重复问题\n");
  } else {
    console.log("");
  }

  // 描述长度
  console.log("⚠️  Meta Description 过长 (>160字符):");
  if (issues.longDescriptions.length > 0) {
    issues.longDescriptions.forEach(({ path, length }) => {
      console.log(`  ${path}: ${length} 字符`);
    });
  } else {
    console.log("  ✅ 没有问题\n");
  }

  console.log("⚠️  Meta Description 过短 (<120字符):");
  if (issues.shortDescriptions.length > 0) {
    issues.shortDescriptions.forEach(({ path, length }) => {
      console.log(`  ${path}: ${length} 字符`);
    });
  } else {
    console.log("  ✅ 没有问题\n");
  }

  // 标题长度
  console.log("⚠️  标题过长 (>60字符):");
  if (issues.longTitles.length > 0) {
    issues.longTitles.forEach(({ path, title, length }) => {
      console.log(`  ${path}: ${length} 字符`);
      console.log(`    标题: "${title}"`);
    });
  } else {
    console.log("  ✅ 没有问题\n");
  }

  console.log("⚠️  标题过短 (<30字符):");
  if (issues.shortTitles.length > 0) {
    issues.shortTitles.forEach(({ path, title, length }) => {
      console.log(`  ${path}: ${length} 字符`);
      console.log(`    标题: "${title}"`);
    });
  } else {
    console.log("  ✅ 没有问题\n");
  }

  // 总结
  const totalIssues =
    (hasDuplicateIssues ? 1 : 0) +
    issues.longDescriptions.length +
    issues.shortDescriptions.length +
    issues.longTitles.length +
    issues.shortTitles.length;

  console.log("\n📊 总结:");
  console.log(`  检查页面: ${allPages.length}`);
  console.log(`  发现问题: ${totalIssues} 个`);

  if (totalIssues > 0) {
    console.log("\n💡 建议: 修复这些问题以提升 SEO 表现");
    process.exit(1);
  } else {
    console.log("\n🎉 所有页面都符合 SEO 最佳实践！");
    process.exit(0);
  }
}

main();
