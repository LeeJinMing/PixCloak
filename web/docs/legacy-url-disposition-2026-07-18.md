# PixCloak 旧 URL 处置清单

- 日期：2026-07-18
- 旧线上地图：202 个 URL
- 新 Preview 地图：34 个 URL
- 沿用旧地址：13
- 新增地址：21
- 需处置旧地址：189
- 净减少：168
- 响应分布：HTTP 200=26；HTTP 301=150；HTTP 404=13
- 处置分布：下线（404/410）=13；保留（noindex）=26；永久重定向=150
- 未闭环：0

> 口径说明：168 是索引库存净减少量，不是旧 URL 数。由于新地图新增 21 个地址，完整处置范围是 189 个旧地址：202 - 189 + 21 = 34。

> 404 与 410 都是有效的永久下线响应；无需只为状态码从 404 改成 410。存在等价内容时优先永久重定向；仍有工具价值但不值得索引时保留并 noindex。

依据：[Google 永久重定向说明](https://developers.google.com/search/docs/crawling-indexing/301-redirects)、[canonical 选择方法](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[404/410 抓取错误处理](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors)。

| # | 旧路径 | 当前 HTTP | 处置 | 目标 | 实现 | 理由 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | /benchmark | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 2 | /case-studies | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 3 | /changelog | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 4 | /compress-es | 301 | 永久重定向 | /compress | 通过 | 存在等价或更强的保留页面 |
| 5 | /compress-id | 301 | 永久重定向 | /compress | 通过 | 存在等价或更强的保留页面 |
| 6 | /compress-pt | 301 | 永久重定向 | /compress | 通过 | 存在等价或更强的保留页面 |
| 7 | /embed | 301 | 永久重定向 | /embed/compress | 通过 | 存在等价或更强的保留页面 |
| 8 | /embed/compress | 200 | 保留（noindex） | /compress | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 9 | /facts | 301 | 永久重定向 | /about | 通过 | 存在等价或更强的保留页面 |
| 10 | /gallery | 301 | 永久重定向 | /guides/webp-vs-jpeg-downloadable-samples | 通过 | 存在等价或更强的保留页面 |
| 11 | /guides/anonymized-sharing | 301 | 永久重定向 | /guides/privacy-sharing | 通过 | 存在等价或更强的保留页面 |
| 12 | /guides/avatar-200kb | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 13 | /guides/avoid-artifacts-webp-jpeg | 301 | 永久重定向 | /guides/webp-vs-jpeg-downloadable-samples | 通过 | 存在等价或更强的保留页面 |
| 14 | /guides/black-out-text-in-image | 301 | 永久重定向 | /guides/hide-faces-plates-private-text | 通过 | 存在等价或更强的保留页面 |
| 15 | /guides/blur-face-in-photo | 301 | 永久重定向 | /guides/blur-pixelate-solid-redaction | 通过 | 存在等价或更强的保留页面 |
| 16 | /guides/blur-number-plate-online | 301 | 永久重定向 | /guides/hide-faces-plates-private-text | 通过 | 存在等价或更强的保留页面 |
| 17 | /guides/complete-image-compression-guide | 301 | 永久重定向 | /guides/file-size-dimensions-format | 通过 | 存在等价或更强的保留页面 |
| 18 | /guides/compress-image-to-100kb | 301 | 永久重定向 | /guides/compress-image-under-100kb | 通过 | 存在等价或更强的保留页面 |
| 19 | /guides/compress-to-1mb | 301 | 永久重定向 | /upload-ready?kb=1024 | 通过 | 存在等价或更强的保留页面 |
| 20 | /guides/compress-to-200kb | 301 | 永久重定向 | /guides/compress-image-under-200kb | 通过 | 存在等价或更强的保留页面 |
| 21 | /guides/compress-to-300kb | 301 | 永久重定向 | /upload-ready?kb=300 | 通过 | 存在等价或更强的保留页面 |
| 22 | /guides/compress-to-500kb | 301 | 永久重定向 | /upload-ready?kb=500 | 通过 | 存在等价或更强的保留页面 |
| 23 | /guides/compress-to-800kb | 301 | 永久重定向 | /upload-ready?kb=800 | 通过 | 存在等价或更强的保留页面 |
| 24 | /guides/compress-to-target-kb | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 25 | /guides/compress-to-target-kb-zh | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 26 | /guides/convert-jpeg-to-webp | 301 | 永久重定向 | /tools/webp-converter | 通过 | 存在等价或更强的保留页面 |
| 27 | /guides/convert-jpg-to-webp-online | 301 | 永久重定向 | /tools/webp-converter | 通过 | 存在等价或更强的保留页面 |
| 28 | /guides/embed-button | 301 | 永久重定向 | /embed/compress | 通过 | 存在等价或更强的保留页面 |
| 29 | /guides/es-comprimir-a-200kb | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 30 | /guides/es-comprimir-a-kb-objetivo | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 31 | /guides/es-exportar-sin-metadatos | 301 | 永久重定向 | /safe-share | 通过 | 存在等价或更强的保留页面 |
| 32 | /guides/es-limites-de-imagenes-plataformas | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 33 | /guides/es-redimensionar-lado-mas-largo | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 34 | /guides/exif-gps-removal | 301 | 永久重定向 | /guides/remove-gps-location-photo | 通过 | 存在等价或更强的保留页面 |
| 35 | /guides/export-without-metadata | 301 | 永久重定向 | /safe-share | 通过 | 存在等价或更强的保留页面 |
| 36 | /guides/export-without-metadata-zh | 301 | 永久重定向 | /safe-share | 通过 | 存在等价或更强的保留页面 |
| 37 | /guides/gsc-operations | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 38 | /guides/how-to-compress-image-without-losing-quality | 301 | 永久重定向 | /guides/file-size-dimensions-format | 通过 | 存在等价或更强的保留页面 |
| 39 | /guides/how-to-compress-on-iphone | 301 | 永久重定向 | /guides/reduce-image-size-iphone | 通过 | 存在等价或更强的保留页面 |
| 40 | /guides/how-to-reduce-image-file-size | 301 | 永久重定向 | /guides/why-upload-portal-rejects-image | 通过 | 存在等价或更强的保留页面 |
| 41 | /guides/how-to-resize-images-for-instagram | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 42 | /guides/id-batas-gambar-platform | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 43 | /guides/id-ekspor-tanpa-metadata | 301 | 永久重定向 | /safe-share | 通过 | 存在等价或更强的保留页面 |
| 44 | /guides/id-kompres-ke-kb-target | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 45 | /guides/id-kompres-menjadi-1mb | 301 | 永久重定向 | /upload-ready?kb=1024 | 通过 | 存在等价或更强的保留页面 |
| 46 | /guides/id-ubah-ukuran-sisi-terpanjang | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 47 | /guides/image-seo-optimization | 301 | 永久重定向 | /guides/prepare-images-core-web-vitals | 通过 | 存在等价或更强的保留页面 |
| 48 | /guides/jpeg-vs-webp-for-linkedin | 301 | 永久重定向 | /guides/webp-vs-jpeg-downloadable-samples | 通过 | 存在等价或更强的保留页面 |
| 49 | /guides/jpeg-vs-webp-for-twitter | 301 | 永久重定向 | /guides/webp-vs-jpeg-downloadable-samples | 通过 | 存在等价或更强的保留页面 |
| 50 | /guides/jpeg-vs-webp-size-quality | 301 | 永久重定向 | /guides/webp-vs-jpeg-downloadable-samples | 通过 | 存在等价或更强的保留页面 |
| 51 | /guides/languages | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 52 | /guides/license-plate-redaction | 301 | 永久重定向 | /guides/hide-faces-plates-private-text | 通过 | 存在等价或更强的保留页面 |
| 53 | /guides/long-tail | 301 | 永久重定向 | /guides | 通过 | 存在等价或更强的保留页面 |
| 54 | /guides/long-tail/blog-hero-1200px | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 55 | /guides/long-tail/compress-to-100kb-for-email | 301 | 永久重定向 | /upload-ready?kb=100 | 通过 | 存在等价或更强的保留页面 |
| 56 | /guides/long-tail/compress-to-200kb-for-linkedin | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 57 | /guides/long-tail/compress-to-500kb-for-instagram | 301 | 永久重定向 | /upload-ready?kb=500 | 通过 | 存在等价或更强的保留页面 |
| 58 | /guides/long-tail/crop-and-pad-ratios | 301 | 永久重定向 | /tools/crop-templates | 通过 | 存在等价或更强的保留页面 |
| 59 | /guides/long-tail/ecommerce-product-800kb | 301 | 永久重定向 | /upload-ready?kb=800 | 通过 | 存在等价或更强的保留页面 |
| 60 | /guides/long-tail/email-attachment-10mb | 301 | 永久重定向 | /upload-ready?kb=10240 | 通过 | 存在等价或更强的保留页面 |
| 61 | /guides/long-tail/email-inline-150kb | 301 | 永久重定向 | /upload-ready?kb=150 | 通过 | 存在等价或更强的保留页面 |
| 62 | /guides/long-tail/facebook-cover-820x312 | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 63 | /guides/long-tail/facebook-cover-820x312-es | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 64 | /guides/long-tail/facebook-cover-820x312-id | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 65 | /guides/long-tail/facebook-cover-820x312-pt | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 66 | /guides/long-tail/forms-attachments-500kb | 301 | 永久重定向 | /upload-ready?kb=500 | 通过 | 存在等价或更强的保留页面 |
| 67 | /guides/long-tail/github-readme-images | 301 | 永久重定向 | /guides/web-images | 通过 | 存在等价或更强的保留页面 |
| 68 | /guides/long-tail/google-forms-2mb | 301 | 永久重定向 | /upload-ready?kb=2048 | 通过 | 存在等价或更强的保留页面 |
| 69 | /guides/long-tail/google-forms-2mb-es | 301 | 永久重定向 | /upload-ready?kb=2048 | 通过 | 存在等价或更强的保留页面 |
| 70 | /guides/long-tail/google-forms-2mb-id | 301 | 永久重定向 | /upload-ready?kb=2048 | 通过 | 存在等价或更强的保留页面 |
| 71 | /guides/long-tail/google-forms-2mb-pt | 301 | 永久重定向 | /upload-ready?kb=2048 | 通过 | 存在等价或更强的保留页面 |
| 72 | /guides/long-tail/gov-portal-200kb-cn | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 73 | /guides/long-tail/gov-portal-500kb | 301 | 永久重定向 | /upload-ready?kb=500 | 通过 | 存在等价或更强的保留页面 |
| 74 | /guides/long-tail/id-card-privacy-redaction | 301 | 永久重定向 | /guides/redact-id-card-safely | 通过 | 存在等价或更强的保留页面 |
| 75 | /guides/long-tail/instagram-story-1080x1920 | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 76 | /guides/long-tail/instagram-story-1080x1920-es | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 77 | /guides/long-tail/instagram-story-1080x1920-id | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 78 | /guides/long-tail/instagram-story-1080x1920-pt | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 79 | /guides/long-tail/jira-attachments-10mb | 301 | 永久重定向 | /upload-ready?kb=10240 | 通过 | 存在等价或更强的保留页面 |
| 80 | /guides/long-tail/jira-attachments-10mb-es | 301 | 永久重定向 | /upload-ready?kb=10240 | 通过 | 存在等价或更强的保留页面 |
| 81 | /guides/long-tail/jira-attachments-10mb-id | 301 | 永久重定向 | /upload-ready?kb=10240 | 通过 | 存在等价或更强的保留页面 |
| 82 | /guides/long-tail/jira-attachments-10mb-pt | 301 | 永久重定向 | /upload-ready?kb=10240 | 通过 | 存在等价或更强的保留页面 |
| 83 | /guides/long-tail/job-application-500kb | 301 | 永久重定向 | /upload-ready?kb=500 | 通过 | 存在等价或更强的保留页面 |
| 84 | /guides/long-tail/linkedin-avatar-400kb | 301 | 永久重定向 | /upload-ready?kb=400 | 通过 | 存在等价或更强的保留页面 |
| 85 | /guides/long-tail/linkedin-banner-1584x396 | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 86 | /guides/long-tail/lqip-placeholders | 301 | 永久重定向 | /guides/web-images | 通过 | 存在等价或更强的保留页面 |
| 87 | /guides/long-tail/notion-cover-1500px | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 88 | /guides/long-tail/notion-cover-1500px-es | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 89 | /guides/long-tail/notion-cover-1500px-id | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 90 | /guides/long-tail/notion-cover-1500px-pt | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 91 | /guides/long-tail/passport-scan-redact | 301 | 永久重定向 | /guides/redact-id-card-safely | 通过 | 存在等价或更强的保留页面 |
| 92 | /guides/long-tail/portfolio-800kb | 301 | 永久重定向 | /upload-ready?kb=800 | 通过 | 存在等价或更强的保留页面 |
| 93 | /guides/long-tail/presentation-slides-1920 | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 94 | /guides/long-tail/remove-bg-lite-color | 301 | 永久重定向 | /tools/remove-bg-lite | 通过 | 存在等价或更强的保留页面 |
| 95 | /guides/long-tail/resize-to-1080x1080-for-instagram | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 96 | /guides/long-tail/resume-200kb | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 97 | /guides/long-tail/slack-upload-200kb | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 98 | /guides/long-tail/slack-upload-200kb-es | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 99 | /guides/long-tail/slack-upload-200kb-id | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 100 | /guides/long-tail/slack-upload-200kb-pt | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 101 | /guides/long-tail/sprite-sheet-generator | 301 | 永久重定向 | /tools/sprite-sheet | 通过 | 存在等价或更强的保留页面 |
| 102 | /guides/long-tail/text-watermark-batch | 301 | 永久重定向 | /tools/watermark | 通过 | 存在等价或更强的保留页面 |
| 103 | /guides/long-tail/tiktok-avatar-200kb | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 104 | /guides/long-tail/tiktok-avatar-200kb-es | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 105 | /guides/long-tail/tiktok-avatar-200kb-id | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 106 | /guides/long-tail/tiktok-avatar-200kb-pt | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 107 | /guides/long-tail/twitter-post-200kb | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 108 | /guides/long-tail/university-application-1mb | 301 | 永久重定向 | /upload-ready?kb=1024 | 通过 | 存在等价或更强的保留页面 |
| 109 | /guides/long-tail/visa-photo-300kb | 301 | 永久重定向 | /upload-ready?kb=300 | 通过 | 存在等价或更强的保留页面 |
| 110 | /guides/long-tail/webp-converter-batch | 301 | 永久重定向 | /tools/webp-converter | 通过 | 存在等价或更强的保留页面 |
| 111 | /guides/long-tail/website-hero-1920px | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 112 | /guides/long-tail/wechat-moments-200kb | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 113 | /guides/long-tail/wechat-screenshot-exif | 301 | 永久重定向 | /guides/does-wechat-remove-exif-test | 通过 | 存在等价或更强的保留页面 |
| 114 | /guides/long-tail/wordpress-featured-1200x628 | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 115 | /guides/long-tail/wordpress-featured-1200x628-es | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 116 | /guides/long-tail/wordpress-featured-1200x628-id | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 117 | /guides/long-tail/wordpress-featured-1200x628-pt | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 118 | /guides/long-tail/youtube-thumbnail-200kb | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 119 | /guides/long-tail/youtube-thumbnail-200kb-es | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 120 | /guides/long-tail/youtube-thumbnail-200kb-id | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 121 | /guides/long-tail/youtube-thumbnail-200kb-pt | 301 | 永久重定向 | /upload-ready?kb=200 | 通过 | 存在等价或更强的保留页面 |
| 122 | /guides/mobile-upload-limits | 301 | 永久重定向 | /guides/upload-success | 通过 | 存在等价或更强的保留页面 |
| 123 | /guides/platform-image-limits | 301 | 永久重定向 | /guides/upload-success | 通过 | 存在等价或更强的保留页面 |
| 124 | /guides/platform-image-limits-zh | 301 | 永久重定向 | /guides/upload-success | 通过 | 存在等价或更强的保留页面 |
| 125 | /guides/png-vs-jpg-when-to-use-each | 301 | 永久重定向 | /guides/file-size-dimensions-format | 通过 | 存在等价或更强的保留页面 |
| 126 | /guides/post-500kb | 301 | 永久重定向 | /upload-ready?kb=500 | 通过 | 存在等价或更强的保留页面 |
| 127 | /guides/prepare-images-for-forms | 301 | 永久重定向 | /guides/upload-success | 通过 | 存在等价或更强的保留页面 |
| 128 | /guides/prepare-images-for-job-application | 301 | 永久重定向 | /guides/upload-success | 通过 | 存在等价或更强的保留页面 |
| 129 | /guides/prepare-images-for-portfolio | 301 | 永久重定向 | /guides/upload-success | 通过 | 存在等价或更强的保留页面 |
| 130 | /guides/privacy-compliance | 301 | 永久重定向 | /guides/privacy-sharing | 通过 | 存在等价或更强的保留页面 |
| 131 | /guides/pt-comprimir-para-500kb | 301 | 永久重定向 | /upload-ready?kb=500 | 通过 | 存在等价或更强的保留页面 |
| 132 | /guides/pt-comprimir-para-kb-alvo | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 133 | /guides/pt-exportar-sem-metadados | 301 | 永久重定向 | /safe-share | 通过 | 存在等价或更强的保留页面 |
| 134 | /guides/pt-limites-de-imagens-plataformas | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 135 | /guides/pt-redimensionar-lado-mais-longo | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 136 | /guides/redact-screenshot-mac | 301 | 永久重定向 | /guides/screenshot-privacy-checklist-v1 | 通过 | 存在等价或更强的保留页面 |
| 137 | /guides/redaction-checklist | 301 | 永久重定向 | /guides/screenshot-privacy-checklist-v1 | 通过 | 存在等价或更强的保留页面 |
| 138 | /guides/remove-exif-iphone | 301 | 永久重定向 | /guides/remove-gps-location-photo | 通过 | 存在等价或更强的保留页面 |
| 139 | /guides/remove-exif-iphone-zh | 301 | 永久重定向 | /guides/remove-gps-location-photo | 通过 | 存在等价或更强的保留页面 |
| 140 | /guides/remove-exif-wechat | 301 | 永久重定向 | /guides/does-wechat-remove-exif-test | 通过 | 存在等价或更强的保留页面 |
| 141 | /guides/remove-exif-wechat-zh | 301 | 永久重定向 | /guides/does-wechat-remove-exif-test | 通过 | 存在等价或更强的保留页面 |
| 142 | /guides/remove-gps-data-from-photos | 301 | 永久重定向 | /guides/remove-gps-location-photo | 通过 | 存在等价或更强的保留页面 |
| 143 | /guides/rename-rules | 301 | 永久重定向 | /tools/batch-rename | 通过 | 存在等价或更强的保留页面 |
| 144 | /guides/research-500kb-quality-range | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 145 | /guides/research-jpeg-vs-webp | 301 | 永久重定向 | /guides/webp-vs-jpeg-downloadable-samples | 通过 | 存在等价或更强的保留页面 |
| 146 | /guides/research-quality-size-curves | 301 | 永久重定向 | /guides/file-size-dimensions-format | 通过 | 存在等价或更强的保留页面 |
| 147 | /guides/resize-longest-side | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 148 | /guides/resize-longest-side-zh | 301 | 永久重定向 | /tools/resize-image | 通过 | 存在等价或更强的保留页面 |
| 149 | /guides/resize-to-1920 | 301 | 永久重定向 | /upload-ready?longest=1920&preset=1920px | 通过 | 存在等价或更强的保留页面 |
| 150 | /guides/screenshot-privacy-check | 301 | 永久重定向 | /guides/screenshot-privacy-checklist-v1 | 通过 | 存在等价或更强的保留页面 |
| 151 | /guides/social-platform-kb | 301 | 永久重定向 | /guides/upload-success | 通过 | 存在等价或更强的保留页面 |
| 152 | /guides/tinypng-alternative-free-no-upload | 301 | 永久重定向 | /guides/compress-image-under-200kb | 通过 | 存在等价或更强的保留页面 |
| 153 | /guides/zip-batch-download | 301 | 永久重定向 | /upload-ready | 通过 | 存在等价或更强的保留页面 |
| 154 | /press | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 155 | /redact-es | 301 | 永久重定向 | /redact | 通过 | 存在等价或更强的保留页面 |
| 156 | /redact-id | 301 | 永久重定向 | /redact | 通过 | 存在等价或更强的保留页面 |
| 157 | /redact-pt | 301 | 永久重定向 | /redact | 通过 | 存在等价或更强的保留页面 |
| 158 | /research | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 159 | /research/docs/benchmarking-methodology | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 160 | /research/docs/compression-algorithm | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 161 | /research/docs/privacy-architecture | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 162 | /scenarios | 301 | 永久重定向 | /guides/upload-success | 通过 | 存在等价或更强的保留页面 |
| 163 | /templates | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 164 | /testimonials | 404 | 下线（404/410） | — | 通过 | 无可信替代内容；Google 对正确 404 与 410 均按移除处理 |
| 165 | /tools/aspect-pad | 200 | 保留（noindex） | /tools/aspect-pad | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 166 | /tools/batch-rename | 200 | 保留（noindex） | /tools/batch-rename | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 167 | /tools/crop-templates | 200 | 保留（noindex） | /tools/crop-templates | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 168 | /tools/dataurl-alt | 200 | 保留（noindex） | /tools/dataurl-alt | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 169 | /tools/dpi-converter | 200 | 保留（noindex） | /tools/dpi-converter | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 170 | /tools/favicon-pack | 200 | 保留（noindex） | /tools/favicon-pack | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 171 | /tools/image-diff | 200 | 保留（noindex） | /tools/image-diff | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 172 | /tools/lqip | 200 | 保留（noindex） | /tools/lqip | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 173 | /tools/og-card | 200 | 保留（noindex） | /tools/og-card | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 174 | /tools/pdf-to-image | 200 | 保留（noindex） | /tools/pdf-to-image | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 175 | /tools/platform-checker | 200 | 保留（noindex） | /tools/platform-checker | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 176 | /tools/remove-bg-lite | 200 | 保留（noindex） | /tools/remove-bg-lite | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 177 | /tools/rotate-flip | 200 | 保留（noindex） | /tools/rotate-flip | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 178 | /tools/sprite-sheet | 200 | 保留（noindex） | /tools/sprite-sheet | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 179 | /tools/srcset-generator | 200 | 保留（noindex） | /tools/srcset-generator | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 180 | /tools/svg-optimizer | 200 | 保留（noindex） | /tools/svg-optimizer | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 181 | /tools/text-placeholder | 200 | 保留（noindex） | /tools/text-placeholder | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 182 | /tools/trim-transparent | 200 | 保留（noindex） | /tools/trim-transparent | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 183 | /tools/watermark | 200 | 保留（noindex） | /tools/watermark | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 184 | /tools/webp-converter | 200 | 保留（noindex） | /tools/webp-converter | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 185 | /zh | 200 | 保留（noindex） | /zh | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 186 | /zh/compress | 200 | 保留（noindex） | /zh/compress | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 187 | /zh/guides/pdf-to-image-free | 200 | 保留（noindex） | /zh/guides/pdf-to-image-free | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 188 | /zh/redact | 200 | 保留（noindex） | /zh/redact | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
| 189 | /zh/tools/pdf-to-image | 200 | 保留（noindex） | /zh/tools/pdf-to-image | 通过 | 仍有直接用户价值，但不进入搜索索引库存 |
