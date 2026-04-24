export type LongTailAction =
  | "compress"
  | "resize"
  | "redact"
  | "exif"
  | "watermark"
  | "remove-bg"
  | "sprite"
  | "lqip"
  | "convert"
  | "pad";

export type LongTailLocale = "en" | "es" | "pt" | "id" | "zh";

export type LongTailGuide = {
  slug: string;
  group: string;
  locale: LongTailLocale;
  keyword: string;
  action: LongTailAction;
  platform?: string;
  purpose?: string;
  targetSize?: string;
  targetKb?: number;
  targetDimensions?: string;
  toolPath: string;
};

type GuideOptions = {
  group?: string;
  locale?: LongTailLocale;
  platform?: string;
  purpose?: string;
};

type ResizeOptions = GuideOptions & {
  width?: number;
  height?: number;
};

const compressGuide = (
  slug: string,
  keyword: string,
  targetSize: string,
  targetKb: number,
  options: GuideOptions = {}
): LongTailGuide => ({
  slug,
  group: options.group ?? slug,
  locale: options.locale ?? "en",
  keyword,
  action: "compress",
  platform: options.platform,
  purpose: options.purpose,
  targetSize,
  targetKb,
  toolPath: `/compress?kb=${targetKb}`,
});

const resizeGuide = (
  slug: string,
  keyword: string,
  targetDimensions: string,
  options: ResizeOptions = {}
): LongTailGuide => {
  const params = new URLSearchParams();
  if (options.width) params.set("width", options.width.toString());
  if (options.height) params.set("height", options.height.toString());
  const query = params.toString();
  return {
    slug,
    group: options.group ?? slug,
    locale: options.locale ?? "en",
    keyword,
    action: "resize",
    platform: options.platform,
    purpose: options.purpose,
    targetDimensions,
    toolPath: query ? `/tools/resize-image?${query}` : "/tools/resize-image",
  };
};

const toolGuide = (
  slug: string,
  keyword: string,
  action: LongTailAction,
  toolPath: string,
  options: GuideOptions = {}
): LongTailGuide => ({
  slug,
  group: options.group ?? slug,
  locale: options.locale ?? "en",
  keyword,
  action,
  platform: options.platform,
  purpose: options.purpose,
  toolPath,
});

