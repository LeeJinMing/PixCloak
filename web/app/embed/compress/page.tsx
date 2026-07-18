import type { Metadata } from "next";
import { Suspense } from "react";
import CompressClient from "@/app/compress/Client";

export const metadata: Metadata = {
  title: "PixCloak Compressor Embed",
  robots: { index: false, follow: true },
  alternates: { canonical: "/compress" },
};

export default function EmbedCompressPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompressClient embedded surface="embed" />
    </Suspense>
  );
}
