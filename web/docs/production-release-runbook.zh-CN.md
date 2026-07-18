# PixCloak V1.0 生产发布与回滚手册

> Vercel CLI 操作目录：必须从仓库根目录 `D:\\20000` 执行，而不是 `D:\\20000\\web`。根目录 `.vercel/project.json` 应指向项目 `pix-cloak`（ID `prj_ADGBNPqSl3jpnBGYYlBFhKTG18Ex`）；执行任何 `vercel deploy`、`vercel env`、`vercel promote` 或 `vercel rollback` 前，先运行 `vercel project inspect pix-cloak` 核对项目。仓库曾误建一个无环境变量的空 `web` 项目，不得将它用于发布。

## 1. 发布候选版

1. 在干净检出中执行 `npm ci`。
2. 执行 `npm run release:check`。它会依次完成环境安全检查、指南证据再生成、契约测试、lint、生产构建，并临时启动生产服务运行 SEO、真实图片 E2E、四浏览器兼容和性能门槛；结束后自动停止服务。
3. 保存命令输出作为该 commit 的发布证据。任何一步失败都不得继续。
4. 候选版允许广告关闭或被安全门槛阻断；它适合先部署到 Preview 环境。

截至 2026-07-18，`https://pixcloak.com` 的 HTTPS、robots、sitemap 和 `ads.txt` 可访问，但线上仍是旧版：两个核心工作流为 404，`/batch` 仍是占位页，下线内容仍返回 200。必须用当前候选部署替换旧版，不能把域名可访问误判为 V1.0 已上线。

同日已创建并自动验收受保护 Preview `dpl_7mFaWU5UkfH4ZcASgy7SFVSCjngf`（`https://pix-cloak-k2jsjw0lr-leejinmings-projects.vercel.app`）；该 Preview 通过了真实 Analytics consent 网络审计及 IndexNow key 文件验证。完整结果见 `docs/preview-validation-2026-07-18.md`。该 Preview 未绑定生产域名，不能替代切流后的 `audit:live`。

## 2. 外部账户确认

以下事项不能由仓库自动证明，必须由站点所有者在对应账户完成并留存截图/日期：

- Google 认可 CMP 已启用，EEA、英国、瑞士和其他目标地区规则正确。
- AdSense 已审核域名，client 与广告单元 slot 属于该站点。
- `pixcloak.com` 域名和 TLS 当前可用；仍需确认当前操作者拥有托管项目权限，能够提升候选部署和执行回滚。
- IndexNow key 文件能从正式域名访问。

Vercel 只读核验显示 GitHub 仓库为 `LeeJinMing/PixCloak`、Production Branch 为 `main`，且开启自动创建部署与自动绑定正式域名。因此向 `main` 推送不是 Preview 操作，而是潜在的立即生产切流。Preview 应使用 Vercel CLI 或非生产分支。

## 3. 生产环境变量

先保持广告关闭部署；验证页面与工具后再切换广告变量。

