import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Compress Images to 500KB (Free, High Quality) | PixCloak",
  description: "Reduce image file size to 500KB for websites, email attachments, and online forms. Maintains excellent quality for photos. Works on any device—no upload, no app download needed.",
  alternates: {
    canonical: '/guides/compress-to-500kb',
    languages: {
      'x-default': '/guides/compress-to-500kb',
      en: '/guides/compress-to-500kb',
      pt: '/guides/pt-comprimir-para-500kb',
    },
  },
  openGraph: {
    title: "Compress Images to 500KB (Free, High Quality)",
    description: "Reduce image file size to 500KB for websites, email attachments, and online forms. Maintains excellent quality.",
    url: "/guides/compress-to-500kb",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Images to 500KB",
    description: "High quality at 500KB. Perfect for websites and email. Free tool.",
  },
};
export default function GuideCompress500KB() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Compress images to 500KB</h1>
        <ol>
          <li>Open <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>Drag photos in and click Compress</li>
          <li>Use Download ZIP to save all at once</li>
        </ol>
        <p className="text-muted">500KB fits many mobile/web forms; prefer WebP when possible.</p>
      </div>
      <FaqJsonLd
        items={[
          { question: "What can I use 500KB images for?", answer: "Blog posts, email newsletters, government portals, insurance claims, online forums, and most content management systems. 500KB balances quality and file size well." },
          { question: "How many 500KB images fit in a 10MB email?", answer: "About 20 images per email. Most email providers (Gmail, Outlook) have 25MB limits, but keeping under 10MB ensures faster sending and delivery." },
          { question: "Should I resize before compressing to 500KB?", answer: "Yes. Resize longest side to 1920-2560px first. This maintains better visual quality at the target 500KB file size." },
        ]}
      />
    </div>
  );
}


