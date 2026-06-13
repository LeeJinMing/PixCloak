import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import CompressClient from "@/app/compress/Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";
import { SITE_NAME_ZH } from "@/lib/i18n/site";

export const metadata: Metadata = {
  title: "在线图片压缩—免费压缩到200KB/500KB，本地不上传",
  description:
    "免费在线图片压缩工具：可设置目标大小（100KB、200KB、500KB），支持 JPEG/WebP/PNG 批量压缩与 ZIP 下载。浏览器本地处理，图片不上传服务器。",
  keywords: ["图片压缩", "在线压缩图片", "压缩图片到200k", "免费图片压缩", "jpg压缩", "png压缩", "不上传"],
  alternates: {
    canonical: "/zh/compress",
    languages: { "x-default": "/compress", en: "/compress", "zh-CN": "/zh/compress" },
  },
  openGraph: {
    locale: "zh_CN",
    title: "在线图片压缩 - 本地免费",
    description: "压缩到指定 KB，批量 ZIP，不上传。",
    url: "/zh/compress",
  },
};

export default function ZhCompressPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "首页", url: "/zh" },
          { name: "图片压缩", url: "/zh/compress" },
        ]}
      />
      <SoftwareAppJsonLd
        name={`${SITE_NAME_ZH}图片压缩`}
        url="/zh/compress"
        description="浏览器本地图片压缩，支持精确 KB 目标与批量 ZIP 下载。"
      />
      <FaqJsonLd
        items={[
          { question: "图片会上传到服务器吗？", answer: "不会。所有压缩在浏览器本地完成，文件不会离开您的设备。" },
          { question: "能压缩到 200KB 吗？", answer: "可以。在「目标 KB」中填写 200，系统会自动调整画质接近该大小。" },
          { question: "支持批量压缩吗？", answer: "支持。可选择多张图片，压缩后一键下载 ZIP。" },
        ]}
      />
      <h1 className="page-hero-title">在线图片压缩—免费压缩到 200KB/500KB（不上传）</h1>
      <div className="card" style={{ marginBottom: 16 }}>
        <p style={{ marginTop: 0 }}>
          <strong>简要说明：</strong>上传 JPG/PNG/WebP，设置目标大小（如 200KB）或画质，在浏览器本地压缩后下载。适合报名照、政务表单、微信传图等场景。
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link className="pill" href="/zh/compress?kb=200">
            压缩到 200KB
          </Link>
          <Link className="pill" href="/zh/compress?kb=500">
            压缩到 500KB
          </Link>
          <Link className="pill-ghost" href="/guides/compress-to-target-kb-zh">
            教程
          </Link>
          <Link className="pill-ghost" href="/zh/tools/pdf-to-image">
            PDF 转图后再压缩
          </Link>
        </div>
      </div>
      <Suspense fallback={null}>
        <CompressClient locale="zh" />
      </Suspense>
    </>
  );
}
