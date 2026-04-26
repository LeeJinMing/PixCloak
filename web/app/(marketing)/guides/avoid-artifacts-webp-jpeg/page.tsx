import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Avoid Compression Artifacts (WebP/JPEG)',
  description: 'Reduce banding and halos: downscale first, pick realistic target KB, switch WebP↔JPEG when needed. Preview and export locally with no uploads.',
  alternates: { canonical: '/guides/avoid-artifacts-webp-jpeg' },
};

export default function GuideAvoidArtifacts() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Avoid Compression Artifacts (WebP/JPEG)', url: '/guides/avoid-artifacts-webp-jpeg' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>How to avoid artifacts (WebP/JPEG)</h1>
          <p style={{ marginBottom: 8 }}>
            <strong>Short answer:</strong> Resize before you squeeze KB, bump target size on gradients, swap WebP↔JPEG if you see banding—always preview at 100%.
          </p>
          <p className="text-muted" style={{ fontSize: 14, marginBottom: 12 }}>Last reviewed: April 2026.</p>
          <ul>
            <li>Downscale first; then target KB</li>
            <li>Avoid over‑compressed gradients/text; try higher KB</li>
            <li>Switch format if halos appear (WebP ↔ JPEG)</li>
          </ul>
          <p>Test presets: <a href="/compress?kb=300">300KB</a>, <a href="/compress?kb=500">500KB</a>, <a href="/compress?kb=800">800KB</a>.</p>
        </div>
      </div>
    </>
  );
}


