import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resize Longest Side to 1920px (Best for Web) | PixCloak',
  description: 'Downscale images to 1920px longest side, then compress to 200–800KB for fast web delivery. Keeps aspect ratio. Convert locally—no uploads needed.',
  alternates: { canonical: '/guides/resize-to-1920', languages: { 'x-default': '/guides/resize-to-1920', en: '/guides/resize-to-1920' } },
};

export default function GuideResize1920() {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>Resize longest side to 1920px</h1>
        <ol>
          <li>Open <a href="/compress">/compress</a></li>
          <li>Set Resize = Longest side, value = 1920</li>
          <li>Compress to 200–800KB as needed</li>
        </ol>
        <p className="text-muted">Downscaling first saves time and improves compression quality.</p>
      </div>
    </div>
  );
}


