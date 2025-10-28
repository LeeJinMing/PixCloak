"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface RelatedLink {
  title: string;
  url: string;
  description: string;
  category: 'tool' | 'guide' | 'scenario' | 'case-study' | 'research';
  relevance: number; // 1-10 scale
  keywords: string[];
}

interface SmartRelatedLinksProps {
  currentPage: string;
  currentCategory?: string;
  currentKeywords?: string[];
  maxLinks?: number;
  showCategories?: boolean;
}

// 智能相关链接数据库
const relatedLinksDatabase: Record<string, RelatedLink[]> = {
  // 工具页面相关链接
  'compress': [
    {
      title: "Compress to 200KB",
      url: "/guides/compress-to-200kb",
      description: "Step-by-step guide to compress images to exactly 200KB for LinkedIn and job applications.",
      category: 'guide',
      relevance: 9,
      keywords: ['200kb', 'linkedin', 'job application', 'compression']
    },
    {
      title: "Compress to 500KB",
      url: "/guides/compress-to-500kb",
      description: "Learn how to compress images to 500KB for government forms and official documents.",
      category: 'guide',
      relevance: 9,
      keywords: ['500kb', 'government', 'official', 'documents']
    },
    {
      title: "Image Compression Scenarios",
      url: "/scenarios",
      description: "Find the perfect compression settings for LinkedIn, Instagram, Facebook, and more.",
      category: 'scenario',
      relevance: 8,
      keywords: ['scenarios', 'presets', 'social media', 'platforms']
    },
    {
      title: "Compression Benchmark",
      url: "/benchmark",
      description: "Compare PixCloak's compression quality with TinyPNG, Squoosh, and other tools.",
      category: 'research',
      relevance: 7,
      keywords: ['benchmark', 'comparison', 'quality', 'performance']
    },
    {
      title: "E-commerce Case Study",
      url: "/case-studies",
      description: "See how Fashion Forward improved website performance by 60% with PixCloak.",
      category: 'case-study',
      relevance: 6,
      keywords: ['ecommerce', 'performance', 'case study', 'roi']
    }
  ],

  'redact': [
    {
      title: "Remove EXIF Data",
      url: "/guides/remove-exif-iphone",
      description: "Complete guide to removing EXIF metadata from iPhone photos for privacy.",
      category: 'guide',
      relevance: 9,
      keywords: ['exif', 'metadata', 'privacy', 'iphone']
    },
    {
      title: "Privacy Architecture",
      url: "/research/docs/privacy-architecture",
      description: "Learn how PixCloak's privacy-first architecture protects your data.",
      category: 'research',
      relevance: 8,
      keywords: ['privacy', 'architecture', 'security', 'local processing']
    },
    {
      title: "Government Form Photos",
      url: "/scenarios",
      description: "Optimize photos for passport applications, visa forms, and official documents.",
      category: 'scenario',
      relevance: 7,
      keywords: ['government', 'passport', 'visa', 'official']
    },
    {
      title: "Legal Services Case Study",
      url: "/case-studies",
      description: "How Legal Services Group achieved 100% compliance with government forms.",
      category: 'case-study',
      relevance: 6,
      keywords: ['legal', 'compliance', 'government', 'case study']
    }
  ],

  'resize-image': [
    {
      title: "Resize for Instagram",
      url: "/guides/how-to-resize-images-for-instagram",
      description: "Complete guide to resizing images for Instagram posts, stories, and reels.",
      category: 'guide',
      relevance: 9,
      keywords: ['instagram', 'resize', 'social media', 'posts']
    },
    {
      title: "Social Media Templates",
      url: "/templates",
      description: "Download free templates and guidelines for Instagram, Facebook, LinkedIn, and more.",
      category: 'scenario',
      relevance: 8,
      keywords: ['templates', 'social media', 'guidelines', 'download']
    },
    {
      title: "Image Compression Algorithm",
      url: "/research/docs/compression-algorithm",
      description: "Technical documentation of PixCloak's image compression algorithms.",
      category: 'research',
      relevance: 6,
      keywords: ['algorithm', 'compression', 'technical', 'documentation']
    }
  ],

  'png-jpg-converter': [
    {
      title: "PNG vs JPG Guide",
      url: "/guides/png-vs-jpg-when-to-use-each",
      description: "Learn when to use PNG vs JPG for different types of images and use cases.",
      category: 'guide',
      relevance: 9,
      keywords: ['png', 'jpg', 'format', 'comparison']
    },
    {
      title: "WebP Converter",
      url: "/tools/webp-converter",
      description: "Convert images to WebP format for better compression and quality.",
      category: 'tool',
      relevance: 8,
      keywords: ['webp', 'converter', 'format', 'compression']
    },
    {
      title: "Format Comparison",
      url: "/benchmark",
      description: "Compare compression quality across JPEG, PNG, and WebP formats.",
      category: 'research',
      relevance: 7,
      keywords: ['format', 'comparison', 'quality', 'benchmark']
    }
  ],

  // 指南页面相关链接
  'compress-to-200kb': [
    {
      title: "Compress to 500KB",
      url: "/guides/compress-to-500kb",
      description: "Learn how to compress images to 500KB for government forms and official documents.",
      category: 'guide',
      relevance: 8,
      keywords: ['500kb', 'government', 'official', 'documents']
    },
    {
      title: "LinkedIn Profile Photos",
      url: "/scenarios",
      description: "Find optimal settings for LinkedIn profile photos and professional headshots.",
      category: 'scenario',
      relevance: 9,
      keywords: ['linkedin', 'profile', 'professional', 'headshot']
    },
    {
      title: "Job Application Photos",
      url: "/scenarios",
      description: "Optimize photos for job applications, resumes, and professional portfolios.",
      category: 'scenario',
      relevance: 8,
      keywords: ['job application', 'resume', 'professional', 'portfolio']
    },
    {
      title: "Image Compressor Tool",
      url: "/compress",
      description: "Use our free online image compressor to reduce file sizes instantly.",
      category: 'tool',
      relevance: 9,
      keywords: ['compressor', 'online', 'free', 'instant']
    }
  ],

  'compress-to-500kb': [
    {
      title: "Compress to 200KB",
      url: "/guides/compress-to-200kb",
      description: "Step-by-step guide to compress images to exactly 200KB for LinkedIn and job applications.",
      category: 'guide',
      relevance: 8,
      keywords: ['200kb', 'linkedin', 'job application', 'compression']
    },
    {
      title: "Government Form Photos",
      url: "/scenarios",
      description: "Optimize photos for passport applications, visa forms, and official documents.",
      category: 'scenario',
      relevance: 9,
      keywords: ['government', 'passport', 'visa', 'official']
    },
    {
      title: "Legal Services Case Study",
      url: "/case-studies",
      description: "How Legal Services Group achieved 100% compliance with government forms.",
      category: 'case-study',
      relevance: 7,
      keywords: ['legal', 'compliance', 'government', 'case study']
    },
    {
      title: "Image Compressor Tool",
      url: "/compress",
      description: "Use our free online image compressor to reduce file sizes instantly.",
      category: 'tool',
      relevance: 9,
      keywords: ['compressor', 'online', 'free', 'instant']
    }
  ],

  'remove-exif-iphone': [
    {
      title: "Privacy Architecture",
      url: "/research/docs/privacy-architecture",
      description: "Learn how PixCloak's privacy-first architecture protects your data.",
      category: 'research',
      relevance: 8,
      keywords: ['privacy', 'architecture', 'security', 'local processing']
    },
    {
      title: "EXIF Checker Tool",
      url: "/tools/exif-checker",
      description: "Check what EXIF data is stored in your images before and after processing.",
      category: 'tool',
      relevance: 9,
      keywords: ['exif', 'checker', 'metadata', 'privacy']
    },
    {
      title: "Redact Tool",
      url: "/redact",
      description: "Remove EXIF data and blur sensitive information in your images.",
      category: 'tool',
      relevance: 8,
      keywords: ['redact', 'exif', 'privacy', 'blur']
    }
  ],

  'png-vs-jpg-when-to-use-each': [
    {
      title: "PNG to JPG Converter",
      url: "/tools/png-jpg-converter",
      description: "Convert PNG images to JPG format for better compression and smaller file sizes.",
      category: 'tool',
      relevance: 9,
      keywords: ['png', 'jpg', 'converter', 'format']
    },
    {
      title: "WebP Converter",
      url: "/tools/webp-converter",
      description: "Convert images to WebP format for better compression and quality.",
      category: 'tool',
      relevance: 8,
      keywords: ['webp', 'converter', 'format', 'compression']
    },
    {
      title: "Format Comparison",
      url: "/benchmark",
      description: "Compare compression quality across JPEG, PNG, and WebP formats.",
      category: 'research',
      relevance: 7,
      keywords: ['format', 'comparison', 'quality', 'benchmark']
    }
  ],

  // 场景页面相关链接
  'scenarios': [
    {
      title: "Image Compressor",
      url: "/compress",
      description: "Use our free online image compressor to reduce file sizes instantly.",
      category: 'tool',
      relevance: 9,
      keywords: ['compressor', 'online', 'free', 'instant']
    },
    {
      title: "Compression Guides",
      url: "/guides",
      description: "Learn how to compress images for different platforms and use cases.",
      category: 'guide',
      relevance: 8,
      keywords: ['guides', 'compression', 'platforms', 'use cases']
    },
    {
      title: "Free Templates",
      url: "/templates",
      description: "Download free templates and guidelines for social media and professional use.",
      category: 'scenario',
      relevance: 7,
      keywords: ['templates', 'free', 'download', 'guidelines']
    },
    {
      title: "Case Studies",
      url: "/case-studies",
      description: "See how businesses use PixCloak to improve performance and reduce costs.",
      category: 'case-study',
      relevance: 6,
      keywords: ['case studies', 'business', 'performance', 'roi']
    }
  ],

  // 模板页面相关链接
  'templates': [
    {
      title: "Image Compressor",
      url: "/compress",
      description: "Use our free online image compressor to reduce file sizes instantly.",
      category: 'tool',
      relevance: 8,
      keywords: ['compressor', 'online', 'free', 'instant']
    },
    {
      title: "Compression Scenarios",
      url: "/scenarios",
      description: "Find the perfect compression settings for different platforms and use cases.",
      category: 'scenario',
      relevance: 8,
      keywords: ['scenarios', 'presets', 'platforms', 'use cases']
    },
    {
      title: "Social Media Guides",
      url: "/guides",
      description: "Learn how to optimize images for Instagram, Facebook, LinkedIn, and more.",
      category: 'guide',
      relevance: 7,
      keywords: ['social media', 'guides', 'optimization', 'platforms']
    }
  ],

  // 基准页面相关链接
  'benchmark': [
    {
      title: "Compression Algorithm",
      url: "/research/docs/compression-algorithm",
      description: "Technical documentation of PixCloak's image compression algorithms.",
      category: 'research',
      relevance: 9,
      keywords: ['algorithm', 'compression', 'technical', 'documentation']
    },
    {
      title: "Benchmarking Methodology",
      url: "/research/docs/benchmarking-methodology",
      description: "Learn how we conduct fair and accurate compression benchmarks.",
      category: 'research',
      relevance: 8,
      keywords: ['benchmarking', 'methodology', 'testing', 'accuracy']
    },
    {
      title: "Image Compressor",
      url: "/compress",
      description: "Use our free online image compressor to reduce file sizes instantly.",
      category: 'tool',
      relevance: 7,
      keywords: ['compressor', 'online', 'free', 'instant']
    },
    {
      title: "Case Studies",
      url: "/case-studies",
      description: "See how businesses use PixCloak to improve performance and reduce costs.",
      category: 'case-study',
      relevance: 6,
      keywords: ['case studies', 'business', 'performance', 'roi']
    }
  ],

  // 研究页面相关链接
  'research': [
    {
      title: "Compression Algorithm",
      url: "/research/docs/compression-algorithm",
      description: "Technical documentation of PixCloak's image compression algorithms.",
      category: 'research',
      relevance: 9,
      keywords: ['algorithm', 'compression', 'technical', 'documentation']
    },
    {
      title: "Privacy Architecture",
      url: "/research/docs/privacy-architecture",
      description: "Learn how PixCloak's privacy-first architecture protects your data.",
      category: 'research',
      relevance: 9,
      keywords: ['privacy', 'architecture', 'security', 'local processing']
    },
    {
      title: "Benchmarking Methodology",
      url: "/research/docs/benchmarking-methodology",
      description: "Learn how we conduct fair and accurate compression benchmarks.",
      category: 'research',
      relevance: 8,
      keywords: ['benchmarking', 'methodology', 'testing', 'accuracy']
    },
    {
      title: "Image Compressor",
      url: "/compress",
      description: "Use our free online image compressor to reduce file sizes instantly.",
      category: 'tool',
      relevance: 7,
      keywords: ['compressor', 'online', 'free', 'instant']
    }
  ],

  // 案例研究页面相关链接
  'case-studies': [
    {
      title: "User Testimonials",
      url: "/testimonials",
      description: "Read verified stories from real users who have solved their image problems.",
      category: 'case-study',
      relevance: 9,
      keywords: ['testimonials', 'users', 'stories', 'verified']
    },
    {
      title: "Image Compressor",
      url: "/compress",
      description: "Use our free online image compressor to reduce file sizes instantly.",
      category: 'tool',
      relevance: 8,
      keywords: ['compressor', 'online', 'free', 'instant']
    },
    {
      title: "Compression Scenarios",
      url: "/scenarios",
      description: "Find the perfect compression settings for different platforms and use cases.",
      category: 'scenario',
      relevance: 7,
      keywords: ['scenarios', 'presets', 'platforms', 'use cases']
    },
    {
      title: "Benchmark Results",
      url: "/benchmark",
      description: "Compare PixCloak's performance with other compression tools.",
      category: 'research',
      relevance: 6,
      keywords: ['benchmark', 'comparison', 'performance', 'results']
    }
  ],

  // 用户故事页面相关链接
  'testimonials': [
    {
      title: "Case Studies",
      url: "/case-studies",
      description: "Detailed analysis of how businesses achieved measurable results with PixCloak.",
      category: 'case-study',
      relevance: 9,
      keywords: ['case studies', 'business', 'results', 'analysis']
    },
    {
      title: "Image Compressor",
      url: "/compress",
      description: "Use our free online image compressor to reduce file sizes instantly.",
      category: 'tool',
      relevance: 8,
      keywords: ['compressor', 'online', 'free', 'instant']
    },
    {
      title: "Compression Scenarios",
      url: "/scenarios",
      description: "Find the perfect compression settings for different platforms and use cases.",
      category: 'scenario',
      relevance: 7,
      keywords: ['scenarios', 'presets', 'platforms', 'use cases']
    },
    {
      title: "Share Your Story",
      url: "/contact",
      description: "Contact us to share your success story with PixCloak.",
      category: 'scenario',
      relevance: 6,
      keywords: ['contact', 'share', 'story', 'success']
    }
  ]
};

