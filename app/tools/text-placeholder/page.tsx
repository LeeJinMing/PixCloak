import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Text Placeholder – Social/Thumbnail presets | PixCloak",
  description: "Generate text‑based placeholder images for social and thumbnails with size presets. Customize colors/text and export locally—no uploads.",
  alternates: { canonical: "/tools/text-placeholder", languages: { "x-default": "/tools/text-placeholder" } },
};

// client-only presets moved into Client.tsx

export default function Page() {
  return <Client />;
}


