import type { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  /** When false, do not set `open` so the element stays uncontrolled and toggles natively. */
  defaultOpen?: boolean;
};

export function ToolGuideSection({ title, children, defaultOpen = false }: Props) {
  return (
    <details className="tool-details" {...(defaultOpen ? { open: true } : {})}>
      <summary className="tool-details-summary">{title}</summary>
      <div className="tool-details-body tool-prose">{children}</div>
    </details>
  );
}
