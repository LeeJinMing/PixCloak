import type { Metadata } from "next";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CoreToolLayout } from "@/components/CoreToolLayout";
import { SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Convert PNG to JPG or JPG to PNG Locally",
  description: "Convert PNG and JPEG files in the browser, choose the JPEG background and quality, and verify that every output decodes.",
  alternates: { canonical: "/tools/png-jpg-converter", languages: { "x-default": "/tools/png-jpg-converter", en: "/tools/png-jpg-converter" } },
};

const faq = [
  { question: "What happens to PNG transparency in JPEG?", answer: "JPEG has no alpha channel. Choose the background color that should replace transparent pixels before conversion." },
  { question: "Will JPG to PNG restore lost quality?", answer: "No. PNG prevents additional lossy JPEG encoding, but it cannot recover detail already removed from the source." },
  { question: "How is a successful conversion verified?", answer: "The shared image engine reopens every exported Blob and rejects any result the browser cannot decode." },
];

export default function Page() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Tools", url: "/tools" }, { name: "PNG/JPG converter", url: "/tools/png-jpg-converter" }]} /><SoftwareAppJsonLd name="PNG and JPEG Converter" url="/tools/png-jpg-converter" description="Convert PNG and JPEG locally and verify the exported file." /><CoreToolLayout eyebrow="FORMAT CONVERTER" title="Convert between PNG and JPEG" description="Choose the correct background for transparent PNG pixels, adjust JPEG quality, process a batch, and download only outputs that reopen successfully." tool={<Client />} scenarios={["Changing a PNG photo to a portal-compatible JPEG", "Flattening transparency onto a deliberate background", "Creating a lossless PNG container from an existing JPEG"]} limitations={["JPEG cannot preserve transparency.", "PNG can be much larger for photographs.", "Conversion cannot restore detail lost in the source file."]} next={[{ href: "/upload-ready", label: "Meet a file-size limit" }, { href: "/tools/resize-image", label: "Resize dimensions" }]} faq={faq} /></>;
}
