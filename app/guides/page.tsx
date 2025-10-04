import type { Metadata } from "next";
import GuidesClient from "./Client";

export const metadata: Metadata = {
  title: "Image Guides: Compress, Convert, Remove EXIF | PixCloak",
  description:
    "Step-by-step image guides: compress to 100KB–1MB, convert JPG/WebP, resize for web, remove EXIF/GPS. Free, offline, no uploads—learn fast today. For web & email.",
  alternates: { canonical: "/guides", languages: { "x-default": "/guides" } },
};

export default function GuidesPage() {
  return <GuidesClient />;
}
