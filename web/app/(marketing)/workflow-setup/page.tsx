import type { Metadata } from "next";
import Link from "next/link";
import styles from "./service.module.css";

export const metadata: Metadata = {
  title: "Custom Image Batch Workflow Setup",
  description: "Get a repeatable local image workflow configured for your upload limits, filenames and team. Try the working sample, then request a scoped setup quote.",
  alternates: { canonical: "/workflow-setup" },
};

const requestUrl = "https://github.com/LeeJinMing/PixCloak/issues/new?template=workflow-setup.yml";

export default function WorkflowSetupPage() {
  return (
    <div className={styles.service}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>PIXCLOAK / WORKFLOW SETUP</p>
          <h1>Your image requirements.<br />One repeatable workflow.</h1>
          <p className={styles.lede}>A file-size cap, a naming rule, a batch to check. Get a local browser tool configured around the way your team prepares images.</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="/workflow-sample/index.html">Try the working sample →</a>
            <a className={styles.secondary} href="#scope">See setup options</a>
          </div>
          <p className={styles.small}>One-time setup · Scope agreed before payment · Image processing stays on your device</p>
        </div>
        <aside className={styles.receipt} aria-label="Example delivery structure">
          <span>EXAMPLE DELIVERY</span><strong>A batch you can hand over.</strong>
          <ol>
            <li><b>01 / Configured tool</b><span>Your limits and file naming, ready to reuse.</span></li>
            <li><b>02 / Verified outputs</b><span>Passing images collected in a ZIP.</span></li>
            <li><b>03 / Result report</b><span>File size, dimensions, status and failures.</span></li>
          </ol>
          <p>The sample uses generated images. It is an example of the deliverable, not a customer case study.</p>
        </aside>
      </section>

      <section className={styles.section} id="scope">
        <p className={styles.eyebrow}>A SMALL, DEFINED ENGAGEMENT</p>
        <h2>Pay for the setup you need.</h2>
        <p className={styles.intro}>The general PixCloak tools and sample are free. The paid service covers configuring your rules, checking the resulting workflow and preparing the handover.</p>
        <div className={styles.packages}>
          <article className={styles.package}>
            <h3>One workflow</h3><p className={styles.price}>US$49 <span>starting quote</span></p>
            <p>For one team, one output specification.</p>
            <ul><li>One JPEG preset: size cap and longest-side limit</li><li>One agreed filename prefix and numbering rule</li><li>A reusable local browser tool and short guide</li><li>Verification against 5 agreed, non-sensitive samples</li><li>One adjustment within the agreed requirements</li></ul>
            <a className={styles.secondary} href={requestUrl}>Request a scope check →</a>
          </article>
          <article className={`${styles.package} ${styles.featured}`}>
            <h3>Team workflow</h3><p className={styles.price}>US$149 <span>starting quote</span></p>
            <p>For a repeat task with several output rules.</p>
            <ul><li>Up to 3 JPEG presets with agreed limits</li><li>One custom filename rule</li><li>A reusable local tool, ZIP export and result report</li><li>Verification against 20 agreed, non-sensitive samples</li><li>A handover guide and one scoped adjustment</li></ul>
            <a className={styles.primary} href={requestUrl}>Describe your workflow →</a>
          </article>
        </div>
        <p className={styles.small}>Indicative starting prices in USD. Final scope, price, delivery date and payment method are confirmed separately before work begins. A request is an inquiry, not an order or a payment. Hosting, ongoing support, AI detection, background removal and site integrations are outside these packages.</p>
      </section>

      <section className={styles.handover}>
        <div><p className={styles.eyebrow}>TRY BEFORE YOU REQUEST</p><h2>See the actual output format.</h2><p>Open the sample, select “Try 3 generated samples”, then download the verified images and report. You can also use your own non-sensitive JPG, PNG or WebP images locally.</p><div className={styles.actions}><a className={styles.primary} href="/workflow-sample/index.html">Open the sample</a><a className={styles.secondary} href="/workflow-sample.zip" download>Download the offline sample</a></div></div>
        <div><h3>What the sample checks</h3><ul><li>The exported JPEG reopens successfully.</li><li>Its byte size stays inside the selected cap.</li><li>Its longest side stays inside the selected limit.</li><li>Every rejected input appears in the report.</li></ul><p className={styles.small}>These checks do not assess visual quality or guarantee acceptance by an external portal. Review the images and test the destination before a full batch.</p></div>
      </section>

      <section className={styles.section}>
        <h2>Start with the requirements.</h2>
        <p className={styles.intro}>Tell us your output format, maximum KB, pixel limits, filename example and approximate batch size. A public specification or a made-up example is enough for the initial scope check.</p>
        <a className={styles.primary} href={requestUrl}>Open a public scope request on GitHub →</a>
        <p className={styles.small}>A GitHub account is required. The request is public: do not include private images, customer data, passwords or payment details. The form does not upload any files from this page.</p>
        <p className={styles.alternative}>Need a one-off conversion? <Link href="/upload-ready">Use Upload Ready free</Link>. Need redaction? <Link href="/safe-share">Open Safe Share</Link>.</p>
      </section>
    </div>
  );
}
