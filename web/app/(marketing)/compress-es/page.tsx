import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comprimir imágenes a 200KB/500KB (sin subir) | PixCloak',
  description: 'Comprime a 200KB/500KB en tu navegador. Convierte WebP/JPEG y redimensiona a 1920px. Todo local, sin subidas. Works locally in your browser, no uploads.',
  alternates: {
    canonical: '/compress-es',
    languages: { 'x-default': '/compress', en: '/compress', es: '/compress-es', pt: '/compress-pt', id: '/compress-id', zh: '/compress' }
  }
};

export default function CompressES() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Comprimir imágenes (local, sin subir)</h1>
        <p>Usa el modo de tamaño objetivo (200KB/500KB) o calidad fija; todo se procesa localmente en tu navegador.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a className="pill" href="/compress?kb=200">200KB</a>
          <a className="pill" href="/compress?kb=500">500KB</a>
          <a className="pill-ghost" href="/guides/es-redimensionar-lado-mas-largo">Redimensionar 1920px</a>
        </div>
      </div>
    </div>
  );
}
