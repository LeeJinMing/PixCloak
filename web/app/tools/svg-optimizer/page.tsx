import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "SVG Optimizer – Minify & Clean | PixCloak",
  description: "Minify and clean SVG code locally. Remove bloat safely and export an optimized SVG—private and offline, no uploads. Works locally in your browser, no uploads.",
  alternates: { canonical: "/tools/svg-optimizer", languages: { "x-default": "/tools/svg-optimizer", en: "/tools/svg-optimizer" } },
};
export default function Page() {
  return <Client />;
}


