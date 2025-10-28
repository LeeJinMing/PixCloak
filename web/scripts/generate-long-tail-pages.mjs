#!/usr/bin/env node
/**
 * 生成式长尾工厂 - 批量生成任务+限制值页面
 *
 * 功能：
 * - 基于模板生成大量长尾关键词页面
 * - 自动优化SEO元数据
 * - 生成结构化数据和FAQ
 * - 支持多语言版本
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 长尾关键词模板
const LONG_TAIL_TEMPLATES = {
  // 文件大小限制类
  fileSize: {
    sizes: [
      50, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 1200,
      1500, 2000,
    ],
    formats: ["KB", "MB"],
    contexts: [
      "for email",
      "for website",
      "for social media",
      "for resume",
      "for LinkedIn",
      "for Instagram",
      "for Facebook",
      "for Twitter",
      "for job application",
      "for government form",
      "for passport photo",
      "for ID photo",
      "for profile picture",
      "for avatar",
      "for thumbnail",
      "for blog post",
      "for newsletter",
      "for presentation",
      "for document",
      "for attachment",
    ],
  },

  // 尺寸限制类
  dimensions: {
    sizes: [
      { width: 400, height: 400, name: "400x400" },
      { width: 500, height: 500, name: "500x500" },
      { width: 600, height: 600, name: "600x600" },
      { width: 800, height: 600, name: "800x600" },
      { width: 1000, height: 1000, name: "1000x1000" },
      { width: 1200, height: 630, name: "1200x630" },
      { width: 1200, height: 675, name: "1200x675" },
      { width: 1080, height: 1080, name: "1080x1080" },
      { width: 1080, height: 1920, name: "1080x1920" },
      { width: 1920, height: 1080, name: "1920x1080" },
    ],
    contexts: [
      "for social media",
      "for website banner",
      "for email header",
      "for LinkedIn post",
      "for Instagram post",
      "for Facebook cover",
      "for Twitter header",
      "for YouTube thumbnail",
      "for Pinterest pin",
      "for blog featured image",
    ],
  },

  // 平台特定类
  platforms: [
    "LinkedIn",
    "Instagram",
    "Facebook",
    "Twitter",
    "YouTube",
    "Pinterest",
    "TikTok",
    "WhatsApp",
    "Telegram",
    "Discord",
    "Reddit",
    "Medium",
    "WordPress",
    "Shopify",
    "Etsy",
    "Amazon",
    "eBay",
    "Craigslist",
    "Indeed",
    "Glassdoor",
  ],

  // 用途特定类
  useCases: [
    "profile picture",
    "cover photo",
    "post image",
    "story image",
    "thumbnail",
    "banner",
    "logo",
    "product photo",
    "resume photo",
    "ID photo",
    "passport photo",
    "avatar",
    "headshot",
    "portfolio image",
    "gallery image",
    "blog image",
    "newsletter image",
    "presentation slide",
    "document image",
    "attachment",
  ],
};

// 生成页面内容
function generatePageContent(template: string, params: Record<string, any>) {
  const baseUrl = "https://pixcloak.com";

  return `import type { Metadata } from "next";
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import AnswerCard from '@/components/AnswerCard';

export const metadata: Metadata = {
  title: "${params.title}",
  description: "${params.description}",
  alternates: { 
    canonical: "${params.canonical}", 
    languages: { "x-default": "${params.canonical}" }
  },
  openGraph: {
    title: "${params.title}",
    description: "${params.description}",
    url: "${params.canonical}",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "${params.title}",
    description: "${params.description}",
  },
};

export default function ${params.componentName}() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: '${params.breadcrumbTitle}', url: '${params.canonical}' }
      ]} />
      
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        {/* Featured Snippet Answer Card */}
        <AnswerCard 
          question="${params.faqQuestion}"
          answer="${params.faqAnswer}"
          steps={${JSON.stringify(params.steps)}}
          table={${JSON.stringify(params.table)}}
          tips={${JSON.stringify(params.tips)}}
          relatedTools={${JSON.stringify(params.relatedTools)}}
        />

        <div className="card">
          <h1>${params.h1Title}</h1>
          <p className="text-muted">
            ${params.introText}
          </p>
        </div>

        <div className="card">
          <h2>Why ${params.useCase}?</h2>
          <p>
            ${params.whyText}
          </p>
          <ul>
            ${params.benefits
              .map((benefit: string) => `<li>${benefit}</li>`)
              .join("")}
          </ul>
        </div>

        <div className="card">
          <h2>Step-by-Step Guide</h2>
          <ol>
            ${params.steps.map((step: string) => `<li>${step}</li>`).join("")}
          </ol>
        </div>

        <div className="card">
          <h2>Pro Tips</h2>
          <ul>
            ${params.tips.map((tip: string) => `<li>${tip}</li>`).join("")}
          </ul>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            ${params.relatedTools
              .map(
                (tool: any) => `
              <a href="${tool.url}" style={{ 
                display: 'block',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#374151'
              }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>${tool.name}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>${tool.description}</p>
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </div>

      <FaqJsonLd items={${JSON.stringify(params.faqItems, null, 2)}} />
    </>
  );
}`;
}

// 生成文件大小限制页面
function generateFileSizePages() {
  const pages = [];

  for (const size of LONG_TAIL_TEMPLATES.fileSize.sizes) {
    for (const format of LONG_TAIL_TEMPLATES.fileSize.formats) {
      for (const context of LONG_TAIL_TEMPLATES.fileSize.contexts) {
        const sizeStr = `${size}${format}`;
        const slug = `compress-to-${size}${format.toLowerCase()}-${context.replace(
          /\s+/g,
          "-"
        )}`;

        const params = {
          title: `Compress Images to ${sizeStr} ${context} | PixCloak`,
          description: `Compress images to exactly ${sizeStr} ${context}. Free online tool with no uploads required. Works for JPEG, PNG, WebP formats.`,
          canonical: `/guides/${slug}`,
          componentName: `CompressTo${size}${format}${context.replace(
            /\s+/g,
            ""
          )}`,
          breadcrumbTitle: `Compress to ${sizeStr}`,
          h1Title: `How to Compress Images to ${sizeStr} ${context}`,
          introText: `Learn how to compress images to exactly ${sizeStr} ${context} using our free online tool. No uploads, works locally in your browser.`,
          useCase: `${sizeStr} compression`,
          whyText: `Compressing images to ${sizeStr} ${context} ensures optimal file size while maintaining visual quality. This size limit is commonly used ${context} to ensure fast loading and compatibility.`,
          benefits: [
            `Maintains visual quality at ${sizeStr}`,
            `Ensures fast loading ${context}`,
            `Compatible with all platforms`,
            `No quality loss with our algorithm`,
          ],
          steps: [
            `Open our <a href="/compress?kb=${size}&format=webp">compression tool</a>`,
            `Upload your image files`,
            `Set target size to ${sizeStr}`,
            `Choose WebP format for best compression`,
            `Click compress and download`,
          ],
          tips: [
            `Use WebP format for 20-30% smaller files than JPEG`,
            `Resize to appropriate dimensions before compressing`,
            `Remove EXIF data to save additional space`,
            `Use batch processing for multiple images`,
          ],
          table: {
            headers: ["Platform", "Recommended Size", "Format", "Quality"],
            rows: [
              [context, sizeStr, "WebP", "85%"],
              [context, sizeStr, "JPEG", "80%"],
              [context, sizeStr, "PNG", "N/A"],
            ],
          },
          relatedTools: [
            {
              name: `${context} Compressor`,
              url: `/compress?kb=${size}&format=webp`,
              description: `Pre-configured for ${context} at ${sizeStr}`,
            },
            {
              name: "Batch Compressor",
              url: "/batch",
              description: "Process multiple images at once",
            },
            {
              name: "EXIF Remover",
              url: "/redact",
              description: "Remove metadata for smaller files",
            },
          ],
          faqQuestion: `How to compress images to exactly ${sizeStr}?`,
          faqAnswer: `Use our compression tool with target size set to ${sizeStr}. The tool automatically adjusts quality to hit the exact file size while maintaining visual quality.`,
          faqItems: [
            {
              question: `What's the best format for ${sizeStr} compression?`,
              answer: `WebP format typically achieves the best compression ratio at ${sizeStr}, followed by JPEG. PNG is only recommended for images with transparency.`,
            },
            {
              question: `How do I ensure my image is exactly ${sizeStr}?`,
              answer: `Our tool automatically adjusts quality settings to hit the exact target size. You can also manually adjust quality if needed.`,
            },
            {
              question: `Can I compress multiple images to ${sizeStr} at once?`,
              answer: `Yes, use our batch processing feature to compress multiple images to ${sizeStr} simultaneously.`,
            },
          ],
        };

        pages.push({
          slug,
          params,
          category: "file-size",
        });
      }
    }
  }

  return pages;
}

// 生成尺寸限制页面
function generateDimensionPages() {
  const pages = [];

  for (const dimension of LONG_TAIL_TEMPLATES.dimensions.sizes) {
    for (const context of LONG_TAIL_TEMPLATES.dimensions.contexts) {
      const slug = `resize-to-${dimension.name}-${context.replace(
        /\s+/g,
        "-"
      )}`;

      const params = {
        title: `Resize Images to ${dimension.name} ${context} | PixCloak`,
        description: `Resize images to exactly ${dimension.name} pixels ${context}. Free online tool with aspect ratio preservation and quality optimization.`,
        canonical: `/guides/${slug}`,
        componentName: `ResizeTo${dimension.name.replace(
          "x",
          "x"
        )}${context.replace(/\s+/g, "")}`,
        breadcrumbTitle: `Resize to ${dimension.name}`,
        h1Title: `How to Resize Images to ${dimension.name} ${context}`,
        introText: `Learn how to resize images to exactly ${dimension.name} pixels ${context} using our free online tool. Maintains aspect ratio and quality.`,
        useCase: `${dimension.name} resizing`,
        whyText: `Resizing images to ${dimension.name} ${context} ensures optimal display and performance. This dimension is commonly used ${context} for consistent visual presentation.`,
        benefits: [
          `Maintains aspect ratio`,
          `Preserves image quality`,
          `Optimized for ${context}`,
          `Fast processing`,
        ],
        steps: [
          `Open our <a href="/compress?size=${dimension.name}&format=webp">resize tool</a>`,
          `Upload your image`,
          `Set dimensions to ${dimension.name}`,
          `Choose output format`,
          `Click resize and download`,
        ],
        tips: [
          `Use WebP format for smaller file sizes`,
          `Consider cropping for exact aspect ratios`,
          `Maintain original quality settings`,
          `Test on target platform`,
        ],
        table: {
          headers: ["Dimension", "Aspect Ratio", "Use Case", "Format"],
          rows: [
            [
              dimension.name,
              `${dimension.width}:${dimension.height}`,
              context,
              "WebP",
            ],
            [
              dimension.name,
              `${dimension.width}:${dimension.height}`,
              context,
              "JPEG",
            ],
            [
              dimension.name,
              `${dimension.width}:${dimension.height}`,
              context,
              "PNG",
            ],
          ],
        },
        relatedTools: [
          {
            name: `${context} Resizer`,
            url: `/compress?size=${dimension.name}&format=webp`,
            description: `Pre-configured for ${context} at ${dimension.name}`,
          },
          {
            name: "Aspect Ratio Tool",
            url: "/tools/aspect-pad",
            description: "Add padding to maintain aspect ratios",
          },
          {
            name: "Crop Templates",
            url: "/tools/crop-templates",
            description: "Crop to specific dimensions",
          },
        ],
        faqQuestion: `How to resize images to ${dimension.name}?`,
        faqAnswer: `Use our resize tool with dimensions set to ${dimension.name}. The tool maintains aspect ratio and optimizes quality for the target size.`,
        faqItems: [
          {
            question: `What's the aspect ratio of ${dimension.name}?`,
            answer: `The aspect ratio of ${dimension.name} is ${
              dimension.width
            }:${dimension.height}, which equals ${(
              dimension.width / dimension.height
            ).toFixed(2)}:1.`,
          },
          {
            question: `How do I maintain aspect ratio when resizing to ${dimension.name}?`,
            answer: `Our tool automatically maintains aspect ratio. If your original image has a different ratio, you can choose to crop or add padding.`,
          },
          {
            question: `What format should I use for ${dimension.name} images?`,
            answer: `WebP is recommended for best compression, JPEG for compatibility, and PNG for images with transparency.`,
          },
        ],
      };

      pages.push({
        slug,
        params,
        category: "dimensions",
      });
    }
  }

  return pages;
}

// 生成平台特定页面
function generatePlatformPages() {
  const pages = [];

  for (const platform of LONG_TAIL_TEMPLATES.platforms) {
    for (const useCase of LONG_TAIL_TEMPLATES.useCases) {
      const slug = `${platform.toLowerCase()}-${useCase.replace(/\s+/g, "-")}`;

      const params = {
        title: `${platform} ${useCase} Size & Format Guide | PixCloak`,
        description: `Complete guide for ${platform} ${useCase} requirements. Get exact dimensions, file size limits, and format recommendations.`,
        canonical: `/guides/${slug}`,
        componentName: `${platform.replace(/\s+/g, "")}${useCase.replace(
          /\s+/g,
          ""
        )}`,
        breadcrumbTitle: `${platform} ${useCase}`,
        h1Title: `${platform} ${useCase} Requirements & Optimization`,
        introText: `Learn the exact requirements for ${platform} ${useCase} and how to optimize your images for best results.`,
        useCase: `${platform} ${useCase}`,
        whyText: `Understanding ${platform} ${useCase} requirements ensures your images display correctly and load quickly on the platform.`,
        benefits: [
          `Meets ${platform} requirements`,
          `Optimized for platform performance`,
          `Best visual quality`,
          `Fast loading times`,
        ],
        steps: [
          `Check ${platform} ${useCase} requirements`,
          `Prepare your image`,
          `Use our optimization tool`,
          `Upload to ${platform}`,
          `Verify display quality`,
        ],
        tips: [
          `Follow platform-specific guidelines`,
          `Test on different devices`,
          `Use recommended formats`,
          `Optimize for mobile viewing`,
        ],
        table: {
          headers: ["Platform", "Use Case", "Dimensions", "Max Size"],
          rows: [
            [platform, useCase, "Varies", "Platform specific"],
            [platform, useCase, "Varies", "Platform specific"],
            [platform, useCase, "Varies", "Platform specific"],
          ],
        },
        relatedTools: [
          {
            name: `${platform} Optimizer`,
            url: `/compress?preset=${platform.toLowerCase()}`,
            description: `Pre-configured for ${platform} requirements`,
          },
          {
            name: "Platform Checker",
            url: "/tools/platform-checker",
            description: "Validate against platform requirements",
          },
          {
            name: "Format Converter",
            url: "/tools/webp-converter",
            description: "Convert to platform-preferred formats",
          },
        ],
        faqQuestion: `What are the ${platform} ${useCase} requirements?`,
        faqAnswer: `${platform} has specific requirements for ${useCase} including dimensions, file size limits, and supported formats. Check our platform checker for exact specifications.`,
        faqItems: [
          {
            question: `What image formats does ${platform} support?`,
            answer: `${platform} typically supports JPEG, PNG, and WebP formats. Check the platform's documentation for the most current information.`,
          },
          {
            question: `How do I optimize images for ${platform}?`,
            answer: `Use our platform-specific presets or manually adjust dimensions and compression to meet ${platform}'s requirements.`,
          },
          {
            question: `What's the maximum file size for ${platform} ${useCase}?`,
            answer: `File size limits vary by platform and use case. Use our platform checker tool to get exact limits for ${platform}.`,
          },
        ],
      };

      pages.push({
        slug,
        params,
        category: "platforms",
      });
    }
  }

  return pages;
}

// 主函数
function main() {
  console.log("🏭 PixCloak 生成式长尾工厂启动...\n");

  const outputDir = join(
    __dirname,
    "..",
    "app",
    "(marketing)",
    "guides",
    "long-tail"
  );

  // 确保输出目录存在
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // 生成所有页面
  const allPages = [
    ...generateFileSizePages(),
    ...generateDimensionPages(),
    ...generatePlatformPages(),
  ];

  console.log(`📊 生成统计:`);
  console.log(
    `  - 文件大小页面: ${
      allPages.filter((p) => p.category === "file-size").length
    }`
  );
  console.log(
    `  - 尺寸页面: ${
      allPages.filter((p) => p.category === "dimensions").length
    }`
  );
  console.log(
    `  - 平台页面: ${allPages.filter((p) => p.category === "platforms").length}`
  );
  console.log(`  - 总计: ${allPages.length} 个页面\n`);

  // 生成页面文件
  let successCount = 0;
  let errorCount = 0;

  for (const page of allPages) {
    try {
      const pageDir = join(outputDir, page.slug);
      if (!existsSync(pageDir)) {
        mkdirSync(pageDir, { recursive: true });
      }

      const pageContent = generatePageContent("", page.params);
      const pageFile = join(pageDir, "page.tsx");

      writeFileSync(pageFile, pageContent);
      successCount++;

      if (successCount % 50 === 0) {
        console.log(`✅ 已生成 ${successCount} 个页面...`);
      }
    } catch (error) {
      console.error(`❌ 生成页面失败: ${page.slug}`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 生成完成:`);
  console.log(`  ✅ 成功: ${successCount} 个页面`);
  console.log(`  ❌ 失败: ${errorCount} 个页面`);
  console.log(`  📁 输出目录: ${outputDir}`);

  console.log(`\n💡 下一步:`);
  console.log(`  1. 检查生成的页面内容`);
  console.log(`  2. 运行 SEO 检查脚本`);
  console.log(`  3. 提交到 IndexNow`);
  console.log(`  4. 监控搜索表现`);
}

main();
