import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "DPI/PPI Converter – Print size vs pixels | PixCloak",
  description: "Convert between pixels and print size using DPI/PPI. Plan export sizes for print and screens.",
  alternates: { canonical: "/tools/dpi-converter" },
};

export default function Page(){
  return <Client/>;
}


