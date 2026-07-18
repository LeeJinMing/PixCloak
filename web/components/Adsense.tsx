"use client";
import { useEffect, useRef, useState } from "react";
import { emitProductEvent } from "@/lib/productEvents";

type Props = {
  slot?: string;
  format?: string; // e.g. "auto"
  layout?: "in-article" | "fluid" | undefined;
  style?: React.CSSProperties;
  className?: string;
};

// Generic AdSense unit wrapper. Respects global env switch via data-ads on <body>.
export default function AdsenseUnit({ slot, format = "auto", layout, style, className }: Props) {
  const resolvedSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT;
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    function sync() {
      const next = document.body?.getAttribute('data-ads') === 'on';
      setEnabled(next);
      if (!next) return;
      try {
        // @ts-expect-error global adsbygoogle
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch { }
    }
    sync();
    window.addEventListener("pixcloak:consent", sync);
    return () => window.removeEventListener("pixcloak:consent", sync);
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    let sent = false;
    const observer = new IntersectionObserver((entries) => {
      if (!sent && entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) {
        sent = true;
        emitProductEvent("ad_viewable", { tool: "content_ad" });
        observer.disconnect();
      }
    }, { threshold: [0.5] });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div ref={ref} className={className} data-ad-placeholder={enabled ? "active" : "reserved"} style={{ minHeight: 120, ...style }}>
      {enabled && resolvedSlot && <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={resolvedSlot}
        {...(layout ? { "data-ad-layout": layout } : {})}
        {...(format ? { "data-ad-format": format } : {})}
      />}
    </div>
  );
}


