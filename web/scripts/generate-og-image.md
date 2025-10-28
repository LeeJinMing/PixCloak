# OG 图片生成说明

## 当前方案

项目中已创建 `public/og-image.svg`，这是一个矢量图，包含：

- PixCloak 品牌名
- 核心功能列表
- USP 标签（No Upload, Privacy First, 100% Free）
- 隐私盾牌图标
- 专业渐变背景

## 转换为 PNG（推荐）

### 方案 1：使用在线工具（最快）

1. 访问 https://cloudconvert.com/svg-to-png
2. 上传 `public/og-image.svg`
3. 设置宽度 1200px，高度 630px
4. 下载生成的 PNG
5. 重命名为 `og.png` 并替换 `public/og.png`

### 方案 2：使用 Figma（最佳质量）

1. 打开 Figma，创建 1200×630 画板
2. 将 SVG 内容粘贴到 Figma
3. 调整字体为系统字体（Inter, SF Pro 等）
4. Export 为 PNG (2x 分辨率以获得更清晰效果)
5. 保存为 `public/og.png`

### 方案 3：使用 Inkscape（免费软件）

```bash
# 安装 Inkscape (如果未安装)
# Windows: https://inkscape.org/release/
# Mac: brew install inkscape
# Linux: sudo apt install inkscape

# 转换命令
inkscape public/og-image.svg --export-filename=public/og.png --export-width=1200 --export-height=630
```

### 方案 4：使用 Node.js (sharp + svg2png)

```bash
npm install sharp
node scripts/convert-og-svg-to-png.js
```

## 验证

转换完成后，验证图片：

1. **尺寸检查**：确认 1200×630 像素
2. **文件大小**：应该在 50-200KB 之间
3. **预览测试**：
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## 自定义建议

如果想要更专业的设计，可以考虑：

1. **添加截图**：工具界面的实际截图（更真实）
2. **品牌色**：调整渐变色为品牌主色调
3. **图标**：添加更精致的图标（压缩、隐私等）
4. **多语言版本**：为不同语言创建不同 OG 图片

## 部署后验证

部署到生产环境后：

```bash
# 检查图片可访问性
curl -I https://pixcloak.com/og.png

# 应该返回 200 OK 和正确的 Content-Type: image/png
```

然后使用社交媒体调试工具验证：

- 在 Twitter 发送包含 pixcloak.com 的推文（预览模式）
- Facebook 分享链接测试
- LinkedIn 发帖测试

## 临时快速方案

如果需要立即上线，可以使用当前的 SVG：

```typescript
// 在 layout.tsx 中临时使用 SVG
images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "PixCloak" }];
```

但注意：某些平台可能不支持 SVG OG 图片，PNG 是最安全的选择。
