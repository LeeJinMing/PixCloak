import type { Metadata } from "next";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CoreToolLayout } from "@/components/CoreToolLayout";
import { SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Check and Remove EXIF, GPS, XMP, and IPTC",
  description: "Inspect supported image metadata, remove it locally without re-encoding when safe, and reopen the export to verify the markers are gone.",
  alternates: { canonical: "/tools/exif-checker", languages: { "x-default": "/tools/exif-checker", en: "/tools/exif-checker" } },
};

const faq = [
  { question: "Does this upload the image?", answer: "No. Inspection and cleanup use browser APIs on this device. Optional website analytics and advertising are separate and never receive image bytes from this tool." },
  { question: "Which metadata is checked?", answer: "V1.0 checks JPEG EXIF/GPS/XMP/IPTC, PNG EXIF and text metadata markers, and WebP EXIF/GPS/XMP chunks. Full HEIC metadata inspection is not supported." },
  { question: "How is removal verified?", answer: "The tool reopens the exported image, scans its bytes again, and offers the clean download only after supported markers are absent. JPEG, PNG, and WebP stay lossless when orientation safety allows." },
];

export default function Page() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Metadata checker", url: "/tools/exif-checker" }]} /><SoftwareAppJsonLd name="Image Metadata Checker" url="/tools/exif-checker" description="Inspect and remove supported image metadata locally, with post-export verification." /><CoreToolLayout eyebrow="METADATA CHECK" title="Check and remove hidden image metadata" description="See supported EXIF, GPS, XMP, and IPTC markers, then create and verify a clean copy without sending the source image to a processing server." tool={<Client />} scenarios={["Checking photos before public sharing", "Removing GPS from an image copy", "Verifying a redacted export before sending"]} limitations={["HEIC can be identified but is not fully inspected in V1.0.", "Removing metadata does not hide visible addresses, faces, plates, or text.", "Damaged or unsupported files return a decode or format error."]} next={[{ href: "/safe-share", label: "Redact visible details" }, { href: "/upload-ready", label: "Meet an upload limit" }]} faq={faq} sample="privacy" /></>;
}
