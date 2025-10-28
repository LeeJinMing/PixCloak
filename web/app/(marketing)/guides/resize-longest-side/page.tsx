import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Resize Images to 1920px (Longest Side) | PixCloak",
  description: "Resize to 1920px longest side before compression. Reduces file size 50-70% with no quality loss. Keeps aspect ratio. Works offline—no uploads.",
  alternates: {
    canonical: '/guides/resize-longest-side',
    languages: {
      'x-default': '/guides/resize-longest-side',
      en: '/guides/resize-longest-side',
      zh: '/guides/resize-longest-side-zh',
      es: '/guides/es-redimensionar-lado-mas-largo',
      pt: '/guides/pt-redimensionar-lado-mais-longo',
      id: '/guides/id-ubah-ukuran-sisi-terpanjang',
    },
  },
  openGraph: {
    title: "Resize Images to 1920px (Longest Side)",
    description: "Resize images to 1920px for web and social. Keeps aspect ratio. No upload.",
    url: "/guides/resize-longest-side",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resize Images to 1920px (Longest Side)",
    description: "Perfect for web. Keeps aspect ratio. Free tool, no upload.",
  },
};

export default function GuideResizeLongest() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Resize Images to 1920px (Longest Side)', url: '/guides/resize-longest-side' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Resize by Longest Side (e.g., 1920px for web)</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Choose Resize = Longest side, set value (e.g., 1920).</li>
          <li>Compress with desired quality or target size.</li>
        </ol>
        <p className="text-muted">Downscaling before compression saves size dramatically with minimal perceived loss.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "Why resize to 1920px before compressing?", answer: "Most screens are 1920px wide or less. Larger dimensions just waste file size. Resizing to 1920px before compression reduces file size by 50-70% with no visible quality loss on screens." },
          { question: "What does 'longest side' mean?", answer: "For landscape photos (wider than tall), the longest side is width. For portrait photos (taller than wide), it's height. Resizing by longest side maintains aspect ratio automatically." },
          { question: "Will 1920px work for print?", answer: "No. For print, use 300 DPI and keep original dimensions. 1920px is optimized for digital/web use only." },
        ]}
      />
      <div className="card">
        {/* Structured data: HowTo + Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: 'Resize images by longest side (e.g., 1920px)',
              description: 'Downscale images by setting the longest side to 1920px before compression to reduce size with minimal visual loss.',
              totalTime: 'PT1M',
              tool: [{ '@type': 'HowToTool', name: 'PixCloak /compress' }],
              step: [
                { '@type': 'HowToStep', name: 'Open tool', text: 'Open /compress' },
                { '@type': 'HowToStep', name: 'Set resize', text: 'Choose Resize = Longest side and set 1920' },
                { '@type': 'HowToStep', name: 'Compress', text: 'Pick format/quality or target KB and compress' },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Guides', item: 'https://pixcloak.com/guides' },
                { '@type': 'ListItem', position: 2, name: 'Resize longest side', item: 'https://pixcloak.com/guides/resize-longest-side' },
              ],
            }),
          }}
        />
      </div>
    </div>
    </>
  );
}


