# PixCloak V1.0 Preview 验收记录

- 验收日期：2026-07-18
- Vercel deployment：`dpl_7mFaWU5UkfH4ZcASgy7SFVSCjngf`
- Preview：`https://pix-cloak-k2jsjw0lr-leejinmings-projects.vercel.app`
- 部署级配置：仅此 Preview 启用 `NEXT_PUBLIC_ANALYTICS=true`；广告仍关闭，Production 环境变量未修改。
- 状态：Ready；未绑定 `pixcloak.com`，受 Vercel Deployment Protection 保护并带平台级 `noindex`。
- 构建基线：Next.js `15.5.20`、PostCSS `8.5.10`；生产依赖审计为 `0 vulnerabilities`，tracing 根目录冲突告警为 0。

## 已通过

- 远程上线审计：34 个唯一索引 URL、24 个工具路由、两个 sitemap 零重复、内部链接无 404，301/noindex/下线页面与广告位符合冻结规则。
- 17 项真实图片工作流：全部 KB/最长边预设与自定义比例、硬 KB、JPEG/PNG/WebP、极低目标、真实 HEIC、批量隔离/重试/取消、剪贴板粘贴、实心/像素化/真模糊、元数据清除、Safe Share ZIP、共享独立工具和无图片网络上传全部通过。
- Chrome、Edge、Firefox、WebKit：硬 KB、Safe Share 解码和 390px 移动端无溢出全部通过。
- Preview 性能：主页 LCP 720ms、Safe Share 304ms、Upload Ready 252ms；CLS 最高 0.0261；交互代理最高 3ms。
- Analytics consent 实测：同意前 0 个 Insights 请求；同意后 4 个 Insights 请求，其中 3 个事件 POST；事件体未发现文件名、EXIF/GPS/XMP/IPTC 或禁止的精确属性。
- IndexNow：32 位正式公开 key 文件已在 Preview 返回 200，文件内容与文件名一致；旧 8 位占位 key、旧指南和未使用脚本已移除。
- 最近 30 分钟部署日志无 error、无 5xx。
- 服务门禁检查：Preview 初始为 `data-analytics="off"`、`data-ads="off"`、`data-ads-available="false"`。Analytics 只在用户明确允许后加载；即使 Preview 环境已有有效 AdSense client，广告仍因不是 Production 部署而被阻断。
- 真实 Chrome 390×844 视觉复核：Safe Share 与 Upload Ready 均无横向溢出；三种遮挡、EXIF/GPS/XMP/IPTC、禁用按钮状态和非 PWA 本地处理说明与实现一致。
- 遗留库存清理：虚构指标 Gallery 与旧平台 Scenario 分别永久重定向到可下载样例指南和上传主题中心；mock Changelog 及其 API 返回 404。生产构建由 73 个页面收口为 68 个，索引面仍为 34 个 URL。
- 独立广告合格构建审计通过：未同意时无 AdSense 脚本；同意后仅独立指南文章保留 2 个手动广告位，首页、Safe Share、Upload Ready、核心工具、隐私页、embed、Labs 和 404 均无广告；审计结束后自动恢复普通广告关闭构建。
- AdSense 账户已创建专用响应式展示广告单元 `PixCloak-content`（slot `1345970286`），并关闭 `pixcloak.com` 的全站自动广告。Preview 已配置真实 slot，但 `NEXT_PUBLIC_GOOGLE_CMP_READY` 保持缺省，广告继续被代码门禁阻断。
- `pixcloak.com` 的隐私消息主变现平台被 Google 标记为 Ad Manager；对应账号的恢复申请已提交，Google 当前显示“正在审核您的申请”（通常 24 小时内，也可能更久）。审批通过前欧洲/美国隐私消息仍无法发布。

## 切流前仍需人工确认

1. 使用真实手机和桌面各下载一次 Safe Share 与 Upload Ready 结果。
2. 保持 Production 广告关闭；确认生产环境变量不会让 CMP 未就绪时加载广告。
3. 保存当前旧生产 deployment 作为回滚目标，再获得明确 Production 切流授权。
4. 切流后立即执行 `npm run audit:live`，并检查生产 error/5xx 日志。

## 自动部署边界

- GitHub：`LeeJinMing/PixCloak`
- Production Branch：`main`
- Vercel 已开启 Git 自动部署和生产域名自动分配；推送 `main` 可能立即替换 `pixcloak.com`，不能作为 Preview 使用。
- Preview 已有真实 `NEXT_PUBLIC_ADSENSE_SLOT`；生产环境仍未配置该变量，所有环境均无 `NEXT_PUBLIC_GOOGLE_CMP_READY`。因此广告会保持关闭，广告版本不得提升。
- 推荐下一阶段使用 `vercel --prod --skip-domain` 生成 staged production build，验证 Production 环境后再显式 promote。

本记录不包含或保存 Vercel 自动化绕过 Cookie/令牌。

后续可用一条命令复现本记录的自动部分：

```powershell
npm run audit:preview -- https://pix-cloak-4fqx65roz-leejinmings-projects.vercel.app
npm run audit:seo-cutover -- https://pix-cloak-4fqx65roz-leejinmings-projects.vercel.app
```

最终广告关闭候选为 deployment `dpl_9HvmU4mxoCbdLAUd43to6ZszG2Am`（`https://pix-cloak-4fqx65roz-leejinmings-projects.vercel.app`）。该候选再次通过 34 页、17 个图片流程、4 浏览器、性能和 Analytics consent 门禁；同意前无 Insights 请求，同意后 4 个请求/3 个事件 POST，未发现文件名或图片元数据属性。

SEO 切换库存已在同一候选上逐条验证：旧线上 202 个 URL 中保留 13 个地址，新增 21 个地址，处置 189 个旧地址，最终为 34 个 URL（净减少 168）。189 个旧地址的实际响应为 150 个永久重定向、26 个保留并 `noindex`、13 个正确 404，未闭环 0。此前的 Preview deployments 已被该候选取代，不再作为上线候选。
