import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Research: 500KB Quality Range (1920px workflow) | PixCloak',
  description: 'Method and findings for landing near 500KB across varied content: resize to 1920px, binary‑search quality, and compare artifacts.',
  alternates: { canonical: '/guides/research-500kb-quality-range' },
};

export default function Research500KBRange() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Research: 500KB Quality Range (1920px workflow)', url: '/guides/research-500kb-quality-range' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Research: What quality fits 500KB?</h1>
        <p className="text-muted">Method summary: downscale to 1920px longest side, then run binary search to hit ~500KB across varied content types. Record final quality (q) and visible artifacts.</p>
        <h2>Practical guidance</h2>
        <ul>
          <li>Phone photos at 12–48MP: set 1920px first, then target 500KB</li>
          <li>UI/text/screenshots: try PNG or WebP lossless; avoid heavy JPEG</li>
          <li>Portraits/gradients: prefer WebP at 500KB; raise to 800KB if halos appear</li>
        </ul>
        <h2>Observed ranges</h2>
        <ul>
          <li>Photos (1920px): q ≈ 0.55–0.80 to land near 500KB</li>
          <li>Low‑light/noise: q ≈ 0.45–0.70 (try 800KB if banding)</li>
          <li>Flat UI/gradients: switch to WebP lossless or increase target</li>
        </ul>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/press/compress-demo-3.webp" alt="demo-3" loading="lazy" style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #eee' }} />
        <p className="text-muted">Example: 4.1MB → 500KB (Saved ~87.8%) at q≈0.62 after resizing to 1920px.</p>
        <p>Start here: <a href="/compress?kb=500">/compress?kb=500</a> and toggle WebP/JPEG; preview artifacts before publishing.</p>
        <p className="text-muted">All measurements are done locally in browser; no uploads.</p>
      </div>
    </div>
    </>
  );
}


