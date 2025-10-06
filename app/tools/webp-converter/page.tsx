import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Batch WebP Converter (ZIP) | PixCloak",
  description: "Convert images to WebP in batch with quality and optional resize, then download everything as a ZIP. Private, offline processing—no uploads.",
  alternates: { canonical: "/tools/webp-converter", languages: { "x-default": "/tools/webp-converter", en: "/tools/webp-converter" } },
};
export default function Page() {
  return <Client />;
}


