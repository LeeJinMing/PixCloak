import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Platform Compliance Checker – KB & Dimensions | PixCloak",
  description: "Validate image KB and dimensions for common platforms (forms/social). Get one‑click presets like 200KB/500KB and 1920px.",
  alternates: { canonical: "/tools/platform-checker" },
};

export default function Page() {
  return <Client />;
}


