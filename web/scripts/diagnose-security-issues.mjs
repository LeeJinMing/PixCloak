import https from "https";
import http from "http";
import tls from "tls";
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
 * 检查DNS配置
 */
async function checkDNS() {
  console.log("🔍 检查DNS配置...\n");

  const results = {
    domain,
    dnsRecords: {},
    issues: [],
  };

  try {
    // 检查A记录
    console.log("  检查A记录...");
    const { stdout: aRecord } = await execAsync(`nslookup -type=A ${domain}`);
    results.dnsRecords.A = aRecord;
    console.log("  ✅ A记录查询成功");
  } catch (error) {
    results.issues.push({
      type: "dns_nslookup_failed",
      severity: "warning",
      message: `nslookup A记录查询失败: ${error.message}`,
      error: error.message,
    });
    console.log(`  ⚠️  nslookup A记录查询失败: ${error.message}`);
  }

  try {
    // 检查AAAA记录（IPv6）
    console.log("  检查AAAA记录...");
    const { stdout: aaaaRecord } = await execAsync(
      `nslookup -type=AAAA ${domain}`
    );
    results.dnsRecords.AAAA = aaaaRecord;
    console.log("  ✅ AAAA记录查询成功");
  } catch (error) {
    console.log(`  ⚠️  nslookup AAAA记录查询失败: ${error.message}`);
  }

  try {
    // 检查CNAME记录
    console.log("  检查CNAME记录...");
    const { stdout: cnameRecord } = await execAsync(
      `nslookup -type=CNAME ${domain}`
    );
    results.dnsRecords.CNAME = cnameRecord;
    console.log("  ✅ CNAME记录查询成功");
  } catch (error) {
    console.log(`  ⚠️  nslookup CNAME记录查询失败（可能没有CNAME记录）`);
  }

  try {
    // 检查MX记录
    console.log("  检查MX记录...");
    const { stdout: mxRecord } = await execAsync(`nslookup -type=MX ${domain}`);
    results.dnsRecords.MX = mxRecord;
    console.log("  ✅ MX记录查询成功");
  } catch (error) {
    console.log(`  ⚠️  nslookup MX记录查询失败（可能没有MX记录）`);
  }

  try {
    // 检查TXT记录
    console.log("  检查TXT记录...");
    const { stdout: txtRecord } = await execAsync(
      `nslookup -type=TXT ${domain}`
    );
    results.dnsRecords.TXT = txtRecord;
    console.log("  ✅ TXT记录查询成功");
  } catch (error) {
    console.log(`  ⚠️  nslookup TXT记录查询失败（可能没有TXT记录）`);
  }

  return results;
}

/**
 * 检查SSL/TLS配置
 */
async function checkSSL() {
  console.log("\n🔍 检查SSL/TLS配置...\n");

  const results = {
    supportedProtocols: [],
    enabledCipherSuites: [],
    certificate: {},
    issues: [],
    tls13Supported: false,
  };

  return new Promise((resolve, reject) => {
    const options = {
      hostname: domain,
      port: 443,
      method: "GET",
      path: "/",
      rejectUnauthorized: false, // 允许自签名证书
      // 不指定secureProtocol，让Node.js自动协商最高版本
    };

    const req = https.request(options, (res) => {
      const socket = res.socket;

      // 获取协议信息
      if (socket.getProtocol) {
        const protocol = socket.getProtocol();
        results.supportedProtocols.push(protocol);
        results.tls13Supported = protocol === "TLSv1.3";
        console.log(`  ✅ 当前使用协议: ${protocol}`);
      }

      // 获取证书信息
      if (socket.getPeerCertificate) {
        const cert = socket.getPeerCertificate(true);
        results.certificate = {
          subject: cert.subject,
          issuer: cert.issuer,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          serialNumber: cert.serialNumber,
        };
        console.log(`  ✅ 证书颁发者: ${cert.issuer?.CN || "Unknown"}`);
        console.log(`  ✅ 证书有效期: ${cert.valid_from} 至 ${cert.valid_to}`);
      }

      // 获取加密套件
      if (socket.getCipher) {
        const cipher = socket.getCipher();
        results.enabledCipherSuites.push(cipher);
        console.log(`  ✅ 加密套件: ${cipher.name}`);
      }

      res.on("data", () => {});
      res.on("end", async () => {
        // 测试不同TLS版本
        await testTLSVersions(results);
        resolve(results);
      });
    });

    req.on("error", (error) => {
      results.issues.push({
        type: "ssl_connection_failed",
        severity: "error",
        message: `SSL连接失败: ${error.message}`,
      });
      console.error(`  ❌ SSL连接失败: ${error.message}`);
      resolve(results);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      results.issues.push({
        type: "ssl_connection_timeout",
        severity: "error",
        message: "SSL连接超时",
      });
      resolve(results);
    });

    req.end();
  });

  // 测试不同TLS版本
  async function testTLSVersions(results) {
    // 检查当前使用的协议是否已经是TLS 1.3
    if (results.supportedProtocols.includes("TLSv1.3")) {
      results.tls13Supported = true;
      console.log(`  ✅ TLS 1.3 已启用`);
    } else {
      // 尝试测试TLS 1.3支持
      try {
        const testResult = await testTLS13Support();
        if (testResult) {
          results.tls13Supported = true;
          results.supportedProtocols.push("TLSv1.3");
          console.log(`  ✅ TLS 1.3 支持`);
        } else {
          results.issues.push({
            type: "tls13_not_supported",
            severity: "warning",
            message: "TLS 1.3 未启用。建议联系服务器提供商启用TLS 1.3支持。",
          });
          console.log(`  ⚠️  TLS 1.3 未启用`);
        }
      } catch (error) {
        results.issues.push({
          type: "tls13_test_failed",
          severity: "warning",
          message: `TLS 1.3 测试失败: ${error.message}`,
        });
        console.log(`  ⚠️  TLS 1.3 测试失败: ${error.message}`);
      }
    }
  }

  // 测试TLS 1.3支持
  function testTLS13Support() {
    return new Promise((resolve, reject) => {
      const options = {
        host: domain,
        port: 443,
        rejectUnauthorized: false,
        minVersion: "TLSv1.3",
        maxVersion: "TLSv1.3",
      };

      const socket = tls.connect(options, () => {
        try {
          const protocol = socket.getProtocol();
          socket.destroy();
          resolve(protocol === "TLSv1.3");
        } catch (error) {
          socket.destroy();
          resolve(false);
        }
      });

      socket.on("error", (error) => {
        socket.destroy();
        resolve(false); // TLS 1.3不支持
      });

      socket.setTimeout(5000, () => {
        socket.destroy();
        resolve(false);
      });
    });
  }
}

