"use client";

interface CategoryCardProps {
  category: {
    name: string;
    icon: string;
    count: number;
    description: string;
  };
  style?: React.CSSProperties;
}

export default function CategoryCard({ category, style }: CategoryCardProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#f0f9ff';
    e.currentTarget.style.borderColor = '#3b82f6';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#fafafa';
    e.currentTarget.style.borderColor = '#e5e7eb';
  };

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#fafafa',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>
        {category.icon}
      </div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
        {category.name}
      </h3>
      <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6b7280' }}>
        {category.description}
      </p>
      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
        {category.count} examples
      </div>
    </div>
  );
}
