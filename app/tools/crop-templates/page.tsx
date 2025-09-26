import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Crop Templates – 1:1 / 4:3 / 16:9 | PixCloak",
  description: "Crop images to common aspect ratios and export locally.",
  alternates: { canonical: "/tools/crop-templates" },
};

type Ratio = { label: string; w: number; h: number };
const RATIOS: Ratio[] = [
  { label: '1:1', w: 1, h: 1 },
  { label: '4:3', w: 4, h: 3 },
  { label: '16:9', w: 16, h: 9 },
  { label: '2:3', w: 2, h: 3 },
];

export default function Page(){
  return <Client/>;
}


