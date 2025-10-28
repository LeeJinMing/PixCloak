"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface NavigationItem {
  title: string;
  url: string;
  description?: string;
  category: 'tool' | 'guide' | 'scenario' | 'research' | 'business';
  icon?: string;
  keywords?: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

interface SmartNavigationProps {
  currentPage?: string;
  showCategories?: boolean;
  maxItemsPerCategory?: number;
  showSearch?: boolean;
}

// 智能导航数据库
const navigationDatabase: Record<string, NavigationItem[]> = {
  'tools': [
    {
      title: 'Image Compressor',
      url: '/compress',
      description: 'Compress JPEG, PNG, WebP images to any size',
      category: 'tool',
      icon: '🗜️',
      keywords: ['compress', 'reduce', 'size', 'jpeg', 'png', 'webp'],
      isPopular: true
    },
    {
      title: 'Image Redactor',
      url: '/redact',
      description: 'Remove EXIF data and blur sensitive information',
      category: 'tool',
      icon: '🔒',
      keywords: ['redact', 'exif', 'privacy', 'blur', 'metadata']
    },
    {
      title: 'Image Resizer',
      url: '/resize-image',
      description: 'Resize images to specific dimensions',
      category: 'tool',
      icon: '📏',
      keywords: ['resize', 'dimensions', 'crop', 'scale']
    },
    {
      title: 'PNG to JPG Converter',
      url: '/png-jpg-converter',
      description: 'Convert PNG images to JPG format',
      category: 'tool',
      icon: '🔄',
      keywords: ['convert', 'png', 'jpg', 'format']
    },
    {
      title: 'WebP Converter',
      url: '/webp-converter',
      description: 'Convert images to WebP format',
      category: 'tool',
      icon: '🌐',
      keywords: ['webp', 'convert', 'format', 'modern']
    },
    {
      title: 'EXIF Checker',
      url: '/tools/exif-checker',
      description: 'Check EXIF metadata in your images',
      category: 'tool',
      icon: '🔍',
      keywords: ['exif', 'metadata', 'check', 'privacy']
    }
  ],

  'guides': [
    {
      title: 'Compress to 200KB',
      url: '/guides/compress-to-200kb',
      description: 'Step-by-step guide for LinkedIn and job applications',
      category: 'guide',
      icon: '📖',
      keywords: ['200kb', 'linkedin', 'job', 'application'],
      isPopular: true
    },
    {
      title: 'Compress to 500KB',
      url: '/guides/compress-to-500kb',
      description: 'Guide for government forms and official documents',
      category: 'guide',
      icon: '📖',
      keywords: ['500kb', 'government', 'official', 'documents']
    },
    {
      title: 'Remove EXIF from iPhone',
      url: '/guides/remove-exif-iphone',
      description: 'Complete guide to removing EXIF metadata',
      category: 'guide',
      icon: '📖',
      keywords: ['exif', 'iphone', 'privacy', 'metadata']
    },
    {
      title: 'PNG vs JPG Guide',
      url: '/guides/png-vs-jpg-when-to-use-each',
      description: 'Learn when to use PNG vs JPG formats',
      category: 'guide',
      icon: '📖',
      keywords: ['png', 'jpg', 'format', 'comparison']
    },
    {
      title: 'Resize for Instagram',
      url: '/guides/how-to-resize-images-for-instagram',
      description: 'Optimize images for Instagram posts and stories',
      category: 'guide',
      icon: '📖',
      keywords: ['instagram', 'resize', 'social', 'media']
    }
  ],

  'scenarios': [
    {
      title: 'Compression Scenarios',
      url: '/scenarios',
      description: 'Find optimal settings for different use cases',
      category: 'scenario',
      icon: '🎯',
      keywords: ['scenarios', 'presets', 'use cases', 'optimization'],
      isPopular: true
    },
    {
      title: 'Free Templates',
      url: '/templates',
      description: 'Download templates for social media and professional use',
      category: 'scenario',
      icon: '📋',
      keywords: ['templates', 'download', 'social media', 'professional']
    },
    {
      title: 'Embed Tools',
      url: '/embed',
      description: 'Embed PixCloak tools on your website',
      category: 'scenario',
      icon: '🔗',
      keywords: ['embed', 'website', 'integration', 'widget']
    }
  ],

  'research': [
    {
      title: 'Compression Benchmark',
      url: '/benchmark',
      description: 'Compare PixCloak with other compression tools',
      category: 'research',
      icon: '📊',
      keywords: ['benchmark', 'comparison', 'performance', 'quality'],
      isPopular: true
    },
    {
      title: 'Research & Documentation',
      url: '/research',
      description: 'Open source algorithms and technical documentation',
      category: 'research',
      icon: '🔬',
      keywords: ['research', 'documentation', 'algorithm', 'open source']
    },
    {
      title: 'Compression Algorithm',
      url: '/research/docs/compression-algorithm',
      description: 'Technical documentation of compression algorithms',
      category: 'research',
      icon: '⚙️',
      keywords: ['algorithm', 'technical', 'documentation', 'compression']
    },
    {
      title: 'Privacy Architecture',
      url: '/research/docs/privacy-architecture',
      description: 'Privacy-first architecture guide',
      category: 'research',
      icon: '🛡️',
      keywords: ['privacy', 'architecture', 'security', 'local processing']
    }
  ],

  'business': [
    {
      title: 'Case Studies',
      url: '/case-studies',
      description: 'Real business impact and ROI analysis',
      category: 'business',
      icon: '📈',
      keywords: ['case studies', 'business', 'roi', 'impact'],
      isPopular: true
    },
    {
      title: 'User Stories',
      url: '/testimonials',
      description: 'Verified stories from real users',
      category: 'business',
      icon: '👥',
      keywords: ['testimonials', 'users', 'stories', 'verified']
    },
    {
      title: 'About PixCloak',
      url: '/about',
      description: 'Learn about our privacy-first mission',
      category: 'business',
      icon: 'ℹ️',
      keywords: ['about', 'mission', 'privacy', 'company']
    }
  ]
};

