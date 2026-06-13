# 百度主动推送（读取 web/.env.local 中的 BAIDU_PUSH_*）
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..
node .\scripts\run-with-local-env.mjs submit-baidu-push.mjs @args
