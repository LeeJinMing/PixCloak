# Tools 落地计划（增长与 SEO）

## 目标

- 通过前端本地小工具获取长尾流量与外链，强化品牌与转化。
- 每个工具具备：唯一路由、明确 h1、独立 title/description、FAQ/HowTo JSON‑LD、RelatedTasks 内链、分享按钮、IndexNow 发布流程。

## 工具与 SEO 目标（优先级从高到低）

1. EXIF/GPS 检测器（/tools/exif-checker）
   - 关键词：exif checker、gps metadata、remove exif
   - 成果：检测 + 一键去除并下载；FAQ/HowTo；入口到“去 EXIF 指南/压到 200KB”。
2. 平台合规度检查（/tools/platform-checker）
   - 关键词：image size limit、upload limit、kb limit + 平台
   - 成果：选择平台 → 拖拽 → 是否达标+建议+预设链接（/?kb=200、1920px）。
3. OG/Twitter Card 生成器（/tools/og-card）
   - 关键词：og image generator、twitter card 1200×630
   - 成果：生成 1200×630/1500×500，提供 `<meta>` 片段与下载。
4. Favicon/App Icon 打包（/tools/favicon-pack）
   - 关键词：favicon generator、manifest icon
   - 成果：上传源图 → 多尺寸打包+HTML 片段。
5. 裁剪模板（/tools/crop-templates）
   - 关键词：crop 1:1/4:3/16:9、resize 1920
   - 成果：本地裁剪导出、常用模板、一键压缩。
6. 响应式 `<img srcset>` 生成器（/tools/srcset-generator）
   - 关键词：srcset generator、responsive image
   - 成果：生成代码+示例，指导最佳 KB。
7. Base64/Data URL 转换 + Alt 建议（/tools/dataurl-alt）
   - 关键词：image to base64、data url、alt text generator（规则式）
8. DPI/PPI & 尺寸换算器（/tools/dpi-converter）
   - 关键词：dpi to px、ppi calculator
9. 批量水印/署名（/tools/watermark）
   - 关键词：image watermark generator

## 发布流水线

- 新页开发 → 本地 Lint→ 加入 `guides/sitemap.xml`（或 tools 索引）→ 部署 →IndexNow POST→GSC/Bing 提交 URL 检查。

## 入口策略

- `/tools` 页面以卡片列表为唯一入口，首屏展示“核心 6 项”，其余折叠至“More tools”。
- 每个工具页底部放 RelatedTasks（压缩/去 EXIF/裁剪 1920 等）。

## 指标

- 每周：新增 ≥2 工具或 ≥5 长尾指南；IndexNow 推送；GSC 展示与 CTR 追踪；Bing 报告清零化。
