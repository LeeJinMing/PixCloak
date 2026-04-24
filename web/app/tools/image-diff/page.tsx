import type { Metadata } from "next";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Image Diff Tool—A/B Slider & Pixel Difference Map | PixCloak",
  description:
    "Compare two screenshots or renders: drag slider, highlight changed pixels, export a diff PNG. Visual QA and compression tests. Local only—no upload.",
  alternates: { canonical: "/tools/image-diff", languages: { "x-default": "/tools/image-diff" } },
  openGraph: {
    title: "Image comparison & diff",
    description: "Slider and heatmap for before/after images.",
    url: "/tools/image-diff",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image diff",
    description: "Pixel-level compare in the browser.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Image diff", url: "/tools/image-diff" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Image Diff Tool"
        url="/tools/image-diff"
        description="Compare two images with side-by-side view, A/B slider, and pixel-level difference highlighting. Export diff results as PNG."
      />
      <FaqJsonLd items={[
        { question: "What is an image diff tool?", answer: "A tool that compares two images to highlight differences at the pixel level, useful for testing UI changes, quality comparisons, and version control." },
        { question: "How does the A/B slider work?", answer: "Drag the slider to reveal one image while hiding the other, making it easy to spot subtle differences between versions." },
        { question: "What types of differences are detected?", answer: "Detects color changes, pixel additions/removals, and position shifts. Highlights differences in red or customizable colors for easy identification." },
        { question: "Can I export the comparison results?", answer: "Yes. Export the difference map as PNG, showing exactly which pixels changed between the two images." }
      ]} />
      <Client />
    </>
  );
}


