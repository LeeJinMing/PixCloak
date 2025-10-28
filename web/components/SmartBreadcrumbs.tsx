"use client";
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  url: string;
  isCurrentPage?: boolean;
}

interface SmartBreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  showCurrentPage?: boolean;
  maxItems?: number;
  separator?: string;
}

// 智能面包屑路径映射
const breadcrumbPaths: Record<string, BreadcrumbItem[]> = {
  // 工具页面
  '/compress': [
    { name: 'Home', url: '/' },
    { name: 'Image Compressor', url: '/compress' }
  ],
  '/redact': [
    { name: 'Home', url: '/' },
    { name: 'Image Redactor', url: '/redact' }
  ],
  '/resize-image': [
    { name: 'Home', url: '/' },
    { name: 'Image Resizer', url: '/resize-image' }
  ],
  '/png-jpg-converter': [
    { name: 'Home', url: '/' },
    { name: 'PNG to JPG Converter', url: '/png-jpg-converter' }
  ],
  '/webp-converter': [
    { name: 'Home', url: '/' },
    { name: 'WebP Converter', url: '/webp-converter' }
  ],

  // 指南页面
  '/guides/compress-to-200kb': [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Compress to 200KB', url: '/guides/compress-to-200kb' }
  ],
  '/guides/compress-to-500kb': [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Compress to 500KB', url: '/guides/compress-to-500kb' }
  ],
  '/guides/compress-to-300kb': [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Compress to 300KB', url: '/guides/compress-to-300kb' }
  ],
  '/guides/remove-exif-iphone': [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Remove EXIF from iPhone', url: '/guides/remove-exif-iphone' }
  ],
  '/guides/png-vs-jpg-when-to-use-each': [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'PNG vs JPG Guide', url: '/guides/png-vs-jpg-when-to-use-each' }
  ],
  '/guides/how-to-resize-images-for-instagram': [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Resize for Instagram', url: '/guides/how-to-resize-images-for-instagram' }
  ],

  // 场景页面
  '/scenarios': [
    { name: 'Home', url: '/' },
    { name: 'Compression Scenarios', url: '/scenarios' }
  ],

  // 模板页面
  '/templates': [
    { name: 'Home', url: '/' },
    { name: 'Free Templates', url: '/templates' }
  ],

  // 基准页面
  '/benchmark': [
    { name: 'Home', url: '/' },
    { name: 'Compression Benchmark', url: '/benchmark' }
  ],

  // 研究页面
  '/research': [
    { name: 'Home', url: '/' },
    { name: 'Research & Documentation', url: '/research' }
  ],
  '/research/docs/compression-algorithm': [
    { name: 'Home', url: '/' },
    { name: 'Research', url: '/research' },
    { name: 'Compression Algorithm', url: '/research/docs/compression-algorithm' }
  ],
  '/research/docs/privacy-architecture': [
    { name: 'Home', url: '/' },
    { name: 'Research', url: '/research' },
    { name: 'Privacy Architecture', url: '/research/docs/privacy-architecture' }
  ],
  '/research/docs/benchmarking-methodology': [
    { name: 'Home', url: '/' },
    { name: 'Research', url: '/research' },
    { name: 'Benchmarking Methodology', url: '/research/docs/benchmarking-methodology' }
  ],

  // 案例研究页面
  '/case-studies': [
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' }
  ],

  // 用户故事页面
  '/testimonials': [
    { name: 'Home', url: '/' },
    { name: 'User Stories', url: '/testimonials' }
  ],

  // 嵌入页面
  '/embed': [
    { name: 'Home', url: '/' },
    { name: 'Embed Tools', url: '/embed' }
  ],
  '/embed/compress': [
    { name: 'Home', url: '/' },
    { name: 'Embed Tools', url: '/embed' },
    { name: 'Embed Compressor', url: '/embed/compress' }
  ],

  // 营销页面
  '/about': [
    { name: 'Home', url: '/' },
    { name: 'About PixCloak', url: '/about' }
  ],
  '/privacy': [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' }
  ],
  '/terms': [
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' }
  ],
  '/contact': [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' }
  ]
};

// 获取智能面包屑路径
function getSmartBreadcrumbs(currentPath: string, customItems?: BreadcrumbItem[]): BreadcrumbItem[] {
  if (customItems && customItems.length > 0) {
    return customItems;
  }

  return breadcrumbPaths[currentPath] || [
    { name: 'Home', url: '/' },
    { name: 'Page', url: currentPath }
  ];
}

export default function SmartBreadcrumbs({
  items,
  showHome = true,
  showCurrentPage = true,
  maxItems = 5,
  separator = '›'
}: SmartBreadcrumbsProps) {
  // 如果没有提供items，尝试从当前路径生成
  const breadcrumbItems = items.length > 0 ? items : getSmartBreadcrumbs(window?.location?.pathname || '');

  // 限制面包屑项目数量
  const limitedItems = breadcrumbItems.slice(0, maxItems);

  // 如果项目被截断，添加省略号
  const hasMoreItems = breadcrumbItems.length > maxItems;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        marginBottom: '16px',
        padding: '8px 0',
        fontSize: '14px'
      }}
    >
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: 0,
        padding: 0,
        listStyle: 'none',
        flexWrap: 'wrap'
      }}>
        {limitedItems.map((item, index) => {
          const isLast = index === limitedItems.length - 1;
          const isCurrent = item.isCurrentPage || isLast;

          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
              {index > 0 && (
                <span style={{
                  margin: '0 8px',
                  color: '#9ca3af',
                  fontSize: '12px'
                }}>
                  {separator}
                </span>
              )}

              {isCurrent ? (
                <span style={{
                  color: '#374151',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  style={{
                    color: '#3b82f6',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}

        {hasMoreItems && (
          <>
            <span style={{
              margin: '0 8px',
              color: '#9ca3af',
              fontSize: '12px'
            }}>
              {separator}
            </span>
            <span style={{
              color: '#9ca3af',
              fontSize: '14px'
            }}>
              ...
            </span>
          </>
        )}
      </ol>
    </nav>
  );
}

// 导出面包屑路径映射供其他组件使用
export { breadcrumbPaths, getSmartBreadcrumbs };
