import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Responsive img srcset Generator | PixCloak",
  description: "Generate responsive img srcset/sizes markup and suggested KB per breakpoint. Copy optimized HTML locally—no uploads. Improve LCP and save bandwidth.",
  alternates: { canonical: "/tools/srcset-generator", languages: { "x-default": "/tools/srcset-generator" } },
};

export default function Page() {
  return <Client />;
}


