import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "DPI/PPI Converter – Print size vs pixels | PixCloak",
  description: "Convert between pixels and physical print size using DPI/PPI. Plan exports for print and screens accurately. Runs locally in your browser—no uploads.",
  alternates: { canonical: "/tools/dpi-converter", languages: { "x-default": "/tools/dpi-converter" } },
};

export default function Page() {
  return <Client />;
}