广告开启时还必须验证响应安全头。Google 官方说明 AdSense 服务域名会变化，不支持固定域名 CSP 白名单；而 Next.js nonce CSP 会让全部页面改为动态渲染并失去静态优化。因此当前配置在广告关闭时保留资源白名单 CSP，只有全部广告门禁通过的 Production 构建才省略该资源 CSP，同时继续保留 `nosniff`、同源 frame、权限策略和 HSTS。开启广告前必须在 staged production build 中确认广告实际填充、浏览器控制台无 CSP 拒绝，并重新跑性能门槛。参考：[Google AdSense CSP 指南](https://support.google.com/adsense/answer/16283098?hl=en) 与 [Next.js CSP 指南](https://nextjs.org/docs/app/guides/content-security-policy)。

仓库可用 `npm run test:ads-qualified` 复现广告开启分支。它使用测试 client/slot 构建、验证同意前后脚本和广告位、确认排除页面无广告，然后自动清理并恢复普通构建；这只能证明代码门禁，不能代替真实 Google CMP、账户审核和广告填充测试。

```text
NEXT_PUBLIC_SITE_URL=https://pixcloak.com
NEXT_PUBLIC_ANALYTICS=true|false
NEXT_PUBLIC_ADSENSE=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-真实数字
NEXT_PUBLIC_ADSENSE_SLOT=真实数字
NEXT_PUBLIC_GOOGLE_CMP_READY=true
INDEXNOW_KEY=001a496c4107466fbca000201f39aeeb
```

`INDEXNOW_KEY` 不使用 `NEXT_PUBLIC_` 前缀，但该协议密钥并非密码：搜索引擎会通过公开文件 `/001a496c4107466fbca000201f39aeeb.txt` 验证它。设置后运行 `npm run env:check:live`；检查会同时核对变量和公开文件内容，必须通过才允许把广告版提升为 Production。

2026-07-18 的远程变量名称审计显示尚无 `NEXT_PUBLIC_GOOGLE_CMP_READY` 与 `NEXT_PUBLIC_ADSENSE_SLOT`。当前代码会因此强制阻断广告，适合无广告 V1.0；不得为了让检查变绿而填入占位值。

## 4. 灰度顺序

1. 在仓库根目录执行 `vercel project inspect pix-cloak`，确认项目 ID 为 `prj_ADGBNPqSl3jpnBGYYlBFhKTG18Ex`；随后执行 `vercel list pix-cloak` 和 `vercel inspect <当前生产 URL>`，保存当前 deployment ID、URL 与时间。2026-07-18 的只读基线为 `dpl_47knvnUBXypUByQG4qfaYVGaP43P` / `https://pix-cloak-epxc39sew-leejinmings-projects.vercel.app`；该记录可能过期，发布时必须刷新。
2. 部署 Preview，不绑定生产域名；执行 `npm run audit:preview -- <Preview URL>`。该命令会临时获得受保护 Preview 会话，确认平台级 noindex，然后运行远程 SEO/路由、真实图片 E2E、四浏览器和性能门禁；无论成功失败都会删除本机临时凭据。
3. 由站点所有者在真实手机和桌面各完成一次 Safe Share 与 Upload Ready 下载，确认文件可打开且网络面板无图片上传请求。
4. 不要直接推送 `main` 作为灰度。优先执行 `vercel deploy --prod --skip-domain` 创建使用 Production 环境变量、但尚未绑定域名的 staged build；验收后再用 `vercel promote <deployment-url>` 切流。先保持广告被安全门槛阻断，观察错误率、下载成功和 Core Web Vitals。
5. 切流后立即执行 `npm run audit:live`；它会直接检查正式域名的索引库存、canonical/hreflang/lang、全部工具/Labs、重定向、下线页面、广告位和内部链接。失败必须回滚或修复，不得继续提交索引。
6. 确认 CMP 在目标地区正确出现后，再开启广告并运行 `npm run env:check:live`。
7. 稳定后提交两个 sitemap 和 IndexNow 核心 URL；不要在切流前提交。

## 5. 立即回滚条件

出现以下任一情况，先把 `NEXT_PUBLIC_ADSENSE=false` 作为广告 kill switch；涉及核心功能时直接恢复上一稳定部署：

- 任意图片字节被 POST/PUT/PATCH 到站点或第三方。
- 成功结果超过目标 KB、无法解码，或已声明清除的元数据仍存在。
- CMP 未出现但广告/分析脚本已加载。
- 下载、批量取消/重试或 HEIC 转换出现系统性失败。
- sitemap 大量 404、canonical 指向错误，或索引 URL 超出冻结清单。
- LCP >2.5s、CLS >0.1、真实 INP >200ms 且与当前部署或广告开启时间相关。

回滚后重新运行 `npm run release:check`，记录失败输入、浏览器、部署 ID 和标准化错误码；不得记录或上传用户图片、文件名、EXIF/GPS 或识别文本。

Vercel 项目完成本地关联后，生产故障优先执行 `vercel rollback`，再执行 `vercel rollback status` 并复跑 `npm run audit:live`。若套餐与 deployment 资格允许指定目标，可回滚到切流前保存的生产 URL；不得依赖上方日期基线而跳过发布时刷新。
