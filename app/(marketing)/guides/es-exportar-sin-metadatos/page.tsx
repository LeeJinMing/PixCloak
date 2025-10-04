import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exportar imágenes sin metadatos (eliminar EXIF/GPS) | PixCloak',
  description:
    'Elimina EXIF/GPS en el navegador: abre /compress o /redact y exporta como JPEG/WebP/PNG para limpiar metadatos. Procesamiento local, sin subidas. Lotes y ZIP disponibles.',
  alternates: {
    canonical: '/guides/es-exportar-sin-metadatos',
    languages: { en: '/guides/export-without-metadata', es: '/guides/es-exportar-sin-metadatos' }
  }
};

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
