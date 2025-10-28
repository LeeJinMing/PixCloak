import type { Metadata } from "next";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "PixCloak Changelog & Updates | Latest Features & Improvements",
  description: "Track all PixCloak updates, new features, and improvements. Subscribe to our RSS feed for instant notifications of new tools and enhancements.",
  alternates: {
    canonical: "/changelog",
    languages: { "x-default": "/changelog" },
    types: {
      'application/rss+xml': '/api/changelog'
    }
  },
};

interface ChangeItem {
  url: string;
  title: string;
  type: 'new' | 'updated' | 'content';
  timestamp: string;
}

interface ChangelogData {
  metadata: {
    generatedAt: string;
    totalChanges: number;
    version: string;
  };
  changes: Array<{
    date: string;
    count: number;
    changes: ChangeItem[];
  }>;
}

// 模拟变更数据（实际应用中会从API获取）
const mockChangelogData: ChangelogData = {
  metadata: {
    generatedAt: new Date().toISOString(),
    totalChanges: 12,
    version: '1.0.0'
  },
  changes: [
    {
      date: '2024-01-15',
      count: 4,
      changes: [
        {
          url: '/scenarios',
          title: 'Image Size Requirements by Platform',
          type: 'new',
          timestamp: '2024-01-15T10:00:00Z'
        },
        {
          url: '/embed',
          title: 'Embeddable Widget System',
          type: 'new',
          timestamp: '2024-01-15T09:30:00Z'
        },
        {
          url: '/benchmark',
          title: 'Compression Quality Benchmark',
          type: 'new',
          timestamp: '2024-01-15T09:00:00Z'
        },
        {
          url: '/templates',
          title: 'Free Template Downloads',
          type: 'new',
          timestamp: '2024-01-15T08:30:00Z'
        }
      ]
    },
    {
      date: '2024-01-14',
      count: 3,
      changes: [
        {
          url: '/compress',
          title: 'Enhanced Compression Tool',
          type: 'updated',
          timestamp: '2024-01-14T15:00:00Z'
        },
        {
          url: '/guides/compress-to-200kb',
          title: 'Compress to 200KB Guide',
          type: 'content',
          timestamp: '2024-01-14T14:30:00Z'
        },
        {
          url: '/guides/remove-exif-iphone',
          title: 'Remove EXIF from iPhone Photos',
          type: 'content',
          timestamp: '2024-01-14T14:00:00Z'
        }
      ]
    },
    {
      date: '2024-01-13',
      count: 2,
      changes: [
        {
          url: '/tools/exif-checker',
          title: 'EXIF Metadata Checker Tool',
          type: 'new',
          timestamp: '2024-01-13T16:00:00Z'
        },
        {
          url: '/tools/platform-checker',
          title: 'Platform Compliance Checker',
          type: 'new',
          timestamp: '2024-01-13T15:30:00Z'
        }
      ]
    },
    {
      date: '2024-01-12',
      count: 3,
      changes: [
        {
          url: '/redact',
          title: 'Privacy Redaction Tool',
          type: 'updated',
          timestamp: '2024-01-12T11:00:00Z'
        },
        {
          url: '/guides/privacy-compliance',
          title: 'Privacy Compliance Guide',
          type: 'content',
          timestamp: '2024-01-12T10:30:00Z'
        },
        {
          url: '/guides/platform-image-limits-zh',
          title: 'Platform Image Limits (Chinese)',
          type: 'content',
          timestamp: '2024-01-12T10:00:00Z'
        }
      ]
    }
  ]
};

