export default function ToolsPage() {
  const cards = [
    { href: '/compress', title: 'Image Compressor', desc: 'Compress to target KB, resize, convert JPEG/WebP/PNG. Batch & ZIP.' },
    { href: '/redact', title: 'Image Redaction', desc: 'Draw boxes to hide sensitive areas (solid/pixelate). Remove EXIF/GPS.' },
  ];
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Tools</h1>
        <p className="text-muted">Privacy‑first utilities. Local processing. No uploads.</p>
      </div>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
        {cards.map((c, i) => (
          <a key={i} href={c.href} className="card" style={{ display: 'block' }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div className="text-muted" style={{ fontSize: 14 }}>{c.desc}</div>
            </div>
          </a>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: cards.map((c, idx) => ({ '@type': 'ListItem', position: idx + 1, url: c.href, name: c.title })) }) }} />
    </div>
  );
}


