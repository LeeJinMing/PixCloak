import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Text Watermark – Batch overlay & export | PixCloak",
  description: "Add a text watermark to images locally and download. Adjustable opacity/size/position.",
  alternates: { canonical: "/tools/watermark" },
};
export default function Page() {
  return <Client />;
}

