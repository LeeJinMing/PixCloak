import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Batch Rename & ZIP | PixCloak",
  description: "Batch rename images locally with patterns and download as ZIP (no upload).",
  alternates: { canonical: "/tools/batch-rename" },
};

export default function Page(){
  return <Client/>;
}


