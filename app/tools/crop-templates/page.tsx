import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Crop Templates – 1:1 / 4:3 / 16:9 | PixCloak",
  description: "Crop images to common aspect ratios and export locally.",
  alternates: { canonical: "/tools/crop-templates" },
};

// client-only ratios moved into Client.tsx

export default function Page() {
  return <Client />;
}


