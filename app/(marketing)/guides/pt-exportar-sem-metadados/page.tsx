export default function PTExportNoMetadata() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Exportar imagens sem metadados</h1>
        <ol>
          <li>Use <a href="/compress">/compress</a> ou <a href="/redact">/redact</a></li>
          <li>Exporte em JPEG/WebP/PNG — a re‑codificação remove EXIF/GPS</li>
          <li>Opcional: verifique com um visualizador EXIF</li>
        </ol>
        <p className="text-muted">Tudo é processado localmente no seu navegador.</p>
      </div>
    </div>
  );
}
