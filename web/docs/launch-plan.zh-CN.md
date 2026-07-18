# PixCloak 最终上线计划

## V1.0 定位与边界

PixCloak V1.0 是一个“分享或上传前的本地图片准备器”。首页只承接两个完整结果：

1. **Safe Share**：逐张检查图片，手工覆盖人脸、车牌、证件号、聊天文字或二维码；导出扁平化 JPEG；重新解码并确认未检出 EXIF、GPS、XMP、IPTC。
2. **Upload Ready**：把 JPG、PNG、WebP、HEIC 转为指定格式、尺寸、比例和硬性 KB 上限；仅当导出文件重新解码且未超过上限时提供成功下载。

导航只保留 Safe Share、Upload Ready、Compress、Redact、Tools、Guides、中文。工具中心公开 6 个核心工具，其余实验工具折叠到 Labs，并统一 `noindex, follow`。

## 上线门槛

- `npm run fixtures:generate` 生成不少于 60 个可重复测试图片。
- `npm run test:contracts` 全部通过。
- `npx tsc --noEmit`、`npm run lint`、`npm run build` 通过。
- 桌面与 390px 手机视口无横向溢出；两条工作流、隐私选择、导航、下载和失败状态在真实浏览器验证。
- 根 sitemap 与 Guides sitemap 合计只公开 30–40 个高质量英文 URL；重复语言页 301 到英文规范页；Labs 和存量薄页 `noindex, follow`。
- `LICENSE` 为完整 AGPL-3.0 正文，`THIRD_PARTY_NOTICES.md` 与安装依赖同步。
- 未配置经 Google 认可的 CMP 前，`NEXT_PUBLIC_GOOGLE_CMP_READY` 必须保持关闭；广告不得加载。
- 生产环境必须设置 `NEXT_PUBLIC_SITE_URL`、IndexNow 管理令牌，并验证隐私页与实际启用服务一致。

## 6 周执行表

| 周次 | 交付物 | 退出条件 |
| --- | --- | --- |
| 第 1 周 | 下线虚构研究、案例、推荐语与模板下载；收敛导航、sitemap、重定向 | 页面清单和索引清单可审计 |
| 第 2 周 | 共享图片引擎、硬 KB 上限、重新解码验证、HEIC 输入 | 目标大小不超限，失败不伪装成功 |
| 第 3 周 | Safe Share 多文件逐张复核、三种遮挡、元数据检查与批量导出 | 每张图片必须独立复核后才能进入 ZIP |
| 第 4 周 | Upload Ready 预设、格式/尺寸/比例、批量取消重试、统一结果卡 | 100KB/200KB/500KB/1MB 与 1080/1920/2048 预设通过 |
| 第 5 周 | 34 个索引 URL、主题指南、结构化数据、内链、CMP/广告/匿名事件 | 无薄页进入 sitemap；广告只在同意后加载 |
| 第 6 周 | 110 个图片夹具、契约测试、生产构建、桌面/手机验收、发布回滚演练 | 发布检查表全部勾选，才允许切生产域名 |

## 2026-07-18 当前验收快照

- 生产构建通过，生成 68 个页面；索引面严格收口为 34 个唯一 URL。虚构 Gallery、旧 Scenario 和 mock Changelog/API 已从可访问库存移除或永久合并。
- 103 项图片、元数据、指南证据、六个核心工具匿名漏斗、IndexNow key、服务配置、安全头和产品文案契约测试通过；manifest 中 110 个夹具均与不重复的磁盘文件及真实文件魔数逐一匹配。
- 16 篇索引指南各有独立、可下载的前后证据文件；生成器记录尺寸、字节数和 SHA-256，并验证硬 KB 与 GPS 清除声明。
- 系统 Chrome 17 项端到端测试通过，包括全部 Upload Ready 预设、自定义比例、真实 HEIC、硬 KB 上限、批量取消/重试、剪贴板、实心/像素化/真模糊、Safe Share ZIP、元数据清除与无图片上传。
- 上线审计通过：sitemap、canonical、内部链接、301、noindex 与已下线页面均符合预期。
- Chrome、Edge、Firefox、WebKit 的移动视口兼容冒烟测试通过：硬 KB、Safe Share 解码和横向溢出均符合门槛。
- 最新最终 Preview 移动视口性能门槛通过：首页 LCP 720ms / CLS 0；Safe Share LCP 304ms / CLS 0；Upload Ready LCP 252ms / CLS 0.0261。交互延迟实验代理最高 3ms；正式 INP 必须以上线后的真实用户数据为准。
- Analytics consent 网络审计通过：同意前不加载 Insights；同意后才发送匿名事件，3 个实测事件 POST 均未出现文件名、图片元数据或禁止的精确属性。
- 广告合格生产构建专项审计通过：只有用户同意后才加载 AdSense，广告位数量和排除页面均符合冻结规则；真实 CMP 与账户填充仍需外部验证。

