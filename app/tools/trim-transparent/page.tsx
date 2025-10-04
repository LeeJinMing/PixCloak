import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Trim Transparent Edges | PixCloak",
  description: "Automatically trim fully transparent borders from PNGs and export a clean result. Fast, local processing—no uploads. Great for sprites, icons, and UI assets.",
  alternates: { canonical: "/tools/trim-transparent", languages: { "x-default": "/tools/trim-transparent", en: "/tools/trim-transparent" } },
};
export default function Page() {
  return <Client />;
}


