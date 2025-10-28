import type { Metadata } from "next";
import RelatedTasks from "@/components/RelatedTasks";

export const metadata: Metadata = {
  title: "Tools | PixCloak",
  description: "Privacy‑first image utilities. All tools work locally in your browser.",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      {children}
      <RelatedTasks />
    </div>
  );
}


