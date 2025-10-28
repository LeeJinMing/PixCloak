import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ocultar en fotos (difuminar/EXIF) | PixCloak',
  description: 'Difumina caras, matrículas y texto; elimina EXIF/GPS al exportar. 100% local, sin subir archivos. Works locally in your browser, no uploads.',
  alternates: {
    canonical: '/redact-es',
    languages: { 'x-default': '/redact', en: '/redact', es: '/redact-es', pt: '/redact-pt', id: '/redact-id', zh: '/redact' }
  }
};

export default function RedactES() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Ocultar información en imágenes (local)</h1>
        <p>Dibuja cuadros para cubrir áreas sensibles (sólido/pixelado). La exportación elimina EXIF/GPS. Todo es local.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/redact">Abrir herramienta</a>
          <a className="pill-ghost" href="/guides/es-exportar-sin-metadatos">Sin metadatos</a>
        </div>
      </div>
    </div>
  );
}
