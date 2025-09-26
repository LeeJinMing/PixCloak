import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Responsive img srcset Generator | PixCloak",
  description: "Generate img srcset/sizes code for responsive images and recommended KB per breakpoint.",
  alternates: { canonical: "/tools/srcset-generator" },
};

export default function Page(){
  return <Client/>;
}


