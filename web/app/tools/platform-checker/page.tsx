import type { Metadata } from "next";
import Client from "./Client";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Platform Compliance Checker – KB & Dimensions | PixCloak",
  description: "Validate image KB and dimensions for common platforms (forms/social). Get one‑click presets like 200KB/500KB and 1920px.",
  alternates: { canonical: "/tools/platform-checker", languages: { "x-default": "/tools/platform-checker" } },
};

export default function Page() {
  return (
    <>
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


