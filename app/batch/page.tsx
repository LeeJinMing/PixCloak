import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Batch Processing (Coming Soon) | PixCloak',
  description: 'Queue multiple images, apply presets (target KB, resize, format), and export as a ZIP. Planned feature in membership plan. Local processing, no uploads.',
  alternates: { canonical: '/batch' },
};

export default function BatchPage() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h1>Batch Processing (coming soon)</h1>
      <p>Queue multiple images and export as a ZIP. This feature will be part of the membership plan.</p>
    </div>
  );
}


