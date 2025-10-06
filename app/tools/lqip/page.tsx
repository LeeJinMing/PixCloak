import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "LQIP Generator: Tiny Base64 Placeholders | PixCloak",
  description: "Create LQIP placeholders as tiny Base64 for faster page loads. Preview and copy locally—no uploads. Perfect for skeleton screens and perceived performance.",
  alternates: { canonical: "/tools/lqip", languages: { "x-default": "/tools/lqip" } },
};
export default function Page() {
  return <Client />;
}


