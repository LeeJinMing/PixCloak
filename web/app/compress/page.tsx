import { Suspense } from "react";
import type { Metadata } from "next";
import CompressClient from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CoreToolLayout } from "@/components/CoreToolLayout";
import { SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Compress Images to a Verified KB Limit",
  description: "Compress JPG, PNG, WebP, or HEIC-derived images to a hard KB cap, reduce dimensions when needed, and verify the output before download.",
  alternates: { canonical: "/compress", languages: { "x-default": "/compress", en: "/compress" } },
};

const faq = [
  { question: "Can a successful result exceed the target?", answer: "No. The encoder checks the final Blob size and rejects an output above the selected byte cap." },
  { question: "What if lowering quality is not enough?", answer: "The shared engine reduces dimensions and retries. If the configured minimum dimension would be crossed, it returns a clear failure instead of an oversized file." },
  { question: "Is the source image uploaded?", answer: "No. Decode, resize, encode, and verification happen in this browser. Optional consented analytics and advertising are separate and never include the image or filename." },
];

export default function Page() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Compress", url: "/compress" }]} /><SoftwareAppJsonLd name="PixCloak Image Compressor" url="/compress" description="Compress images to a hard KB limit and verify the exported result." image="/og.png" /><CoreToolLayout eyebrow="IMAGE COMPRESSOR" title="Compress to a hard KB limit" description="Choose JPEG, WebP, or PNG and an exact maximum size. PixCloak lowers quality first, then dimensions, and never labels an over-limit result as successful." tool={<Suspense fallback={<div className="card">Loading local compressor…</div>}><CompressClient /></Suspense>} scenarios={["Meeting 100KB, 200KB, 500KB, or 1MB portal limits", "Reducing a batch while keeping per-file failure details", "Comparing JPEG, WebP, and PNG under the same cap"]} limitations={["Complex photographs can require smaller dimensions at very low targets.", "PNG is often inefficient for photographic content.", "A portal may also enforce dimensions, aspect ratio, or filename rules."]} next={[{ href: "/safe-share", label: "Remove private details first" }, { href: "/upload-ready", label: "Use requirement presets" }]} faq={faq} /></>;
}
