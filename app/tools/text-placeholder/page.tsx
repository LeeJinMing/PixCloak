import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Text Placeholder – Social/Thumbnail presets | PixCloak",
  description: "Generate placeholder images with text for social/thumbnail sizes and download.",
  alternates: { canonical: "/tools/text-placeholder" },
};

type Preset = { label: string; w: number; h: number };
const PRESETS: Preset[] = [
  { label: 'Square 1024', w: 1024, h: 1024 },
  { label: 'YouTube 1280×720', w: 1280, h: 720 },
  { label: 'OG 1200×630', w: 1200, h: 630 },
  { label: 'Wide 1920×1080', w: 1920, h: 1080 },
];

export default function Page() {
  return <Client />;
}


