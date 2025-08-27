export default function ESCompressTargetKB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Comprimir imágenes a un tamaño objetivo (200KB/500KB)</h1>
        <ol>
          <li>Abrir <a href="/compress?kb=200">/compress?kb=200</a> o <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Arrastra múltiples imágenes y pulsa Compress.</li>
          <li>Descarga todo como ZIP.</li>
        </ol>
        <p className="text-muted">Búsqueda binaria de calidad; procesamiento local en tu navegador.</p>
      </div>
    </div>
  );
}
