import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.join(__dirname, "..", "app");

/**
 * 从文件内容中提取 metadata
 */
function extractMetadata(filePath, content) {
  const metadata = {
    file: filePath,
    title: null,
    description: null,
    hasMetadata: false,
  };

  // 检查是否有 export const metadata
  // 使用更健壮的方法匹配整个metadata对象
  // 匹配从 export const metadata 开始到第一个匹配的闭合大括号
  const metadataStartMatch = content.match(
    /export\s+const\s+metadata\s*:\s*Metadata\s*=\s*{/s
  );

  if (!metadataStartMatch) {
    // 检查是否有 metadata 对象但格式不同
    if (
      content.includes("export const metadata") ||
      content.includes("metadata:")
    ) {
      metadata.hasMetadata = true;
    }
    return metadata;
  }

  metadata.hasMetadata = true;

  // 找到metadata对象的开始位置
  const startPos = metadataStartMatch.index + metadataStartMatch[0].length - 1; // -1 因为要包含 {
  let braceCount = 1;
  let pos = startPos + 1;

  // 查找匹配的闭合大括号（处理嵌套）
  while (pos < content.length && braceCount > 0) {
    if (content[pos] === "{") braceCount++;
    if (content[pos] === "}") braceCount--;
    pos++;
  }

  if (braceCount === 0) {
    // 提取metadata对象内容（不包括外层大括号）
    const metadataContent = content.substring(startPos + 1, pos - 1);
    extractTitleAndDescription(metadataContent, metadata);
  } else {
    // 如果无法正确匹配，尝试使用简单的正则表达式
    const metadataSimpleMatch = content.match(
      /export\s+const\s+metadata[^=]*=\s*{([^}]+(?:\{[^}]*\}[^}]*)*)}/s
    );
    if (metadataSimpleMatch) {
      const metadataContent = metadataSimpleMatch[1];
      extractTitleAndDescription(metadataContent, metadata);
    }
  }

  return metadata;
}

/**
 * 从metadata内容字符串中提取title和description
 */