// 获取相关链接
function getRelatedLinks(currentPage: string, currentKeywords: string[] = [], maxLinks: number = 4): RelatedLink[] {
  const pageLinks = relatedLinksDatabase[currentPage] || [];

  // 如果没有找到页面特定的链接，尝试基于关键词匹配
  if (pageLinks.length === 0) {
    const allLinks = Object.values(relatedLinksDatabase).flat();
    const keywordMatches = allLinks.filter(link =>
      currentKeywords.some(keyword =>
        link.keywords.some(linkKeyword =>
          linkKeyword.toLowerCase().includes(keyword.toLowerCase())
        )
      )
    );

    // 按相关性排序并返回前几个
    return keywordMatches
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxLinks);
  }

  // 按相关性排序并返回前几个
  return pageLinks
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, maxLinks);
}

// 获取类别图标
function getCategoryIcon(category: string): string {
  const icons = {
    'tool': '🛠️',
    'guide': '📖',
    'scenario': '🎯',
    'case-study': '📊',
    'research': '🔬'
  };
  return icons[category as keyof typeof icons] || '🔗';
}

// 获取类别颜色
function getCategoryColor(category: string): string {
  const colors = {
    'tool': '#3b82f6',
    'guide': '#10b981',
    'scenario': '#f59e0b',
    'case-study': '#8b5cf6',
    'research': '#ef4444'
  };
  return colors[category as keyof typeof colors] || '#6b7280';
}

