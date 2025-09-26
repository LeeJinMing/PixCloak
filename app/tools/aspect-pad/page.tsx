import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Aspect Ratio Padder | PixCloak",
  description: "Pad an image to target aspect ratio with background color locally.",
  alternates: { canonical: "/tools/aspect-pad" },
};

export default function Page() {
  return <Client />;
}


