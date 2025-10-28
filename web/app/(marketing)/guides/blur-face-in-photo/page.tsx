import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/SeoJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Blur Faces in Photos (Free, No App) | PixCloak",
  description: "Blur faces before sharing to protect privacy. Works on iPhone, Android and desktop—no app. Choose blur, pixelate or solid block. Exports remove EXIF/GPS.",
  alternates: {
    canonical: "/guides/blur-face-in-photo",
    languages: {
      'x-default': "/guides/blur-face-in-photo",
      en: "/guides/blur-face-in-photo",
    }
  },
  openGraph: {
    title: "How to Blur Faces in Photos (Free, No App Needed)",
    description: "Protect privacy by blurring faces in photos before sharing. Works on iPhone, Android, and desktop—no app download.",
    url: "/guides/blur-face-in-photo",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Blur Faces in Photos",
    description: "Protect privacy. Works on iPhone, Android, desktop. No app download needed.",
  },
};

export default function GuideBlurFace() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Blur Faces in Photos', url: '/guides/blur-face-in-photo' }
      ]} />
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>How to Blur Faces in Photos</h1>

          <h2>Why Blur Faces in Photos?</h2>
          <p>
            Privacy regulations like GDPR (Europe), CCPA (California), and PIPEDA (Canada) require explicit consent before
            sharing identifiable photos publicly. Blurring faces protects individuals&#39; privacy rights and prevents legal issues
            when posting to social media, blogs, forums, or news sites.
          </p>
          <p>
            Beyond legal compliance, face blurring prevents doxxing, stalking, and identity theft. Children&#39;s faces should
            always be blurred when sharing school events, playground photos, or family gatherings online. Street photography,
            protest documentation, accident reports, and workplace training materials all require face anonymization before publication.
          </p>
          <p>
            Many platforms (Facebook, Instagram) don&#39;t blur faces automatically. Reddit, forums, and marketplace listings
            (selling items with people in background) require manual blurring. Even if people consented to the original photo,
            public sharing changes the context—blurring is ethical best practice.
          </p>

          <h2>How to Blur Faces: Step-by-Step</h2>
          <ol>
            <li>
              <strong>Open the redaction tool</strong>: Visit <a href="/redact">/redact</a> in any browser.
              Works on iPhone Safari, Android Chrome, desktop browsers—no app installation required. Everything runs locally;
              photos never leave your device.
            </li>
            <li>
              <strong>Upload your photo</strong>: Drag and drop the image, or click &quot;Choose Files&quot; to select from your device.
              Multiple photos can be processed in batches. File size limits apply only to browser memory, not server uploads—we don&#39;t upload anything.
            </li>
            <li>
              <strong>Select redaction method</strong>: Three options available:
              <ul>
                <li><strong>Blur</strong>: Soft gaussian blur. Quick but potentially reversible with advanced image processing. Use for casual sharing.</li>
                <li><strong>Pixelate</strong>: Strong mosaic effect (20-50px blocks). Nearly impossible to reverse. Best for privacy-critical scenarios.</li>
                <li><strong>Solid block</strong>: Completely opaque rectangle. 100% irreversible. Use for GDPR strict compliance or sensitive cases.</li>
              </ul>
            </li>
            <li>
              <strong>Draw redaction boxes</strong>: Click and drag to create a rectangle over each face. Pro tip: make boxes
              10-20% larger than the face to prevent partial exposure at edges. Cover entire head including hair if hair is distinctive
              (unusual color, style).
            </li>
            <li>
              <strong>Use presets for speed</strong>: The tool includes &quot;Face&quot; preset with recommended blur strength. Adjust intensity
              slider if needed—higher values = stronger anonymization but may look unnatural.
            </li>
            <li>
              <strong>Review carefully</strong>: Zoom in to check edges. Ensure no partial face features visible (chin, forehead edges).
              Check reflections in windows, mirrors, sunglasses—faces can appear in unexpected places.
            </li>
            <li>
              <strong>Export</strong>: Click &quot;Download&quot;. Exported images have EXIF/GPS automatically stripped for additional privacy.
              Choose JPEG for smallest file size or PNG if image contains text/graphics needing sharpness.
            </li>
            <li>
              <strong>Batch processing</strong>: For multiple images, process all, then &quot;Download ZIP&quot; to get all blurred photos in one file.
            </li>
          </ol>

          <h2>Tips & Best Practices</h2>
          <ul>
            <li><strong>Use pixelate, not soft blur</strong>: Security researchers have demonstrated blur reversal using AI. Pixelation with 20px+ blocks is much safer.</li>
            <li><strong>Make boxes generously sized</strong>: Better to blur extra background than leave part of a face visible. Hairlines and chins can be identifying.</li>
            <li><strong>Don&#39;t forget reflections</strong>: Check car windows, storefront glass, phone screens in photos. Faces often reflect in unexpected surfaces.</li>
            <li><strong>Check sunglasses and glasses</strong>: Reflections in eyewear can reveal what the person is looking at—sometimes revealing other faces or private information.</li>
            <li><strong>Consider distinctive features</strong>: Unusual tattoos, scars, birthmarks can be identifying even with face blurred. Blur these too if privacy is critical.</li>
            <li><strong>Blur children&#39;s faces always</strong>: Even if they&#39;re your own kids. Once online, photos can be copied and misused. Err on side of overprotection.</li>
            <li><strong>Ask permission anyway</strong>: Blurring doesn&#39;t replace consent. If possible, ask people before sharing their photo, even blurred.</li>
            <li><strong>Test reversibility</strong>: After blurring, ask someone unfamiliar with the subjects if they can identify anyone. If yes, increase blur strength.</li>
            <li><strong>Keep original unblurred copy privately</strong>: In case you need it later for legal purposes or different context. Store securely, don&#39;t share publicly.</li>
          </ul>

          <h2>When to Blur Faces</h2>
          <p><strong>Always blur faces for:</strong></p>
          <ul>
            <li>Children in any public photos (schools, playgrounds, sports events)</li>
            <li>Street photography posted publicly (Flickr, Instagram, photography portfolios)</li>
            <li>Workplace training materials, safety documentation, HR examples</li>
            <li>Protest or political demonstration photos (to protect participants)</li>
            <li>Accident reports, insurance claims, police reports</li>
            <li>Real estate listings showing tenants or previous owners</li>
            <li>Product reviews on marketplaces showing people in background</li>
            <li>Medical or healthcare documentation (HIPAA compliance in US)</li>
            <li>Security footage shared publicly (Ring doorbell, surveillance cameras)</li>
          </ul>
          <p><strong>When NOT to blur:</strong></p>
          <ul>
            <li>Private family albums shared only with known contacts (e.g., iCloud shared albums with family)</li>
            <li>Professional photography with signed model releases</li>
            <li>Public figures at official events (politicians, celebrities at press conferences)</li>
            <li>Historical documentation where identity is important and consented</li>
          </ul>
          <p><strong>GDPR-specific guidance:</strong></p>
          <ul>
            <li>EU/UK law: Identifiable faces in public photos require consent or legitimate interest. Blur if unsure.</li>
            <li>Exceptions: Journalism, artistic expression, public interest can override—but consult legal advice.</li>
            <li>Children under 13: Parent/guardian consent required. Always blur children&#39;s faces in public posts to be safe.</li>
          </ul>
        </div>

        <div className="card">
          <h2>Related Guides</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/guides/license-plate-redaction" className="pill">Blur license plates</a>
            <a href="/guides/black-out-text-in-image" className="pill">Black out text</a>
            <a href="/guides/blur-number-plate-online" className="pill">Blur number plates (UK)</a>
            <a href="/guides/redaction-checklist" className="pill">Privacy checklist</a>
            <a href="/guides/anonymized-sharing" className="pill">Anonymous sharing</a>
          </div>
        </div>

        <FaqJsonLd
          items={[
            {
              question: "How to blur faces in photos for free?",
              answer: "Use our browser-based redaction tool at pixcloak.com/redact. No app download or account needed. Upload photo, draw boxes over faces, choose pixelate or blur, then export. Works on iPhone, Android, desktop—all processing is local, no uploads."
            },
            {
              question: "Should I use blur or pixelate for faces?",
              answer: "Use pixelate (20-50px mosaic) for best privacy. Soft blur can sometimes be reversed using AI tools. Pixelation is nearly impossible to reverse. For GDPR compliance or sensitive photos, use solid blocks (100% irreversible)."
            },
            {
              question: "Is it legal to post photos of people without blurring?",
              answer: "Depends on jurisdiction. EU/UK (GDPR) requires consent for identifiable faces in public photos. US has fewer restrictions but varies by state. Canada (PIPEDA) also requires consent. Always blur children&#39;s faces regardless of location."
            },
            {
              question: "Can blurred faces be un-blurred?",
              answer: "Soft gaussian blur can sometimes be partially reversed using advanced AI deblurring. Pixelation (mosaic) and solid blocks cannot be reversed—information is permanently destroyed. Use pixelate or solid for strong privacy."
            },
            {
              question: "Do I need to blur faces in my own photos?",
              answer: "Yes, if other people are identifiable and you&#39;re sharing publicly. Having someone in your photo doesn&#39;t grant automatic rights to publish their face online. GDPR applies even to personal photos shared on social media."
            },
            {
              question: "How do I blur faces on iPhone without an app?",
              answer: "Use our web tool in Safari browser: visit pixcloak.com/redact, upload photo from camera roll, blur faces, download blurred version. No app installation needed. Works in iPhone Safari, Chrome, any mobile browser."
            },
            {
              question: "What parts of the face should I blur?",
              answer: "Blur the entire face from hairline to chin, ear to ear. Include distinctive features like unusual hair, glasses, visible tattoos on neck/head. Check for face reflections in windows, mirrors, sunglasses in the photo."
            },
            {
              question: "Does blurring faces remove EXIF and GPS data?",
              answer: "Our tool automatically strips EXIF/GPS metadata when you export blurred images. This protects location privacy in addition to face privacy. Most other blur tools don't remove metadata—ours does by default."
            },
          ]}
        />
      </div>
    </>
  );
}