/**
 * 检查HTTP安全头
 */
async function checkSecurityHeaders() {
  console.log("\n🔍 检查HTTP安全头...\n");

  const results = {
    headers: {},
    missingHeaders: [],
    issues: [],
  };

  return new Promise((resolve, reject) => {
    const options = {
      hostname: domain,
      port: 443,
      method: "HEAD",
      path: "/",
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      // 检查常见安全头
      const securityHeaders = [
        "strict-transport-security",
        "x-content-type-options",
        "x-frame-options",
        "x-xss-protection",
        "content-security-policy",
        "referrer-policy",
        "permissions-policy",
      ];

      results.headers = res.headers;

      securityHeaders.forEach((header) => {
        if (res.headers[header]) {
          console.log(`  ✅ ${header}: ${res.headers[header]}`);
        } else {
          results.missingHeaders.push(header);
          console.log(`  ⚠️  ${header}: 缺失`);
        }
      });

      if (results.missingHeaders.length > 0) {
        results.issues.push({
          type: "missing_security_headers",
          severity: "warning",
          message: `缺少${results.missingHeaders.length}个安全头`,
          missing: results.missingHeaders,
        });
      }

      resolve(results);
    });

    req.on("error", (error) => {
      results.issues.push({
        type: "security_headers_check_failed",
        severity: "error",
        message: `安全头检查失败: ${error.message}`,
      });
      resolve(results);
    });

    req.end();
  });
}

/**
 * 获取所有页面并检查安全问题
 */
async function checkPagesSecurity() {
  console.log("\n🔍 检查页面安全问题...\n");

  // 读取所有路由
  const routes = await getAllRoutes();
  console.log(`  找到 ${routes.length} 个页面，开始检查...\n`);

  const results = {
    totalPages: routes.length,
    checkedPages: 0,
    pagesWithIssues: [],
    issues: [],
  };

  // 检查前10个页面作为示例
  const samplePages = routes.slice(0, 10);
  for (const route of samplePages) {
    try {
      const url = `${siteUrl}${route}`;
      console.log(
        `  [${results.checkedPages + 1}/${samplePages.length}] 检查 ${route}...`
      );

      const pageResults = await checkSinglePage(url);
      if (pageResults.issues.length > 0) {
        results.pagesWithIssues.push({
          route,
          url,
          issues: pageResults.issues,
        });
      }

      results.checkedPages++;
      await new Promise((resolve) => setTimeout(resolve, 200)); // 避免请求过快
    } catch (error) {
      results.issues.push({
        type: "page_check_failed",
        route,
        error: error.message,
      });
    }
  }

  return results;
}

/**
 * 检查单个页面的安全问题
 */
