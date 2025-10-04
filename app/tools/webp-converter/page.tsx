import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Batch WebP Converter + ZIP | PixCloak",
  description: "Convert multiple images to WebP in your browser, choose quality and optional resize, then download everything as a single ZIP. Private, offline processing—no uploads.",
  alternates: { canonical: "/tools/webp-converter" },
};
export default function Page() {
  return <Client />;
}


