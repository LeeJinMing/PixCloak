import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "SVG Optimizer – Minify & clean | PixCloak",
  description: "Paste SVG to minify and clean attributes/styles locally. Export optimized SVG.",
  alternates: { canonical: "/tools/svg-optimizer" },
};
export default function Page(){
  return <Client/>;
}


