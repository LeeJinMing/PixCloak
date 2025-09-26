import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research: Quality vs Size Curves (JPEG/WebP)",
  description: "Methodology to generate quality-size curves at target KBs and resolutions.",
  alternates: { canonical: "/guides/research-quality-size-curves" },
};

export default function Page() {
  return (
    <div className="container" style={{ display: 'grid', gap: 16 }}>
      <div className="card">
        <h1>Research: Quality vs Size Curves</h1>
        <p className="text-muted">We outline a reproducible method to benchmark JPEG/WebP across multiple images at target KBs with 1920px longest side.</p>
        <ol style={{ paddingLeft: 18 }}>
          <li>Choose a CC0 dataset covering photos, UI, and screenshots.</li>
          <li>Normalize images to 1920px longest side.</li>
          <li>For each image and codec, sweep quality via binary search to hit 200/300/500/800KB.</li>
          <li>Record SSIM/PSNR and visual notes; export CSV.</li>
        </ol>
        <p className="text-muted">We will publish sample CSVs and charts in a follow-up update.</p>
      </div>
    </div>
  );
}


