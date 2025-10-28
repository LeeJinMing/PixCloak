#!/usr/bin/env node
/**
 * 批量修复所有页面的标题和 Meta Description 长度问题
 *
 * 修复规则：
 * - 标题长度：30-60字符
 * - Meta Description：120-160字符
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appDir = join(__dirname, "..", "app");
import { readdirSync } from "fs";

// 查找所有 page.tsx 文件
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

// 优化标题长度（30-60字符）
function optimizeTitle(title) {
  if (!title) return title;

  const currentLength = title.length;

  // 如果标题在合理范围内，不修改
  if (currentLength >= 30 && currentLength <= 60) {
    return title;
  }

  // 标题过短：添加描述性内容
  if (currentLength < 30) {
    // 常见短标题优化
    if (title.includes("Contact")) {
      return "Contact Us: Questions & Support | PixCloak";
    }
    if (title.includes("Privacy Policy")) {
      return "Privacy Policy: Your Data Stays Local | PixCloak";
    }
    if (title.includes("Terms of Service")) {
      return "Terms of Service: Free Image Tools | PixCloak";
    }
    if (title.includes("平台常见图片限制")) {
      return "平台常见图片限制（200KB/500KB 规范） | PixCloak";
    }

    // 通用优化：添加简短描述
    const withoutBrand = title.replace(" | PixCloak", "").trim();
    return `${withoutBrand} - Free Online Tool | PixCloak`;
  }

  // 标题过长：精简内容
  if (currentLength > 60) {
    // 保留主关键词和品牌
    const withoutBrand = title.replace(" | PixCloak", "").trim();
    const maxLength = 50;

    if (withoutBrand.length > maxLength) {
      // 截断到合适长度，保留重要部分
      const truncated = withoutBrand.substring(0, maxLength - 3);
      const lastSpace = truncated.lastIndexOf(" ");
      const result =
        lastSpace > 0
          ? truncated.substring(0, lastSpace) + "..."
          : truncated + "...";
      return result + " | PixCloak";
    }

    return `${withoutBrand.substring(0, maxLength)} | PixCloak`;
  }

  return title;
}

// 优化 Description 长度（120-160字符）
function optimizeDescription(description) {
  if (!description) return description;

  const currentLength = description.length;

  // 如果描述在合理范围内，不修改
  if (currentLength >= 120 && currentLength <= 160) {
    return description;
  }

  // 描述过短：添加更多信息
  if (currentLength < 120) {
    // 添加通用补充信息
    const additions = [
      " Works locally in your browser, no uploads.",
      " 100% free, no registration required.",
      " Process images offline, privacy guaranteed.",
    ];

    for (const addition of additions) {
      const newDesc = description + addition;
      if (newDesc.length >= 120 && newDesc.length <= 160) {
        return newDesc;
      }
    }

    // 如果还是太短，尝试添加更多描述性内容
    return (
      description +
      " Process images offline in your browser. 100% free, no uploads, privacy guaranteed."
    );
  }

  // 描述过长：精简内容
  if (currentLength > 160) {
    const targetLength = 155; // 留点余量
    const truncated = description.substring(0, targetLength);
    const lastSpace = truncated.lastIndexOf(" ");
    const lastSentence = truncated.lastIndexOf(".");

    // 优先在句号处截断
    if (lastSentence > targetLength - 30) {
      return truncated.substring(0, lastSentence + 1);
    }

    // 其次在单词处截断
    if (lastSpace > targetLength - 20) {
      return truncated.substring(0, lastSpace) + "...";
    }

    // 最后直接截断
    return truncated.substring(0, targetLength - 3) + "...";
  }

  return description;
}

// 修复单个文件
function fixFile(fullPath, relativePath) {
  try {
    let content = readFileSync(fullPath, "utf-8");
    let modified = false;

    // 提取并修复 title
    const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
    if (titleMatch) {
      const oldTitle = titleMatch[1];
      const newTitle = optimizeTitle(oldTitle);

      if (newTitle !== oldTitle) {
        content = content
          .replace(`title: "${oldTitle}"`, `title: "${newTitle}"`)
          .replace(`title: '${oldTitle}'`, `title: '${newTitle}'`);
        modified = true;
        console.log(`  ✅ 修复标题: ${oldTitle.length}→${newTitle.length}字符`);
      }
    }

    // 提取并修复 description
    const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
    if (descMatch) {
      const oldDesc = descMatch[1];
      const newDesc = optimizeDescription(oldDesc);

      if (newDesc !== oldDesc) {
        content = content
          .replace(`description: "${oldDesc}"`, `description: "${newDesc}"`)
          .replace(`description: '${oldDesc}'`, `description: '${newDesc}'`);
        modified = true;
        console.log(`  ✅ 修复描述: ${oldDesc.length}→${newDesc.length}字符`);
      }
    }

    if (modified) {
      writeFileSync(fullPath, content, "utf-8");
      return true;
    }

    return false;
  } catch (error) {
    console.error(`  ❌ 处理失败: ${relativePath}`, error.message);
    return false;
  }
}

// 主函数
function main() {
  console.log("🔧 开始批量修复 SEO metadata...\n");

  const allPages = findPages(appDir);
  console.log(`📄 找到 ${allPages.length} 个页面文件\n`);

  let fixedCount = 0;

  for (const page of allPages) {
    console.log(`处理: ${page.relativePath}`);
    if (fixFile(page.fullPath, page.relativePath)) {
      fixedCount++;
    }
  }

  console.log(`\n📊 修复完成:`);
  console.log(`  检查页面: ${allPages.length}`);
  console.log(`  修复页面: ${fixedCount}`);
  console.log(`  无需修复: ${allPages.length - fixedCount}`);

  if (fixedCount > 0) {
    console.log("\n💡 请运行 git diff 查看修改详情");
  }
}

main();
