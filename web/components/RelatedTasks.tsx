import Link from "next/link";
import { CORE_GUIDE_HUB_LINKS } from "@/lib/seo/coreUrls";

export default function RelatedTasks() {
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginBottom: 8 }}>Related tasks</h2>
      <p className="text-muted" style={{ fontSize: 14, marginTop: 0, marginBottom: 12 }}>
        Popular next steps from PixCloak guides and tools.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <Link href="/redact" className="pill">
          Redact image online
        </Link>
        <Link href="/compress?kb=200" className="pill">
          Compress to 200KB
        </Link>
        <Link href="/compress?kb=100" className="pill">
          Compress to 100KB
        </Link>
        <Link href="/tools/exif-checker" className="pill">
          Check EXIF/GPS
        </Link>
        <Link href="/tools/favicon-pack" className="pill">
          Favicon generator
        </Link>
      </div>
      <h3 style={{ fontSize: 15, marginBottom: 8, color: "#334155" }}>Top guides</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {CORE_GUIDE_HUB_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="pill">
            {link.label}
          </Link>
        ))}
      </div>
      <h3 style={{ fontSize: 15, marginBottom: 8, color: "#334155" }}>More tools</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Link href="/compress?kb=500" className="pill">
          Compress to 500KB
        </Link>
        <Link href="/guides/why-upload-portal-rejects-image" className="pill">
          Fix rejected uploads
        </Link>
        <Link href="/tools/heic-converter" className="pill">
          HEIC to JPG
        </Link>
        <Link href="/guides/reduce-image-size-iphone" className="pill">
          Compress on iPhone
        </Link>
        <Link href="/tools" className="pill">
          All tools
        </Link>
      </div>
    </div>
  );
}
