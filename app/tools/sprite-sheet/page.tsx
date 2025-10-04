import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Sprite Sheet Generator | PixCloak",
  description: "Combine images into a sprite sheet with JSON mapping and download as ZIP. Configure grid, spacing, and order. All processing is local—no uploads.",
  alternates: { canonical: "/tools/sprite-sheet" },
};
export default function Page() {
  return <Client />;
}


