import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Text Watermark – Batch overlay & export | PixCloak",
  description: "Add text watermarks to images with adjustable opacity, size, position, and font. Process many files and download as ZIP—local, private, and no uploads.",
  alternates: { canonical: "/tools/watermark", languages: { "x-default": "/tools/watermark" } },
};
export default function Page() {
  return <Client />;
}

