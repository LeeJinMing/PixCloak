import type { Metadata } from "next";
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Image Size Requirements by Platform & Use Case | PixCloak",
  description: "Find exact image size requirements for LinkedIn, Instagram, job applications, government forms, and social media. Get instant presets and download optimized images.",
  alternates: { canonical: "/scenarios", languages: { "x-default": "/scenarios" } },
};

const scenarios = [
  {
    category: "Professional & Job Applications",
    items: [
      {
        name: "LinkedIn Profile Picture",
        size: "400x400px",
        kb: "200KB",
        format: "JPG/PNG",
        description: "Professional headshot for LinkedIn profiles",
        preset: "/compress?kb=200&size=400&format=jpg",
        useCase: "LinkedIn profile, professional networking"
      },
      {
        name: "Resume Photo",
        size: "300x300px",
        kb: "150KB",
        format: "JPG",
        description: "Professional photo for resume/CV",
        preset: "/compress?kb=150&size=300&format=jpg",
        useCase: "Job applications, CV, professional documents"
      },
      {
        name: "Government ID Photo",
        size: "600x600px",
        kb: "500KB",
        format: "JPG",
        description: "Official ID photo for government forms",
        preset: "/compress?kb=500&size=600&format=jpg",
        useCase: "Passport, driver's license, government forms"
      }
    ]
  },
  {
    category: "Social Media & Content",
    items: [
      {
        name: "Instagram Feed Post",
        size: "1080x1080px",
        kb: "500KB",
        format: "JPG/WebP",
        description: "Square posts for Instagram feed",
        preset: "/compress?kb=500&size=1080&format=webp",
        useCase: "Instagram posts, social media content"
      },
      {
        name: "Instagram Story",
        size: "1080x1920px",
        kb: "800KB",
        format: "JPG/WebP",
        description: "Vertical stories for Instagram",
        preset: "/compress?kb=800&size=1080x1920&format=webp",
        useCase: "Instagram stories, vertical content"
      },
      {
        name: "Facebook Post",
        size: "1200x630px",
        kb: "500KB",
        format: "JPG/WebP",
        description: "Facebook timeline posts",
        preset: "/compress?kb=500&size=1200x630&format=webp",
        useCase: "Facebook posts, social sharing"
      },
      {
        name: "Twitter/X Post",
        size: "1200x675px",
        kb: "400KB",
        format: "JPG/WebP",
        description: "Twitter/X timeline posts",
        preset: "/compress?kb=400&size=1200x675&format=webp",
        useCase: "Twitter posts, microblogging"
      }
    ]
  },
  {
    category: "Web & Email",
    items: [
      {
        name: "Website Hero Image",
        size: "1920x1080px",
        kb: "800KB",
        format: "WebP/JPG",
        description: "Large banner images for websites",
        preset: "/compress?kb=800&size=1920x1080&format=webp",
        useCase: "Website banners, hero sections"
      },
      {
        name: "Email Attachment",
        size: "800x600px",
        kb: "200KB",
        format: "JPG",
        description: "Images for email attachments",
        preset: "/compress?kb=200&size=800x600&format=jpg",
        useCase: "Email attachments, newsletters"
      },
      {
        name: "Blog Post Image",
        size: "1200x800px",
        kb: "300KB",
        format: "WebP/JPG",
        description: "Featured images for blog posts",
        preset: "/compress?kb=300&size=1200x800&format=webp",
        useCase: "Blog posts, articles, content marketing"
      }
    ]
  },
  {
    category: "E-commerce & Business",
    items: [
      {
        name: "Product Photo",
        size: "1000x1000px",
        kb: "400KB",
        format: "JPG/WebP",
        description: "Product images for e-commerce",
        preset: "/compress?kb=400&size=1000x1000&format=webp",
        useCase: "E-commerce, product catalogs"
      },
      {
        name: "Thumbnail Image",
        size: "300x300px",
        kb: "100KB",
        format: "JPG/WebP",
        description: "Small thumbnails for galleries",
        preset: "/compress?kb=100&size=300x300&format=webp",
        useCase: "Image galleries, thumbnails"
      },
      {
        name: "Business Card Logo",
        size: "500x300px",
        kb: "150KB",
        format: "PNG/JPG",
        description: "Logos for business cards",
        preset: "/compress?kb=150&size=500x300&format=png",
        useCase: "Business cards, branding materials"
      }
    ]
  }
];

