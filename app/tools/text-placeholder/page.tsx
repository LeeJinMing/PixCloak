import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Text Placeholder – Social/Thumbnail presets | PixCloak",
  description: "Generate placeholder images with text for social/thumbnail sizes and download.",
  alternates: { canonical: "/tools/text-placeholder" },
};

// client-only presets moved into Client.tsx

export default function Page() {
  return <Client />;
}


