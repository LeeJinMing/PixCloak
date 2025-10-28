"use client";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type Rule = { name: string; maxKB?: number; maxW?: number; maxH?: number; notes?: string; ctas?: { label: string; href: string }[] };

const RULES: Rule[] = [
  { name: "WeChat Moments", maxKB: 200, notes: "200KB 通常体验更佳", ctas: [{ label: "200KB", href: "/?kb=200" }, { label: "Resize 1920", href: "/guides/resize-to-1920" }] },
  { name: "Job/Forms (General)", maxKB: 500, notes: "常见上限 500KB", ctas: [{ label: "500KB", href: "/?kb=500" }, { label: "Clean EXIF", href: "/guides/exif-gps-removal" }] },
  { name: "Portfolio/Web Hero", maxKB: 800, maxW: 1920, notes: "建议最长边 1920px", ctas: [{ label: "800KB", href: "/?kb=800" }, { label: "Resize 1920", href: "/guides/resize-to-1920" }] },
  { name: "YouTube Thumbnail", maxKB: 200, maxW: 1280, maxH: 720, notes: "1280×720 ≤ 200KB", ctas: [{ label: "200KB", href: "/?kb=200" }] },
];

export default function Client() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ruleIndex, setRuleIndex] = useState(0);
  const rule = useMemo(() => RULES[ruleIndex], [ruleIndex]);
  const [kb, setKb] = useState<number | null>(null);
  const [w, setW] = useState<number | null>(null);
  const [h, setH] = useState<number | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    setKb(Math.round(f.size / 1024));
    const bmp = await createImageBitmap(f);
    setW(bmp.width); setH(bmp.height);
  }

  const passKB = rule.maxKB ? (kb ?? 0) <= rule.maxKB : true;
  const passW = rule.maxW ? (w ?? 0) <= rule.maxW : true;
  const passH = rule.maxH ? (h ?? 0) <= rule.maxH : true;
  const allPass = passKB && passW && passH;

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Platform Compliance Checker</h1>
        <p className="text-muted">Validate KB/dimensions for common platforms and jump to one‑click presets.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <label>
            Platform
            <select className="select" value={ruleIndex} onChange={(e) => setRuleIndex(parseInt(e.target.value))} style={{ marginLeft: 8 }}>
              {RULES.map((r, i) => <option key={i} value={i}>{r.name}</option>)}
            </select>
          </label>
          <input ref={inputRef} type="file" accept="image/*" onChange={onPick} className="input" />
        </div>
        <div style={{ marginTop: 8 }} className="text-muted">
          Rule: {rule.maxKB ? `≤ ${rule.maxKB}KB` : '—'}{rule.maxW ? ` • width ≤ ${rule.maxW}px` : ''}{rule.maxH ? ` • height ≤ ${rule.maxH}px` : ''}
          {rule.notes ? ` • ${rule.notes}` : ''}
        </div>
      </div>
      <div className="card">
        <h2 style={{ marginBottom: 8 }}>Result</h2>
        <div>Size: {kb != null ? `${kb} KB` : '-'}, Dimensions: {w && h ? `${w}×${h}` : '-'}</div>
        <div style={{ marginTop: 8 }}>
          <span className="pill-ghost" style={{ background: allPass ? '#ecfdf5' : '#fef2f2', borderColor: allPass ? '#a7f3d0' : '#fecaca', color: allPass ? '#065f46' : '#991b1b' }}>
            {allPass ? 'PASS' : 'ADJUST NEEDED'}
          </span>
        </div>
        {!allPass && (
          <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {rule.maxKB && kb != null && kb > rule.maxKB && <Link className="pill" href={`/?kb=${rule.maxKB}`}>Compress to {rule.maxKB}KB</Link>}
            {rule.maxW && w != null && w > rule.maxW && <Link className="pill" href="/guides/resize-to-1920">Resize to {rule.maxW}</Link>}
          </div>
        )}
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {rule.ctas?.map((c, i) => <Link key={i} href={c.href} className="pill">{c.label}</Link>)}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Platform Compliance Checker', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', url: '/tools/platform-checker' }) }} />
    </div>
  );
}


