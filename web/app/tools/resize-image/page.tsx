import type { Metadata } from "next";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CoreToolLayout } from "@/components/CoreToolLayout";
import { SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Resize Images by Longest Side or Exact Dimensions",
  description: "Resize JPG, PNG, or WebP images locally with longest-side and exact-dimension controls, batch export, and output decode verification.",
  alternates: { canonical: "/tools/resize-image", languages: { "x-default": "/tools/resize-image", en: "/tools/resize-image" } },
};

const faq = [
  { question: "Does resizing preserve the aspect ratio?", answer: "Longest-side presets preserve it. Custom dimensions offer contain, cover, or stretch; choose contain or cover to avoid distortion." },
  { question: "Is the output checked?", answer: "Yes. Each exported Blob is decoded again before it is shown as a successful result." },
  { question: "What happens to metadata?", answer: "Canvas re-encoding normally omits source metadata. Use the metadata checker when a privacy claim must be verified explicitly." },
];

export default function Page() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "Resize image", url: "/tools/resize-image" }]} /><SoftwareAppJsonLd name="Local Image Resizer" url="/tools/resize-image" description="Resize images locally and verify each exported file can be decoded." /><CoreToolLayout eyebrow="IMAGE RESIZER" title="Resize by longest side or exact dimensions" description="Use 1920px, 1080px, 800px, or custom dimensions; choose contain, cover, or stretch deliberately, then download only decoded results." tool={<Client />} scenarios={["Matching an upload portal's pixel dimensions", "Reducing oversized camera photos before compression", "Making a batch share one output canvas size"]} limitations={["Stretch changes the original proportions and can distort faces or text.", "Contain adds background space when the aspect ratios differ.", "Large batches can exceed mobile memory; split the queue and retry failed files."]} next={[{ href: "/upload-ready", label: "Add a hard KB limit" }, { href: "/tools/png-jpg-converter", label: "Change the output format" }]} faq={faq} /></>;
}
