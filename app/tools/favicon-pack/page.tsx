import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Favicon Pack: Icons + Manifest (ZIP) | PixCloak",
  description: "Generate favicons and manifest icons (16×16–512×512) locally and download as a ZIP. No uploads. Ideal for websites, docs, and apps.",
  alternates: { canonical: "/tools/favicon-pack", languages: { "x-default": "/tools/favicon-pack" } },
};
export default function Page() {
  return <Client />;
}


