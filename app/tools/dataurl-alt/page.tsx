import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Data URL Converter & Alt Suggestions | PixCloak",
  description:
    "Convert images to Base64 data URLs and generate helpful alt text suggestions for accessibility. 100% client‑side processing—no uploads, copy and use instantly.",
  alternates: { canonical: "/tools/dataurl-alt", languages: { "x-default": "/tools/dataurl-alt" } },
};
export default function Page() {
  return <Client />;
}