## 正式切流前人工检查表

- [x] `https://pixcloak.com` 域名、TLS、robots、sitemap 与 `ads.txt` 可访问；Production 环境已有 `NEXT_PUBLIC_SITE_URL`，但当前域名仍指向旧版。
- [ ] 在 Google 账户完成获认可 CMP、隐私地区规则与 AdSense 站点审核。
- [x] 当前 Production 缺少 CMP-ready 与 slot 条件，代码硬门禁会阻断广告；候选环境检查结果为 `cmp_not_ready`。
- [ ] CMP 完成后再填写 `NEXT_PUBLIC_ADSENSE_CLIENT`，逐步开启广告并核对隐私页实际披露。
- [ ] Production 设置 `INDEXNOW_KEY=001a496c4107466fbca000201f39aeeb`；公开验证文件已生成，切流后验证可访问并运行核心 URL 提交，再向 Search Console 提交两个 sitemap。
- [ ] 在真实域名重跑 `npm run audit:launch`、`npm run test:e2e` 与 `npm run test:performance`。
- [ ] 观察 7–28 天 Search Console、广告可见率与真实用户 Core Web Vitals；INP >200ms、CLS >0.1 或 LCP >2.5s 时停止增加广告位。
- [ ] 保留上一稳定部署；发生下载错误、图片外传请求、CMP 失效或索引暴增时立即回滚并关闭广告开关。

完整命令顺序、环境变量、灰度步骤和回滚触发器见 `docs/production-release-runbook.zh-CN.md`。本地发布候选统一执行 `npm run release:check`；广告生产版还必须额外通过 `npm run env:check:live`。

## 免费广告变现模型

广告只放在完成任务后的自然停顿处：首页内容末尾、工具结果/说明之后、指南正文中后段。编辑器、上传控件、主 CTA 周围不放广告。首个收入目标不是增加广告位，而是提高“高意图指南 → 工具成功 → 回访”的闭环。

核心匿名漏斗事件仅记录工具名、格式和区间值，不记录文件名、图片字节、元数据、文本或精确尺寸：`tool_view`、`process_started`、`process_succeeded`、`process_failed`、`batch_started`、`download_completed`、`related_tool_clicked`、`ad_viewable`。

## SEO 增长方式

- 主题集群一：安全分享——元数据、GPS、聊天截图、车牌、证件、发布前检查。
- 主题集群二：上传限制——100KB、200KB、500KB、1MB、最长边、表单上传失败。
- 主题集群三：格式选择——HEIC、JPG/PNG/WebP、透明背景、兼容性与质量。
- 每篇指南只解决一个检索意图，首屏给直接答案，随后提供真实工具入口、限制、验证方法和 FAQ。
- 每月根据 Search Console 的曝光高但点击低查询重写标题与摘要；根据“进入工具但未成功”的匿名漏斗优先修工具，而不是批量增加文章。

## V1.1 及以后

- **V1.1**：自动人脸/车牌/文字/二维码检测、可安装 PWA 与离线缓存、系统分享入口、更完整的剪贴板体验。
- **V1.2**：在隐私和性能验证后评估桌面壳、受控嵌入、团队预设；不在 V1.0 承诺云同步或账户系统。
- **长期变现**：若广告收入不足，再评估无广告版、批量上限提升、团队策略模板或桌面版；任何付费项不得削弱免费的本地处理核心能力。
