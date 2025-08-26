"use client";
import { useState, type ReactNode } from 'react';

export default function GuidesPage() {
  const items = [
    {
      href: '/guides/compress-to-target-kb',
      title: 'Compress images to a target size (KB)',
      summary: 'Use Target (KB) to hit 200KB/500KB limits. Prefer resizing first for large photos.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Open <a href="/compress?kb=200">/compress?kb=200</a> or <a href="/compress?kb=500">/compress?kb=500</a></li>
            <li>Drag images in, click Compress, then Download ZIP.</li>
          </ol>
          <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Target size is approximate (binary search); usually within a few KB.</li>
            <li>For smaller sizes, reduce resolution or lower quality.</li>
          </ul>
        </div>
      ),
    },
    {
      href: '/guides/convert-jpeg-to-webp',
      title: 'Convert JPEG to WebP',
      summary: 'Use WebP to reduce size while keeping quality; ideal for web publishing.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Open /compress, set Format = WebP</li>
            <li>Optionally set Target (KB); click Compress</li>
          </ol>
          <a className="pill" href="/guides/convert-jpeg-to-webp">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/resize-longest-side',
      title: 'Resize by longest side (1920px/1080px)',
      summary: 'Downscale first for huge photos, then compress to target KB.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Choose Resize = Longest side, set value</li>
            <li>Compress and download</li>
          </ol>
          <a className="pill" href="/guides/resize-longest-side">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/rename-rules',
      title: 'Batch rename rules',
      summary: 'Prefix/suffix and keep extension for consistent exports.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Set prefix/suffix; keep extension if needed</li>
            <li>ZIP download with renamed files</li>
          </ol>
          <a className="pill" href="/guides/rename-rules">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/license-plate-redaction',
      title: 'License plate redaction',
      summary: 'Use built‑in preset or draw a box; export without EXIF/GPS.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Open /redact and select preset</li>
            <li>Solid or Pixelate, then export</li>
          </ol>
          <a className="pill" href="/guides/license-plate-redaction">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/screenshot-privacy-check',
      title: 'Screenshot privacy check',
      summary: 'Checklist before posting screenshots publicly.',
      content: (
        <div>
          <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Hide contacts/IDs/QR codes</li>
            <li>Crop irrelevant UI</li>
          </ul>
          <a className="pill" href="/guides/screenshot-privacy-check">Open full guide</a>
        </div>
      ),
    },
    {
      href: '/guides/redaction-checklist',
      title: 'Privacy redaction checklist',
      summary: 'Mask faces, plates, contacts, IDs; remove EXIF/GPS; use irreversible methods.',
      content: (
        <div>
          <ul style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Cover faces, license plates, phone/email/address, QR codes.</li>
            <li>Remove EXIF/GPS.</li>
            <li>Keep safety margins; prefer solid/pixelate (irreversible).</li>
          </ul>
        </div>
      ),
    },
    {
      href: '/guides/exif-gps-removal',
      title: 'Remove EXIF/GPS metadata',
      summary: 'Re‑encoding removes EXIF/GPS by default in our tools. Why it matters and how to check.',
      content: (
        <div>
          <ol style={{ paddingLeft: 18, margin: '6px 0' }}>
            <li>Open <a href="/redact">/redact</a> or <a href="/compress">/compress</a></li>
            <li>Export as JPG – EXIF/GPS will be removed automatically.</li>
          </ol>
        </div>
      ),
    },
  ];

  function Item({ title, summary, content }: { title: string; summary: string; content: ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(v => !v)} aria-expanded={open}
          style={{ width: '100%', textAlign: 'left', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontWeight: 700 }}>
          <span>
            {title}
            <div className="text-muted" style={{ fontSize: 13, fontWeight: 400 }}>{summary}</div>
          </span>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{open ? '−' : '+'}</span>
        </button>
        {open && (
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginTop: 8, color: '#374151' }}>
            {content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Guides</h1>
        <p className="text-muted">Expand below to read key steps inline, or open the full guide.</p>
      </div>
      <div className="card">
        <div style={{ display: 'grid', gap: 10 }}>
          {items.map((it, idx) => (
            <Item key={idx} title={it.title} summary={it.summary} content={it.content} />
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items.map((g, idx) => ({ '@type': 'ListItem', position: idx + 1, url: g.href, name: g.title })) }) }} />
    </div>
  );
}


