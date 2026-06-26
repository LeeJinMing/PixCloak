import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { LONG_TAIL_SLUGS } from "@/lib/longTailGuides";

const PRIORITY_GUIDES = new Set([
  "blur-face-in-photo",
  "compress-image-to-100kb",
  "compress-to-200kb",
  "remove-exif-wechat",
  "tinypng-alternative-free-no-upload",
  "license-plate-redaction",
]);

/** Sole sitemap for /guides and /guides/* (see robots.ts + root app/sitemap.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pixcloak.com"
  ).replace(/\/$/, "");
  const guidesUpdated = new Date("2026-06-26");
  const defaultGuideUpdated = new Date("2026-05-24");

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
        const isPriority = PRIORITY_GUIDES.has(entry.name);
        urls.push({
          url: `${base}/guides/${entry.name}`,
          lastModified: isPriority ? guidesUpdated : defaultGuideUpdated,
          changeFrequency: isPriority ? "weekly" : "monthly",
          priority: isPriority ? 0.85 : 0.65,
        });
      }
    }
  } catch {
    // ignore scan errors; keep minimal sitemap
  }

  urls.push({
    url: `${base}/guides/long-tail`,
    lastModified: defaultGuideUpdated,
    changeFrequency: "monthly",
    priority: 0.55,
  });

  for (const slug of LONG_TAIL_SLUGS) {
    urls.push({
      url: `${base}/guides/long-tail/${slug}`,
      lastModified: defaultGuideUpdated,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return urls;
}
