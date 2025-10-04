import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "LQIP Placeholder Generator | PixCloak",
  description: "Generate low‑quality image placeholders (LQIP) as tiny Base64 data URLs for fast page loads. Preview and copy locally—no uploads, perfect for skeleton screens.",
  alternates: { canonical: "/tools/lqip", languages: { "x-default": "/tools/lqip" } },
};
export default function Page() {
  return <Client />;
}


