export default function GuidesPage() {
  const guides = [
    { href: '/guides/compress-to-target-kb', title: 'Compress images to a target size (KB)', desc: 'How to pick target KB vs quality, tips for best visual results.' },
    { href: '/guides/redaction-checklist', title: 'Privacy redaction checklist', desc: 'Common sensitive areas to hide in screenshots and photos.' },
    { href: '/guides/exif-gps-removal', title: 'Remove EXIF/GPS metadata', desc: 'What metadata exists and why removing it matters for privacy.' },
  ];
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Guides</h1>
        <p className="text-muted">Practical how‑tos to achieve reliable results quickly.</p>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {guides.map((g, i) => (
          <a key={i} href={g.href} className="card" style={{ display: 'block' }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ fontWeight: 700 }}>{g.title}</div>
              <div className="text-muted" style={{ fontSize: 14 }}>{g.desc}</div>
            </div>
          </a>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: guides.map((g, idx) => ({ '@type': 'ListItem', position: idx + 1, url: g.href, name: g.title })) }) }} />
    </div>
  );
}


