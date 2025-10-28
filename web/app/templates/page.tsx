import type { Metadata } from "next";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Free Image Size Templates & Platform Guidelines | PixCloak",
  description: "Download free image size templates for social media, job applications, and web platforms. Get instant presets, cheat sheets, and design guidelines.",
  alternates: { canonical: "/templates", languages: { "x-default": "/templates" } },
};

const templateCategories = [
  {
    name: "Social Media Templates",
    description: "Ready-to-use templates for all major social platforms",
    items: [
      {
        name: "Instagram Complete Pack",
        description: "All Instagram formats: feed, stories, reels, IGTV",
        downloads: [
          { name: "Instagram Templates (PSD)", size: "2.1MB", format: "PSD" },
          { name: "Instagram Guidelines (PDF)", size: "0.8MB", format: "PDF" },
          { name: "Instagram Presets (JSON)", size: "0.1MB", format: "JSON" }
        ],
        preview: "/templates/preview/instagram-pack.jpg"
      },
      {
        name: "Facebook Business Pack",
        description: "Facebook pages, ads, and business templates",
        downloads: [
          { name: "Facebook Templates (AI)", size: "3.2MB", format: "AI" },
          { name: "Facebook Guidelines (PDF)", size: "1.1MB", format: "PDF" },
          { name: "Facebook Presets (JSON)", size: "0.1MB", format: "JSON" }
        ],
        preview: "/templates/preview/facebook-pack.jpg"
      },
      {
        name: "LinkedIn Professional Pack",
        description: "LinkedIn profiles, posts, and company pages",
        downloads: [
          { name: "LinkedIn Templates (PSD)", size: "1.8MB", format: "PSD" },
          { name: "LinkedIn Guidelines (PDF)", size: "0.9MB", format: "PDF" },
          { name: "LinkedIn Presets (JSON)", size: "0.1MB", format: "JSON" }
        ],
        preview: "/templates/preview/linkedin-pack.jpg"
      }
    ]
  },
  {
    name: "Professional Templates",
    description: "Templates for job applications and business use",
    items: [
      {
        name: "Resume & CV Templates",
        description: "Professional photo templates for resumes and CVs",
        downloads: [
          { name: "Resume Templates (PSD)", size: "1.5MB", format: "PSD" },
          { name: "CV Guidelines (PDF)", size: "0.7MB", format: "PDF" },
          { name: "Professional Presets (JSON)", size: "0.1MB", format: "JSON" }
        ],
        preview: "/templates/preview/resume-pack.jpg"
      },
      {
        name: "Government Forms Pack",
        description: "Templates for official documents and forms",
        downloads: [
          { name: "Government Templates (PDF)", size: "2.3MB", format: "PDF" },
          { name: "ID Photo Guidelines (PDF)", size: "0.6MB", format: "PDF" },
          { name: "Official Presets (JSON)", size: "0.1MB", format: "JSON" }
        ],
        preview: "/templates/preview/government-pack.jpg"
      }
    ]
  },
  {
    name: "Web & Email Templates",
    description: "Templates for websites and email marketing",
    items: [
      {
        name: "Website Hero Images",
        description: "Banner and hero image templates for websites",
        downloads: [
          { name: "Hero Templates (PSD)", size: "4.1MB", format: "PSD" },
          { name: "Web Guidelines (PDF)", size: "1.2MB", format: "PDF" },
          { name: "Web Presets (JSON)", size: "0.1MB", format: "JSON" }
        ],
        preview: "/templates/preview/hero-pack.jpg"
      },
      {
        name: "Email Marketing Pack",
        description: "Templates for newsletters and email campaigns",
        downloads: [
          { name: "Email Templates (PSD)", size: "2.8MB", format: "PSD" },
          { name: "Email Guidelines (PDF)", size: "0.9MB", format: "PDF" },
          { name: "Email Presets (JSON)", size: "0.1MB", format: "JSON" }
        ],
        preview: "/templates/preview/email-pack.jpg"
      }
    ]
  }
];

