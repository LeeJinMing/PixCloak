"use client";
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const u = typeof window !== 'undefined' ? new URL(url, window.location.origin).toString() : url;
  const tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(u)}`;
  const lk = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <a className="pill" href={tw} target="_blank" rel="noopener">Share on X/Twitter</a>
      <a className="pill" href={lk} target="_blank" rel="noopener">Share on LinkedIn</a>
    </div>
  );
}


