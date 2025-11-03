import https from "https";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = process.argv[2] || "https://pixcloak.com";
const domain = siteUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

/**
 * 问题1: 检查DNS分析问题 (nslookup命令失败)
 */
async function checkDNSIssue() {
  console.log("🔍 问题1: 检查DNS分析问题...\n");

  const result = {
    issue: "DNS分析: nslookup命令失败",
    status: "unknown",
    details: {},
    errors: [],
  };

  try {
    // 尝试使用nslookup查询A记录
    console.log(`  尝试 nslookup -type=A ${domain}...`);
    const { stdout } = await execAsync(`nslookup -type=A ${domain}`);
    result.details.A = stdout;
    result.status = "resolved";
    console.log("  ✅ nslookup命令成功");
    console.log(`  结果: ${stdout.split("\n").slice(0, 3).join(" ")}`);
  } catch (error) {
    result.status = "failed";
    result.errors.push({
      command: `nslookup -type=A ${domain}`,
      error: error.message,
      stderr: error.stderr || "",
    });
    console.log(`  ❌ nslookup命令失败: ${error.message}`);
  }

  return result;
}

/**
 * 问题2: 检查SSL/TLS配置 (TLS 1.3支持)
 */
async function checkTLS13Issue() {
  console.log("\n🔍 问题2: 检查TLS 1.3支持...\n");

  const result = {
    issue: "SSL/TLS协议: TLSv1.3不支持",
    status: "unknown",
    tls13Supported: false,
    currentProtocol: null,
    details: {},
  };

  return new Promise((resolve) => {
    const options = {
      hostname: domain,
      port: 443,
      method: "GET",
      path: "/",
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      const socket = res.socket;

      // 获取当前使用的协议
      if (socket.getProtocol) {
        try {
          result.currentProtocol = socket.getProtocol();
          result.tls13Supported = result.currentProtocol === "TLSv1.3";
          console.log(`  ✅ 当前使用的协议: ${result.currentProtocol}`);

          if (result.tls13Supported) {
            result.status = "resolved";
            console.log("  ✅ TLS 1.3 已启用");
          } else {
            result.status = "confirmed";
            console.log(
              `  ⚠️  TLS 1.3 未启用 (当前使用: ${result.currentProtocol})`
            );
          }
        } catch (error) {
          console.log(`  ⚠️  无法获取协议信息: ${error.message}`);
        }
      }

      // 获取证书信息
      if (socket.getPeerCertificate) {
        try {
          const cert = socket.getPeerCertificate(true);
          result.details.certificate = {
            issuer: cert.issuer?.CN || "Unknown",
            validFrom: cert.valid_from,
            validTo: cert.valid_to,
          };
          console.log(`  ✅ 证书颁发者: ${result.details.certificate.issuer}`);
        } catch (error) {
          console.log(`  ⚠️  无法获取证书信息: ${error.message}`);
        }
      }

      res.on("data", () => {});
      res.on("end", () => {
        resolve(result);
      });
    });

    req.on("error", (error) => {
      result.status = "error";
      result.details.error = error.message;
      console.error(`  ❌ SSL连接失败: ${error.message}`);
      resolve(result);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      result.status = "timeout";
      result.details.error = "连接超时";
      console.error(`  ❌ SSL连接超时`);
      resolve(result);
    });

    req.end();
  });
}

/**
 * 问题3: 检查84个页面的安全问题
 */
async function check84PagesSecurity() {
  console.log("\n🔍 问题3: 检查页面安全问题 (84个页面)...\n");

  const result = {
    issue: "安全: 84个页面有严重发现",
    status: "checking",
    totalPages: 0,
    checkedPages: 0,
    pagesWithIssues: [],
    commonIssues: {},
  };

  // 从sitemap获取所有页面
  const routes = await getAllRoutes();
  result.totalPages = routes.length;

  console.log(`  找到 ${routes.length} 个页面，开始检查前20个作为示例...\n`);

  // 检查前20个页面作为示例
  const samplePages = routes.slice(0, 20);
  for (const route of samplePages) {
    try {
      const url = `${siteUrl}${route}`;
      console.log(
        `  [${result.checkedPages + 1}/${samplePages.length}] 检查 ${route}...`
      );

      const pageIssues = await checkSinglePageSecurity(url);
      if (pageIssues.length > 0) {
        result.pagesWithIssues.push({
          route,
          url,
          issues: pageIssues,
          issueCount: pageIssues.length,
        });

        // 统计常见问题
        pageIssues.forEach((issue) => {
          if (!result.commonIssues[issue.type]) {
            result.commonIssues[issue.type] = {
              count: 0,
              severity: issue.severity,
            };
          }
          result.commonIssues[issue.type].count++;
        });
      }

      result.checkedPages++;
      await new Promise((resolve) => setTimeout(resolve, 300)); // 避免请求过快
    } catch (error) {
      console.error(`  ❌ 检查失败: ${error.message}`);
    }
  }

  result.status = "completed";
  console.log(`\n  ✅ 检查完成: ${result.checkedPages} 个页面`);
  console.log(`  ⚠️  发现 ${result.pagesWithIssues.length} 个页面有问题`);

  return result;
}

/**
 * 获取所有路由
 */
async function getAllRoutes() {
  const appDir = path.join(__dirname, "..", "app");

  function findPages(dir, basePath = "") {
    const routes = [];
    const excludeDirs = ["api", "embed", "node_modules"];

    try {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        if (excludeDirs.includes(file)) return;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          const newBasePath =
            basePath === "(marketing)"
              ? file
              : basePath
              ? `${basePath}/${file}`
              : file === "(marketing)"
              ? ""
              : file;
          routes.push(...findPages(filePath, newBasePath));
        } else if (file === "page.tsx" || file === "page.ts") {
          let route = basePath || "/";
          if (route === "(marketing)") route = "";
          if (!route.startsWith("/")) route = `/${route}`;
          routes.push(route);
        }
      });
    } catch (error) {
      // 忽略错误
    }

    return routes;
  }

  const routes = findPages(appDir);
  return [...new Set(routes)].sort();
}