function checkSinglePage(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      method: "GET",
      path: urlObj.pathname,
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk.toString();
      });

      res.on("end", () => {
        const issues = [];

        // 检查常见安全问题
        // 1. 检查是否有外部脚本（可能导致安全问题）
        const externalScripts = data.match(
          /<script[^>]+src=["'](https?:\/\/[^"']+)["']/gi
        );
        if (externalScripts) {
          externalScripts.forEach((script) => {
            const srcMatch = script.match(/src=["']([^"']+)["']/i);
            if (srcMatch && !srcMatch[1].includes(urlObj.hostname)) {
              issues.push({
                type: "external_script",
                severity: "info",
                message: `外部脚本: ${srcMatch[1]}`,
              });
            }
          });
        }

        // 2. 检查是否有内联脚本（可能导致XSS）
        const inlineScripts = data.match(/<script[^>]*>[\s\S]*?<\/script>/gi);
        if (inlineScripts) {
          issues.push({
            type: "inline_script",
            severity: "warning",
            message: `发现 ${inlineScripts.length} 个内联脚本`,
          });
        }

        // 3. 检查是否有不安全的外部资源
        const insecureResources = data.match(/src=["']http:\/\/[^"']+["']/gi);
        if (insecureResources) {
          issues.push({
            type: "insecure_resource",
            severity: "warning",
            message: `发现 ${insecureResources.length} 个HTTP资源（应使用HTTPS）`,
          });
        }

        resolve({
          url,
          issues,
        });
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
 * 获取所有路由
 */
async function getAllRoutes() {
  const routes = [
    "/",
    "/about",
    "/compress",
    "/redact",
    "/tools",
    "/guides",
    "/contact",
    "/privacy",
    "/terms",
    // 添加更多路由...
  ];
  return routes;
}

/**
 * 主函数
 */
async function main() {
  console.log("🔍 开始诊断安全问题...\n");
  console.log(`📍 站点: ${siteUrl}\n`);
  console.log(`🌐 域名: ${domain}\n`);

  const report = {
    siteUrl,
    domain,
    timestamp: new Date().toISOString(),
    dns: null,
    ssl: null,
    securityHeaders: null,
    pages: null,
    summary: {
      totalIssues: 0,
      criticalIssues: 0,
      warnings: 0,
    },
  };

  try {
    // 1. 检查DNS
    report.dns = await checkDNS();
    report.summary.totalIssues += report.dns.issues.length;
    report.dns.issues.forEach((issue) => {
      if (issue.severity === "error") report.summary.criticalIssues++;
      if (issue.severity === "warning") report.summary.warnings++;
    });

    // 2. 检查SSL/TLS
    report.ssl = await checkSSL();
    report.summary.totalIssues += report.ssl.issues.length;
    report.ssl.issues.forEach((issue) => {
      if (issue.severity === "error") report.summary.criticalIssues++;
      if (issue.severity === "warning") report.summary.warnings++;
    });

    // 3. 检查安全头
    report.securityHeaders = await checkSecurityHeaders();
    report.summary.totalIssues += report.securityHeaders.issues.length;
    report.securityHeaders.issues.forEach((issue) => {
      if (issue.severity === "error") report.summary.criticalIssues++;
      if (issue.severity === "warning") report.summary.warnings++;
    });

    // 4. 检查页面安全问题
    report.pages = await checkPagesSecurity();
    report.summary.totalIssues += report.pages.pagesWithIssues.length;

    // 输出摘要
    console.log("\n" + "=".repeat(60));
    console.log("📊 诊断摘要\n");
    console.log(`总问题数: ${report.summary.totalIssues}`);
    console.log(`严重问题: ${report.summary.criticalIssues}`);
    console.log(`警告: ${report.summary.warnings}\n`);

    // 输出关键问题
    if (report.summary.totalIssues > 0) {
      console.log("⚠️  发现的问题:\n");

      // DNS问题
      if (report.dns.issues.length > 0) {
        console.log("🔴 DNS问题:");
        report.dns.issues.forEach((issue) => {
          console.log(`   - ${issue.message}`);
        });
        console.log("");
      }

      // SSL/TLS问题
      if (report.ssl.issues.length > 0) {
        console.log("🔴 SSL/TLS问题:");
        report.ssl.issues.forEach((issue) => {
          console.log(`   - ${issue.message}`);
        });
        console.log("");
      }

      // 安全头问题
      if (report.securityHeaders.issues.length > 0) {
        console.log("🟡 安全头问题:");
        report.securityHeaders.issues.forEach((issue) => {
          console.log(`   - ${issue.message}`);
        });
        console.log("");
      }

      // 页面安全问题
      if (report.pages.pagesWithIssues.length > 0) {
        console.log(
          `🟡 页面安全问题: ${report.pages.pagesWithIssues.length} 个页面有问题`
        );
        report.pages.pagesWithIssues.slice(0, 5).forEach((page) => {
          console.log(`   - ${page.route}: ${page.issues.length} 个问题`);
        });
        if (report.pages.pagesWithIssues.length > 5) {
          console.log(
            `   ... 还有 ${report.pages.pagesWithIssues.length - 5} 个页面`
          );
        }
        console.log("");
      }
    } else {
      console.log("✅ 未发现严重问题\n");
    }

    // 保存报告
    const reportPath = path.join(
      __dirname,
      "..",
      "security-diagnosis-report.json"
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf-8");
    console.log(`📄 详细报告已保存到: ${reportPath}`);
  } catch (error) {
    console.error("❌ 诊断过程出错:", error);
    process.exit(1);
  }
}

main().catch(console.error);
