import assert from "node:assert/strict";
import test from "node:test";
import nextConfig from "../next.config.ts";

const adEnv = {
  NEXT_PUBLIC_ADSENSE: "true",
  NEXT_PUBLIC_GOOGLE_CMP_READY: "true",
  NEXT_PUBLIC_ADSENSE_CLIENT: "ca-pub-1234567890123456",
  NEXT_PUBLIC_ADSENSE_SLOT: "1234567890",
};

async function headerNames(env: Record<string, string>) {
  const keys = ["VERCEL_ENV", "NODE_ENV", ...Object.keys(adEnv)] as const;
  const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  Object.assign(process.env, env);
  for (const key of keys) if (!(key in env)) delete process.env[key];
  try {
    const rules = await nextConfig.headers?.();
    return new Set((rules?.[0]?.headers || []).map((header) => header.key));
  } finally {
    for (const key of keys) {
      const value = previous[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("ad-free builds retain the resource CSP", async () => {
  const names = await headerNames({ NODE_ENV: "production", VERCEL_ENV: "production" });
  assert.equal(names.has("Content-Security-Policy"), true);
  assert.equal(names.has("Strict-Transport-Security"), true);
});

test("Vercel Preview cannot disable CSP even with production ad credentials", async () => {
  const names = await headerNames({ NODE_ENV: "production", VERCEL_ENV: "preview", ...adEnv });
  assert.equal(names.has("Content-Security-Policy"), true);
  assert.equal(names.has("Strict-Transport-Security"), false);
});

test("only an ads-qualified Production build omits the incompatible resource CSP", async () => {
  const names = await headerNames({ NODE_ENV: "production", VERCEL_ENV: "production", ...adEnv });
  assert.equal(names.has("Content-Security-Policy"), false);
  assert.equal(names.has("Strict-Transport-Security"), true);
});
