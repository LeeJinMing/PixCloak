import type { Metadata } from "next";
import Link from "next/link";
import Client from "@/app/tools/image-to-pdf/Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd, SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = { title: "多张图片合并PDF—本地生成、不上传", description: "把 JPG、PNG、WebP 或 HEIC 图片排序后合并为一个 PDF，可选择 A4、Letter、边距和画质，全程浏览器本地处理。", alternates: { canonical: "/zh/tools/image-to-pdf" } };
const faq = [
  { question: "图片会上传吗？", answer: "不会。图片读取、页面排版、PDF 生成和下载都在当前浏览器中完成。" },
  { question: "可以调整 PDF 页面顺序吗？", answer: "可以。生成前使用上移和下移按钮，列表顺序就是最终页码顺序。" },
  { question: "为什么会重新编码图片？", answer: "这样可以应用正确方向、使用适合白色页面的背景，并避免把原图片元数据复制进 PDF。" },
];
export default function ZhImageToPdfPage() { return <><BreadcrumbJsonLd items={[{ name: "首页", url: "/zh" }, { name: "图片合并 PDF", url: "/zh/tools/image-to-pdf" }]} /><SoftwareAppJsonLd name="图片合并 PDF" url="/zh/tools/image-to-pdf" description="在浏览器本地把多张图片合并为 PDF。" /><div className="workflow-page"><section className="workflow-hero"><div><span className="eyebrow">浏览器本地生成</span><h1>多张图片排序后合并为一个 PDF</h1><p>选择页面顺序、A4 或 Letter、边距和画质。皮克图创建全新 PDF，不上传原图，也不把原文件名写进 PDF。</p></div><div className="workflow-trust"><strong>PDF 双向流程</strong><Link href="/zh/tools/pdf-to-image">需要反向处理？把 PDF 每页导出为图片。</Link></div></section><Client locale="zh" /><section className="card workflow-support"><h2>相关下一步</h2><div className="next-actions"><Link className="button-outline" href="/zh/tools/pdf-to-image">PDF 批量导出图片</Link><Link className="button-outline" href="/zh/upload-pack">准备照片和签名</Link><Link className="button-outline" href="/zh/compress">压缩导出图片</Link></div></section>{faq.map((item) => <details className="card compact-faq" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}<FaqJsonLd items={faq} /></div></>; }
