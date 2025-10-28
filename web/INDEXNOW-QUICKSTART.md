# IndexNow 5 分钟快速上手 🚀

立即提升你的网站在 Bing 等搜索引擎中的可见性！

## ✅ 第一步：验证配置（1 分钟）

```bash
cd web

# 检查环境变量
cat .env.local | grep INDEXNOW_KEY
# 应显示: INDEXNOW_KEY=1z2x3c4v

# 检查 key 文件
cat public/1z2x3c4v.txt
# 应显示: 1z2x3c4v
```

## ✅ 第二步：首次全量提交（2 分钟）

```bash
# 提交所有页面到 Bing 和通用 IndexNow
npm run submit:indexnow:all
```

**预期输出**:

```
🚀 IndexNow 全量提交脚本（改进版）
📍 网站: https://pixcloak.com
✅ 获取到 175 个唯一 URL
📤 开始分批提交 (共 2 个批次)...
✅ IndexNow (General): 成功 (HTTP 200)
✅ Bing: 成功 (HTTP 200)
🎉 IndexNow 全量提交完成！
```

## ✅ 第三步：启用自动化（2 分钟）

### 选项 A: GitHub Actions（推荐）

1. 在 GitHub 仓库设置中添加 Secrets：

   ```
   INDEXNOW_KEY = 1z2x3c4v
   NEXT_PUBLIC_SITE_URL = https://pixcloak.com
   ```

2. 推送 `.github/workflows/indexnow-submit.yml` 到仓库

3. ✅ 完成！工作流会自动运行

### 选项 B: Vercel 部署钩子

在 Vercel 项目设置中添加环境变量：

```
INDEXNOW_KEY = 1z2x3c4v
NEXT_PUBLIC_SITE_URL = https://pixcloak.com
```

✅ 完成！每次部署后自动提交

## 📊 验证效果

24-48 小时后，访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)：

1. 登录并选择你的网站
2. 导航到 **Sitemaps** → 检查网站地图是否成功读取
3. 查看 **IndexNow** 报告（如有）
4. 检查 **URL Inspection** 查看索引状态

## 🎯 日常使用

### 发布新内容后

```bash
# 仅提交变更的页面（更高效）
npm run submit:indexnow:incremental
```

### 提交单个 URL

```bash
curl -X POST https://pixcloak.com/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://pixcloak.com/guides/new-page"]}'
```

### 提交到所有引擎（包括 Yandex）

```bash
npm run submit:indexnow:engines
```

## ⚠️ 常见问题

**Q: 多久提交一次？**  
A: 新内容发布时立即提交，现有内容每天一次即可（通过 GitHub Actions 自动完成）

**Q: 提交后多久生效？**  
A: Bing 通常 24-48 小时内更新索引

**Q: HTTP 400 错误？**  
A: 检查 `public/1z2x3c4v.txt` 文件是否存在且内容正确

**Q: 看不到效果？**  
A:

1. 检查 Bing Webmaster Tools 中的 IndexNow 报告
2. 确保网站地图已正确提交
3. 等待 24-48 小时

## 📚 更多信息

查看完整文档：[INDEXNOW-GUIDE.md](./INDEXNOW-GUIDE.md)

---

**问题？** 联系 support@pixcloak.com
