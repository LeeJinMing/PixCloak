import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "OG/Twitter Card Generator – 1200×630 | PixCloak",
  description: "Generate OG/Twitter card images (1200×630) in the browser and download PNG/JPG.",
  alternates: { canonical: "/tools/og-card" },
};
export default function Page(){
  return <Client/>;
}


