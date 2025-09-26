import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Batch WebP Converter + ZIP | PixCloak",
  description: "Convert multiple images to WebP in browser and download as ZIP.",
  alternates: { canonical: "/tools/webp-converter" },
};
export default function Page() {
  return <Client />;
}