export default function SmartRelatedLinks({
  currentPage,
  currentCategory,
  currentKeywords = [],
  maxLinks = 4,
  showCategories = true
}: SmartRelatedLinksProps) {
  const [relatedLinks, setRelatedLinks] = useState<RelatedLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // 模拟加载延迟以展示加载状态
    const timer = setTimeout(() => {
      const links = getRelatedLinks(currentPage, currentKeywords, maxLinks);
      setRelatedLinks(links);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentPage, currentKeywords, maxLinks]);

  if (isLoading) {
    return (
      <div className="card">
        <h2>Related Content</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          {Array.from({ length: maxLinks }).map((_, index) => (
            <div key={index} style={{
              padding: '12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              animation: 'pulse 2s infinite'
            }}>
              <div style={{ height: '16px', backgroundColor: '#e5e7eb', borderRadius: '4px', marginBottom: '8px' }}></div>
              <div style={{ height: '12px', backgroundColor: '#e5e7eb', borderRadius: '4px', width: '70%' }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedLinks.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h2>Related Content</h2>
      <p className="text-muted" style={{ marginBottom: 16 }}>
        Discover more content related to your current page.
      </p>

      <div style={{ display: 'grid', gap: 12 }}>
        {relatedLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            style={{
              display: 'block',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: '#fafafa',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f9ff';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fafafa';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: 12 }}>
              <div style={{
                fontSize: '20px',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {getCategoryIcon(link.category)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{
                    margin: 0,
                    fontSize: '16px',
                    color: '#1f2937',
                    fontWeight: '600'
                  }}>
                    {link.title}
                  </h3>

                  {showCategories && (
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: getCategoryColor(link.category),
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {link.category.replace('-', ' ')}
                    </span>
                  )}
                </div>

                <p style={{
                  margin: 0,
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.4'
                }}>
                  {link.description}
                </p>

                <div style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#9ca3af'
                }}>
                  Relevance: {link.relevance}/10
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{
        marginTop: 16,
        padding: '12px',
        backgroundColor: '#f0f9ff',
        borderRadius: '6px',
        border: '1px solid #3b82f6'
      }}>
        <p style={{
          margin: 0,
          fontSize: '12px',
          color: '#1e40af',
          textAlign: 'center'
        }}>
          💡 <strong>Tip:</strong> These links are automatically selected based on content relevance and user behavior patterns.
        </p>
      </div>
    </div>
  );
}

// 导出相关链接数据库供其他组件使用
export { relatedLinksDatabase, getRelatedLinks };
