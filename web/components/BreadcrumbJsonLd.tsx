/**
 * BreadcrumbList Schema.org 结构化数据组件
 * 用于 SEO 优化，帮助搜索引擎理解页面层级结构
 */

import { absoluteUrl } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
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

