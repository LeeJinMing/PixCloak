import {
  GONGAN_BEIAN,
  GONGAN_BEIAN_CODE,
  GONGAN_BEIAN_LOGO,
  ICP_BEIAN,
} from "@/lib/i18n/site";

type BeianFooterProps = {
  /** 中文站显示公安备案（含图标） */
  showGongan?: boolean;
};

export function BeianFooter({ showGongan = false }: BeianFooterProps) {
  const gonganHref = `https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${GONGAN_BEIAN_CODE}`;

  return (
    <div
      className="text-muted"
      style={{ fontSize: 12, textAlign: "center", display: "grid", gap: 6 }}
    >
      {ICP_BEIAN ? (
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
          {ICP_BEIAN}
        </a>
      ) : null}
      {showGongan && GONGAN_BEIAN ? (
        <a
          href={gonganHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={GONGAN_BEIAN_LOGO}
            alt=""
            width={16}
            height={16}
            style={{ display: "block" }}
          />
          <span>{GONGAN_BEIAN}</span>
        </a>
      ) : null}
    </div>
  );
}
