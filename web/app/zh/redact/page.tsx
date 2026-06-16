import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import RedactClient from "@/app/redact/Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SoftwareAppJsonLd, FaqJsonLd } from "@/components/SeoJsonLd";
import { ServerFaqSection, faqToJsonLd } from "@/components/ServerFaqSection";
import { ToolNextSteps } from "@/components/ToolNextSteps";
import { SITE_NAME_ZH } from "@/lib/i18n/site";
import { getRedactStrings } from "@/lib/i18n/redact";

const redactFaq = getRedactStrings("zh");

export const metadata: Metadata = {
  title: "在线图片打码—模糊人脸车牌、遮挡隐私免费不上传",
  description:
    "免费在线图片打码工具：在浏览器本地模糊人脸、遮挡车牌证件号、涂黑文字。不上传，导出自动去除 EXIF/GPS。",
  keywords: ["图片打码", "在线打码", "模糊人脸", "遮挡车牌", "图片马赛克", "隐私打码", "不上传"],
  alternates: {
    canonical: "/zh/redact",
    languages: { "x-default": "/redact", en: "/redact", "zh-CN": "/zh/redact" },
  },
  openGraph: {
    locale: "zh_CN",
    title: "在线图片打码 - 本地免费",
    url: "/zh/redact",
  },
};

export default function ZhRedactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "首页", url: "/zh" },
          { name: "图片打码", url: "/zh/redact" },
        ]}
      />
      <SoftwareAppJsonLd
        name={`${SITE_NAME_ZH}图片打码`}
        url="/zh/redact"
        description="浏览器本地图片打码：模糊人脸、遮挡车牌与证件，导出去除 EXIF/GPS。"
      />
      <FaqJsonLd items={faqToJsonLd(redactFaq.faq)} />
      <h1 className="page-hero-title">在线图片打码—模糊人脸、车牌与隐私信息（不上传）</h1>
      <div className="card" style={{ marginBottom: 16 }}>
        <p style={{ marginTop: 0 }}>
          <strong>简要说明：</strong>上传图片，框选人脸、车牌、证件号或文字区域，选择纯色遮挡或马赛克，然后导出 JPG/ZIP。
          全程本地处理，适合微信截图、证件照、发票等场景。
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/guides/remove-exif-wechat-zh" className="pill">
            微信去 EXIF
          </Link>
          <Link href="/zh/compress" className="pill">
            打码后压缩
          </Link>
        </div>
      </div>
      <Suspense fallback={null}>
        <RedactClient locale="zh" />
      </Suspense>
      <ServerFaqSection title={redactFaq.faqTitle} items={redactFaq.faq} />
      <ToolNextSteps tool="redact" locale="zh" />
    </>
  );
}
