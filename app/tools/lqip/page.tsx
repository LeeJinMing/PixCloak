import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "LQIP Placeholder Generator | PixCloak",
  description: "Generate low‑quality image placeholders (LQIP) as tiny Base64 data URLs locally.",
  alternates: { canonical: "/tools/lqip" },
};
export default function Page() {
  return <Client />;
}


