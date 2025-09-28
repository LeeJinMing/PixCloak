export default function ToolsPage() {
  // Only list auxiliary tools here. Main tools are accessible via nav and homepage.
  const tools = [
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
    { href: '/tools/trim-transparent', title: 'Trim Transparent', desc: 'Auto-trim transparent edges of PNGs.' },
    { href: '/tools/aspect-pad', title: 'Aspect Ratio Padder', desc: 'Pad to target aspect ratio with background.' },
    { href: '/tools/remove-bg-lite', title: 'Remove BG (Lite)', desc: 'Background removal by color tolerance.' },
    { href: '/tools/webp-converter', title: 'Batch WebP Converter', desc: 'Convert images to WebP and ZIP.' },
    { href: '/tools/image-diff', title: 'Image Diff', desc: 'A/B slider compare and pixel diff export.' },
    { href: '/tools/sprite-sheet', title: 'Sprite Sheet', desc: 'Combine images into sheet + JSON mapping.' },
  ];
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Tools</h1>
        <p className="text-muted">Privacy‑first utilities. Local processing. No uploads.</p>
      </div>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
        {tools.map((c, i) => (
          <a key={i} href={c.href} className="card" style={{ display: 'block' }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div className="text-muted" style={{ fontSize: 14 }}>{c.desc}</div>
            </div>
          </a>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: tools.map((c, idx) => ({ '@type': 'ListItem', position: idx + 1, url: c.href, name: c.title })) }) }} />
    </div>
  );
}


