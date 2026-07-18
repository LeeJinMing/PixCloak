import type { Metadata } from "next";
import Link from "next/link";
import UploadPackClient from "@/app/upload-pack/Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd, SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "照片和签名尺寸压缩—指定像素和KB",
  description: "一次准备报名或政务表单需要的照片与签名：分别设置宽高、最小/最大KB和格式，本地生成并验证后下载。",
  alternates: { canonical: "/zh/upload-pack" },
};

const faq = [
  { question: "工具会自动知道各平台最新要求吗？", answer: "不会。请把目标表单当前显示的宽高、格式和 KB 范围填写到工具中，默认数值仅为示例。" },
  { question: "生成文件会超过最大 KB 吗？", answer: "不会把超出范围的文件标记为成功。工具会检查最终文件的实际字节数和尺寸。" },
  { question: "照片和签名会上传吗？", answer: "不会。读取、适配、压缩、校验和 ZIP 打包均在当前浏览器完成。" },
];

export default function ZhUploadPackPage() {
  return <><BreadcrumbJsonLd items={[{ name: "首页", url: "/zh" }, { name: "照片和签名准备", url: "/zh/upload-pack" }]} /><SoftwareAppJsonLd name="照片和签名上传准备包" url="/zh/upload-pack" description="按指定像素和 KB 范围在本地准备照片和签名。" /><div className="workflow-page"><section className="workflow-hero"><div><span className="eyebrow">报名与政务上传</span><h1>照片和签名一次准备完成</h1><p>不再来回切换压缩和缩放网站。分别填写两组要求，只有通过尺寸、格式、体积和解码校验的结果才能下载。</p></div><div className="workflow-trust"><strong>按要求验证，不靠猜</strong><span>导出后检查像素、格式、最小/最大 KB 和文件可用性。</span></div></section><UploadPackClient locale="zh" /><section className="card workflow-support"><h2>提交前再检查一次</h2><div className="support-grid"><div><strong>1. 抄录表单要求</strong><span>使用目标网站当前显示的准确数字。</span></div><div><strong>2. 选择适配方式</strong><span>完整保留并留白，或居中裁切铺满。</span></div><div><strong>3. 查看两份结果</strong><span>确认人脸或签名没有被错误裁掉。</span></div><div><strong>4. 上传验证文件</strong><span>账号状态和平台未公开规则不在工具控制范围内。</span></div></div><div className="next-actions"><Link className="button-outline" href="/zh/compress">只压缩一张图片</Link><Link className="button-outline" href="/zh/redact">先给隐私信息打码</Link></div></section>{faq.map((item) => <details className="card compact-faq" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}<FaqJsonLd items={faq} /></div></>;
}
