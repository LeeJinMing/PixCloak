import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: '平台常见图片限制（200KB/500KB 规范） | PixCloak',
  description: '平台常见图片限制：头像上限200KB、帖子上限500KB、最长边建议1920px。快速预设本地压缩调整尺寸，自动移除EXIF/GPS元数据，无需上传文件。适合微信公众号、小红书、知乎、简书、豆瓣、V2EX等平台，支持批量处理ZIP打包，隐私优先100%本地处理，完全免费无需注册登录。',
  alternates: {
    canonical: '/guides/platform-image-limits-zh',
    languages: {
      'x-default': '/guides/platform-image-limits',
      en: '/guides/platform-image-limits',
      zh: '/guides/platform-image-limits-zh',
      es: '/guides/es-limites-de-imagenes-plataformas',
      pt: '/guides/pt-limites-de-imagens-plataformas',
      id: '/guides/id-batas-gambar-platform',
    },
  },
};

export default function GuidePlatformLimitsZH() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: '平台常见图片限制（体积与尺寸）| PixCloak', url: '/guides/platform-image-limits-zh' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>常见平台的图片体积与尺寸限制</h1>
          <p className="text-muted">根据公开资料与经验整理，供快速准备图片时参考（持续更新）。</p>
          <ul>
            <li>头像：常见上限 200KB；建议 512–1024px 正方形</li>
            <li>动态/帖子：常见上限 500KB；建议最长边 ≤ 1920px</li>
            <li>横幅/封面：宽图；含渐变/文字时可优先 JPEG 并适度提高体积</li>
          </ul>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a className="pill" href="/compress?kb=200">头像 200KB 预设</a>
            <a className="pill" href="/compress?kb=500">帖子 500KB 预设</a>
            <a className="pill-ghost" href="/guides/resize-longest-side">先缩放到 1920px</a>
          </div>
          <p className="text-muted" style={{ marginTop: 8 }}>提示：本站默认本地处理并移除 EXIF/GPS 元数据；不上传。</p>
        </div>
      </div>
    </>
  );
}


