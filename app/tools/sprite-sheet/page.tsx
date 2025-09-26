import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Sprite Sheet Generator | PixCloak",
  description: "Combine multiple images into a sprite sheet with JSON mapping and download ZIP.",
  alternates: { canonical: "/tools/sprite-sheet" },
};
export default function Page(){
  return <Client/>;
}


