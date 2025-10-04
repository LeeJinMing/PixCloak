import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "SVG Optimizer – Minify & clean | PixCloak",
  description: "Paste SVG code to minify and clean attributes/styles locally. Remove bloat safely and export an optimized SVG. Private, offline—no uploads.",
  alternates: { canonical: "/tools/svg-optimizer" },
};
export default function Page() {
  return <Client />;
}


