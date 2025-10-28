type IndexNowResult = {
  ok: boolean;
  status: number;
  body?: string | { error: string };
  engine?: string;
};

type BatchSubmitResult = {
  total: number;
  succeeded: number;
  failed: number;
  results: IndexNowResult[];
};

const INDEXNOW_ENDPOINTS = [
  "https://api.indexnow.org/indexnow", // 通用端点
  "https://www.bing.com/indexnow", // Bing 专用
  "https://yandex.com/indexnow", // Yandex（俄罗斯和东欧市场）
];

// 带重试机制的 fetch
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
): Promise<Response> {
  let lastError: Error | null = null;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000), // 10秒超时
      });
      return res;
    } catch (e) {
      lastError = e as Error;
      if (i < maxRetries - 1) {
        // 指数退避：1s, 2s, 4s
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, i)));
      }
    }
  }
  throw lastError || new Error("Unknown fetch error");
}

// 提交到单个 IndexNow 端点
async function submitToEndpoint(
  endpoint: string,
  urls: string[],
  engineName: string
): Promise<IndexNowResult> {
  const host = (process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com")
    .replace(/\/$/, "")
    .replace(/^https?:\/\//, "");
  const key =
    process.env.INDEXNOW_KEY || process.env.NEXT_PUBLIC_INDEXNOW_KEY || "";
  if (!key)
    return {
      ok: false,
      status: 400,
      body: { error: "Missing INDEXNOW_KEY" },
      engine: engineName,
    };
  const keyLocation = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
  }/${key}.txt`;
  const payload = { host, key, keyLocation, urlList: urls };

  try {
    const res = await fetchWithRetry(
      endpoint,
      {
        method: "POST",
        headers: { "content-type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      },
      3
    );
    const body = await res.text().catch(() => "");
    return { ok: res.ok, status: res.status, body, engine: engineName };
  } catch (e) {
    return {
      ok: false,
      status: 500,
      body: String(e),
      engine: engineName,
    };
  }
}

// 主要提交函数（向所有端点提交）
export async function submitIndexNow(urls: string[]): Promise<IndexNowResult> {
  // 默认使用通用端点（最可靠）
  return submitToEndpoint(INDEXNOW_ENDPOINTS[0], urls, "IndexNow (General)");
}

// 批量提交到所有搜索引擎（最大化曝光）
export async function submitIndexNowToAllEngines(
  urls: string[]
): Promise<BatchSubmitResult> {
  const engineNames = ["IndexNow (General)", "Bing", "Yandex"];
  const results = await Promise.all(
    INDEXNOW_ENDPOINTS.map((endpoint, i) =>
      submitToEndpoint(endpoint, urls, engineNames[i])
    )
  );

  const succeeded = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;

  return {
    total: results.length,
    succeeded,
    failed,
    results,
  };
}

// 分批提交大量 URLs（避免超过 API 限制）
export async function submitIndexNowInBatches(
  urls: string[],
  batchSize = 100,
  delayMs = 2000
): Promise<BatchSubmitResult> {
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  const results: IndexNowResult[] = [];
  for (const batch of batches) {
    const result = await submitIndexNow(batch);
    results.push(result);
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  const succeeded = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;

  return {
    total: results.length,
    succeeded,
    failed,
    results,
  };
}

// 通知多个搜索引擎的网站地图更新
export async function pingSitemaps(): Promise<void> {
  const site = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
  ).replace(/\/$/, "");
  const sitemaps = ["/sitemap.xml", "/guides/sitemap.xml"];

  // Bing 和 Google 的网站地图 ping 端点
  const pingUrls = sitemaps.flatMap((p) => [
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(site + p)}`,
    `https://www.google.com/ping?sitemap=${encodeURIComponent(site + p)}`,
  ]);

  await Promise.allSettled(
    pingUrls.map((url) =>
      fetch(url).catch((e) => {
        console.error(`Sitemap ping failed for ${url}:`, e);
        return null;
      })
    )
  );
}
