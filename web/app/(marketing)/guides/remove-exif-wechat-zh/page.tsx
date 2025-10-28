import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: '微信图片去除 EXIF 元数据（本地处理）| PixCloak',
  description: '在浏览器内本地去除微信图片的 EXIF/GPS：打开 /compress，导入并导出为 JPEG/WebP，导出时会自动清除元数据。尽量使用原始文件以避免二压。 Works locally in your browser, no uploads.',
  alternates: { canonical: '/guides/remove-exif-wechat-zh', languages: { zh: '/guides/remove-exif-wechat-zh', en: '/guides/remove-exif-wechat' } },
};

export default function GuideRemoveExifWeChatZH() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: '微信图片去除 EXIF 元数据（本地处理）| PixCloak', url: '/guides/remove-exif-wechat-zh' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
      <div className="card">
        <h1>微信图片去除 EXIF 元数据</h1>
        <ol>
          <li>打开 <a href="/compress">/compress</a></li>
          <li>拖拽导入并导出为 JPEG/WebP</li>
          <li>EXIF/GPS 会在导出时自动移除</li>
        </ol>
        <p className="text-muted">微信可能会二次压缩，尽量使用原始文件。</p>
      </div>
    </div>
    </>
  );
}


