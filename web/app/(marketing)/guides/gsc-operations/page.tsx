import type { Metadata } from "next";
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "Google Search Console Operations | PixCloak",
  description: "Practical checklist: submit sitemaps, inspect URLs, handle duplicates, fix soft 404/redirects, and improve CTR. Keep canonical, content, and internal...",
  alternates: { canonical: "/guides/gsc-operations" },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Google Search Console Operations', url: '/guides/gsc-operations' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 16 }}>
      <div className="card">
        <h1>GSC operations</h1>
        <ol style={{ paddingLeft: 18 }}>
          <li>Submit sitemap: <code>https://pixcloak.com/sitemap.xml</code>. Ensure it references <code>/guides/sitemap.xml</code>.</li>
          <li>URL inspection: request indexing for <code>/</code> 与新上线的指南/长尾页。</li>
          <li>覆盖率报告：重点处理“已抓取 - 目前未编入索引”“重定向”“软 404”。</li>
          <li>当页面被判定重复：检查 canonical、内容差异、内部链接。</li>
          <li>性能报告：按查询与页面筛选，低 CTR 的优化标题与描述。</li>
        </ol>
        <p className="text-muted">Tips: 站点改动后 24–72 小时观察；持续提交新内容与内链更有利于抓取与收录。</p>
      </div>
    </div>
    </>
  );
}


