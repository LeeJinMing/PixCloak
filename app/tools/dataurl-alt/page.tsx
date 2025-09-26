import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Data URL Converter & Alt Suggestions | PixCloak",
  description:
    "Convert images to data URLs (Base64) locally and get alt text suggestions. 100% client‑side.",
  alternates: { canonical: "/tools/dataurl-alt" },
};
export default function Page(){
  return <Client/>;
}


