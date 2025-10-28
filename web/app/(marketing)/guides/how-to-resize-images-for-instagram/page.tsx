import type { Metadata } from 'next';
import { FaqJsonLd } from '@/components/SeoJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: "How to Resize Images for Instagram: Feed,... | PixCloak",
  description: "Resize images to Instagram's exact sizes—1080x1080 (feed), 1080x1350 (portrait), 1080x1920 (Stories/Reels). Works offline in your browser, no uploads. Free tool with quality guide and batch processing support.",
  alternates: {
    canonical: "/guides/how-to-resize-images-for-instagram",
    languages: { "x-default": "/guides/how-to-resize-images-for-instagram", en: "/guides/how-to-resize-images-for-instagram" },
  },
  openGraph: {
    title: "How to Resize Images for Instagram: Feed, Stories, Reels",
    description: "Resize to Instagram's exact sizes. Free tool, works offline, no uploads.",
    url: "/guides/how-to-resize-images-for-instagram",
    type: "article",
  },
};

export default function GuideResizeInstagram() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: '/' },
        { name: 'Guides', url: '/guides' },
        { name: 'Resize for Instagram', url: '/guides/how-to-resize-images-for-instagram' }
      ]} />

      <div className="container" style={{ display: 'grid', gap: 12 }}>
        <div className="card">
          <h1>How to Resize Images for Instagram: Feed, Stories, Reels (2025)</h1>

          <p style={{ background: '#f0f9ff', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <strong>Quick Answer:</strong> Instagram feed posts: 1080×1080 (square) or 1080×1350 (portrait). Instagram Stories/Reels: 1080×1920 (vertical).
            Use our <a href="/tools/resize-image">free resize tool</a> to adjust images to exact dimensions—works offline, no uploads, takes 30 seconds.
          </p>

          <h2>Instagram Image Size Requirements (2025)</h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginTop: '12px' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Post Type</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Dimensions</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Aspect Ratio</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Feed (Square)</strong></td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1080×1080</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1:1</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Universal—works everywhere, gallery consistency</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Feed (Portrait)</strong></td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1080×1350</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>4:5</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>More vertical space in feed, single subjects</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Feed (Landscape)</strong></td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1080×566</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1.91:1</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Wide photos, panoramas (less common)</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Stories</strong></td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1080×1920</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>9:16</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Full-screen mobile vertical content</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Reels</strong></td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1080×1920</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>9:16</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Short-form vertical videos (same as Stories)</td>
              </tr>
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}><strong>Profile Picture</strong></td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>320×320</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>1:1</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #eee' }}>Small circular avatar (upload 1080×1080)</td>
              </tr>
            </tbody>
          </table>

          <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            <strong>Note:</strong> Instagram compresses all uploads. For best quality, always upload at full resolution (1080px).
            Smaller images get upscaled and look pixelated. Larger images (e.g., 4K) get downscaled automatically.
          </p>
        </div>

        <div className="card">
          <h2>How to Resize Images for Instagram (Step-by-Step)</h2>

          <h3>Method 1: Using PixCloak (Recommended)</h3>
          <p><strong>Fast, free, no uploads.</strong> Works offline in your browser. Takes 30 seconds.</p>

          <ol style={{ lineHeight: '1.8' }}>
            <li>
              <strong>Open <a href="/tools/resize-image">Image Resizer Tool</a></strong>
              <br /><span style={{ fontSize: '14px', color: '#666' }}>No account or download needed—works directly in browser</span>
            </li>
            <li>
              <strong>Upload your image</strong>
              <br /><span style={{ fontSize: '14px', color: '#666' }}>Click "Choose File" or drag and drop. Any size, any format (JPG/PNG/WebP)</span>
            </li>
            <li>
              <strong>Select Instagram preset OR custom dimensions:</strong>
              <ul style={{ marginTop: '8px', fontSize: '14px' }}>
                <li><strong>Feed (Square):</strong> Enter 1080 width, 1080 height</li>
                <li><strong>Feed (Portrait):</strong> Enter 1080 width, 1350 height</li>
                <li><strong>Stories/Reels:</strong> Enter 1080 width, 1920 height</li>
              </ul>
            </li>
            <li>
              <strong>Choose fit mode:</strong>
              <ul style={{ marginTop: '8px', fontSize: '14px' }}>
                <li><strong>Contain (recommended):</strong> Fits entire image inside dimensions—adds padding if needed, no cropping</li>
                <li><strong>Cover:</strong> Fills entire area—may crop edges to avoid padding</li>
                <li><strong>Stretch:</strong> Forces exact dimensions—may distort image (not recommended)</li>
              </ul>
            </li>
            <li>
              <strong>Preview and download</strong>
              <br /><span style={{ fontSize: '14px', color: '#666' }}>Check result, then click download. File stays on your device—no uploads</span>
            </li>
          </ol>

          <p style={{ background: '#f0fdf4', padding: '12px', borderRadius: '6px', marginTop: '16px', fontSize: '14px' }}>
            <strong>💡 Pro Tip:</strong> Resize BEFORE compressing. Order: Resize → <a href="/compress">Compress to 200-500KB</a> → Upload to Instagram.
            This preserves maximum quality and reduces file size by 70-90%.
          </p>
        </div>

        <div className="card">
          <h2>Which Instagram Size Should I Use?</h2>

          <h3>1080×1080 (Square) - Most Versatile</h3>
          <p><strong>Best for:</strong></p>
          <ul>
            <li>General posts, photos, graphics</li>
            <li>Consistent gallery look (all posts same size)</li>
            <li>Brand accounts wanting uniform aesthetic</li>
            <li>Product photos (shows full product without cropping)</li>
          </ul>
          <p>
            <strong>Why choose square:</strong> Works perfectly everywhere on Instagram—feed, profile grid, explore page. No cropping, no surprises.
            Safest choice if unsure. Most professional accounts use 1:1 exclusively for consistency.
          </p>

          <h3>1080×1350 (Portrait) - Maximum Feed Space</h3>
          <p><strong>Best for:</strong></p>
          <ul>
            <li>Single-subject photos (person, product, portrait)</li>
            <li>When you want to take up more screen space in feed</li>
            <li>Fashion, fitness, lifestyle content</li>
            <li>Vertical photos from phone cameras</li>
          </ul>
          <p>
            <strong>Why choose portrait:</strong> Takes 20% more vertical space in feed = more visible = better engagement. But looks inconsistent
            if mixed with square posts (profile grid shows different sizes). Best if you commit to portrait for all posts.
          </p>

          <h3>1080×1920 (Vertical) - Stories & Reels Only</h3>
          <p><strong>Best for:</strong></p>
          <ul>
            <li>Instagram Stories (24-hour temporary content)</li>
            <li>Reels (short-form video, but also images)</li>
            <li>Full-screen mobile experience</li>
            <li>Behind-the-scenes, casual content</li>
          </ul>
          <p>
            <strong>Why choose vertical:</strong> Fills entire phone screen—maximum impact. But ONLY for Stories/Reels. Don't post 9:16 images
            to feed—they'll be cropped to 4:5 and look terrible in profile grid.
          </p>
        </div>

        <div className="card">
          <h2>Common Mistakes (and How to Avoid Them)</h2>

          <h3>Mistake 1: Uploading Wrong Aspect Ratio</h3>
          <p>
            <strong>Problem:</strong> Uploading 16:9 landscape or 9:16 vertical to feed. Instagram auto-crops unpredictably—cuts off faces, text, important elements.
          </p>
          <p>
            <strong>Fix:</strong> Always crop to correct aspect ratio (1:1 or 4:5) using <a href="/tools/crop-templates">Crop Tool</a> BEFORE resizing.
            This gives you control over what gets cropped instead of letting Instagram decide.
          </p>

          <h3>Mistake 2: Uploading Too Small</h3>
          <p>
            <strong>Problem:</strong> Uploading 640×640 or smaller. Instagram upscales to 1080px—results in blurry, pixelated images.
          </p>
          <p>
            <strong>Fix:</strong> Always upload 1080px minimum. Instagram's compression is aggressive—starting with higher quality preserves
            better results after compression.
          </p>

          <h3>Mistake 3: Uploading Huge Files (4K+)</h3>
          <p>
            <strong>Problem:</strong> Uploading 4000×4000 or larger. Wastes mobile data, slow upload, Instagram downscales to 1080px anyway.
          </p>
          <p>
            <strong>Fix:</strong> Resize to 1080px BEFORE uploading. Saves time, bandwidth, and often preserves better quality (you control
            resizing algorithm vs Instagram's server-side compression).
          </p>

          <h3>Mistake 4: Not Checking Mobile Preview</h3>
          <p>
            <strong>Problem:</strong> Image looks great on desktop but terrible on phone (where 95% of Instagram viewing happens).
          </p>
          <p>
            <strong>Fix:</strong> After resizing, view image on phone before posting. Check that important elements (faces, text, products)
            are visible and not too small. What's readable on 27" monitor may be tiny on 6" phone screen.
          </p>

          <h3>Mistake 5: Inconsistent Sizes in Profile Grid</h3>
          <p>
            <strong>Problem:</strong> Mixing 1:1, 4:5, and 1.91:1 in profile grid. Looks messy and unprofessional.
          </p>
          <p>
            <strong>Fix:</strong> Pick ONE aspect ratio (usually 1:1) and stick with it for all posts. Consistent grid = professional look =
            better first impression for new visitors.
          </p>
        </div>

        <div className="card">
          <h2>Best Practices for Instagram Image Quality</h2>

          <h3>1. Start with High-Resolution Original</h3>
          <p>
            <strong>Use highest quality source possible.</strong> If shooting with phone, use max resolution setting (12MP+). If using DSLR,
            export at full resolution. You can always downsize, but can't upsize without quality loss.
          </p>

          <h3>2. Resize Then Compress (Not the Other Way Around)</h3>
          <p><strong>Correct order:</strong></p>
          <ol>
            <li>Crop to Instagram aspect ratio (if needed) using <a href="/tools/crop-templates">Crop Tool</a></li>
            <li>Resize to 1080px using <a href="/tools/resize-image">Resize Tool</a></li>
            <li>Compress to 200-500KB using <a href="/compress">Compressor</a></li>
            <li>Upload to Instagram</li>
          </ol>
          <p>
            <strong>Wrong order (Compress → Resize) causes:</strong> Quality loss from double processing, visible compression artifacts,
            blurry edges, color banding.
          </p>

          <h3>3. Use JPG for Photos, PNG for Graphics</h3>
          <p>
            <strong>JPG:</strong> Photos, portraits, landscapes—lossy compression works great for photos. Quality 85-90 = no visible loss.
            <br /><strong>PNG:</strong> Graphics with text, logos, screenshots—lossless compression preserves sharp edges. Use <a href="/tools/png-jpg-converter">PNG to JPG Converter</a> if file too large.
          </p>

          <h3>4. Avoid Heavy Filters Before Upload</h3>
          <p>
            <strong>Instagram compresses uploads.</strong> Heavy filters (especially grain/noise effects) compress poorly—creates color banding,
            muddy colors, artifacts. Apply subtle edits, let Instagram's compression work with clean images, THEN add Instagram filters if needed.
          </p>

          <h3>5. Check Safe Zones for Text/Faces</h3>
          <p>
            <strong>Instagram UI overlays text on images:</strong> Username, likes, share buttons. Keep important elements (faces, text, products)
            in center 80% of image. Leave 10% margin around edges to avoid UI overlap.
          </p>
        </div>

        <div className="card">
          <h2>Batch Resizing for Multiple Images</h2>
          <p>
            <strong>Need to resize 10, 50, 100+ images for Instagram?</strong> Use batch processing instead of one-by-one:
          </p>

          <h3>Steps for Batch Resize</h3>
          <ol>
            <li><strong>Open <a href="/tools/resize-image">Resize Tool</a></strong> and select "Batch" mode</li>
            <li><strong>Upload all images</strong> (drag entire folder or Ctrl+A to select all)</li>
            <li><strong>Set dimensions once</strong> (1080×1080 or 1080×1350—applies to all)</li>
            <li><strong>Choose fit mode</strong> (Contain for no cropping, Cover to fill)</li>
            <li><strong>Process all</strong> (takes 5-30 seconds depending on quantity)</li>
            <li><strong>Download ZIP</strong> (all resized images in one file)</li>
          </ol>

          <p style={{ background: '#f0fdf4', padding: '12px', borderRadius: '6px', marginTop: '16px', fontSize: '14px' }}>
            <strong>💡 Time Saver:</strong> Batch resize 100 images in 30 seconds vs 50+ minutes one-by-one. Essential for photographers,
            content creators, social media managers posting frequently.
          </p>
        </div>

        <div className="card">
          <h2>Instagram Carousel Posts (Multiple Images)</h2>
          <p>
            <strong>Carousel posts (swipe right, up to 10 images):</strong> All images must be same aspect ratio. Mix-and-match = Instagram
            auto-crops all to match first image.
          </p>

          <h3>Carousel Best Practices</h3>
          <ul>
            <li><strong>Use 1:1 (square) for all images</strong>—safest choice, no cropping surprises</li>
            <li><strong>Or use 4:5 (portrait) for all</strong>—more vertical space, but requires careful composition</li>
            <li><strong>Never mix ratios</strong> (e.g., 1 square + 1 portrait = Instagram crops portrait to square, cutting top/bottom)</li>
            <li><strong>Resize entire set to same dimensions</strong> using batch mode—ensures consistency</li>
          </ul>
        </div>

        <div className="card">
          <h2>Tools for Resizing Instagram Images</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/tools/resize-image" className="pill">Resize Images</a>
            <a href="/tools/crop-templates" className="pill">Crop to Aspect Ratio</a>
            <a href="/compress" className="pill">Compress Images</a>
            <a href="/tools/batch-rename" className="pill">Batch Rename</a>
          </div>
        </div>

        <FaqJsonLd items={[
          { question: "What size should I make my images for Instagram?", answer: "Instagram feed (square): 1080×1080 pixels. Instagram feed (portrait): 1080×1350 pixels. Instagram Stories/Reels: 1080×1920 pixels. Always use 1080px width for best quality. Instagram compresses images, so uploading at full 1080px resolution preserves quality after compression." },
          { question: "How do I resize images for Instagram for free?", answer: "Use PixCloak's free Resize Image tool (/tools/resize-image). Upload image, enter 1080×1080 (square) or 1080×1350 (portrait), choose fit mode, download. Works offline in browser—no uploads to servers. Supports batch processing for multiple images. Takes 30 seconds." },
          { question: "Should I use square or portrait for Instagram?", answer: "Square (1080×1080) for consistent gallery aesthetic, universal compatibility, product photos. Portrait (1080×1350) for more vertical space in feed, single subjects, fashion/lifestyle content. Square is safer—works everywhere without cropping. Portrait takes 20% more screen space but looks inconsistent if mixed with square in profile grid." },
          { question: "Why do my Instagram photos look blurry?", answer: "Common causes: 1) Uploaded image smaller than 1080px (Instagram upscales = blurry). 2) Used low-quality compression before upload. 3) Heavy filters create compression artifacts. Fix: Always resize to 1080px, compress to 200-500KB (not smaller), avoid heavy grain/noise filters. Order: Resize → Compress → Upload." },
          { question: "What is the best aspect ratio for Instagram feed?", answer: "1:1 (square) is most versatile—works everywhere, looks professional in profile grid. 4:5 (portrait) for more vertical space—better engagement, but commit to portrait for ALL posts to maintain consistency. Avoid 16:9 landscape—Instagram crops to 1.91:1 max, cutting sides." },
          { question: "Can I post vertical images on Instagram feed?", answer: "Yes—use 4:5 aspect ratio (1080×1350). Maximum allowed height. Don't use 9:16 (Stories format) for feed posts—Instagram crops to 4:5, cutting top/bottom. For full vertical (9:16), use Stories or Reels instead. Always crop to 4:5 before posting to feed to control what gets shown." },
          { question: "How do I resize images for Instagram Stories?", answer: "Instagram Stories: 1080×1920 pixels (9:16 aspect ratio). Use Resize Image tool, enter 1080 width × 1920 height. Choose 'Cover' fit mode to fill entire screen (may crop edges) or 'Contain' to fit entire image (adds padding bars). Stories are full-screen mobile—design for vertical viewing." },
          { question: "What happens if I upload the wrong size to Instagram?", answer: "Instagram auto-crops images to fit required dimensions. Wrong aspect ratio = unpredictable cropping—may cut off faces, text, important elements. Too small = upscaled and blurry. Too large = downscaled (wastes upload time). Always resize to correct dimensions first using Resize or Crop tool to control composition." },
          { question: "How do I resize multiple images for Instagram at once?", answer: "Use batch resize: Upload all images to Resize Image tool, set dimensions once (1080×1080 or 1080×1350), choose fit mode, process all, download ZIP. Resizes 100+ images in 30 seconds vs 50+ minutes one-by-one. Essential for photographers and content creators." },
          { question: "Do I need to compress images before uploading to Instagram?", answer: "Yes—recommended. Instagram compresses uploads aggressively. By compressing to 200-500KB before upload (using Image Compressor), you control quality loss and reduce upload time. Order: Resize to 1080px → Compress to 200-500KB → Upload to Instagram. This preserves better quality than uploading huge files and letting Instagram compress." },
        ]} />
      </div>
    </>
  );
}

