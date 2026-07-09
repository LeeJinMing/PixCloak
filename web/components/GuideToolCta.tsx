"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getGuideToolCta } from "@/lib/seo/guideToolCta";

export default function GuideToolCta() {
  const pathname = usePathname() ?? "";
  const cta = getGuideToolCta(pathname);
  if (!cta) return null;

  return (
    <div className="container" style={{ marginBottom: 12 }}>
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
          borderColor: "#93c5fd",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.45, flex: "1 1 220px" }}>
          {cta.intro}
        </p>
        <Link
          href={cta.toolHref}
          className="pill"
          style={{
            fontWeight: 600,
            background: "#0070f3",
            color: "#fff",
            border: "none",
            whiteSpace: "nowrap",
          }}
        >
          {cta.toolLabel} →
        </Link>
      </div>
    </div>
  );
}