const quickReference = [
  { platform: "Instagram Feed", size: "1080x1080", maxSize: "500KB", format: "JPG/WebP" },
  { platform: "Instagram Story", size: "1080x1920", maxSize: "800KB", format: "JPG/WebP" },
  { platform: "Instagram Reels", size: "1080x1920", maxSize: "800KB", format: "JPG/WebP" },
  { platform: "Facebook Post", size: "1200x630", maxSize: "500KB", format: "JPG/WebP" },
  { platform: "Facebook Cover", size: "1200x630", maxSize: "500KB", format: "JPG/WebP" },
  { platform: "LinkedIn Profile", size: "400x400", maxSize: "200KB", format: "JPG/PNG" },
  { platform: "LinkedIn Post", size: "1200x627", maxSize: "500KB", format: "JPG/WebP" },
  { platform: "Twitter Post", size: "1200x675", maxSize: "400KB", format: "JPG/WebP" },
  { platform: "YouTube Thumbnail", size: "1280x720", maxSize: "2MB", format: "JPG/PNG" },
  { platform: "Pinterest Pin", size: "1000x1500", maxSize: "1MB", format: "JPG/PNG" },
  { platform: "Resume Photo", size: "300x300", maxSize: "150KB", format: "JPG" },
  { platform: "Government ID", size: "600x600", maxSize: "500KB", format: "JPG" }
];

