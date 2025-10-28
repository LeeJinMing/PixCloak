import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import AnswerCard from '@/components/AnswerCard';

// 长尾关键词数据
const LONG_TAIL_DATA = {
  // 文件大小类
  'compress-to-200kb-for-linkedin': {
    title: "Compress Images to 200KB for LinkedIn | PixCloak",
    description: "Compress images to exactly 200KB for LinkedIn profile pictures and posts. Free online tool with no uploads required.",
    h1: "How to Compress Images to 200KB for LinkedIn",
    intro: "Learn how to compress images to exactly 200KB for LinkedIn using our free online tool. Optimized for professional networking.",
    faqQuestion: "How to compress images to 200KB for LinkedIn?",
    faqAnswer: "Use our compression tool with target size set to 200KB. LinkedIn recommends this size for optimal loading and professional appearance.",
    steps: [
      "Open our compression tool with LinkedIn preset",
      "Upload your profile picture or post image",
      "Set target size to 200KB",
      "Choose WebP format for best compression",
      "Download and upload to LinkedIn"
    ],
    tips: [
      "Use WebP format for 25% smaller files than JPEG",
      "Resize to 400x400px for profile pictures",
      "Remove EXIF data to save additional space",
      "Test on mobile devices for best results"
    ],
    relatedTools: [
      { name: "LinkedIn Profile Compressor", url: "/compress?kb=200&size=400x400&format=webp", description: "Pre-configured for LinkedIn profile pictures" },
      { name: "Professional Photo Tool", url: "/tools/platform-checker", description: "Check LinkedIn requirements" }
    ],
    faqItems: [
      { question: "What's the best format for LinkedIn images?", answer: "WebP format provides the best compression for LinkedIn, followed by JPEG. PNG is only needed for images with transparency." },
      { question: "Why 200KB for LinkedIn?", answer: "200KB ensures fast loading on mobile devices and maintains professional quality for LinkedIn's network." },
      { question: "Can I compress multiple LinkedIn images at once?", answer: "Yes, use our batch processing feature to compress multiple images to 200KB simultaneously." }
    ]
  },

  'compress-to-500kb-for-instagram': {
    title: "Compress Images to 500KB for Instagram | PixCloak",
    description: "Compress images to exactly 500KB for Instagram posts and stories. Free online tool optimized for social media.",
    h1: "How to Compress Images to 500KB for Instagram",
    intro: "Learn how to compress images to exactly 500KB for Instagram using our free online tool. Perfect for posts and stories.",
    faqQuestion: "How to compress images to 500KB for Instagram?",
    faqAnswer: "Use our compression tool with target size set to 500KB. Instagram recommends this size for optimal quality and loading speed.",
    steps: [
      "Open our compression tool with Instagram preset",
      "Upload your post or story image",
      "Set target size to 500KB",
      "Choose WebP format for best compression",
      "Download and upload to Instagram"
    ],
    tips: [
      "Use WebP format for 30% smaller files than JPEG",
      "Resize to 1080x1080px for square posts",
      "Remove EXIF data to save additional space",
      "Test on mobile devices for best results"
    ],
    relatedTools: [
      { name: "Instagram Post Compressor", url: "/compress?kb=500&size=1080x1080&format=webp", description: "Pre-configured for Instagram posts" },
      { name: "Social Media Optimizer", url: "/tools/platform-checker", description: "Check Instagram requirements" }
    ],
    faqItems: [
      { question: "What's the best format for Instagram images?", answer: "WebP format provides the best compression for Instagram, followed by JPEG. Instagram supports both formats." },
      { question: "Why 500KB for Instagram?", answer: "500KB ensures high quality while maintaining fast loading on mobile devices, which is crucial for Instagram's mobile-first platform." },
      { question: "Can I compress Instagram stories to 500KB?", answer: "Yes, our tool works for both Instagram posts and stories. Stories can be compressed to 500KB for optimal quality." }
    ]
  },

  'resize-to-1080x1080-for-instagram': {
    title: "Resize Images to 1080x1080 for Instagram | PixCloak",
    description: "Resize images to exactly 1080x1080 pixels for Instagram posts. Free online tool with aspect ratio preservation.",
    h1: "How to Resize Images to 1080x1080 for Instagram",
    intro: "Learn how to resize images to exactly 1080x1080 pixels for Instagram using our free online tool. Perfect square format for posts.",
    faqQuestion: "How to resize images to 1080x1080 for Instagram?",
    faqAnswer: "Use our resize tool with dimensions set to 1080x1080. Instagram's square format ensures consistent display across all devices.",
    steps: [
      "Open our resize tool with Instagram preset",
      "Upload your image",
      "Set dimensions to 1080x1080",
      "Choose output format (WebP recommended)",
      "Download and upload to Instagram"
    ],
    tips: [
      "Use WebP format for smaller file sizes",
      "Maintain aspect ratio for best results",
      "Consider cropping for exact square format",
      "Test on mobile devices"
    ],
    relatedTools: [
      { name: "Instagram Square Resizer", url: "/compress?size=1080x1080&format=webp", description: "Pre-configured for Instagram square posts" },
      { name: "Aspect Ratio Tool", url: "/tools/aspect-pad", description: "Add padding to maintain aspect ratios" }
    ],
    faqItems: [
      { question: "Why 1080x1080 for Instagram?", answer: "1080x1080 is Instagram's standard square format, ensuring optimal display across all devices and maintaining image quality." },
      { question: "How do I maintain aspect ratio when resizing to 1080x1080?", answer: "Our tool automatically maintains aspect ratio. If your image isn't square, you can choose to crop or add padding." },
      { question: "What format should I use for 1080x1080 Instagram images?", answer: "WebP is recommended for best compression, JPEG for compatibility, and PNG for images with transparency." }
    ]
  },

  'compress-to-100kb-for-email': {
    title: "Compress Images to 100KB for Email | PixCloak",
    description: "Compress images to exactly 100KB for email attachments and signatures. Free online tool optimized for email delivery.",
    h1: "How to Compress Images to 100KB for Email",
    intro: "Learn how to compress images to exactly 100KB for email using our free online tool. Ensures fast delivery and compatibility.",
    faqQuestion: "How to compress images to 100KB for email?",
    faqAnswer: "Use our compression tool with target size set to 100KB. This size ensures fast email delivery while maintaining acceptable quality.",
    steps: [
      "Open our compression tool with email preset",
      "Upload your image",
      "Set target size to 100KB",
      "Choose JPEG format for compatibility",
      "Download and attach to email"
    ],
    tips: [
      "Use JPEG format for maximum compatibility",
      "Resize to appropriate dimensions first",
      "Remove EXIF data to save space",
      "Test email delivery speed"
    ],
    relatedTools: [
      { name: "Email Attachment Compressor", url: "/compress?kb=100&format=jpg", description: "Pre-configured for email attachments" },
      { name: "Email Signature Tool", url: "/tools/text-placeholder", description: "Create email signature images" }
    ],
    faqItems: [
      { question: "Why 100KB for email images?", answer: "100KB ensures fast email delivery while maintaining acceptable image quality. Larger files can cause delivery delays." },
      { question: "What format is best for email images?", answer: "JPEG is the most compatible format for email attachments, supported by all email clients." },
      { question: "Can I compress multiple images for email?", answer: "Yes, use our batch processing feature to compress multiple images to 100KB for email attachments." }
    ]
  }
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(LONG_TAIL_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = LONG_TAIL_DATA[slug as keyof typeof LONG_TAIL_DATA];

  if (!data) {
    return {
      title: "Page Not Found | PixCloak",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `/guides/long-tail/${slug}`,
      languages: { "x-default": `/guides/long-tail/${slug}` }
    },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `/guides/long-tail/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
    },
  };
}

export default async function LongTailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = LONG_TAIL_DATA[slug as keyof typeof LONG_TAIL_DATA];

  if (!data) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides/complete-image-compression-guide' },
        { name: 'Long Tail Guides', url: '/guides/long-tail' },
        { name: data.title.split(' | ')[0], url: `/guides/long-tail/${slug}` }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        {/* Featured Snippet Answer Card */}
        <AnswerCard
          question={data.faqQuestion}
          answer={data.faqAnswer}
          steps={data.steps}
          tips={data.tips}
          relatedTools={data.relatedTools}
        />

        <div className="card">
          <h1>{data.h1}</h1>
          <p className="text-muted">
            {data.intro}
          </p>
        </div>

        <div className="card">
          <h2>Step-by-Step Guide</h2>
          <ol>
            {data.steps.map((step, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
            ))}
          </ol>
        </div>

        <div className="card">
          <h2>Pro Tips</h2>
          <ul>
            {data.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {data.relatedTools.map((tool, index) => (
              <a
                key={index}
                href={tool.url}
                style={{
                  display: 'block',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#374151',
                  border: '1px solid #e5e7eb'
                }}
              >
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{tool.name}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>{tool.description}</p>
              </a>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Why This Matters</h2>
          <p>
            Optimizing images for specific platforms and use cases ensures:
          </p>
          <ul>
            <li><strong>Fast Loading:</strong> Smaller file sizes load faster on all devices</li>
            <li><strong>Better Quality:</strong> Proper compression maintains visual quality</li>
            <li><strong>Platform Compliance:</strong> Meets specific platform requirements</li>
            <li><strong>User Experience:</strong> Improves overall browsing experience</li>
          </ul>
        </div>

        <div className="card">
          <h2>Best Practices</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ padding: '12px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#1e40af' }}>Format Selection</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                Choose the right format: WebP for best compression, JPEG for compatibility, PNG for transparency.
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#065f46' }}>Size Optimization</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                Target specific file sizes based on platform requirements and use case needs.
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#92400e' }}>Quality Balance</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>
                Find the perfect balance between file size and visual quality for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FaqJsonLd items={data.faqItems} />
    </>
  );
}
