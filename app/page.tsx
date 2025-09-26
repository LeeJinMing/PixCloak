import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PixCloak – Compress & Redact images (local, no upload)",
  description: "Privacy & Performance toolkit: compress to target KB, resize to 1920, remove EXIF/GPS, redact sensitive info – all local in your browser.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PixCloak – Local image tools",
    description: "Compress/Resize/Redact locally. No upload.",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title: "PixCloak", description: "Local image compression & redaction" },
};

export default function Home() {
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <div className="card" style={{ background: "#eff6ff", borderColor: "#bfdbfe" }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Privacy‑first image toolkit</h1>
        <p className="text-muted" style={{ marginBottom: 10 }}>Compress to target KB, resize to 1920, redact sensitive info. Everything runs locally in your browser – no upload.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">Compress to 200KB</a>
          <a className="pill" href="/compress?kb=500">Compress to 500KB</a>
          <a className="pill" href="/guides/resize-to-1920">Resize to 1920</a>
          <a className="pill" href="/redact">Redact sensitive info</a>
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Why PixCloak?</h2>
        <ul style={{ paddingLeft: 18 }}>
          <li>Local processing – images never leave your device</li>
          <li>Target KB with binary search for consistent results</li>
          <li>ZIP batch download for many images</li>
          <li>Remove EXIF/GPS on export by default</li>
        </ul>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Popular guides</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/guides/compress-to-target-kb">Target KB guide</a>
          <a className="pill" href="/guides/resize-longest-side">Resize longest side</a>
          <a className="pill" href="/guides/export-without-metadata">Export without metadata</a>
          <a className="pill" href="/guides/embed-button">Embed a button</a>
        </div>
      </div>
    </div>
  );
}