function extractTitleAndDescription(metadataContent, metadata) {
  // 提取 title
  // 可能的形式：
  // 1. title: "string"
  // 2. title: { default: "string", template: "..." }
  // 3. title: { template: "%s | PixCloak" } (没有default，使用默认值)

  // 先尝试简单字符串形式
  const titleSimpleMatch = metadataContent.match(
    /title\s*:\s*["']([^"']+)["']/
  );
  if (titleSimpleMatch) {
    metadata.title = titleSimpleMatch[1];
  } else {
    // 尝试对象形式，匹配 default 字段
    const titleDefaultMatch = metadataContent.match(
      /title\s*:\s*{\s*[^}]*default\s*:\s*["']([^"']+)["']/s
    );
    if (titleDefaultMatch) {
      metadata.title = titleDefaultMatch[1];
    } else {
      // 如果只有 template 没有 default，说明使用默认值 "PixCloak"
      const titleTemplateOnlyMatch = metadataContent.match(
        /title\s*:\s*{\s*template\s*:/
      );
      const titleDefaultExists = metadataContent.match(
        /title\s*:\s*{\s*[^}]*default\s*:/
      );
      if (titleTemplateOnlyMatch && !titleDefaultExists) {
        // 只有template，使用默认值
        metadata.title = "PixCloak";
      }
    }
  }

  // 提取 description
  // 可能是单行或多行字符串
  // 先尝试单行
  const descSimpleMatch = metadataContent.match(
    /description\s*:\s*["']([^"']+)["']/
  );
  if (descSimpleMatch) {
    metadata.description = descSimpleMatch[1];
  } else {
    // 尝试多行字符串 (使用模板字符串或换行)
    const descMultiMatch = metadataContent.match(
      /description\s*:\s*["']((?:[^"']|\n|\\n)+)["']/s
    );
    if (descMultiMatch) {
      metadata.description = descMultiMatch[1]
        .replace(/\n\s*/g, " ")
        .replace(/\\n/g, " ")
        .trim();
    } else {
      // 尝试模板字符串形式 (反引号)
      const descTemplateMatch = metadataContent.match(
        /description\s*:\s*`([^`]+)`/s
      );
      if (descTemplateMatch) {
        metadata.description = descTemplateMatch[1]
          .replace(/\n\s*/g, " ")
          .trim();
      }
    }
  }
}

/**
 * 递归查找所有 page.tsx 文件
 */
function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findPageFiles(filePath, fileList);
    } else if (file === "page.tsx") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * 扫描所有页面文件
 */
function scanPages() {
  const pageFiles = findPageFiles(appDir);

  const results = {
    total: 0,
    withMetadata: 0,
    withoutMetadata: 0,
    titles: {},
    descriptions: {},
    missingTitle: [],
    missingDescription: [],
    allMetadata: [],
  };

  for (const filePath of pageFiles) {
    results.total++;

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const metadata = extractMetadata(
        path.relative(appDir, filePath),
        content
      );

      results.allMetadata.push(metadata);

      if (metadata.hasMetadata) {
        results.withMetadata++;

        const title = metadata.title || "(missing)";
        const description = metadata.description || "(missing)";

        // 统计 title
        if (!results.titles[title]) {
          results.titles[title] = [];
        }
        results.titles[title].push(metadata.file);

        // 统计 description
        if (!results.descriptions[description]) {
          results.descriptions[description] = [];
        }
        results.descriptions[description].push(metadata.file);

        // 记录缺失的
        if (!metadata.title) {
          results.missingTitle.push(metadata.file);
        }
        if (!metadata.description) {
          results.missingDescription.push(metadata.file);
        }
      } else {
        results.withoutMetadata++;
      }
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error.message);
    }
  }

  return results;
}

/**
 * 生成报告
 */
function generateReport(results) {
  const report = {
    summary: {
      totalPages: results.total,
      withMetadata: results.withMetadata,
      withoutMetadata: results.withoutMetadata,
      missingTitle: results.missingTitle.length,
      missingDescription: results.missingDescription.length,
    },
    titleDuplicity: {},
    descriptionDuplicity: {},
    issues: [],
  };

  // 分析 title 重复率
  for (const [title, files] of Object.entries(results.titles)) {
    const count = files.length;
    const percentage = ((count / results.total) * 100).toFixed(2);

    report.titleDuplicity[title] = {
      count,
      percentage: parseFloat(percentage),
      files,
    };

    // 如果超过10%，标记为问题
    if (parseFloat(percentage) > 10) {
      report.issues.push({
        type: "title_duplicity",
        title,
        count,
        percentage: parseFloat(percentage),
        severity:
          parseFloat(percentage) > 50
            ? "critical"
            : parseFloat(percentage) > 30
            ? "high"
            : "medium",
        files,
      });
    }
  }

  // 分析 description 重复率
  for (const [description, files] of Object.entries(results.descriptions)) {
    const count = files.length;
    const percentage = ((count / results.total) * 100).toFixed(2);

    report.descriptionDuplicity[description] = {
      count,
      percentage: parseFloat(percentage),
      files,
    };

    // 如果超过10%，标记为问题
    if (parseFloat(percentage) > 10) {
      report.issues.push({
        type: "description_duplicity",
        description,
        count,
        percentage: parseFloat(percentage),
        severity:
          parseFloat(percentage) > 50
            ? "critical"
            : parseFloat(percentage) > 30
            ? "high"
            : "medium",
        files,
      });
    }
  }

  return report;
}

/**
 * 主函数
 */
function main() {
  console.log("🔍 扫描页面 metadata...\n");

  const results = scanPages();
  const report = generateReport(results);

  // 输出摘要
  console.log("📊 摘要统计:");
  console.log(`   总页面数: ${report.summary.totalPages}`);
  console.log(`   有metadata: ${report.summary.withMetadata}`);
  console.log(`   无metadata: ${report.summary.withoutMetadata}`);
  console.log(`   缺失title: ${report.summary.missingTitle}`);
  console.log(`   缺失description: ${report.summary.missingDescription}\n`);

  // 输出问题
  if (report.issues.length > 0) {
    console.log("⚠️  发现的问题:\n");

    for (const issue of report.issues) {
      const emoji =
        issue.severity === "critical"
          ? "🔴"
          : issue.severity === "high"
          ? "🟠"
          : "🟡";
      console.log(`${emoji} ${issue.severity.toUpperCase()}: ${issue.type}`);

      if (issue.type === "title_duplicity") {
        console.log(`   Title: "${issue.title}"`);
        console.log(
          `   重复率: ${issue.percentage}% (${issue.count}/${report.summary.totalPages} 页面)`
        );
        console.log(`   影响页面:`);
        issue.files
          .slice(0, 5)
          .forEach((file) => console.log(`     - ${file}`));
        if (issue.files.length > 5) {
          console.log(`     ... 还有 ${issue.files.length - 5} 个页面`);
        }
      } else if (issue.type === "description_duplicity") {
        console.log(`   Description: "${issue.description}"`);
        console.log(
          `   重复率: ${issue.percentage}% (${issue.count}/${report.summary.totalPages} 页面)`
        );
        console.log(`   影响页面:`);
        issue.files
          .slice(0, 5)
          .forEach((file) => console.log(`     - ${file}`));
        if (issue.files.length > 5) {
          console.log(`     ... 还有 ${issue.files.length - 5} 个页面`);
        }
      }
      console.log("");
    }
  } else {
    console.log("✅ 未发现重复率超过10%的问题\n");
  }

  // 输出 Top 10 重复的 title
  const titleEntries = Object.entries(report.titleDuplicity)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  if (titleEntries.length > 0) {
    console.log("📋 Top 10 最常使用的 Title:");
    titleEntries.forEach(([title, data]) => {
      console.log(`   "${title}": ${data.count} 页面 (${data.percentage}%)`);
    });
    console.log("");
  }

  // 输出 Top 10 重复的 description
  const descEntries = Object.entries(report.descriptionDuplicity)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  if (descEntries.length > 0) {
    console.log("📋 Top 10 最常使用的 Description:");
    descEntries.forEach(([desc, data]) => {
      const preview = desc.length > 80 ? desc.substring(0, 80) + "..." : desc;
      console.log(`   "${preview}": ${data.count} 页面 (${data.percentage}%)`);
    });
    console.log("");
  }

  // 保存详细报告到文件
  const reportPath = path.join(
    __dirname,
    "..",
    "metadata-duplicity-report.json"
  );
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");
  console.log(`📄 详细报告已保存到: ${reportPath}`);

  // 如果发现问题，返回非0退出码
  if (report.issues.length > 0) {
    process.exit(1);
  }
}

main();
