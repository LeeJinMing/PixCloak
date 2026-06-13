import type { Metadata } from "next";
import Link from "next/link";
import Client from "@/app/tools/pdf-to-image/Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";
import { SITE_NAME_ZH } from "@/lib/i18n/site";

export const metadata: Metadata = {
  title: "PDF转图片—免费在线PDF转PNG/JPG，无需WPS会员",
  description:
    "免费 PDF 转图片：在浏览器本地将 PDF 每一页导出为 PNG，支持 ZIP 打包下载。不上传、无需 WPS/金山会员，替代收费在线转换。",
  keywords: ["pdf转图片", "pdf转jpg", "pdf转png", "在线pdf转图片", "免费pdf转图片", "pdf转图片不用会员"],
  alternates: {
    canonical: "/zh/tools/pdf-to-image",
    languages: { "x-default": "/tools/pdf-to-image", en: "/tools/pdf-to-image", "zh-CN": "/zh/tools/pdf-to-image" },
  },
  openGraph: {
    locale: "zh_CN",
    title: "PDF转图片 - 免费本地转换",
    url: "/zh/tools/pdf-to-image",
  },
};

export default function ZhPdfToImagePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "首页", url: "/zh" },
          { name: "PDF转图片", url: "/zh/tools/pdf-to-image" },
        ]}
      />
      <SoftwareAppJsonLd
        name="PDF转图片"
        url="/zh/tools/pdf-to-image"
        description="浏览器本地将 PDF 页面转为 PNG 图片，支持 ZIP 下载。"
      />
      <div style={{ display: "grid", gap: 12 }}>
        <div className="card">
          <h1 className="page-hero-title">PDF 转图片—免费在线转换（不上传、无需会员）</h1>
          <p className="text-muted" style={{ marginBottom: 0 }}>
            把 PDF 每一页导出为 PNG 图片。全程在浏览器本地完成，<strong>不需要 WPS 或金山会员</strong>，文件不会上传到服务器。
            导出后可用 <Link href="/zh/compress">图片压缩</Link> 缩小体积。
          </p>
        </div>
        <Client locale="zh" />
        <div className="card">
          <h2>相关工具</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/zh/compress" className="pill">
              图片压缩
            </Link>
            <Link href="/tools/resize-image" className="pill">
              调整尺寸
            </Link>
            <Link href="/zh/guides/pdf-to-image-free" className="pill">
              详细教程
            </Link>
          </div>
        </div>
        <FaqJsonLd
          items={[
            {
              question: "PDF 会上传到服务器吗？",
              answer: "不会。文件仅在您的浏览器中读取和转换，不上传。",
            },
            {
              question: "和 WPS PDF 转图片有什么区别？",
              answer: `${SITE_NAME_ZH}免费、无需会员，本地处理；WPS 在线版常对 PDF 转图等功能收费或限制。`,
            },
            {
              question: "加密 PDF 能转吗？",
              answer: "有密码的 PDF 需先在阅读器中解密，再使用本工具转换。",
            },
          ]}
        />
      </div>
    </>
  );
}
