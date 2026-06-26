import { ICP_BEIAN } from "@/lib/i18n/site";

export function BeianFooter() {
  if (!ICP_BEIAN) return null;
  return (
    <div className="text-muted" style={{ fontSize: 12, textAlign: "center" }}>
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
        {ICP_BEIAN}
      </a>
    </div>
  );
}
