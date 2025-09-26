import type { Metadata } from "next";
import RelatedTasks from "@/components/RelatedTasks";

export const metadata: Metadata = {
  title: "Tools | PixCloak",
  description: "Privacy‑first image utilities. All tools work locally in your browser.",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container" style={{ display: 'grid', gap: 12 }}>
      {children}
      <RelatedTasks />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
            { '@type': 'Question', name: '这些工具是否会上传我的图片？', acceptedAnswer: { '@type': 'Answer', text: '不会，所有处理都在浏览器本地完成。' } },
            { '@type': 'Question', name: '支持哪些格式？', acceptedAnswer: { '@type': 'Answer', text: '常见的 JPEG、PNG、WebP 均可，具体以工具说明为准。' } },
            { '@type': 'Question', name: '可以批量处理吗？', acceptedAnswer: { '@type': 'Answer', text: '部分工具支持选择多文件或导出 ZIP。' } }
          ]
        })
      }} />
    </div>
  );
}