export default function TemplatesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Free Image Templates', url: '/templates' }
      ]} />

      <SoftwareAppJsonLd
        name="Free Image Size Templates"
        url="/templates"
        description="Download free image size templates for social media, job applications, and web platforms with instant presets and guidelines."
      />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>Free Image Size Templates & Platform Guidelines</h1>
          <p className="text-muted">
            Download ready-to-use templates, guidelines, and presets for all major platforms.
            Perfect for designers, marketers, and anyone creating visual content.
          </p>
        </div>

        {/* Quick Reference */}
        <div className="card">
          <h2>Quick Reference - Platform Requirements</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Platform</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Dimensions</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Max Size</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Format</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {quickReference.map((item, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee', fontWeight: '500' }}>
                      {item.platform}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.size}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.maxSize}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.format}</td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                      <a
                        href={`/compress?size=${item.size.split('x')[0]}x${item.size.split('x')[1]}&kb=${item.maxSize.replace('KB', '').replace('MB', '000')}&format=${item.format.toLowerCase().split('/')[0]}`}
                        style={{ color: '#3b82f6', textDecoration: 'none', fontSize: '13px' }}
                      >
                        Use Preset →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Template Categories */}
        {templateCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="card">
            <h2>{category.name}</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{category.description}</p>

            <div style={{ display: 'grid', gap: '20px' }}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#fafafa'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'start' }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                        {item.name}
                      </h3>
                      <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '14px' }}>
                        {item.description}
                      </p>

                      <div style={{ display: 'grid', gap: '8px' }}>
                        {item.downloads.map((download, downloadIndex) => (
                          <div key={downloadIndex} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            border: '1px solid #e5e7eb'
                          }}>
                            <div>
                              <span style={{ fontWeight: '500', fontSize: '14px' }}>{download.name}</span>
                              <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                                {download.size} • {download.format}
                              </span>
                            </div>
                            <a
                              href={`/templates/download/${item.name.toLowerCase().replace(/\s+/g, '-')}-${download.format.toLowerCase()}`}
                              style={{
                                padding: '4px 8px',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '4px',
                                fontSize: '12px'
                              }}
                            >
                              Download
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      width: '120px',
                      height: '80px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '6px',
                      border: '2px dashed #d1d5db',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      Preview
                    </div>
                  </div>
                </div>
        ))}
      </div>
    </div>
        ))}

        {/* Bulk Download */}
        <div className="card">
          <h2>Bulk Download Options</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <a
              href="/templates/download/all-templates.zip"
              style={{
                padding: '20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              📦 All Templates (ZIP)
              <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>
                15.2MB • Complete Pack
              </div>
            </a>

            <a
              href="/templates/download/guidelines-only.pdf"
              style={{
                padding: '20px',
                backgroundColor: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              📋 Guidelines Only (PDF)
              <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>
                4.1MB • All Platforms
              </div>
            </a>

            <a
              href="/templates/download/presets-only.json"
              style={{
                padding: '20px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '500'
              }}
            >
              ⚙️ Presets Only (JSON)
              <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>
                0.5MB • All Settings
              </div>
            </a>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="card">
          <h2>How to Use These Templates</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <h3>For Designers</h3>
              <ol style={{ marginLeft: '20px', lineHeight: '1.6', fontSize: '14px' }}>
                <li>Download the template pack for your target platform</li>
                <li>Open the PSD/AI files in your design software</li>
                <li>Replace placeholder content with your actual content</li>
                <li>Export using the provided guidelines</li>
                <li>Use our compressor to optimize file size</li>
              </ol>
            </div>

            <div>
              <h3>For Marketers</h3>
              <ol style={{ marginLeft: '20px', lineHeight: '1.6', fontSize: '14px' }}>
                <li>Download the guidelines PDF for reference</li>
                <li>Use the JSON presets with our compression tool</li>
                <li>Batch process multiple images with consistent settings</li>
                <li>Download optimized images ready for upload</li>
              </ol>
            </div>

            <div>
              <h3>For Developers</h3>
              <ol style={{ marginLeft: '20px', lineHeight: '1.6', fontSize: '14px' }}>
                <li>Download the JSON presets for programmatic use</li>
                <li>Integrate with our API or embed our tools</li>
                <li>Use the guidelines for responsive image implementation</li>
                <li>Implement automated image optimization workflows</li>
              </ol>
            </div>
          </div>
        </div>

        {/* License & Usage */}
        <div className="card">
          <h2>License & Usage Rights</h2>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <p>
              <strong>Free for Commercial Use:</strong> All templates and guidelines are provided free of charge
              for personal and commercial projects. No attribution required, but appreciated.
            </p>
            <p>
              <strong>Redistribution:</strong> You may share these templates with your team, clients, or community.
              Please link back to PixCloak when sharing publicly.
            </p>
            <p>
              <strong>Modification:</strong> Feel free to modify templates to fit your specific needs.
              We encourage customization and improvement.
            </p>
            <p>
              <strong>Support:</strong> For questions about template usage or platform requirements,
              please refer to our <a href="/guides" style={{ color: '#3b82f6' }}>comprehensive guides</a>.
            </p>
          </div>
        </div>
      </div>

      <FaqJsonLd items={[
        { question: "Are these templates really free for commercial use?", answer: "Yes, all templates and guidelines are completely free for both personal and commercial use. No attribution is required, though we appreciate it when you share our tools." },
        { question: "What file formats are available for the templates?", answer: "We provide templates in PSD, AI, PDF, and JSON formats. PSD files are for Photoshop, AI files for Illustrator, PDFs for guidelines, and JSON for programmatic use." },
        { question: "How often are the templates updated?", answer: "Templates are updated quarterly or when major platform changes occur. We monitor platform updates and adjust templates accordingly to ensure compliance." },
        { question: "Can I modify the templates for my specific needs?", answer: "Absolutely! All templates are provided with modification rights. Feel free to customize colors, layouts, and content to match your brand or project requirements." },
        { question: "Do you have templates for platforms not listed here?", answer: "We focus on the most popular platforms, but we're always adding new ones. If you need templates for a specific platform, please contact us and we'll consider adding it." },
        { question: "How do I use the JSON presets with your compression tool?", answer: "The JSON presets contain all the settings needed for our compression tool. You can import them directly or use the preset links to automatically configure the tool with the right settings." }
      ]} />
    </>
  );
}