export const LONG_TAIL_GUIDES: LongTailGuide[] = [
  compressGuide(
    "compress-to-200kb-for-linkedin",
    "LinkedIn images",
    "200KB",
    200,
    { platform: "LinkedIn", purpose: "profile photos and posts" }
  ),
  compressGuide(
    "compress-to-500kb-for-instagram",
    "Instagram posts",
    "500KB",
    500,
    { platform: "Instagram", purpose: "feed posts and stories" }
  ),
  resizeGuide(
    "resize-to-1080x1080-for-instagram",
    "Instagram square posts",
    "1080x1080",
    { platform: "Instagram", purpose: "square feed layouts", width: 1080, height: 1080 }
  ),
  compressGuide(
    "compress-to-100kb-for-email",
    "email images",
    "100KB",
    100,
    { platform: "email", purpose: "inline images and signatures" }
  ),
  compressGuide(
    "job-application-500kb",
    "job application uploads",
    "500KB",
    500,
    { platform: "job application portals", purpose: "resume and portfolio attachments" }
  ),
  compressGuide(
    "resume-200kb",
    "resume images",
    "200KB",
    200,
    { platform: "ATS systems", purpose: "resume uploads" }
  ),
  compressGuide(
    "gov-portal-200kb-cn",
    "government portal uploads",
    "200KB",
    200,
    { locale: "zh", platform: "government portals", purpose: "passport and visa forms" }
  ),
  toolGuide(
    "passport-scan-redact",
    "passport scans",
    "redact",
    "/redact",
    { purpose: "mask MRZ, ID numbers, and signatures" }
  ),
  compressGuide(
    "youtube-thumbnail-200kb",
    "YouTube thumbnails",
    "200KB",
    200,
    { platform: "YouTube", purpose: "thumbnail uploads" }
  ),
  compressGuide(
    "youtube-thumbnail-200kb-es",
    "YouTube thumbnails",
    "200KB",
    200,
    { group: "youtube-thumbnail-200kb", locale: "es", platform: "YouTube", purpose: "thumbnail uploads" }
  ),
  compressGuide(
    "youtube-thumbnail-200kb-pt",
    "YouTube thumbnails",
    "200KB",
    200,
    { group: "youtube-thumbnail-200kb", locale: "pt", platform: "YouTube", purpose: "thumbnail uploads" }
  ),
  compressGuide(
    "youtube-thumbnail-200kb-id",
    "YouTube thumbnails",
    "200KB",
    200,
    { group: "youtube-thumbnail-200kb", locale: "id", platform: "YouTube", purpose: "thumbnail uploads" }
  ),
  resizeGuide(
    "instagram-story-1080x1920",
    "Instagram Stories",
    "1080x1920",
    { platform: "Instagram", purpose: "full-screen story layouts", width: 1080, height: 1920 }
  ),
  resizeGuide(
    "instagram-story-1080x1920-es",
    "Instagram Stories",
    "1080x1920",
    { group: "instagram-story-1080x1920", locale: "es", platform: "Instagram", purpose: "full-screen story layouts", width: 1080, height: 1920 }
  ),
  resizeGuide(
    "instagram-story-1080x1920-pt",
    "Instagram Stories",
    "1080x1920",
    { group: "instagram-story-1080x1920", locale: "pt", platform: "Instagram", purpose: "full-screen story layouts", width: 1080, height: 1920 }
  ),
  resizeGuide(
    "instagram-story-1080x1920-id",
    "Instagram Stories",
    "1080x1920",
    { group: "instagram-story-1080x1920", locale: "id", platform: "Instagram", purpose: "full-screen story layouts", width: 1080, height: 1920 }
  ),
  compressGuide(
    "tiktok-avatar-200kb",
    "TikTok avatars",
    "200KB",
    200,
    { platform: "TikTok", purpose: "profile avatars" }
  ),
  compressGuide(
    "tiktok-avatar-200kb-es",
    "TikTok avatars",
    "200KB",
    200,
    { group: "tiktok-avatar-200kb", locale: "es", platform: "TikTok", purpose: "profile avatars" }
  ),
  compressGuide(
    "tiktok-avatar-200kb-pt",
    "TikTok avatars",
    "200KB",
    200,
    { group: "tiktok-avatar-200kb", locale: "pt", platform: "TikTok", purpose: "profile avatars" }
  ),
  compressGuide(
    "tiktok-avatar-200kb-id",
    "TikTok avatars",
    "200KB",
    200,
    { group: "tiktok-avatar-200kb", locale: "id", platform: "TikTok", purpose: "profile avatars" }
  ),
  resizeGuide(
    "facebook-cover-820x312",
    "Facebook cover images",
    "820x312",
    { platform: "Facebook", purpose: "cover photos", width: 820, height: 312 }
  ),
  resizeGuide(
    "facebook-cover-820x312-es",
    "Facebook cover images",
    "820x312",
    { group: "facebook-cover-820x312", locale: "es", platform: "Facebook", purpose: "cover photos", width: 820, height: 312 }
  ),
  resizeGuide(
    "facebook-cover-820x312-pt",
    "Facebook cover images",
    "820x312",
    { group: "facebook-cover-820x312", locale: "pt", platform: "Facebook", purpose: "cover photos", width: 820, height: 312 }
  ),
  resizeGuide(
    "facebook-cover-820x312-id",
    "Facebook cover images",
    "820x312",
    { group: "facebook-cover-820x312", locale: "id", platform: "Facebook", purpose: "cover photos", width: 820, height: 312 }
  ),
  resizeGuide(
    "wordpress-featured-1200x628",
    "WordPress featured images",
    "1200x628",
    { platform: "WordPress", purpose: "blog featured images", width: 1200, height: 628 }
  ),
  resizeGuide(
    "wordpress-featured-1200x628-es",
    "WordPress featured images",
    "1200x628",
    { group: "wordpress-featured-1200x628", locale: "es", platform: "WordPress", purpose: "blog featured images", width: 1200, height: 628 }
  ),
  resizeGuide(
    "wordpress-featured-1200x628-pt",
    "WordPress featured images",
    "1200x628",
    { group: "wordpress-featured-1200x628", locale: "pt", platform: "WordPress", purpose: "blog featured images", width: 1200, height: 628 }
  ),
  resizeGuide(
    "wordpress-featured-1200x628-id",
    "WordPress featured images",
    "1200x628",
    { group: "wordpress-featured-1200x628", locale: "id", platform: "WordPress", purpose: "blog featured images", width: 1200, height: 628 }
  ),
  resizeGuide(
    "notion-cover-1500px",
    "Notion cover images",
    "1500px wide",
    { platform: "Notion", purpose: "workspace covers", width: 1500 }
  ),
  resizeGuide(
    "notion-cover-1500px-es",
    "Notion cover images",
    "1500px wide",
    { group: "notion-cover-1500px", locale: "es", platform: "Notion", purpose: "workspace covers", width: 1500 }
  ),
  resizeGuide(
    "notion-cover-1500px-pt",
    "Notion cover images",
    "1500px wide",
    { group: "notion-cover-1500px", locale: "pt", platform: "Notion", purpose: "workspace covers", width: 1500 }
  ),
  resizeGuide(
    "notion-cover-1500px-id",
    "Notion cover images",
    "1500px wide",
    { group: "notion-cover-1500px", locale: "id", platform: "Notion", purpose: "workspace covers", width: 1500 }
  ),
  compressGuide(
    "slack-upload-200kb",
    "Slack uploads",
    "200KB",
    200,
    { platform: "Slack", purpose: "workspace image uploads" }
  ),
  compressGuide(
    "slack-upload-200kb-es",
    "Slack uploads",
    "200KB",
    200,
    { group: "slack-upload-200kb", locale: "es", platform: "Slack", purpose: "workspace image uploads" }
  ),
  compressGuide(
    "slack-upload-200kb-pt",
    "Slack uploads",
    "200KB",
    200,
    { group: "slack-upload-200kb", locale: "pt", platform: "Slack", purpose: "workspace image uploads" }
  ),
  compressGuide(
    "slack-upload-200kb-id",
    "Slack uploads",
    "200KB",
    200,
    { group: "slack-upload-200kb", locale: "id", platform: "Slack", purpose: "workspace image uploads" }
  ),
  compressGuide(
    "jira-attachments-10mb",
    "Jira attachments",
    "10MB",
    10000,
    { platform: "Jira", purpose: "issue screenshots and attachments" }
  ),
  compressGuide(
    "jira-attachments-10mb-es",
    "Jira attachments",
    "10MB",
    10000,
    { group: "jira-attachments-10mb", locale: "es", platform: "Jira", purpose: "issue screenshots and attachments" }
  ),
  compressGuide(
    "jira-attachments-10mb-pt",
    "Jira attachments",
    "10MB",
    10000,
    { group: "jira-attachments-10mb", locale: "pt", platform: "Jira", purpose: "issue screenshots and attachments" }
  ),
  compressGuide(
    "jira-attachments-10mb-id",
    "Jira attachments",
    "10MB",
    10000,
    { group: "jira-attachments-10mb", locale: "id", platform: "Jira", purpose: "issue screenshots and attachments" }
  ),
  compressGuide(
    "google-forms-2mb",
    "Google Forms attachments",
    "2MB",
    2000,
    { platform: "Google Forms", purpose: "form uploads" }
  ),
  compressGuide(
    "google-forms-2mb-es",
    "Google Forms attachments",
    "2MB",
    2000,
    { group: "google-forms-2mb", locale: "es", platform: "Google Forms", purpose: "form uploads" }
  ),
  compressGuide(
    "google-forms-2mb-pt",
    "Google Forms attachments",
    "2MB",
    2000,
    { group: "google-forms-2mb", locale: "pt", platform: "Google Forms", purpose: "form uploads" }
  ),
  compressGuide(
    "google-forms-2mb-id",
    "Google Forms attachments",
    "2MB",
    2000,
    { group: "google-forms-2mb", locale: "id", platform: "Google Forms", purpose: "form uploads" }
  ),
  compressGuide(
    "wechat-moments-200kb",
    "WeChat Moments images",
    "200KB",
    200,
    { platform: "WeChat", purpose: "Moments posts" }
  ),
  toolGuide(
    "wechat-screenshot-exif",
    "WeChat screenshots",
    "exif",
    "/compress",
    { platform: "WeChat", purpose: "remove EXIF and GPS metadata" }
  ),
  compressGuide(
    "forms-attachments-500kb",
    "form attachments",
    "500KB",
    500,
    { platform: "online forms", purpose: "attachment uploads" }
  ),
  resizeGuide(
    "presentation-slides-1920",
    "presentation slides",
    "1920px wide",
    { platform: "presentations", purpose: "full HD slide exports", width: 1920 }
  ),
  resizeGuide(
    "website-hero-1920px",
    "website hero images",
    "1920px wide",
    { platform: "websites", purpose: "hero section graphics", width: 1920 }
  ),
  compressGuide(
    "portfolio-800kb",
    "portfolio images",
    "800KB",
    800,
    { platform: "portfolios", purpose: "project showcases" }
  ),
  compressGuide(
    "visa-photo-300kb",
    "visa photos",
    "300KB",
    300,
    { platform: "visa applications", purpose: "photo uploads" }
  ),
  resizeGuide(
    "blog-hero-1200px",
    "blog hero images",
    "1200px wide",
    { platform: "blogs", purpose: "featured images", width: 1200 }
  ),
  toolGuide(
    "id-card-privacy-redaction",
    "ID cards",
    "redact",
    "/redact",
    { purpose: "mask ID numbers and sensitive fields" }
  ),
  toolGuide(
    "text-watermark-batch",
    "watermarked images",
    "watermark",
    "/tools/watermark",
    { purpose: "batch text watermarking" }
  ),
  compressGuide(
    "ecommerce-product-800kb",
    "ecommerce product photos",
    "800KB",
    800,
    { platform: "ecommerce", purpose: "product listings" }
  ),
  compressGuide(
    "email-inline-150kb",
    "inline email images",
    "150KB",
    150,
    { platform: "email clients", purpose: "inline content and newsletters" }
  ),
  toolGuide(
    "sprite-sheet-generator",
    "icon sets",
    "sprite",
    "/tools/sprite-sheet",
    { purpose: "bundle UI icons into sprite sheets" }
  ),
  toolGuide(
    "webp-converter-batch",
    "image batches",
    "convert",
    "/tools/webp-converter",
    { purpose: "convert JPG/PNG to WebP" }
  ),
  toolGuide(
    "remove-bg-lite-color",
    "product photos",
    "remove-bg",
    "/tools/remove-bg-lite",
    { purpose: "clean backgrounds for listings" }
  ),
  toolGuide(
    "lqip-placeholders",
    "web images",
    "lqip",
    "/tools/lqip",
    { purpose: "lightweight blurred placeholders" }
  ),
  toolGuide(
    "crop-and-pad-ratios",
    "images for fixed ratios",
    "pad",
    "/tools/aspect-pad",
    { purpose: "crop or pad to exact ratios" }
  ),
  compressGuide(
    "gov-portal-500kb",
    "government portal uploads",
    "500KB",
    500,
    { platform: "government portals", purpose: "document photo uploads" }
  ),
  resizeGuide(
    "linkedin-banner-1584x396",
    "LinkedIn banners",
    "1584x396",
    { platform: "LinkedIn", purpose: "profile banners", width: 1584, height: 396 }
  ),
  compressGuide(
    "university-application-1mb",
    "university application uploads",
    "1MB",
    1000,
    { platform: "university portals", purpose: "application documents" }
  ),
  compressGuide(
    "email-attachment-10mb",
    "email attachments",
    "10MB",
    10000,
    { platform: "email clients", purpose: "attachment limits" }
  ),
  compressGuide(
    "github-readme-images",
    "GitHub README images",
    "500KB",
    500,
    { platform: "GitHub", purpose: "README images and badges" }
  ),
  compressGuide(
    "twitter-post-200kb",
    "Twitter posts",
    "200KB",
    200,
    { platform: "Twitter", purpose: "post images" }
  ),
  compressGuide(
    "linkedin-avatar-400kb",
    "LinkedIn avatars",
    "400KB",
    400,
    { platform: "LinkedIn", purpose: "profile avatars" }
  ),
];

export const LONG_TAIL_SLUGS = LONG_TAIL_GUIDES.map((guide) => guide.slug);

export const LONG_TAIL_GROUPS = LONG_TAIL_GUIDES.reduce((acc, guide) => {
  if (!acc[guide.group]) acc[guide.group] = [];
  acc[guide.group].push(guide);
  return acc;
}, {} as Record<string, LongTailGuide[]>);

export const LONG_TAIL_GUIDE_MAP = new Map(
  LONG_TAIL_GUIDES.map((guide) => [guide.slug, guide])
);
