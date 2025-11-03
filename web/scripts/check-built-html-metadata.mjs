import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.join(__dirname, "..", "app");

/**
 * 获取所有页面的路由路径
 */
function getAllRoutes() {
  const routes = [];
  const excludeDirs = ["api", "embed", "node_modules"];

  function findPages(dir, basePath = "") {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      if (excludeDirs.includes(file)) return;

      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const newBasePath = basePath
          ? `${basePath}/${file}`
          : file === "(marketing)"
          ? ""
          : file;
        findPages(filePath, newBasePath);
      } else if (file === "page.tsx" || file === "page.ts") {
        // 转换为路由路径
        let route = basePath || "/";
        if (route === "(marketing)") route = "";
        if (!route.startsWith("/")) route = `/${route}`;
        routes.push(route);
      }
    });
  }

  findPages(appDir);
  return [...new Set(routes)].sort(); // 去重并排序
}

/**
 * 从HTML中提取title和description
 */
function extractMetadataFromHTML(html) {
  const metadata = {
    title: null,
    description: null,
  };

  // 提取title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }

  // 提取description
  const descMatch = html.match(
    /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i
  );
  if (descMatch) {
    metadata.description = descMatch[1].trim();
  } else {
    // 尝试property="og:description"
    const ogDescMatch = html.match(
      /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i
    );
    if (ogDescMatch) {
      metadata.description = ogDescMatch[1].trim();
    }
  }

  return metadata;
}

/**
 * 通过HTTP请求获取页面HTML
 */
function fetchPageHTML(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname || "localhost",
      port: urlObj.port || 3000,
      path: urlObj.pathname,
      method: "GET",
      headers: {
        "User-Agent": "Metadata-Checker/1.0",
      },
      timeout: 10000,
    };

    const req = http.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${urlObj.pathname}`));
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error(`Timeout for ${urlObj.pathname}`));
    });

    req.end();
  });
}

/**
 * 检查服务器是否运行
 */
async function checkServerRunning(baseUrl) {
  try {
    await fetchPageHTML(`${baseUrl}/`);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 扫描所有页面的metadata
 */
async function scanBuiltPages(baseUrl = "http://localhost:3000") {
  console.log(`🔍 检查服务器: ${baseUrl}\n`);

  // 检查服务器是否运行
  const isRunning = await checkServerRunning(baseUrl);
  if (!isRunning) {
    console.error(
      `❌ 服务器未运行！请先启动生产服务器：\n   cd web && npm start\n`
    );
    process.exit(1);
  }

  const routes = getAllRoutes();
  console.log(`📋 找到 ${routes.length} 个路由，开始检查...\n`);

  const results = {
    total: 0,
    success: 0,
    failed: 0,
    titles: {},
    descriptions: {},
    allMetadata: [],
    errors: [],
  };

  // 逐页检查
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const url = `${baseUrl}${route}`;
    results.total++;

    try {
      console.log(`[${i + 1}/${routes.length}] 检查 ${route}...`);
      const html = await fetchPageHTML(url);
      const metadata = extractMetadataFromHTML(html);

      results.allMetadata.push({
        route,
        url,
        ...metadata,
      });

      // 统计title
      if (metadata.title) {
        if (!results.titles[metadata.title]) {
          results.titles[metadata.title] = [];
        }
        results.titles[metadata.title].push(route);
      }

      // 统计description
      if (metadata.description) {
        if (!results.descriptions[metadata.description]) {
          results.descriptions[metadata.description] = [];
        }
        results.descriptions[metadata.description].push(route);
      }

      results.success++;

      // 避免请求过快
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (err) {
      results.failed++;
      results.errors.push({
        route,
        error: err.message,
      });
      console.error(`   ❌ 错误: ${err.message}`);
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
      success: results.success,
      failed: results.failed,
      uniqueTitles: Object.keys(results.titles).length,
      uniqueDescriptions: Object.keys(results.descriptions).length,
    },
    titleDuplicity: {},
    descriptionDuplicity: {},
    issues: [],
  };

  // 分析title重复率
  for (const [title, routes] of Object.entries(results.titles)) {
    const count = routes.length;
    const percentage = ((count / results.total) * 100).toFixed(2);

    report.titleDuplicity[title] = {
      count,
      percentage: parseFloat(percentage),
      routes,
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
        routes,
      });
    }
  }

  // 分析description重复率
  for (const [description, routes] of Object.entries(results.descriptions)) {
    const count = routes.length;
    const percentage = ((count / results.total) * 100).toFixed(2);

    report.descriptionDuplicity[description] = {
      count,
      percentage: parseFloat(percentage),
      routes,
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
        routes,
      });
    }
  }

  return report;
}

/**
 * 主函数
 */
async function main() {
  const baseUrl = process.argv[2] || "http://localhost:3000";

  console.log("🔍 检查构建后的HTML metadata...\n");
  console.log("⚠️  注意: 请确保生产服务器正在运行 (npm start)\n");

  const results = await scanBuiltPages(baseUrl);
  const report = generateReport(results);

  // 输出摘要
  console.log("\n📊 摘要统计:");
  console.log(`   总页面数: ${report.summary.totalPages}`);
  console.log(`   成功检查: ${report.summary.success}`);
  console.log(`   失败: ${report.summary.failed}`);
  console.log(`   唯一title数: ${report.summary.uniqueTitles}`);
  console.log(`   唯一description数: ${report.summary.uniqueDescriptions}\n`);

  // 输出错误（如果有）
  if (results.errors.length > 0) {
    console.log(`⚠️  检查失败的页面 (${results.errors.length}):`);
    results.errors.slice(0, 10).forEach((err) => {
      console.log(`   - ${err.route}: ${err.error}`);
    });
    if (results.errors.length > 10) {
      console.log(`   ... 还有 ${results.errors.length - 10} 个错误`);
    }
    console.log("");
  }

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
        issue.routes.slice(0, 10).forEach((route) => {
          console.log(`     - ${route}`);
        });
        if (issue.routes.length > 10) {
          console.log(`     ... 还有 ${issue.routes.length - 10} 个页面`);
        }
      } else if (issue.type === "description_duplicity") {
        const preview =
          issue.description.length > 80
            ? issue.description.substring(0, 80) + "..."
            : issue.description;
        console.log(`   Description: "${preview}"`);
        console.log(
          `   重复率: ${issue.percentage}% (${issue.count}/${report.summary.totalPages} 页面)`
        );
        console.log(`   影响页面:`);
        issue.routes.slice(0, 10).forEach((route) => {
          console.log(`     - ${route}`);
        });
        if (issue.routes.length > 10) {
          console.log(`     ... 还有 ${issue.routes.length - 10} 个页面`);
        }
      }
      console.log("");
    }
  } else {
    console.log("✅ 未发现重复率超过10%的问题\n");
  }

  // 输出Top 10重复的title
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

  // 输出Top 10重复的description
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

  // 保存详细报告
  const reportPath = path.join(
    __dirname,
    "..",
    "built-html-metadata-report.json"
  );
  fs.writeFileSync(
    reportPath,
    JSON.stringify({ results, report }, null, 2),
    "utf-8"
  );
  console.log(`📄 详细报告已保存到: ${reportPath}`);

  // 如果发现问题，返回非0退出码
  if (report.issues.length > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
