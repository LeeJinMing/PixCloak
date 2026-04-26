import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { LONG_TAIL_SLUGS } from "@/lib/longTailGuides";

/** Sole sitemap for /guides and /guides/* (see robots.ts + root app/sitemap.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com"
  ).replace(/\/$/, "");
  const guidesUpdated = new Date("2026-04-24");

  const urls: MetadataRoute.Sitemap = [];

  // /guides index page
  urls.push({
    url: `${base}/guides`,
    lastModified: guidesUpdated,
    changeFrequency: "weekly",
    priority: 0.9,
  });

  // scan app/(marketing)/guides/*/page.tsx (one-level static guides)
  try {
    const marketingGuidesDir = path.join(
      process.cwd(),
      "app",
      "(marketing)",
      "guides"
    );
    const entries = fs.readdirSync(marketingGuidesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name === "long-tail") continue; // handled separately
      const pagePath = path.join(marketingGuidesDir, entry.name, "page.tsx");
      if (fs.existsSync(pagePath)) {
        urls.push({
          url: `${base}/guides/${entry.name}`,
          lastModified: guidesUpdated,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  } catch {
    // ignore scan errors; keep minimal sitemap
  }

  urls.push({
    url: `${base}/guides/long-tail`,
    lastModified: guidesUpdated,
    changeFrequency: "monthly",
    priority: 0.7,
  });

  for (const slug of LONG_TAIL_SLUGS) {
    urls.push({
      url: `${base}/guides/long-tail/${slug}`,
      lastModified: guidesUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return urls;
}
