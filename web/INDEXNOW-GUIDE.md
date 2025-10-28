# IndexNow 优化指南

本指南介绍 PixCloak 项目中 IndexNow 的完整配置和使用方法。

## 📋 目录

- [快速开始](#快速开始)
- [配置说明](#配置说明)
- [使用方法](#使用方法)
- [自动化方案](#自动化方案)
- [监控与优化](#监控与优化)
- [故障排除](#故障排除)

---

## 🚀 快速开始

### 1. 环境变量配置

确保以下环境变量已设置（在 `.env.local` 或 Vercel/GitHub Secrets 中）：

```bash
NEXT_PUBLIC_SITE_URL=https://pixcloak.com
INDEXNOW_KEY=1z2x3c4v
```

### 2. 验证 Key 文件

确保 `public/1z2x3c4v.txt` 文件存在且内容为密钥本身：

```bash
# 检查文件
cat web/public/1z2x3c4v.txt
# 应输出: 1z2x3c4v
```

### 3. 立即提交所有 URLs

```bash
cd web
npm run submit:indexnow:all
```

---

## ⚙️ 配置说明

### IndexNow Key 文件

- **位置**: `web/public/{INDEXNOW_KEY}.txt`
- **内容**: 密钥本身（如 `1z2x3c4v`）
- **访问**: `https://pixcloak.com/1z2x3c4v.txt`

### 支持的搜索引擎

| 引擎            | 端点                                | 默认启用      |
| --------------- | ----------------------------------- | ------------- |
| IndexNow (通用) | `https://api.indexnow.org/indexnow` | ✅            |
| Bing            | `https://www.bing.com/indexnow`     | ✅            |
| Yandex          | `https://yandex.com/indexnow`       | ⚠️ 需手动启用 |

---

## 📝 使用方法

### 手动提交脚本

#### 1. 全量提交（推荐首次使用）

提交网站地图中的所有 URL 到搜索引擎：

```bash
npm run submit:indexnow:all
```

**特点**：

- 从 `/sitemap.xml` 和 `/guides/sitemap.xml` 获取所有 URL
- 自动分批（每批 100 个 URL）
- 包含重试机制
- 显示详细进度

**环境变量**：

- `BATCH_SIZE=100` - 每批提交的 URL 数量
- `DELAY_MS=2000` - 批次之间的延迟（毫秒）

#### 2. 增量提交（推荐日常使用）

仅提交最近变更的页面：

```bash
npm run submit:indexnow:incremental
```

**特点**：

- 基于 git 历史检测变更文件
- 自动转换文件路径为 URL
- 减少不必要的请求

#### 3. 多引擎提交

同时提交到所有搜索引擎（包括 Yandex）：

```bash
npm run submit:indexnow:engines
```

或：

```bash
SUBMIT_ALL_ENGINES=true npm run submit:indexnow:all
```

#### 4. 提交单个或特定 URLs

使用 API 端点提交：

```bash
curl -X POST https://pixcloak.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://pixcloak.com/guides/compress-to-200kb"]}'
```

---

## 🤖 自动化方案

### 方案 A: GitHub Actions（推荐）

**工作流**: `.github/workflows/indexnow-submit.yml`

**触发条件**：

- ✅ 每次推送到 `main` 分支
- ✅ 每天定时运行（UTC 2:00 / 北京时间 10:00）
- ✅ 支持手动触发

**配置步骤**：

1. 在 GitHub 仓库设置中添加 Secrets：

   - `INDEXNOW_KEY`: `1z2x3c4v`
   - `NEXT_PUBLIC_SITE_URL`: `https://pixcloak.com`

2. 工作流会自动运行，无需额外配置

3. 查看运行结果：
   - 前往 GitHub Actions 标签页
   - 查看 "IndexNow Auto Submit" 工作流

### 方案 B: Vercel 部署后钩子

**脚本**: `scripts/post-deploy-indexnow.mjs`

**配置步骤**：

1. 在 Vercel 项目设置中添加环境变量：

   - `INDEXNOW_KEY`: `1z2x3c4v`
   - `NEXT_PUBLIC_SITE_URL`: `https://pixcloak.com`

2. 修改 `package.json` 的 `build` 命令（可选）：

```json
{
  "scripts": {
    "build": "next build && npm run postdeploy"
  }
}
```

3. 每次部署后自动运行

### 方案 C: Cron 定时任务

在服务器上设置定时任务：

```bash
# 编辑 crontab
crontab -e

# 每天凌晨 2 点运行
0 2 * * * cd /path/to/project/web && npm run submit:indexnow:incremental
```

---

## 📊 监控与优化

### 查看提交状态

所有脚本都会输出详细的执行报告：

```
🚀 IndexNow 全量提交脚本（改进版）
📍 网站: https://pixcloak.com
🔑 Key: 1z2x****
📦 批次大小: 100
⏱️  延迟: 2000ms

📥 正在从网站地图获取 URLs...
✅ 获取到 175 个唯一 URL

📤 开始分批提交 (共 2 个批次)...

📦 批次 1/2 (50.0%) - 100 URLs
   ✅ IndexNow (General): 成功 (HTTP 200)
   ✅ Bing: 成功 (HTTP 200)
   ⏳ 等待 2000ms...

📦 批次 2/2 (100.0%) - 75 URLs
   ✅ IndexNow (General): 成功 (HTTP 200)
   ✅ Bing: 成功 (HTTP 200)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 提交统计:
   总批次: 2
   总 URLs: 175
   成功: 4 次
   失败: 0 次
   成功率: 100.0%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 网站地图通知完成
🎉 IndexNow 全量提交完成！
```

### Bing Webmaster Tools 监控

1. 登录 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 选择你的网站
3. 查看 **IndexNow** 报告：
   - 提交的 URL 数量
   - 索引状态
   - 错误信息

### Google Search Console（间接受益）

虽然 Google 不直接支持 IndexNow，但通过网站地图 ping，Google 也会收到更新通知。

---

## 🔧 故障排除

### 问题 1: `Missing INDEXNOW_KEY`

**原因**: 环境变量未设置

**解决**:

```bash
# 本地开发
echo "INDEXNOW_KEY=1z2x3c4v" >> .env.local

# 生产环境
# 在 Vercel/GitHub 中添加环境变量
```

### 问题 2: `HTTP 404` - Key 文件未找到

**原因**: `public/{key}.txt` 文件缺失

**解决**:

```bash
# 创建文件
echo "1z2x3c4v" > web/public/1z2x3c4v.txt

# 验证可访问
curl https://pixcloak.com/1z2x3c4v.txt
```

### 问题 3: `HTTP 400` - Bad Request

**常见原因**:

- URL 格式错误（必须是完整的 https:// URL）
- Host 不匹配（URL 的域名必须与 `host` 字段一致）
- URL 数量超限（单次最多 10,000 个）

**解决**: 检查提交的 URL 格式

### 问题 4: `HTTP 429` - Too Many Requests

**原因**: 请求频率过高

**解决**:

```bash
# 增加批次之间的延迟
DELAY_MS=5000 npm run submit:indexnow:all
```

### 问题 5: 网络超时

**解决**: 脚本已内置重试机制（最多 3 次），如持续失败检查网络连接

---

## 📈 最佳实践

### 1. 首次设置

```bash
# 第一次提交所有 URL
npm run submit:indexnow:engines
```

### 2. 日常维护

```bash
# 每次重大更新后
npm run submit:indexnow:incremental
```

### 3. 新内容发布

添加新页面后立即提交：

```bash
curl -X POST https://pixcloak.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://pixcloak.com/guides/new-guide"]}'
```

### 4. 自动化建议

- ✅ 启用 GitHub Actions 工作流（每天自动运行）
- ✅ 启用 Vercel 部署后钩子（每次部署后提交关键页面）
- ✅ 定期检查 Bing Webmaster Tools 中的 IndexNow 报告

### 5. 避免过度提交

- ⚠️ 不要频繁提交相同的 URL（每天一次足够）
- ⚠️ 不要提交未变更的页面
- ✅ 使用增量提交脚本而非全量提交

---

## 🔗 相关资源

- [IndexNow 官方文档](https://www.indexnow.org/)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Microsoft IndexNow API 文档](https://www.bing.com/indexnow)
- [Yandex IndexNow 支持](https://yandex.com/support/webmaster/indexnow/)

---

## 📞 需要帮助？

如有问题，请：

1. 检查本文档的故障排除部分
2. 查看脚本输出的错误信息
3. 联系 support@pixcloak.com

---

**最后更新**: 2025-10-27  
**维护者**: PixCloak Team
