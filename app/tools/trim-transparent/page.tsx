import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Trim Transparent Edges | PixCloak",
  description: "Automatically trim fully transparent borders from PNGs locally and export.",
  alternates: { canonical: "/tools/trim-transparent" },
};
export default function Page() {
  return <Client />;
}


