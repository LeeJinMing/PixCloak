import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Favicon Pack Generator | PixCloak",
  description: "Generate favicons and manifest icons from a source image and download as ZIP.",
  alternates: { canonical: "/tools/favicon-pack" },
};
export default function Page() {
  return <Client />;
}


