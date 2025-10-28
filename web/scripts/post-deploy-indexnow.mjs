/**
 * Vercel 部署后钩子脚本
 *
 * 用途：在 Vercel 部署成功后自动提交新内容到 IndexNow
 *
 * 配置方法：
 * 1. 在 Vercel 项目设置中添加环境变量 INDEXNOW_KEY
 * 2. 在 package.json 的 scripts 中添加：
 *    "vercel-build": "next build && node scripts/post-deploy-indexnow.mjs"
 */

const site = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_URL ||
  "https://pixcloak.com"
).replace(/\/$/, "");
const key =
  process.env.INDEXNOW_KEY || process.env.NEXT_PUBLIC_INDEXNOW_KEY || "";

// 在 Vercel 环境中
const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.VERCEL_ENV === "production";

console.log("🚀 Vercel 部署后 IndexNow 钩子");
console.log(`📍 环境: ${process.env.VERCEL_ENV || "local"}`);
console.log(`📍 网站: ${site}`);

// 仅在生产环境执行
if (!isProduction) {
  console.log("⚠️  非生产环境，跳过 IndexNow 提交");
  process.exit(0);
}

if (!key) {
  console.log("⚠️  缺少 INDEXNOW_KEY，跳过 IndexNow 提交");
  process.exit(0);
}

const ENDPOINTS = [
  { url: "https://api.indexnow.org/indexnow", name: "IndexNow" },
  { url: "https://www.bing.com/indexnow", name: "Bing" },
];

// 提交关键页面（部署后最重要的页面）
const PRIORITY_URLS = [
  `${site}/`,
  `${site}/compress`,
  `${site}/redact`,
  `${site}/guides`,
  `${site}/tools`,
  `${site}/about`,
];

async function submitToEndpoint(endpoint, urls) {
  const host = site.replace(/^https?:\/\//, "");
  const keyLocation = `${site}/${key}.txt`;
  const payload = { host, key, keyLocation, urlList: urls };

  try {
    const res = await fetch(endpoint.url, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      console.log(`✅ ${endpoint.name}: 提交成功`);
      return { ok: true };
    } else {
      console.log(`❌ ${endpoint.name}: HTTP ${res.status}`);
      return { ok: false };
    }
  } catch (e) {
    console.log(`❌ ${endpoint.name}: ${e.message}`);
    return { ok: false };
  }
}

async function pingSitemaps() {
  const sitemaps = [`${site}/sitemap.xml`, `${site}/guides/sitemap.xml`];
  await Promise.allSettled(
    sitemaps.flatMap((s) => [
      fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(s)}`).catch(
        () => null
      ),
      fetch(
        `https://www.google.com/ping?sitemap=${encodeURIComponent(s)}`
      ).catch(() => null),
    ])
  );
  console.log("✅ 网站地图通知完成");
}

async function main() {
  console.log("📤 提交关键页面到搜索引擎...");

  const results = await Promise.all(
    ENDPOINTS.map((endpoint) => submitToEndpoint(endpoint, PRIORITY_URLS))
  );

  const succeeded = results.filter((r) => r.ok).length;
  console.log(`📊 ${succeeded}/${ENDPOINTS.length} 个端点提交成功`);

  console.log("🔔 通知网站地图更新...");
  await pingSitemaps();

  console.log("🎉 部署后 IndexNow 钩子完成");
}

main().catch((e) => {
  console.error("❌ 钩子执行失败:", e);
  // 不要因为 IndexNow 失败而导致部署失败
  process.exit(0);
});
