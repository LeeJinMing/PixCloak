import { Suspense } from "react";
import type { Metadata } from "next";
import CompressClient from "./Client";

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
      <CompressClient />
    </Suspense>
  );
}


