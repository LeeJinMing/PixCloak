export default function GuidesLanguages() {
  const links = [
    { href: '/guides/es-comprimir-a-200kb', label: 'ES: Comprimir a 200KB' },
    { href: '/guides/pt-comprimir-para-500kb', label: 'PT: Comprimir para 500KB' },
    { href: '/guides/id-kompres-menjadi-1mb', label: 'ID: Kompres menjadi 1MB' },
    { href: '/guides/platform-image-limits-zh', label: 'ZH: 平台图片限制索引' },
  ];
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Guides in other languages</h1>
        <ul>
          {links.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}


