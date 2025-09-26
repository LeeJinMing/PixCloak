import type { Metadata } from "next";
import { Suspense } from "react";
import RedactClient from "./Client";
import dynamic from "next/dynamic";

const AdsenseUnit = dynamic(() => import("@/components/Adsense"), { ssr: false });

export const metadata: Metadata = {
  alternates: {
    canonical: "/redact",
    languages: {
      "x-default": "/redact",
      en: "/redact",
      es: "/redact-es",
      pt: "/redact-pt",
      id: "/redact-id",
    },
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <div style={{ position: 'relative' }}>
        <div className="ad-rail" style={{ left: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <div className="ad-rail" style={{ right: 0 }}>
          <AdsenseUnit format="auto" />
        </div>
        <RedactClient />
        <div className="ad-bottom">
          <AdsenseUnit format="auto" />
        </div>
      </div>
    </Suspense>
  );
}


