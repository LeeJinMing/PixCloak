import Link from "next/link";

type LaunchHeroStep = {
  number: string;
  title: string;
  text: string;
};

type LaunchHeroProps = {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: { href: string; label: string };
  secondaryAction: { href: string; label: string };
  proofs: string[];
  panelEyebrow: string;
  panelTitle: string;
  panelStatus: string;
  steps: LaunchHeroStep[];
};

export function LaunchHero({
  ariaLabel,
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  proofs,
  panelEyebrow,
  panelTitle,
  panelStatus,
  steps,
}: LaunchHeroProps) {
  return (
    <section className="launch-hero">
      <div className="launch-hero__copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="launch-actions">
          <Link href={primaryAction.href} className="button">
            {primaryAction.label}
          </Link>
          <Link href={secondaryAction.href} className="button-outline">
            {secondaryAction.label}
          </Link>
        </div>
        <div className="launch-proof">
          {proofs.map((proof) => <span key={proof}>{proof}</span>)}
        </div>
      </div>

      <aside className="launch-hero__panel" aria-label={ariaLabel}>
        <div className="launch-panel__intro">
          <span>{panelEyebrow}</span>
          <strong>{panelTitle}</strong>
        </div>
        <div className="launch-panel__status">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
            <path d="M12 3 5.5 5.7v5.7c0 4.2 2.7 7.9 6.5 9.6 3.8-1.7 6.5-5.4 6.5-9.6V5.7L12 3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span>{panelStatus}</span>
        </div>
        <ol className="launch-panel__steps">
          {steps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div>
                <strong>{step.title}</strong>
                <small>{step.text}</small>
              </div>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}
