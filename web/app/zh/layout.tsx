import type { Metadata } from "next";
import { SITE_NAME_ZH } from "@/lib/i18n/site";

const baiduVerify = process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: { default: SITE_NAME_ZH, template: `%s | ${SITE_NAME_ZH}` },
  description: `${SITE_NAME_ZH} PixCloak：浏览器本地图片压缩、PDF转图片。免费、不上传。`,
  keywords: ["图片压缩", "PDF转图片", "在线工具", "免费", "不上传"],
  alternates: {
    canonical: "/zh",
    languages: { "x-default": "/", en: "/", "zh-CN": "/zh" },
  },
  openGraph: { locale: "zh_CN" },
  ...(baiduVerify
    ? { other: { "baidu-site-verification": baiduVerify } }
    : {}),
};

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return children;
}
