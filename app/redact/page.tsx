import type { Metadata } from "next";
import { Suspense } from "react";
import RedactClient from "./Client";

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
      <RedactClient />
    </Suspense>
  );
}


