import Link from "next/link";
import { getToolNextSteps, type ToolNextStepsId } from "@/lib/i18n/nextSteps";

type ToolNextStepsProps = {
  tool: ToolNextStepsId;
  /** 必须与页面路径一致：/zh/* 用 zh，英文工具页用 en */
  locale: "en" | "zh";
};

export function ToolNextSteps({ tool, locale }: ToolNextStepsProps) {
  const { title, intro, steps } = getToolNextSteps(tool, locale);

  return (
    <div
      className="card"
      style={{
        marginTop: 16,
        background: locale === "zh" ? "#f0fdf4" : "#f8fafc",
        borderColor: locale === "zh" ? "#bbf7d0" : "#bfdbfe",
      }}
    >
      <h2 style={{ marginBottom: 6 }}>{title}</h2>
      <p className="text-muted" style={{ marginTop: 0, marginBottom: 14, fontSize: 14, lineHeight: 1.5 }}>
        {intro}
      </p>
      <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 14 }}>
        {steps.map((step) => (
          <li key={step.href} style={{ paddingLeft: 4 }}>
            <Link href={step.href} style={{ fontWeight: 600, fontSize: 15 }}>
              {step.title}
            </Link>
            <span className="text-muted" style={{ display: "block", fontSize: 14, lineHeight: 1.45, marginTop: 2 }}>
              {step.desc}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
