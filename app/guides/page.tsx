import type { Metadata } from "next";
import GuidesClient from "./Client";

export const metadata: Metadata = {
  title: "Image Guides: Compress, Convert, Remove EXIF | PixCloak",
  description:
    "Practical image guides: compress to exact sizes (100KB–1MB), convert JPG/WebP, resize for web, and remove EXIF/GPS. Step‑by‑step instructions, free, offline, no uploads.",
  alternates: { canonical: "/guides", languages: { "x-default": "/guides" } },
};

export default function GuidesPage() {
  return <GuidesClient />;
}
