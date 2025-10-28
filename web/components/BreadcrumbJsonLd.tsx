/**
 * BreadcrumbList Schema.org 结构化数据组件
 * 用于 SEO 优化，帮助搜索引擎理解页面层级结构
 */

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pixcloak.com';

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}

/**
 * 使用示例：
 * 
 * import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
 * 
 * export default function GuidePage() {
 *   return (
 *     <>
 *       <BreadcrumbJsonLd items={[
 *         { name: 'Home', url: '/' },
 *         { name: 'Guides', url: '/guides' },
 *         { name: 'Compress to 200KB', url: '/guides/compress-to-200kb' }
 *       ]} />
 *       <div>Your content</div>
 *     </>
 *   );
 * }
 */

