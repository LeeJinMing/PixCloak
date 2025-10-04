import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "OG/Twitter Card Generator – 1200×630 | PixCloak",
  description: "Create OG/Twitter card images at 1200×630, preview instantly, and export PNG/JPG. Everything runs locally in your browser—no uploads or external services.",
  alternates: { canonical: "/tools/og-card", languages: { "x-default": "/tools/og-card" } },
};
export default function Page() {
  return <Client />;
}


