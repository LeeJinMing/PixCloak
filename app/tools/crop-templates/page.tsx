import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Crop Templates: 1:1 / 4:3 / 16:9 | PixCloak",
  description: "Crop images to 1:1, 4:3, or 16:9 with visual guides, then export locally. Works offline—no uploads. Great for web, email, and social media.",
  alternates: { canonical: "/tools/crop-templates", languages: { "x-default": "/tools/crop-templates" } },
};

// client-only ratios moved into Client.tsx

export default function Page() {
  return <Client />;
}


