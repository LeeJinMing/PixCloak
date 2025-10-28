import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Research: JPEG vs WebP at Target KBs | PixCloak',
  description: 'Compare JPEG and WebP at 200/300/500/800KB on varied images. Findings on size/quality trade‑offs, artifacts, and when to pick each format. All processing local.',
  alternates: { canonical: '/guides/research-jpeg-vs-webp' },
};

export default function ResearchJpegVsWebp() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Research: JPEG vs WebP at Target KBs', url: '/guides/research-jpeg-vs-webp' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Research: JPEG vs WebP on varied images</h1>
        <p className="text-muted">Method summary: compress 10 public CC0 images (portrait, sunset, UI, text, low‑light, landscape, product, food, architecture, document) at the same target sizes (200KB/300KB/500KB/800KB). Compare file size, runtime, and perceived artifacts.</p>
        <h2>Findings</h2>
        <ul>
          <li>WebP is typically 10–25% smaller at the same perceived quality for photos</li>
          <li>JPEG remains competitive on gradients/skin tones when tuned carefully</li>
          <li>PNG fits UI/text/icons or when lossless + alpha is needed</li>
        </ul>
        <h2>Example (before vs after)</h2>
        <ul>
          <li>Original: 3.2MB → WebP 500KB (Saved ~84%)</li>
          <li>Original: 1.8MB → JPEG 500KB (Saved ~72%)</li>
        </ul>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/press/compress-demo-1.webp" alt="demo-1" loading="lazy" style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #eee' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/press/compress-demo-2.webp" alt="demo-2" loading="lazy" style={{ maxWidth: '100%', borderRadius: 8, border: '1px solid #eee', marginTop: 8 }} />
        <p>Try quickly in <a href="/compress?kb=300">/compress?kb=300</a> or <a href="/compress?kb=500">/compress?kb=500</a> and switch formats.</p>
        <p className="text-muted">Note: All processing is local in your browser. Results may vary across content; always preview before publishing.</p>
      </div>
    </div>
    </>
  );
}


