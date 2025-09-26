import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Image Diff – A/B slider & pixel diff | PixCloak",
  description: "Compare two images with a slider and export pixel-difference as PNG.",
  alternates: { canonical: "/tools/image-diff" },
};

export default function Page() {
  return <Client />;
}


