import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "EXIF/GPS Metadata Checker – Remove EXIF locally | PixCloak",
  description:
    "Check if an image contains EXIF/GPS metadata and remove it locally in your browser (no upload). Download a clean copy.",
  alternates: { canonical: "/tools/exif-checker" },
};
export default function Page() {
  return <Client />;
}


