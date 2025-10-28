"use client";
import { useEffect, useRef } from "react";

type Props = {
  slot?: string;
  format?: string; // e.g. "auto"
  layout?: "in-article" | "fluid" | undefined;
  style?: React.CSSProperties;
  className?: string;
};

// Generic AdSense unit wrapper. Respects global env switch via data-ads on <body>.
export default function AdsenseUnit({ slot, format = "auto", layout, style, className }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const body = typeof document !== 'undefined' ? document.body : null;
    const enabled = body?.getAttribute('data-ads') === 'on';
    if (!enabled) return;
    try {
      // @ts-expect-error global adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch { }
  }, []);

  // Hide in dev or when disabled to avoid layout flashes
  const body = typeof document !== 'undefined' ? document.body : null;
  const enabled = body?.getAttribute('data-ads') === 'on';
  if (!enabled) return null;

  return (
    <div ref={ref} className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        {...(slot ? { "data-ad-slot": slot } : {})}
        {...(layout ? { "data-ad-layout": layout } : {})}
        {...(format ? { "data-ad-format": format } : {})}
      />
    </div>
  );
}


