import type { Metadata } from "next";
import Link from "next/link";
import UploadPackClient from "./Client";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqJsonLd, SoftwareAppJsonLd } from "@/components/SeoJsonLd";

export const metadata: Metadata = {
  title: "Photo and Signature Resizer—Exact Pixels and KB",
  description: "Prepare a photo and signature for an online form. Set exact dimensions, minimum and maximum KB, format, and fit mode; verify both files locally before download.",
  alternates: { canonical: "/upload-pack" },
};

const faq = [
  { question: "Does PixCloak know every portal's current requirements?", answer: "No. Enter the dimensions, format, and KB range shown by the destination form. Preset values are examples and can change." },
  { question: "Will either file exceed the maximum KB?", answer: "No successful result exceeds the entered maximum. PixCloak checks the final bytes and rejects an output outside the entered range." },
  { question: "Are the photo and signature uploaded?", answer: "No. Decode, fit, encode, verification, and ZIP creation happen in this browser." },
];

export default function UploadPackPage() {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Upload Ready", url: "/upload-ready" }, { name: "Photo and signature", url: "/upload-pack" }]} /><SoftwareAppJsonLd name="Photo and Signature Upload Pack" url="/upload-pack" description="Prepare and verify a photo and signature against exact upload requirements locally." /><div className="workflow-page"><section className="workflow-hero"><div><span className="eyebrow">FORM UPLOADS</span><h1>Prepare a photo and signature for one form</h1><p>Stop switching between resizers and compressors. Enter the two requirement sets once, prepare both files, and download only verified results.</p></div><div className="workflow-trust"><strong>Requirements, not guesses</strong><span>Exact pixels, format, minimum KB, maximum KB, and decodability are checked after export.</span></div></section><UploadPackClient /><section className="card workflow-support"><h2>Before submitting</h2><div className="support-grid"><div><strong>1. Copy the rules</strong><span>Use the exact numbers printed by the destination form.</span></div><div><strong>2. Choose fit behavior</strong><span>Keep the full image with padding or crop to fill.</span></div><div><strong>3. Inspect both files</strong><span>Check that a face or signature was not cropped incorrectly.</span></div><div><strong>4. Upload the verified copies</strong><span>Portal account state and undocumented rules remain outside this tool.</span></div></div><div className="next-actions"><Link className="button-outline" href="/upload-ready">Prepare one general image</Link><Link className="button-outline" href="/safe-share">Remove private details first</Link></div></section>{faq.map((item) => <details className="card compact-faq" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}<FaqJsonLd items={faq} /></div></>;
}
