import { Suspense } from "react";
import type { Metadata } from "next";
import RedactClient from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CoreToolLayout } from "@/components/CoreToolLayout";
import { SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Redact Faces, Plates, IDs, and Private Text",
  description: "Draw permanent solid, pixelated, or blurred redactions locally, export a flattened JPEG, and verify supported metadata is absent.",
  alternates: { canonical: "/redact", languages: { "x-default": "/redact", en: "/redact" } },
};

const faq = [
  { question: "Is blur permanent in the downloaded file?", answer: "Yes. Solid, pixelated, and blurred regions are drawn into a new canvas and encoded into the exported JPEG pixels." },
  { question: "Does V1.0 find faces or plates automatically?", answer: "No. Every image requires manual review. Local automatic face, plate, text, and QR detection is reserved for V1.1." },
  { question: "Is metadata removed too?", answer: "The JPEG export is scanned again for supported EXIF, GPS, XMP, and IPTC markers before it is offered as verified." },
];

export default function Page() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Redact", url: "/redact" }]} /><SoftwareAppJsonLd name="PixCloak Image Redaction" url="/redact" description="Apply permanent local redactions and verify the exported JPEG." image="/og.png" /><CoreToolLayout eyebrow="IMAGE REDACTION" title="Apply permanent manual redactions" description="Cover faces, plates, IDs, screenshots, or private text with a solid block, strong pixelation, or true blur; then verify the flattened export." tool={<Suspense fallback={<div className="card">Loading local redaction editor…</div>}><RedactClient /></Suspense>} scenarios={["Hiding private details in screenshots", "Covering plates, IDs, signatures, or account numbers", "Reviewing every image in a batch before ZIP export"]} limitations={["V1.0 does not automatically detect sensitive regions.", "Weak blur or small boxes can leave context readable; inspect at 100% zoom.", "HEIC should be converted before the final metadata review."]} next={[{ href: "/safe-share", label: "Use the complete Safe Share flow" }, { href: "/tools/exif-checker", label: "Inspect metadata only" }]} faq={faq} sample="privacy" /></>;
}
