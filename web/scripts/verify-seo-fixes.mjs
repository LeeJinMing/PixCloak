#!/usr/bin/env node
/**
 * 验证 SEO 修复是否完整
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: [],
};

function check(name, condition, severity = "error") {
  if (condition) {
    checks.passed++;
    checks.details.push({ name, status: "✅", severity: "pass" });
    return true;
  } else {
    if (severity === "error") {
      checks.failed++;
      checks.details.push({ name, status: "❌", severity: "error" });
    } else {
      checks.warnings++;
      checks.details.push({ name, status: "⚠️", severity: "warning" });
    }
    return false;
  }
}

console.log("🔍 验证 SEO 修复...\n");

// 1. 检查 /compress 是否在 sitemap
console.log("1️⃣  检查 Sitemap...");
const sitemapPath = join(__dirname, "../app/sitemap.ts");
const sitemapContent = readFileSync(sitemapPath, "utf-8");
check(
  "/compress 在 sitemap.ts 中",
  sitemapContent.includes("url: `${base}/compress`")
);

// 2. 检查 OG 图片
console.log("\n2️⃣  检查 OG 图片...");
const ogSvgPath = join(__dirname, "../public/og-image.svg");
const ogPngPath = join(__dirname, "../public/og.png");
check("og-image.svg 存在", existsSync(ogSvgPath));
check(
  "og.png 已转换（>10KB）",
  existsSync(ogPngPath) && readFileSync(ogPngPath).length > 10000,
  "warning"
);

// 3. 检查 BreadcrumbJsonLd 组件
console.log("\n3️⃣  检查 BreadcrumbJsonLd 组件...");
const breadcrumbPath = join(__dirname, "../components/BreadcrumbJsonLd.tsx");
check("BreadcrumbJsonLd.tsx 存在", existsSync(breadcrumbPath));

// 4. 检查核心页面的 H1
console.log("\n4️⃣  检查 H1 标签...");
const compressPagePath = join(__dirname, "../app/compress/page.tsx");
const compressContent = readFileSync(compressPagePath, "utf-8");
const h1Match = compressContent.match(/<h1[^>]*>([^<]+)<\/h1>/);
if (h1Match) {
  const h1Text = h1Match[1];
  const h1Length = h1Text.length;
  check(
    `/compress H1 长度合适 (${h1Length} 字符)`,
    h1Length >= 40 && h1Length <= 70
  );
}

// 5. 检查 package.json 脚本
console.log("\n5️⃣  检查 NPM 脚本...");
const packagePath = join(__dirname, "../package.json");
const packageContent = JSON.parse(readFileSync(packagePath, "utf-8"));
check(
  "seo:add-breadcrumbs 脚本存在",
  !!packageContent.scripts["seo:add-breadcrumbs"]
);
check("og:convert 脚本存在", !!packageContent.scripts["og:convert"]);

// 6. 抽查几个 guides 页面的 BreadcrumbList
console.log("\n6️⃣  抽查 guides 页面...");
const testPages = [
  "compress-to-200kb",
  "compress-to-500kb",
  "blur-face-in-photo",
];

for (const slug of testPages) {
  const pagePath = join(
    __dirname,
    `../app/(marketing)/guides/${slug}/page.tsx`
  );
  if (existsSync(pagePath)) {
    const content = readFileSync(pagePath, "utf-8");
    check(`${slug} 有 BreadcrumbJsonLd`, content.includes("BreadcrumbJsonLd"));
  }
}

// 输出结果
console.log("\n" + "=".repeat(60));
console.log("📊 验证结果");
console.log("=".repeat(60));

for (const detail of checks.details) {
  console.log(`${detail.status} ${detail.name}`);
}

console.log("\n" + "=".repeat(60));
console.log(`✅ 通过: ${checks.passed}`);
console.log(`❌ 失败: ${checks.failed}`);
console.log(`⚠️  警告: ${checks.warnings}`);
console.log("=".repeat(60));

if (checks.failed === 0) {
  console.log("\n🎉 所有关键检查都通过了！");

  if (checks.warnings > 0) {
    console.log("\n⚠️  有一些警告项需要注意：");
    console.log("   - 如果 og.png 大小<10KB，运行: npm run og:convert");
  }

  console.log("\n📋 后续步骤：");
  console.log("1. 如果 og.png 未转换，运行: npm run og:convert");
  console.log(
    '2. 提交代码: git add . && git commit -m "SEO 优化：修复 sitemap、H1、OG 图片、添加 BreadcrumbList"'
  );
  console.log("3. 推送到 GitHub: git push");
  console.log("4. 部署后运行: npm run submit:indexnow:incremental");
  console.log("5. 验证 OG 图片：");
  console.log("   - Facebook: https://developers.facebook.com/tools/debug/");
  console.log("   - Twitter: https://cards-dev.twitter.com/validator");

  process.exit(0);
} else {
  console.log("\n❌ 有些检查未通过，请修复后再继续。");
  process.exit(1);
}