export default function ScenariosPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Image Size Requirements by Platform', url: '/scenarios' }
      ]} />

      <SoftwareAppJsonLd
        name="Image Size Requirements by Platform"
        url="/scenarios"
        description="Find exact image size requirements for LinkedIn, Instagram, job applications, government forms, and social media platforms."
      />

      <div className="container" style={{ display: 'grid', gap: 16 }}>
        <div className="card">
          <h1>Image Size Requirements by Platform & Use Case</h1>
          <p className="text-muted">
            Find the exact image size requirements for any platform or use case.
            Click any preset to instantly open our compressor with the perfect settings.
          </p>
        </div>

        {scenarios.map((category, categoryIndex) => (
          <div key={categoryIndex} className="card">
            <h2>{category.category}</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} style={{
                  padding: '16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '12px',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                      {item.name}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px', fontSize: '14px', color: '#666' }}>
                      <div><strong>Size:</strong> {item.size}</div>
                      <div><strong>Max Size:</strong> {item.kb}</div>
                      <div><strong>Format:</strong> {item.format}</div>
                    </div>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                      {item.description}
                    </p>
                    <div style={{ marginTop: '8px', fontSize: '13px', color: '#888' }}>
                      <strong>Use case:</strong> {item.useCase}
                    </div>
                  </div>
                  <div>
                    <a
                      href={item.preset}
                      className="pill"
                      style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      Use Preset
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="card">
          <h2>Quick Reference Table</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Platform/Use Case</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Dimensions</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Max Size</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Format</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Preset</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.flatMap(category =>
                  category.items.map((item, index) => (
                    <tr key={`${category.category}-${index}`}>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                        <strong>{item.name}</strong>
                        <br />
                        <small style={{ color: '#666' }}>{item.useCase}</small>
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.size}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.kb}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.format}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                        <a href={item.preset} style={{ color: '#3b82f6', textDecoration: 'none' }}>
                          Open Tool →
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2>How to Use These Presets</h2>
          <ol style={{ lineHeight: '1.8' }}>
            <li><strong>Choose your use case</strong> from the categories above</li>
            <li><strong>Click "Use Preset"</strong> to open our compressor with perfect settings</li>
            <li><strong>Upload your image</strong> - the tool will automatically apply the right size and quality</li>
            <li><strong>Download</strong> your optimized image ready for your platform</li>
          </ol>
          <p style={{ background: '#f0f9ff', padding: '12px', borderRadius: '6px', marginTop: '16px' }}>
            <strong>💡 Pro Tip:</strong> All processing happens locally in your browser.
            Your images never leave your device, ensuring complete privacy.
          </p>
        </div>
      </div>

      <FaqJsonLd items={[
        { question: "What image size should I use for LinkedIn profile pictures?", answer: "LinkedIn profile pictures should be 400x400px with a maximum file size of 200KB. Use JPG or PNG format for best compatibility." },
        { question: "What are the Instagram image size requirements?", answer: "Instagram feed posts: 1080x1080px (square) or 1080x1350px (portrait), max 500KB. Instagram stories: 1080x1920px, max 800KB. Use JPG or WebP format." },
        { question: "How big should images be for email attachments?", answer: "Email attachments should be under 200KB and sized around 800x600px. Use JPG format for smaller file sizes and better email client compatibility." },
        { question: "What image size is best for website hero images?", answer: "Website hero images work best at 1920x1080px with a file size under 800KB. Use WebP format for modern browsers or JPG as fallback." },
        { question: "What are the requirements for government ID photos?", answer: "Government ID photos typically need to be 600x600px with a maximum file size of 500KB. Use JPG format and ensure good lighting and neutral background." },
        { question: "How do I optimize images for e-commerce product photos?", answer: "E-commerce product photos should be 1000x1000px with a file size under 400KB. Use WebP for modern browsers or JPG for maximum compatibility." }
      ]} />
    </>
  );
}
