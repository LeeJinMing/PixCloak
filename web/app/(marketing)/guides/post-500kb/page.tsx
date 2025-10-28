import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Prepare Images for Social Posts at 500KB... | PixCloak",
  description: "Compress photos to 500KB for social media posts, forums, blog uploads. Maintains high quality. Works for Facebook, Reddit, Medium.",
  alternates: {
    canonical: '/guides/post-500kb',
    languages: {
      'x-default': '/guides/post-500kb',
      en: '/guides/post-500kb',
    },
  },
  openGraph: {
    title: "Prepare Images for Social Posts at 500KB",
    description: "Compress photos to 500KB for social media, forums, blogs. Maintains high quality. Batch process available.",
    url: "/guides/post-500kb",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prepare 500KB Social Media Images",
    description: "Perfect for Facebook, forums, blogs. Free batch tool.",
  },
};

export default function GuidePost500KB() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Prepare Images for Social Posts at 500KB (Facebook, Forums)', url: '/guides/post-500kb' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Prepare 500KB images for posts</h1>
        <ol>
          <li>Open <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Set longest side ≤ 1920px, then Compress</li>
          <li>Download ZIP for multiple images</li>
        </ol>
        <p className="text-muted">500KB works well for most forms and communities.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "Why compress to 500KB for social posts?", answer: "500KB balances quality and loading speed. Larger files slow down page loads and frustrate mobile users. Smaller files (100-200KB) sacrifice too much quality for content images." },
          { question: "What dimensions should social post images be?", answer: "1920px longest side works universally. Facebook: 1200x630px for posts. Instagram: 1080x1080px. Twitter: 1200x675px. Resize to these before compressing to 500KB." },
          { question: "Can I compress multiple images to 500KB at once?", answer: "Yes. Use our batch tool to compress dozens of images simultaneously. Download as ZIP for convenience." },
        ]}
      />
    </div>
    </>
  );
}


