import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Redimensionar por el lado más largo a 1920px | PixCloak',
  description: 'Reduce dimensiones a 1920px por el lado más largo y luego comprime a 200–800KB. Mantiene proporción y mejora velocidad de carga. Proceso local, sin subidas.',
  alternates: { canonical: '/guides/es-redimensionar-lado-mas-largo', languages: { es: '/guides/es-redimensionar-lado-mas-largo', en: '/guides/resize-longest-side' } },
};

export default function ESResizeLongest() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Redimensionar por el lado más largo a 1920px', url: '/guides/es-redimensionar-lado-mas-largo' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Redimensionar por el lado más largo (p. ej., 1920px)</h1>
        <ol>
          <li>Abrir <a href="/compress">/compress</a></li>
          <li>Elegir Resize = Longest side y fijar el valor (1920)</li>
          <li>Comprimir con calidad o tamaño objetivo</li>
        </ol>
        <p className="text-muted">Reducir antes de comprimir baja mucho el tamaño con mínima pérdida visual.</p>
      </div>
    </div>
    </>
  );
}
