"use client";
import { Suspense } from "react";
import CompressClient from "@/app/compress/Client";

export default function EmbedCompressPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompressClient embedded />
    </Suspense>
  );
}
