import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Image Diff – A/B slider & pixel diff | PixCloak",
  description: "Compare two images side‑by‑side with an A/B slider, highlight pixel differences, and export the diff as PNG. Runs locally in your browser—no uploads required.",
  alternates: { canonical: "/tools/image-diff", languages: { "x-default": "/tools/image-diff" } },
};

export default function Page() {
  return <Client />;
}


