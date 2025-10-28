$ErrorActionPreference = "Stop"

param(
  [string]$ApiKey = $env:INDEXNOW_KEY,
  [string]$Host = "pixcloak.com"
)

if (-not $ApiKey -or $ApiKey -eq "") {
  Write-Error "Missing INDEXNOW_KEY. Pass -ApiKey or set env:INDEXNOW_KEY."
}

$urls = @(
  "https://pixcloak.com/",
  "https://pixcloak.com/compress",
  "https://pixcloak.com/redact",
  "https://pixcloak.com/guides/compress-image-to-100kb",
  "https://pixcloak.com/guides/blur-face-in-photo",
  "https://pixcloak.com/guides/convert-jpg-to-webp-online"
)

foreach ($url in $urls) {
  Write-Host "Submitting: $url"
  $payload = @{ host = $Host; key = $ApiKey; keyLocation = "https://$Host/$ApiKey.txt"; urlList = @($url) } | ConvertTo-Json -Depth 4
  try {
    Invoke-RestMethod -Method Post -Uri "https://api.indexnow.org/indexnow" -ContentType "application/json" -Body $payload -TimeoutSec 30 | Out-Null
    Write-Host "OK" -ForegroundColor Green
  }
  catch {
    Write-Warning $_
  }
  Start-Sleep -Seconds 2
}

Write-Host "✅ All URLs submitted to IndexNow!"


