import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "OG/Twitter Card 1200×630 (Free, No Upload) | PixCloak",
  description: "Create 1200×630 OG/Twitter images in your browser—no uploads. Preview instantly and export PNG/JPG fast. Perfect for blogs, docs, and social sharing.",
  alternates: { canonical: "/tools/og-card", languages: { "x-default": "/tools/og-card" } },
};
export default function Page() {
  return <Client />;
}


