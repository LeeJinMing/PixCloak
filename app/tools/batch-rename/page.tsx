import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Batch Rename & ZIP | PixCloak",
  description: "Batch rename images with flexible patterns (prefix/suffix, numbering) and download as a ZIP. Runs locally in your browser—private, no uploads.",
  alternates: { canonical: "/tools/batch-rename", languages: { "x-default": "/tools/batch-rename" } },
};

export default function Page() {
  return <Client />;
}


