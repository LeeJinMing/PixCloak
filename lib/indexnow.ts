export async function submitIndexNow(
  urls: string[]
): Promise<{ ok: boolean; status: number; body?: any }> {
  const host = (process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com")
    .replace(/\/$/, "")
    .replace(/^https?:\/\//, "");
  const key =
    process.env.INDEXNOW_KEY || process.env.NEXT_PUBLIC_INDEXNOW_KEY || "";
  if (!key)
    return { ok: false, status: 400, body: { error: "Missing INDEXNOW_KEY" } };
  const keyLocation = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
  }/${key}.txt`;
  const payload = { host, key, keyLocation, urlList: urls };
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.text().catch(() => "");
    return { ok: res.ok, status: res.status, body };
  } catch (e) {
    return { ok: false, status: 500, body: String(e) };
  }
}

export async function pingSitemaps(): Promise<void> {
  const site = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://pixcloak.com"
  ).replace(/\/$/, "");
  const sitemaps = ["/sitemap.xml", "/guides/sitemap.xml"];
  await Promise.all(
    sitemaps.map((p) =>
      fetch(
        `https://www.bing.com/ping?sitemap=${encodeURIComponent(site + p)}`
      ).catch(() => null)
    )
  );
}
