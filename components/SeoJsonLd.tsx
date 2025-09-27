"use client";
import React from "react";

type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

type SoftwareAppProps = {
  name: string;
  url: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  image?: string;
  offersFree?: boolean;
};

export function SoftwareAppJsonLd({
  name,
  url,
  description,
  applicationCategory = "PhotoEditor",
  operatingSystem = "WebApplication",
  image,
  offersFree = true,
}: SoftwareAppProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url,
    description,
    applicationCategory,
    operatingSystem,
    ...(image ? { image } : {}),
    offers: offersFree ? { "@type": "Offer", price: 0, priceCurrency: "USD" } : undefined,
    isAccessibleForFree: offersFree,
  } as Record<string, unknown>;
  return <JsonLd data={data} />;
}

type FaqItem = { question: string; answer: string };

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  } as const;
  return <JsonLd data={data} />;
}

export default JsonLd;


