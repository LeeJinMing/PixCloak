import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Remove Background (Lite, Color) | PixCloak",
  description: "Remove backgrounds by color similarity with adjustable tolerance. 100% local—no uploads. Fast and simple for clean graphics.",
  alternates: { canonical: "/tools/remove-bg-lite", languages: { "x-default": "/tools/remove-bg-lite", en: "/tools/remove-bg-lite" } },
};

function dist2(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
  const dr = r1 - r2, dg = g1 - g2, db = b1 - b2; return dr * dr + dg * dg + db * db;
}

export default function Page() {
  return <Client />;
}