// 获取智能导航项目
function getSmartNavigationItems(
  currentPage?: string,
  maxItemsPerCategory: number = 6
): Record<string, NavigationItem[]> {
  const result: Record<string, NavigationItem[]> = {};

  Object.entries(navigationDatabase).forEach(([category, items]) => {
    result[category] = items.slice(0, maxItemsPerCategory);
  });

  return result;
}

// 搜索导航项目
function searchNavigationItems(query: string): NavigationItem[] {
  const allItems = Object.values(navigationDatabase).flat();
  const lowercaseQuery = query.toLowerCase();

  return allItems.filter(item =>
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description?.toLowerCase().includes(lowercaseQuery) ||
    item.keywords?.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
  ).slice(0, 10);
}

export default function SmartNavigation({
  currentPage,
  showCategories = true,
  maxItemsPerCategory = 6,
  showSearch = true
}: SmartNavigationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NavigationItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigationItems = getSmartNavigationItems(currentPage, maxItemsPerCategory);

  // 处理搜索
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const results = searchNavigationItems(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // 获取类别图标
  function getCategoryIcon(category: string): string {
    const icons = {
      'tools': '🛠️',
      'guides': '📖',
      'scenarios': '🎯',
      'research': '🔬',
      'business': '📈'
    };
    return icons[category as keyof typeof icons] || '📁';
  }

  // 获取类别颜色
  function getCategoryColor(category: string): string {
    const colors = {
      'tools': '#3b82f6',
      'guides': '#10b981',
      'scenarios': '#f59e0b',
      'research': '#ef4444',
      'business': '#8b5cf6'
    };
    return colors[category as keyof typeof colors] || '#6b7280';
  }

  return (
    <div className="card">
      <h2>Explore PixCloak</h2>

      {showSearch && (
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search tools, guides, and resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          />

          {searchQuery && (
            <div style={{
              marginTop: 12,
              padding: 12,
              backgroundColor: '#f9fafb',
              borderRadius: 6,
              border: '1px solid #e5e7eb'
            }}>
              {isSearching ? (
                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#374151' }}>
                    Search Results ({searchResults.length})
                  </h4>
                  <div style={{ display: 'grid', gap: 8 }}>
                    {searchResults.map((item, index) => (
                      <Link
                        key={index}
                        href={item.url}
                        style={{
                          display: 'block',
                          padding: '8px 12px',
                          backgroundColor: '#f3f4f6',
                          borderRadius: '4px',
                          textDecoration: 'none',
                          color: 'inherit',
                          fontSize: '14px',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#e5e7eb';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: '16px' }}>{item.icon}</span>
                          <div>
                            <div style={{ fontWeight: '500' }}>{item.title}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280' }}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!searchQuery && showCategories && (
        <div style={{ display: 'grid', gap: 20 }}>
          {Object.entries(navigationItems).map(([category, items]) => (
            <div key={category}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{ fontSize: '20px' }}>
                  {getCategoryIcon(category)}
                </span>
                <h3 style={{
                  margin: 0,
                  fontSize: '18px',
                  color: getCategoryColor(category),
                  textTransform: 'capitalize'
                }}>
                  {category}
                </h3>
              </div>

              <div style={{ display: 'grid', gap: 8 }}>
                {items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
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
                      <span style={{
                        fontSize: '20px',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {item.icon}
                      </span>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <h4 style={{
                            margin: 0,
                            fontSize: '16px',
                            color: '#1f2937',
                            fontWeight: '600'
                          }}>
                            {item.title}
                          </h4>

                          {item.isPopular && (
                            <span style={{
                              padding: '2px 6px',
                              backgroundColor: '#10b981',
                              color: 'white',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: 'bold'
                            }}>
                              POPULAR
                            </span>
                          )}

                          {item.isNew && (
                            <span style={{
                              padding: '2px 6px',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              borderRadius: '4px',
                              fontSize: '10px',
                              fontWeight: 'bold'
                            }}>
                              NEW
                            </span>
                          )}
                        </div>

                        <p style={{
                          margin: 0,
                          fontSize: '14px',
                          color: '#6b7280',
                          lineHeight: '1.4'
                        }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: 20,
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
          💡 <strong>Tip:</strong> Use the search above to quickly find tools and guides for your specific needs.
        </p>
      </div>
    </div>
  );
}

// 导出导航数据库供其他组件使用
export { navigationDatabase, getSmartNavigationItems, searchNavigationItems };
