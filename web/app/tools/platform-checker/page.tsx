import type { Metadata } from "next";
import Client from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Image Size Checker—KB & Pixel Limits for Social & Forms | PixCloak",
  description:
    "Check width, height, and file size against common limits (LinkedIn, Instagram, job forms, gov uploads). Local-only—no upload. Jump to 200KB/500KB presets.",
  alternates: { canonical: "/tools/platform-checker", languages: { "x-default": "/tools/platform-checker" } },
  openGraph: {
    title: "Platform image limit checker",
    description: "Validate KB and dimensions before you upload.",
    url: "/tools/platform-checker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image compliance checker",
    description: "KB and dimension checks in browser.",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          { name: "Platform checker", url: "/tools/platform-checker" },
        ]}
      />
      <SoftwareAppJsonLd
        name="Platform Compliance Checker"
        url="/tools/platform-checker"
        description="Validate images against platform requirements for file size and dimensions. Get instant feedback and optimization suggestions."
      />
      <FaqJsonLd items={[
        { question: "What platforms are supported?", answer: "Checks compliance for LinkedIn, Facebook, Instagram, Twitter, job applications, government forms, and other common platforms with specific requirements." },
        { question: "What does the checker validate?", answer: "File size limits (KB), maximum dimensions, aspect ratios, and format requirements. Provides instant feedback on compliance status." },
        { question: "How do I fix non-compliant images?", answer: "Use the suggested presets (200KB, 500KB, 1920px) or follow the optimization recommendations to resize and compress your images." },
        { question: "Are the requirements up to date?", answer: "Yes, platform requirements are regularly updated based on current platform policies and best practices for optimal upload success." }
      ]} />
      <Client />
    </>
  );
}


