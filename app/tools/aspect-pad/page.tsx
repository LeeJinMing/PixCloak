import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Aspect Ratio Padder | PixCloak",
  description: "Pad images to a target aspect ratio by adding background color or blur padding. Preview and export locally—no uploads. Ideal for social crops and thumbnails.",
  alternates: { canonical: "/tools/aspect-pad" },
};

export default function Page() {
  return <Client />;
}


