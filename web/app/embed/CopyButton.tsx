"use client";

interface CopyButtonProps {
  text: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function CopyButton({ text, children, style }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      onClick={handleCopy}
      style={style}
    >
      {children}
    </button>
  );
}
