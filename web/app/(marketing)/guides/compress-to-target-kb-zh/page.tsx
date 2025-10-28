import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: '按目标体积压缩到200KB/500KB（本地，无上传） | PixCloak',
  description: '在浏览器中将图片压缩到精确目标体积（200KB/500KB）。先按最长边缩放至1920px，再用目标KB预设快速达到要求。处理全程本地，适合网页、邮件与表单。 Works locally in your browser, no uploads.',
  alternates: {
    canonical: '/guides/compress-to-target-kb-zh',
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

export default function GuideTargetKBZH() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: '按目标体积压缩到200KB/500KB（本地，无上传）', url: '/guides/compress-to-target-kb-zh' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>按目标体积压缩（200KB/500KB）</h1>
        <ol>
          <li>打开 <a href="/compress?kb=200">/compress?kb=200</a> 或 <a href="/compress?kb=500">/compress?kb=500</a></li>
          <li>拖拽图片后点击 Compress，批量可用 ZIP 下载</li>
          <li>如需更小体积，先把最长边缩放到 1920px</li>
        </ol>
        <p className="text-muted">二分法搜索质量，通常能在相近 KB 内达成目标；本地处理，不上传。</p>
      </div>
    </div>
    </>
  );
}


