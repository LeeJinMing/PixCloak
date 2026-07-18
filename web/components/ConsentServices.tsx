"use client";

import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { emitProductEvent } from "@/lib/productEvents";

type Consent = "pending" | "essential" | "all";
const STORAGE_KEY = "pixcloak-consent-v1";

export function ConsentServices({
  analyticsAvailable,
  adsAvailable,
  adsClient,
}: {
  analyticsAvailable: boolean;
  adsAvailable: boolean;
  adsClient?: string;
}) {
  const pathname = usePathname() ?? "";
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const optionalServicesAvailable = analyticsAvailable || adsAvailable;
  const optionalServicesLabel = isZh
    ? analyticsAvailable && adsAvailable
      ? "分析与广告"
      : analyticsAvailable
        ? "网站分析"
        : "广告"
    : analyticsAvailable && adsAvailable
      ? "analytics & ads"
      : analyticsAvailable
        ? "analytics"
        : "ads";
  const [consent, setConsent] = useState<Consent>(optionalServicesAvailable ? "pending" : "essential");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "all" || saved === "essential") setConsent(saved);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.filter((registration) => registration.active?.scriptURL.endsWith("/sw.js")).forEach((registration) => registration.unregister());
      }).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const adsOn = consent === "all" && adsAvailable && Boolean(adsClient);
    const analyticsOn = consent === "all" && analyticsAvailable;
    document.body.dataset.ads = adsOn ? "on" : "off";
    document.body.dataset.analytics = analyticsOn ? "on" : "off";
    window.dispatchEvent(new CustomEvent("pixcloak:consent", { detail: { consent, adsOn, analyticsOn } }));
  }, [consent, analyticsAvailable, adsAvailable, adsClient]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-related-tool]") : null;
      const tool = target?.dataset.relatedTool;
      if (tool) emitProductEvent("related_tool_clicked", { tool });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function choose(next: Exclude<Consent, "pending">) {
    window.localStorage.setItem(STORAGE_KEY, next);
    setConsent(next);
  }

  function reset() {
    window.localStorage.removeItem(STORAGE_KEY);
    setConsent("pending");
  }

  return (
    <>
      {consent === "all" && analyticsAvailable && <Analytics />}
      {consent === "all" && adsAvailable && adsClient && (
        <Script
          id="pixcloak-adsense"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
          crossOrigin="anonymous"
        />
      )}
      {consent === "pending" ? (
        <aside className="consent-banner" aria-label={isZh ? "隐私设置" : "Privacy choices"}>
          <div>
            <strong>{isZh ? "选择网站隐私设置" : "Choose website privacy settings"}</strong>
            {isZh ? (
              <p>
                图片处理始终在浏览器本地完成。可选的{optionalServicesLabel}只会在你同意后加载；分析事件不包含图片字节、文件名或元数据。
              </p>
            ) : (
              <p>
                Image processing stays in your browser. Separately, optional {optionalServicesLabel} may load only after you accept.
                PixCloak does not include image bytes, filenames, or metadata in analytics events.
              </p>
            )}
            <Link href="/privacy">{isZh ? "查看隐私详情" : "Privacy details"}</Link>
          </div>
          <div className="consent-actions">
            <button className="button-outline" onClick={() => choose("essential")}>{isZh ? "仅必要功能" : "Essential only"}</button>
            <button className="button" onClick={() => choose("all")}>{isZh ? `允许${optionalServicesLabel}` : `Allow ${optionalServicesLabel}`}</button>
          </div>
        </aside>
      ) : (
        <button className="consent-reset" onClick={reset}>{isZh ? "隐私设置" : "Privacy choices"}</button>
      )}
    </>
  );
}
