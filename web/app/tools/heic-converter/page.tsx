import type { Metadata } from "next";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CoreToolLayout } from "@/components/CoreToolLayout";
import { SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Convert HEIC to JPG or WebP Locally",
  description: "Decode iPhone HEIC/HEIF images in a local worker, export JPEG or WebP, and verify the result opens before download.",
  alternates: { canonical: "/tools/heic-converter", languages: { "x-default": "/tools/heic-converter", en: "/tools/heic-converter" } },
};

const faq = [
  { question: "Is the HEIC file sent to a converter server?", answer: "No. A browser worker decodes the selected file on this device. The page may load consented analytics or ads separately, but the source image is not included." },
  { question: "Which output should I choose?", answer: "JPEG is the safest choice for old portals. WebP can be smaller when the destination explicitly accepts it." },
  { question: "What if conversion fails?", answer: "Update the browser or try current Chrome, Edge, Firefox, or Safari. Unusual HEIF sequences and unsupported codecs return a file-specific error." },
];

export default function Page() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "HEIC converter", url: "/tools/heic-converter" }]} /><SoftwareAppJsonLd name="HEIC to JPG or WebP" url="/tools/heic-converter" description="Decode HEIC locally and verify the exported JPEG or WebP." /><CoreToolLayout eyebrow="HEIC CONVERTER" title="Convert HEIC to a portal-ready format" description="Turn iPhone HEIC/HEIF images into verified JPEG or WebP files using the same local decode and export engine as Upload Ready." tool={<Client />} scenarios={["Fixing a portal that rejects HEIC", "Preparing iPhone photos for older software", "Converting a batch before target-KB compression"]} limitations={["Full HEIC metadata inspection is not available in V1.0.", "Very large photos need substantial device memory during decode.", "Unsupported HEIF sequences fail instead of producing an unverified file."]} next={[{ href: "/upload-ready", label: "Apply a KB or dimension limit" }, { href: "/tools/exif-checker", label: "Inspect the converted file" }]} faq={faq} /></>;
}
