import type { Metadata } from "next";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Batch Rename Images & Download ZIP (Local) | PixCloak",
  description:
    "Rename many images at once with prefix, suffix, and zero-padded numbers; download a single ZIP. Runs locally—no upload. Great for galleries, exports, and docs.",
  alternates: { canonical: "/tools/batch-rename", languages: { "x-default": "/tools/batch-rename" } },
  openGraph: {
    title: "Batch rename images to ZIP",
    description: "Pattern-based renaming in the browser. Private, no upload.",
    url: "/tools/batch-rename",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Batch rename images",
    description: "Numbered filenames and ZIP export, locally.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Batch rename", url: "/tools/batch-rename" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Batch Image Rename"
        url="/tools/batch-rename"
        description="Apply naming patterns to multiple image files and download results as ZIP. All processing is local."
      />
      <FaqJsonLd
        items={[
          {
            question: "Are my files uploaded?",
            answer: "No. Files are read in the browser to build the ZIP; they are not sent to a server.",
          },
          {
            question: "How do numbering patterns work?",
            answer: "Use placeholders like {n2}, {n3}, or {n4} for zero-padded sequence numbers in each filename.",
          },
        ]}
      />
      <Client />
    </>
  );
}
