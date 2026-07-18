import assert from "node:assert/strict";
import test from "node:test";
import { isProductionDeployment, resolveServiceConfig } from "../lib/serviceConfig.ts";

const valid = {
  NEXT_PUBLIC_ADSENSE: "true",
  NEXT_PUBLIC_GOOGLE_CMP_READY: "true",
  NEXT_PUBLIC_ADSENSE_CLIENT: "ca-pub-1234567890123456",
  NEXT_PUBLIC_ADSENSE_SLOT: "1234567890",
};

test("ads require production, an explicit switch, CMP, valid client and valid slot", () => {
  assert.equal(resolveServiceConfig(valid, true).adsAvailable, true);
  assert.equal(resolveServiceConfig(valid, false).adsReason, "not_production");
  assert.equal(resolveServiceConfig({ ...valid, NEXT_PUBLIC_ADSENSE: "false" }, true).adsReason, "ads_disabled");
  assert.equal(resolveServiceConfig({ ...valid, NEXT_PUBLIC_GOOGLE_CMP_READY: "false" }, true).adsReason, "cmp_not_ready");
  assert.equal(resolveServiceConfig({ ...valid, NEXT_PUBLIC_ADSENSE_CLIENT: "ca-pub-placeholder" }, true).adsReason, "invalid_client");
  assert.equal(resolveServiceConfig({ ...valid, NEXT_PUBLIC_ADSENSE_SLOT: "slot-name" }, true).adsReason, "invalid_slot");
});

test("analytics remains separately consent-gated and does not enable ads", () => {
  const config = resolveServiceConfig({ NEXT_PUBLIC_ANALYTICS: "true", NEXT_PUBLIC_ADSENSE: "false" }, true);
  assert.equal(config.analyticsAvailable, true);
  assert.equal(config.adsAvailable, false);
});

test("Vercel Preview is not treated as production just because Next.js is optimized", () => {
  assert.equal(isProductionDeployment({ NODE_ENV: "production", VERCEL_ENV: "preview" }), false);
  assert.equal(isProductionDeployment({ NODE_ENV: "production", VERCEL_ENV: "development" }), false);
  assert.equal(isProductionDeployment({ NODE_ENV: "production", VERCEL_ENV: "production" }), true);
  assert.equal(isProductionDeployment({ NODE_ENV: "production" }), true, "self-hosted production remains supported");
});