export default function ChangelogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Changelog', url: '/changelog' }
      ]} />

      <SoftwareAppJsonLd
        name="PixCloak Changelog"
        url="/changelog"
        description="Track all PixCloak updates, new features, and improvements with detailed changelog and RSS feed."
      />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>PixCloak Changelog & Updates</h1>
          <p className="text-muted">
            Stay updated with the latest PixCloak features, improvements, and new tools.
            Subscribe to our RSS feed for instant notifications.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <a
              href="/api/changelog"
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📡 RSS Feed
            </a>
            <a
              href="/api/changelog?format=json"
              style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📊 JSON API
            </a>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="card">
          <h2>Update Statistics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#1e40af' }}>
                {mockChangelogData.metadata.totalChanges}
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>Total Updates</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#065f46' }}>
                {mockChangelogData.changes.reduce((sum, day) => sum + day.changes.filter(c => c.type === 'new').length, 0)}
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>New Features</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#92400e' }}>
                {mockChangelogData.changes.reduce((sum, day) => sum + day.changes.filter(c => c.type === 'updated').length, 0)}
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>Improvements</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f3e8ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: '600', color: '#7c3aed' }}>
                {mockChangelogData.changes.reduce((sum, day) => sum + day.changes.filter(c => c.type === 'content').length, 0)}
              </div>
              <div style={{ fontSize: '14px', color: '#374151' }}>Content Updates</div>
            </div>
          </div>
        </div>

        {/* 变更日志 */}
        {mockChangelogData.changes.map((dayChange, index) => (
          <div key={index} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: '20px' }}>
                {new Date(dayChange.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                {dayChange.count} updates
              </span>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {dayChange.changes.map((change, changeIndex) => (
                <div key={changeIndex} style={{
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>
                        <a
                          href={change.url}
                          style={{ color: '#1f2937', textDecoration: 'none' }}
                        >
                          {change.title}
                        </a>
                      </h3>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}>
                        {change.url}
                      </div>
                    </div>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: {
                        'new': '#d1fae5',
                        'updated': '#dbeafe',
                        'content': '#fef3c7'
                      }[change.type],
                      color: {
                        'new': '#065f46',
                        'updated': '#1e40af',
                        'content': '#92400e'
                      }[change.type],
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500',
                      textTransform: 'uppercase'
                    }}>
                      {change.type}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {new Date(change.timestamp).toLocaleString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* RSS订阅说明 */}
        <div className="card">
          <h2>How to Subscribe</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <h3>RSS Feed</h3>
              <p style={{ fontSize: '14px', marginBottom: 8 }}>
                Subscribe to our RSS feed to get instant notifications of all updates:
              </p>
              <code style={{
                display: 'block',
                padding: '12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                fontSize: '14px',
                wordBreak: 'break-all'
              }}>
                https://pixcloak.com/api/changelog
              </code>
            </div>

            <div>
              <h3>Popular RSS Readers</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <strong>Feedly</strong>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    Web-based RSS reader with mobile apps
                  </div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <strong>Inoreader</strong>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    Advanced RSS reader with social features
                  </div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <strong>NewsBlur</strong>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    Personal news reader with machine learning
                  </div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                  <strong>RSS Guard</strong>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    Desktop RSS reader for Windows/Linux/Mac
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3>API Access</h3>
              <p style={{ fontSize: '14px', marginBottom: 8 }}>
                Access changelog data programmatically via our JSON API:
              </p>
              <code style={{
                display: 'block',
                padding: '12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                fontSize: '14px',
                wordBreak: 'break-all'
              }}>
                https://pixcloak.com/api/changelog?format=json
              </code>
            </div>
          </div>
        </div>

        {/* 更新频率说明 */}
        <div className="card">
          <h2>Update Schedule</h2>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <p>
              <strong>Weekly Updates:</strong> New features, tools, and major improvements are typically released every Tuesday.
            </p>
            <p>
              <strong>Content Updates:</strong> Guides, tutorials, and documentation are updated as needed throughout the week.
            </p>
            <p>
              <strong>Bug Fixes:</strong> Critical fixes are deployed immediately, while minor fixes are batched with weekly updates.
            </p>
            <p>
              <strong>RSS Feed:</strong> Updated within 5 minutes of any change being deployed to production.
            </p>
          </div>
        </div>
      </div>

      <FaqJsonLd items={[
        { question: "How often is the PixCloak changelog updated?", answer: "The changelog is updated weekly with new features and improvements, plus immediate updates for critical fixes. The RSS feed is updated within 5 minutes of any change." },
        { question: "Can I subscribe to specific types of updates?", answer: "Currently, the RSS feed includes all updates. You can filter by type (new, updated, content) using RSS reader filters or the JSON API." },
        { question: "Is there an API to access changelog data?", answer: "Yes, you can access changelog data via our JSON API at /api/changelog?format=json for programmatic access and integration." },
        { question: "How do I add the RSS feed to my reader?", answer: "Copy the RSS feed URL (https://pixcloak.com/api/changelog) and paste it into your RSS reader's 'Add Feed' or 'Subscribe' function." },
        { question: "What types of updates are tracked?", answer: "We track new features, tool updates, content improvements, bug fixes, and performance enhancements. Each update is categorized and timestamped." },
        { question: "Can I get email notifications instead of RSS?", answer: "Currently, we only provide RSS feed notifications. You can use RSS-to-email services like Blogtrottr or IFTTT to convert RSS updates to email notifications." }
      ]} />
    </>
  );
}
