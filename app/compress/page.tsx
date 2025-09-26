import { Suspense } from "react";
import type { Metadata } from "next";
import CompressClient from "./Client";
import dynamic from "next/dynamic";

const AdsenseUnit = dynamic(() => import("@/components/Adsense"), { ssr: false });

export const metadata: Metadata = {
  alternates: {
    canonical: "/compress",
    languages: {
      "x-default": "/compress",
      en: "/compress",
      es: "/compress-es",
      pt: "/compress-pt",
      id: "/compress-id",
    },
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <div style={{ position: 'relative' }}>
        {/* Side rails - keep away from main controls */}
        <div className="ad-rail" style={{ left: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <div className="ad-rail" style={{ right: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <CompressClient />
        {/* Bottom ad below main content */}
        <div className="ad-bottom">
          <AdsenseUnit format="auto" />
        </div>
      </div>
    </Suspense>
  );
}


