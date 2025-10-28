import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Compress Images to Target KB (200KB/500KB) | PixCloak',
  description: 'Hit strict 200KB/500KB limits. Set exact size, resize to 1920px, choose WebP/JPEG. Batch process and download ZIP. Works offline, no uploads.',
  alternates: {
    canonical: '/guides/compress-to-target-kb',
    languages: {
      'x-default': '/guides/compress-to-target-kb',
      en: '/guides/compress-to-target-kb',
      zh: '/guides/compress-to-target-kb-zh',
      es: '/guides/es-comprimir-a-kb-objetivo',
      pt: '/guides/pt-comprimir-para-kb-alvo',
      id: '/guides/id-kompres-ke-kb-target',
    },
  },
};

export default function GuideTargetKB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Compress Images to Target KB (200KB/500KB)', url: '/guides/compress-to-target-kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Compress Images to a Target Size (200KB/500KB)</h1>
          <p>This guide shows how to use the Target (KB) mode to meet common upload limits like 200KB/500KB.</p>
          <ol>
            <li>Open <a href="/compress?kb=200">/compress?kb=200</a> or <a href="/compress?kb=500">/compress?kb=500</a></li>
            <li>Drag multiple images into the area, then click Compress.</li>
            <li>Download the results with ZIP.</li>
          </ol>
          <h2>Notes</h2>
          <ul>
            <li>The target size is an approximation. The frontend uses binary search and is usually within a few KB.</li>
            <li>For even smaller sizes, lower quality or reduce resolution first.</li>
          </ul>
          <p>All processing happens locally in your browser; nothing is uploaded.</p>
          {/* Structured data: HowTo + Breadcrumb */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                name: 'Compress images to a target size (200KB/500KB)',
                description: 'Use PixCloak target KB mode to meet common upload limits like 200KB/500KB. All processing is local in your browser.',
                totalTime: 'PT1M',
                supply: [{ '@type': 'HowToSupply', name: 'Images to compress' }],
                tool: [{ '@type': 'HowToTool', name: 'PixCloak /compress' }],
                step: [
                  { '@type': 'HowToStep', name: 'Open target preset', text: 'Open /compress?kb=200 or /compress?kb=500' },
                  { '@type': 'HowToStep', name: 'Add images', text: 'Drag images into the area' },
                  { '@type': 'HowToStep', name: 'Compress', text: 'Click Compress and wait for completion' },
                  { '@type': 'HowToStep', name: 'Download', text: 'Save single images or download ZIP' },
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
                  { '@type': 'ListItem', position: 2, name: 'Compress to target KB', item: 'https://pixcloak.com/guides/compress-to-target-kb' },
                ],
              }),
            }}
          />
        </div>
      </div>
    </>
  );
}


