import { loadEnvConfig } from "@next/env";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { resolve } from "node:path";
import { resolveServiceConfig } from "../lib/serviceConfig.ts";

const root = resolve(import.meta.dirname, "..");
loadEnvConfig(root);
const live = process.argv.includes("--live");
const errors: string[] = [];
const warnings: string[] = [];
const site = process.env.NEXT_PUBLIC_SITE_URL || "";
const services = resolveServiceConfig(process.env, true);
const adsRequested = process.env.NEXT_PUBLIC_ADSENSE === "true";

try {
  const url = new URL(site);
  if (url.protocol !== "https:") errors.push("NEXT_PUBLIC_SITE_URL must use https.");
  if (live && url.hostname !== "pixcloak.com") errors.push("Live release requires NEXT_PUBLIC_SITE_URL=https://pixcloak.com.");
} catch {
  errors.push("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
}

if (adsRequested && !services.adsAvailable) {
  const message = `Ads were requested but runtime will block them: ${services.adsReason}.`;
  if (live) errors.push(message); else warnings.push(message);
}
if (!adsRequested) warnings.push("Ads are disabled; this is valid for the no-ad release candidate.");
if (process.env.NEXT_PUBLIC_ANALYTICS !== "true") warnings.push("Vercel Analytics is disabled; product funnel events will not be collected.");

if (live) {
  if (!services.adsAvailable) errors.push("Live ad release requires verified CMP, AdSense client, and AdSense slot settings.");
  const indexNowKey = process.env.INDEXNOW_KEY || "";
  if (indexNowKey.length < 16 || /replace|placeholder|这里/i.test(indexNowKey)) {
    errors.push("Live release requires a non-placeholder INDEXNOW_KEY.");
  } else {
    const keyFile = join(root, "public", `${indexNowKey}.txt`);
    if (!existsSync(keyFile) || readFileSync(keyFile, "utf8").trim() !== indexNowKey) {
      errors.push(`INDEXNOW_KEY must match the published public/${indexNowKey}.txt verification file.`);
    }
  }
}

if (errors.length) {
  console.error(JSON.stringify({ ok: false, mode: live ? "live-ad-release" : "candidate", errors, warnings }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, mode: live ? "live-ad-release" : "candidate", ads: services.adsAvailable ? "ready" : services.adsReason, analytics: services.analyticsAvailable ? "enabled-after-consent" : "disabled", warnings }, null, 2));
