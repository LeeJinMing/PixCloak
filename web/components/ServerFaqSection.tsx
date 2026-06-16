type FaqItem = { q: string; a: string };

export function faqToJsonLd(items: FaqItem[]) {
  return items.map(({ q, a }) => ({ question: q, answer: a }));
}

export function ServerFaqSection({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginBottom: 8 }}>{title}</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((item) => (
          <div key={item.q}>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>{item.q}</h3>
            <p style={{ margin: 0, color: "#374151", lineHeight: 1.55 }}>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