/**
 * 检查单个页面的安全问题
 */
function checkSinglePageSecurity(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      method: "GET",
      path: urlObj.pathname,
      rejectUnauthorized: false,
    };

    const issues = [];

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk.toString();
      });

      res.on("end", () => {
        // 检查常见安全问题

        // 1. 检查缺少安全头
        const securityHeaders = [
          "strict-transport-security",
          "x-content-type-options",
          "x-frame-options",
          "content-security-policy",
        ];

        securityHeaders.forEach((header) => {
          if (!res.headers[header]) {
            issues.push({
              type: "missing_security_header",
              header,
              severity: "warning",
              message: `缺少安全头: ${header}`,
            });
          }
        });

        // 2. 检查不安全的资源（HTTP而非HTTPS）
        const httpResources = data.match(/src=["']http:\/\/[^"']+["']/gi);
        if (httpResources) {
          issues.push({
            type: "insecure_resource",
            severity: "critical",
            message: `发现 ${httpResources.length} 个HTTP资源（应使用HTTPS）`,
            count: httpResources.length,
          });
        }

        // 3. 检查内联脚本（可能导致XSS）
        const inlineScripts = data.match(/<script[^>]*>[\s\S]*?<\/script>/gi);
        if (inlineScripts && inlineScripts.length > 0) {
          issues.push({
            type: "inline_script",
            severity: "warning",
            message: `发现 ${inlineScripts.length} 个内联脚本`,
            count: inlineScripts.length,
          });
        }

        // 4. 检查HTTP状态码
        if (res.statusCode !== 200) {
          issues.push({
            type: "http_status_error",
            severity: "error",
            message: `HTTP状态码: ${res.statusCode}`,
            statusCode: res.statusCode,
          });
        }

        resolve(issues);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error("Timeout"));
    });

    req.end();
  });
}

/**
 * 主函数
 */
async function main() {
  console.log("=".repeat(60));
  console.log("🔍 检查用户报告的安全问题\n");
  console.log(`📍 站点: ${siteUrl}`);
  console.log(`🌐 域名: ${domain}\n`);
  console.log("=".repeat(60));

  const report = {
    siteUrl,
    domain,
    timestamp: new Date().toISOString(),
    issues: {},
    summary: {
      totalIssues: 0,
      confirmedIssues: 0,
      resolvedIssues: 0,
    },
  };

  try {
    // 检查问题1: DNS分析
    report.issues.dns = await checkDNSIssue();
    if (report.issues.dns.status === "failed") {
      report.summary.totalIssues++;
      report.summary.confirmedIssues++;
    } else if (report.issues.dns.status === "resolved") {
      report.summary.resolvedIssues++;
    }

    // 检查问题2: TLS 1.3支持
    report.issues.tls13 = await checkTLS13Issue();
    if (report.issues.tls13.status === "confirmed") {
      report.summary.totalIssues++;
      report.summary.confirmedIssues++;
    } else if (report.issues.tls13.status === "resolved") {
      report.summary.resolvedIssues++;
    }

    // 检查问题3: 84个页面安全问题
    report.issues.pages = await check84PagesSecurity();
    if (report.issues.pages.pagesWithIssues.length > 0) {
      report.summary.totalIssues++;
      report.summary.confirmedIssues++;
    }

    // 输出摘要
    console.log("\n" + "=".repeat(60));
    console.log("📊 检查摘要\n");
    console.log(`总问题数: ${report.summary.totalIssues}`);
    console.log(`确认的问题: ${report.summary.confirmedIssues}`);
    console.log(`已解决的问题: ${report.summary.resolvedIssues}\n`);

    // 输出详细结果
    if (report.summary.confirmedIssues > 0) {
      console.log("⚠️  确认的问题:\n");

      // DNS问题
      if (report.issues.dns.status === "failed") {
        console.log("❌ 问题1: DNS分析 - nslookup命令失败");
        console.log(
          `   详情: ${report.issues.dns.errors[0]?.error || "未知错误"}\n`
        );
      }

      // TLS 1.3问题
      if (report.issues.tls13.status === "confirmed") {
        console.log("⚠️  问题2: SSL/TLS协议 - TLS 1.3未启用");
        console.log(
          `   当前协议: ${report.issues.tls13.currentProtocol || "未知"}`
        );
        console.log(`   建议: 联系服务器提供商启用TLS 1.3支持\n`);
      }

      // 页面安全问题
      if (report.issues.pages.pagesWithIssues.length > 0) {
        console.log(
          `⚠️  问题3: 页面安全问题 - ${report.issues.pages.pagesWithIssues.length} 个页面有问题`
        );
        console.log(`   常见问题:`);
        Object.entries(report.issues.pages.commonIssues).forEach(
          ([type, data]) => {
            console.log(`     - ${type}: ${data.count} 个页面`);
          }
        );
        console.log("");
      }
    } else {
      console.log("✅ 未发现报告的问题\n");
    }

    // 保存报告
    const reportPath = path.join(
      __dirname,
      "..",
      "security-issues-diagnosis.json"
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");
    console.log(`📄 详细报告已保存到: ${reportPath}`);
  } catch (error) {
    console.error("❌ 检查过程出错:", error);
    process.exit(1);
  }
}

main().catch(console.error);
