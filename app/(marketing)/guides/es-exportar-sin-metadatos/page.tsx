export default function ESExportNoMetadata() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Exportar imágenes sin metadatos</h1>
        <ol>
          <li>Usa <a href="/compress">/compress</a> o <a href="/redact">/redact</a></li>
          <li>Exporta como JPEG/WebP/PNG — la re‑codificación elimina EXIF/GPS</li>
          <li>Opcional: verifica con un visor EXIF</li>
        </ol>
        <p className="text-muted">Todo se procesa localmente en tu navegador.</p>
      </div>
    </div>
  );
}
