import RelatedTasks from "@/components/RelatedTasks";

export default function MarketingGuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: '/guides' },
            ],
          })
        }}
      />
      {children}
      <div className="container" style={{ marginTop: 16 }}>
        <RelatedTasks />
      </div>
    </>
  );
}


