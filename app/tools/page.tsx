export default function ToolsPage() {
  const core = [
    { href: '/', title: 'Image Compressor', desc: 'Compress to target KB, resize, convert JPEG/WebP/PNG. Batch & ZIP.' },
    { href: '/redact', title: 'Image Redaction', desc: 'Draw boxes to hide sensitive areas (solid/pixelate). Remove EXIF/GPS.' },
  ];
  const more = [
    { href: '/tools/exif-checker', title: 'EXIF/GPS Checker', desc: 'Detect and remove EXIF/GPS metadata locally.' },
    { href: '/tools/platform-checker', title: 'Platform Compliance', desc: 'Validate KB/dimensions per platform; get one‑click presets.' },
    { href: '/tools/og-card', title: 'OG/Twitter Card', desc: 'Generate 1200×630 images and meta tags.' },
    { href: '/tools/favicon-pack', title: 'Favicon Pack', desc: 'Generate favicons and manifest icons; download ZIP.' },
    { href: '/tools/crop-templates', title: 'Crop Templates', desc: 'Quick crop to 1:1 / 4:3 / 16:9 / 2:3.' },
    { href: '/tools/srcset-generator', title: 'img srcset Generator', desc: 'Generate responsive srcset/sizes code.' },
    { href: '/tools/dataurl-alt', title: 'Data URL + Alt', desc: 'Base64 data URL converter with alt suggestions.' },
    { href: '/tools/dpi-converter', title: 'DPI/PPI Converter', desc: 'Pixels ↔ print size by DPI/PPI.' },
    { href: '/tools/watermark', title: 'Text Watermark', desc: 'Overlay text watermark and export.' },
    { href: '/tools/lqip', title: 'LQIP Placeholder', desc: 'Tiny Base64 placeholder with blur.' },
    { href: '/tools/batch-rename', title: 'Batch Rename', desc: 'Rename with patterns and ZIP download.' },
    { href: '/tools/svg-optimizer', title: 'SVG Optimizer', desc: 'Minify & clean SVG code locally.' },
    { href: '/tools/text-placeholder', title: 'Text Placeholder', desc: 'Generate text-based placeholder images.' },
  ];
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Tools</h1>
        <p className="text-muted">Privacy‑first utilities. Local processing. No uploads.</p>
      </div>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
        {core.map((c, i) => (
          <a key={i} href={c.href} className="card" style={{ display: 'block' }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div className="text-muted" style={{ fontSize: 14 }}>{c.desc}</div>
            </div>
          </a>
        ))}
      </div>
      <div className="card">
        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>More tools</summary>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', marginTop: 12 }}>
            {more.map((c, i) => (
              <a key={i} href={c.href} className="card" style={{ display: 'block' }}>
                <div style={{ display: 'grid', gap: 6 }}>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div className="text-muted" style={{ fontSize: 14 }}>{c.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </details>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: [...core, ...more].map((c, idx) => ({ '@type': 'ListItem', position: idx + 1, url: c.href, name: c.title })) }) }} />
    </div>
  );
}


