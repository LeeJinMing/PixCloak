import type { Metadata } from 'next';
import Client from './Client';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';
import { SoftwareAppJsonLd, FaqJsonLd } from '@/components/SeoJsonLd';

export const metadata: Metadata = {
  title: "Free Image Cropper: 1:1, 4:3, 16:9 Templates | PixCloak",
  description: "Crop images to exact aspect ratios (1:1 square, 4:3, 16:9) for Instagram, Facebook, LinkedIn. Works offline—no uploads. Batch process and download ZIP.",
  alternates: {
    canonical: "/tools/crop-templates",
    languages: { "x-default": "/tools/crop-templates", en: "/tools/crop-templates" },
  },
  openGraph: {
    title: "Free Image Cropper: 1:1, 4:3, 16:9 Templates",
    description: "Crop to exact aspect ratios for social media. Works offline, no uploads.",
    url: "/tools/crop-templates",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Tools', url: '/tools' },
        { name: 'Image Cropper', url: '/tools/crop-templates' }
      ]} />

      <SoftwareAppJsonLd
        name="Image Cropper"
        url="/tools/crop-templates"
        description="Crop images to exact aspect ratios (1:1, 4:3, 16:9) for social media. 100% local processing, no uploads."
      />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>Free Image Cropper: Crop to 1:1, 4:3, 16:9 (No Upload)</h1>

          <h2>Quick Start</h2>
          <ol>
            <li><strong>Upload image</strong> (any size, JPG/PNG/WebP)</li>
            <li><strong>Select aspect ratio</strong> (1:1 square, 4:3, 16:9, or custom)</li>
            <li><strong>Adjust crop area</strong> with visual guide (drag to reposition)</li>
            <li><strong>Download result</strong> or batch process multiple images as ZIP</li>
          </ol>
          <p><strong>Works locally. No uploads. Free, unlimited.</strong></p>
        </div>

        <Client />

        <div className="card">
          <h2>Why Crop Images?</h2>
          <p>
            <strong>Social media platforms require specific aspect ratios for optimal display.</strong> Posting images with wrong ratios
            results in automatic cropping by the platform—often cutting off faces, text, or important elements. Pre-cropping to exact
            dimensions gives you full control over what viewers see.
          </p>

          <h3>What Happens Without Cropping</h3>
          <ul>
            <li><strong>Instagram feed:</strong> Vertical images get sides cropped; horizontal images get top/bottom cut off</li>
            <li><strong>Facebook timeline:</strong> Wrong aspect ratio images display smaller or get auto-cropped awkwardly</li>
            <li><strong>LinkedIn posts:</strong> Images exceeding 1.91:1 ratio get cropped, hiding top/bottom portions</li>
            <li><strong>Twitter/X:</strong> Images taller than 2:1 get preview cropped—users must click to see full image</li>
            <li><strong>Website banners:</strong> Uncropped images stretch or distort to fit container</li>
          </ul>
        </div>

        <div className="card">
          <h2>Common Aspect Ratios for Social Media</h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginTop: '12px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Platform</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Post Type</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Aspect Ratio</th>
                <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Pixel Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Instagram</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Feed post (square)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1:1</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1080x1080</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Instagram</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Feed post (portrait)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>4:5</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1080x1350</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Instagram</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Stories / Reels</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>9:16</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1080x1920</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Facebook</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Timeline post</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1.91:1</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1200x628</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Facebook</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Stories</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>9:16</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1080x1920</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>LinkedIn</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Feed post</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1.91:1</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1200x627</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Twitter/X</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Timeline post</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>16:9</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1200x675</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>YouTube</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Thumbnail</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>16:9</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1280x720</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Pinterest</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>Pin (portrait)</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>2:3</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>1000x1500</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2>Understanding Aspect Ratios</h2>

          <h3>What is Aspect Ratio?</h3>
          <p>
            <strong>Aspect ratio is the proportional relationship between width and height.</strong> Written as width:height (e.g., 16:9).
            A 1600×900 image and a 1920×1080 image both have 16:9 aspect ratio—same proportions, different pixel counts.
          </p>

          <h3>Common Aspect Ratios Explained</h3>
          <ul>
            <li>
              <strong>1:1 (Square):</strong> Width = Height. Best for Instagram feed, profile pictures, avatars. Universal—looks
              good everywhere. Neutral composition with no directional bias.
            </li>
            <li>
              <strong>4:3 (Standard):</strong> Classic TV and computer monitor ratio. Slightly wider than tall. Good for product
              photos, presentations, general web content. Balanced and familiar.
            </li>
            <li>
              <strong>16:9 (Widescreen):</strong> HD video standard. YouTube thumbnails, website banners, Twitter images.
              Panoramic feel—great for landscapes, group shots, cinematic content.
            </li>
            <li>
              <strong>4:5 (Portrait):</strong> Instagram's portrait format. Taller than wide. Takes more vertical space in feed,
              increasing visibility. Best for single-subject photos (person, product).
            </li>
            <li>
              <strong>9:16 (Vertical):</strong> Mobile video format (TikTok, Instagram Stories/Reels). Full-screen on phones.
              Ideal for short-form video thumbnails and vertical graphics.
            </li>
            <li>
              <strong>2:3 (Classic Portrait):</strong> Pinterest standard. Traditional photo ratio. Works well for fashion,
              recipes, infographics, and content meant for saving/bookmarking.
            </li>
          </ul>
        </div>

        <div className="card">
          <h2>How to Crop Images Effectively</h2>

          <h3>Step-by-Step Cropping Process</h3>
          <ol>
            <li>
              <strong>Choose aspect ratio first:</strong> Know where you're posting before cropping. Check platform requirements.
              Don't crop blindly and hope it fits later.
            </li>
            <li>
              <strong>Preview on mobile:</strong> 80% of social media views happen on phones. What looks good on desktop may cut off
              faces on mobile. Always check mobile preview.
            </li>
            <li>
              <strong>Leave breathing room:</strong> Don't crop tight to edges. Leave 5-10% margin around important elements.
              Prevents accidental cropping if platform algorithm adjusts display.
            </li>
            <li>
              <strong>Center important elements:</strong> Faces, text, logos should be in center third of image. Edges are most
              likely to get cut off by platform adjustments.
            </li>
            <li>
              <strong>Test different crops:</strong> Try multiple versions with different focal points. A/B test to see which
              performs better (higher engagement, clicks).
            </li>
          </ol>

          <h3>Visual Composition Tips</h3>
          <ul>
            <li><strong>Rule of thirds:</strong> Place subject at intersection of imaginary 3×3 grid (not dead center)</li>
            <li><strong>Headroom:</strong> Leave space above people's heads—don't crop at hairline</li>
            <li><strong>Text safety:</strong> Keep text away from edges—minimum 10% margin from all sides</li>
            <li><strong>Horizon line:</strong> For landscapes, place horizon at top or bottom third (not middle)</li>
          </ul>
        </div>

        <div className="card">
          <h2>Common Cropping Mistakes</h2>

          <h3>1. Cropping After Resizing</h3>
          <p>
            <strong>Wrong order:</strong> Resize → Crop results in quality loss.<br />
            <strong>Correct order:</strong> Crop → Resize preserves maximum quality.
          </p>
          <p>
            When you resize then crop, you're processing pixels twice. First resize compresses entire image, then crop discards
            some pixels—wasting processing and losing quality. Crop first to keep only what you need, then resize for optimal results.
          </p>

          <h3>2. Using Wrong Aspect Ratio</h3>
          <p>
            <strong>Consequence:</strong> Platform auto-crops your image unpredictably—faces, text, logos get cut off.
          </p>
          <p>
            <strong>Fix:</strong> Always verify platform requirements before cropping. Each platform has preferred ratios. A single
            image may need multiple crops for different platforms (1:1 for Instagram, 16:9 for Twitter, 2:3 for Pinterest).
          </p>

          <h3>3. Cropping Too Tight</h3>
          <p>
            <strong>Problem:</strong> No margin around subject—looks cramped, unprofessional.
          </p>
          <p>
            <strong>Fix:</strong> Leave 10-15% negative space around main subject. Gives image "breathing room" and prevents
            accidental detail loss if viewer's device has different screen aspect ratio.
          </p>

          <h3>4. Cutting Off Faces</h3>
          <p>
            <strong>Problem:</strong> Cropping through forehead or chin in profile/group shots.
          </p>
          <p>
            <strong>Fix:</strong> Include full head (hairline to chin) plus 20% space above. If multiple people, ensure all faces
            are 100% visible—even if that means zooming out and showing more background.
          </p>
        </div>

        <div className="card">
          <h2>Workflow Best Practices</h2>

          <h3>For Multiple Platform Posting</h3>
          <ol>
            <li><strong>Start with highest resolution original</strong> (4K or camera RAW if available)</li>
            <li><strong>Crop to largest format first</strong> (e.g., 16:9 widescreen)</li>
            <li><strong>Create additional crops</strong> from same high-res original (1:1, 4:5, etc.)</li>
            <li><strong>Compress after cropping</strong> using <a href="/compress">Image Compressor</a></li>
            <li><strong>Name files by platform</strong> (e.g., post-instagram.jpg, post-linkedin.jpg)</li>
          </ol>

          <h3>Batch Processing Multiple Images</h3>
          <p>
            <strong>For consistent branding across posts:</strong> Use same aspect ratio and crop position for all images in a series.
            Upload multiple images, apply same crop template, download as ZIP. Maintains visual consistency in feed/gallery view.
          </p>

          <h3>Quality Preservation</h3>
          <ul>
            <li><strong>Always crop before compressing</strong>—not after</li>
            <li><strong>Keep original files</strong> as backup for future re-crops</li>
            <li><strong>Use PNG for images with text</strong> (avoids JPEG compression artifacts around letters)</li>
            <li><strong>Use JPG for photos</strong> (smaller file size, sufficient quality)</li>
          </ul>
        </div>

        <div className="card">
          <h2>Related Tools</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/compress" className="pill">Compress Images</a>
            <a href="/tools/resize-image" className="pill">Resize Images</a>
            <a href="/tools/aspect-pad" className="pill">Add Padding (No Crop)</a>
            <a href="/tools/png-jpg-converter" className="pill">Convert Format</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "How do I crop an image to a specific aspect ratio?", answer: "Upload image, select desired aspect ratio (1:1, 4:3, 16:9, etc.), adjust crop area by dragging, download result. Tool shows visual guide to ensure exact proportions. Works locally—no uploads. Free, unlimited." },
          { question: "What aspect ratio is 1:1?", answer: "1:1 means width equals height (square). Common for Instagram feed posts, profile pictures, avatars. Examples: 1080x1080, 500x500, 2000x2000. All are 1:1 ratio with different pixel counts. Square format displays consistently across all platforms." },
          { question: "What size should I crop for Instagram?", answer: "Instagram feed (square): 1:1 ratio (1080x1080). Instagram feed (portrait): 4:5 ratio (1080x1350). Instagram Stories/Reels: 9:16 ratio (1080x1920). Square (1:1) is safest—works everywhere on Instagram without cropping." },
          { question: "Does cropping reduce image quality?", answer: "No—cropping removes pixels but doesn't compress remaining pixels. Quality stays same. However, crop BEFORE compressing for best results. Compress → Crop wastes processing and may reduce quality. Correct order: Crop → Compress." },
          { question: "Can I crop multiple images at once?", answer: "Yes—batch cropping available. Upload multiple images, select aspect ratio, apply same crop template to all, download as ZIP. Maintains consistency across all images. Great for social media series, product catalogs, event photos." },
          { question: "How do I crop without losing important parts?", answer: "1) Choose aspect ratio matching your needs first. 2) Position crop box to center important elements (faces, text, logos). 3) Leave 10-15% margin around edges. 4) Preview on mobile before finalizing. Tool shows exact crop area in real-time." },
          { question: "Should I crop before or after resizing?", answer: "Crop BEFORE resizing for best quality. Order: Original → Crop → Resize → Compress. This preserves maximum quality and processes only needed pixels. Wrong order (resize then crop) wastes processing and may introduce artifacts." },
          { question: "What's the best aspect ratio for Facebook posts?", answer: "Facebook timeline posts: 1.91:1 ratio (1200x628). Facebook Stories: 9:16 ratio (1080x1920). If posting to multiple platforms, create separate crops for each—Facebook's 1.91:1 won't work well on Instagram (needs 1:1 or 4:5)." },
        ]} />
      </div>
    </>
  );
}
