import { ICP_BEIAN } from "@/lib/i18n/site";

export function BeianFooter({ locale = "en" }: { locale?: "en" | "zh" }) {
  if (locale !== "zh" && !ICP_BEIAN) return null;
  return (
    <div className="text-muted" style={{ fontSize: 12, textAlign: "center" }}>
      {locale === "zh" ? (
        <>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
            {ICP_BEIAN}
          </a>
        </>
      ) : null}
    </div>
  );
}
