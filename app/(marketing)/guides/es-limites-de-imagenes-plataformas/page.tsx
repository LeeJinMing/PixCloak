export default function ESPlatformLimits() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Límites comunes de imágenes en plataformas (tamaño y dimensiones)</h1>
        <ul>
          <li>Avatares: ≤ 200KB; 512–1024px cuadrado</li>
          <li>Publicaciones: ≤ 500KB; lado más largo ≤ 1920px</li>
          <li>Banners: prueba JPEG vs WebP para degradados/texto</li>
        </ul>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">Preset 200KB</a>
          <a className="pill" href="/compress?kb=500">Preset 500KB</a>
          <a className="pill-ghost" href="/guides/resize-longest-side">Redimensionar 1920px</a>
        </div>
      </div>
    </div>
  );
}
