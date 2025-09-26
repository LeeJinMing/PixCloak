import RelatedTasks from "@/components/RelatedTasks";

export default function MarketingGuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="container" style={{ marginTop: 16 }}>
        <RelatedTasks />
      </div>
    </>
  );
}


