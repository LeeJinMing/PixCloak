import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Batch Rename Images (ZIP, No Upload) | PixCloak",
  description: "Rename images in batch with prefix/suffix and numbering, then download everything as a ZIP. Works locally—no uploads. Keep exports tidy for web and docs.",
  alternates: { canonical: "/tools/batch-rename", languages: { "x-default": "/tools/batch-rename" } },
};

export default function Page() {
  return <Client />;
}


