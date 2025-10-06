import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Aspect Ratio Padder (Color/Blur) | PixCloak",
  description: "Pad images to a target aspect ratio using color or blur padding. Preview and export locally—no uploads. Great for banners and social crops.",
  alternates: { canonical: "/tools/aspect-pad", languages: { "x-default": "/tools/aspect-pad", en: "/tools/aspect-pad" } },
};

export default function Page() {
  return <Client />;
}


