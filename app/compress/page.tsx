import { Suspense } from "react";
import type { Metadata } from "next";
import CompressClient from "./Client";
import AdsenseUnit from "@/components/Adsense";

export const metadata: Metadata = {
  title: "Online Image Compressor – Target KB, No Upload | PixCloak",
  description:
    "Compress images to 200KB/500KB/1MB, choose JPEG/WebP/PNG, resize to 1920, and batch ZIP. 100% local processing—no upload, privacy‑first.",
  alternates: {
    canonical: "/",
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


