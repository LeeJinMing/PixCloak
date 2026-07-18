export type ServiceConfig = {
  analyticsAvailable: boolean;
  adsAvailable: boolean;
  adsClient?: string;
  adsSlot?: string;
  adsReason: string;
};

const trueValue = (value: string | undefined) => value === "true";
export const validAdsClient = (value: string | undefined) => /^ca-pub-\d{10,}$/.test(value || "");
export const validAdsSlot = (value: string | undefined) => /^\d{6,}$/.test(value || "");

export function isProductionDeployment(env: Readonly<Record<string, string | undefined>>) {
  // Vercel Preview and Production both run optimized Next.js builds, so
  // NODE_ENV alone cannot distinguish whether an ad is allowed to load.
  if (env.VERCEL_ENV) return env.VERCEL_ENV === "production";
  return env.NODE_ENV === "production";
}

export function resolveServiceConfig(
  env: Readonly<Record<string, string | undefined>>,
  isProduction: boolean,
): ServiceConfig {
  const adsClient = env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adsSlot = env.NEXT_PUBLIC_ADSENSE_SLOT;
  const adsRequested = trueValue(env.NEXT_PUBLIC_ADSENSE);
  const cmpReady = trueValue(env.NEXT_PUBLIC_GOOGLE_CMP_READY);
  let adsReason = "ready";
  if (!adsRequested) adsReason = "ads_disabled";
  else if (!isProduction) adsReason = "not_production";
  else if (!cmpReady) adsReason = "cmp_not_ready";
  else if (!validAdsClient(adsClient)) adsReason = "invalid_client";
  else if (!validAdsSlot(adsSlot)) adsReason = "invalid_slot";
  return {
    analyticsAvailable: trueValue(env.NEXT_PUBLIC_ANALYTICS),
    adsAvailable: adsReason === "ready",
    adsClient: validAdsClient(adsClient) ? adsClient : undefined,
    adsSlot: validAdsSlot(adsSlot) ? adsSlot : undefined,
    adsReason,
  };
}
