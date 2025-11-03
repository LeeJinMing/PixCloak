import type { Metadata } from "next";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Language Guides: EN/ES/PT/ID/ZH Overview | PixCloak",
  description: "Browse PixCloak guides in multiple languages (English, Español, Português, Bahasa Indonesia, 简体中文). Quick links to size targets, resizing, and EXIF removal.",
  alternates: {
    canonical: "/guides/languages",
    languages: {
      "x-default": "/guides/languages",
      en: "/guides/languages",
      es: "/guides/languages",
      pt: "/guides/languages",
      id: "/guides/languages",
      zh: "/guides/languages",
    },
  },
  openGraph: {
    title: "Language Guides: EN/ES/PT/ID/ZH Overview",
    description: "Find guides by language: English, Español, Português, Bahasa Indonesia, 简体中文.",
    url: "/guides/languages",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Language Guides Overview",
    description: "Quick access to multilingual guides for compression, resizing, and privacy.",
  },
};

export default function LanguagesGuideIndex() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Languages', url: '/guides/languages' }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Guides by Language (EN/ES/PT/ID/ZH)</h1>
          <p className="text-muted">
            Explore PixCloak guides in your preferred language. All tools run locally in your browser—no uploads, privacy‑first.
          </p>
        </div>

        <div className="card">
          <h2>English (EN)</h2>
          <ul>
            <li><a href="/guides/compress-to-target-kb">Compress to target KB</a></li>
            <li><a href="/guides/how-to-resize-images-for-instagram">Resize for Instagram</a></li>
            <li><a href="/guides/remove-gps-data-from-photos">Remove EXIF/GPS</a></li>
          </ul>
        </div>

        <div className="card">
          <h2>Español (ES)</h2>
          <ul>
            <li><a href="/guides/es-comprimir-a-kb-objetivo">Comprimir a KB objetivo</a></li>
            <li><a href="/guides/es-redimensionar-lado-mas-largo">Redimensionar lado más largo</a></li>
            <li><a href="/guides/es-exportar-sin-metadatos">Exportar sin metadatos</a></li>
            <li><a href="/guides/es-limites-de-imagenes-plataformas">Límites de imágenes por plataforma</a></li>
          </ul>
        </div>

        <div className="card">
          <h2>Português (PT)</h2>
          <ul>
            <li><a href="/guides/pt-comprimir-para-kb-alvo">Comprimir para KB alvo</a></li>
            <li><a href="/guides/pt-redimensionar-lado-mais-longo">Redimensionar lado mais longo</a></li>
            <li><a href="/guides/pt-exportar-sem-metadados">Exportar sem metadados</a></li>
            <li><a href="/guides/pt-limites-de-imagens-plataformas">Limites de imagens por plataforma</a></li>
          </ul>
        </div>

        <div className="card">
          <h2>Bahasa Indonesia (ID)</h2>
          <ul>
            <li><a href="/guides/id-kompres-ke-kb-target">Kompres ke KB target</a></li>
            <li><a href="/guides/id-ubah-ukuran-sisi-terpanjang">Ubah ukuran sisi terpanjang</a></li>
            <li><a href="/guides/id-ekspor-tanpa-metadata">Ekspor tanpa metadata</a></li>
            <li><a href="/guides/id-batas-gambar-platform">Batas gambar platform</a></li>
          </ul>
        </div>

        <div className="card">
          <h2>简体中文 (ZH)</h2>
          <ul>
            <li><a href="/guides/compress-to-target-kb-zh">按目标KB压缩</a></li>
            <li><a href="/guides/resize-longest-side-zh">按最长边调整尺寸</a></li>
            <li><a href="/guides/export-without-metadata-zh">导出并移除EXIF</a></li>
            <li><a href="/guides/platform-image-limits-zh">各平台图片限制</a></li>
          </ul>
        </div>

        <div className="card">
          <h2>Related</h2>
          <p>
            Looking for tools? Try the <a href="/compress">Image Compressor</a> or <a href="/redact">Image Redactor</a>.
          </p>
        </div>

        <FaqJsonLd
          items={[
            { question: "Do these guides work offline?", answer: "Yes. All processing runs locally in your browser. Images are never uploaded." },
            { question: "Which languages are supported?", answer: "English, Español, Português, Bahasa Indonesia, and 简体中文 (more coming)." }
          ]}
        />
      </div>
    </>
  );
}


