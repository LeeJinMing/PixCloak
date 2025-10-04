import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Crop Templates – 1:1 / 4:3 / 16:9 | PixCloak",
  description: "Quickly crop images to popular aspect ratios (1:1, 4:3, 16:9) with visual guides, then export locally. Private, offline processing—no images are uploaded.",
  alternates: { canonical: "/tools/crop-templates", languages: { "x-default": "/tools/crop-templates" } },
};

// client-only ratios moved into Client.tsx

export default function Page() {
  return <Client />;
}


