import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Favicon Pack Generator | PixCloak",
  description: "Generate a complete favicon pack and manifest icons from a source image, then download as ZIP. Local processing—no uploads. Includes 16×16 to 512×512 sizes.",
  alternates: { canonical: "/tools/favicon-pack", languages: { "x-default": "/tools/favicon-pack" } },
};
export default function Page() {
  return <Client />;
}


