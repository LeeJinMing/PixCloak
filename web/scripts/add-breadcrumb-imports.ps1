# 批量为所有使用 BreadcrumbJsonLd 的文件添加 import 语句

$guidesPath = "D:\20000\web\app\(marketing)\guides"
$files = Get-ChildItem -Path $guidesPath -Recurse -Filter "page.tsx"

$fixed = 0
$skipped = 0

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
    
  # 检查是否使用了 BreadcrumbJsonLd
  if ($content -notmatch 'BreadcrumbJsonLd') {
    $skipped++
    continue
  }
    
  # 检查是否已经有 import
  if ($content -match "import.*BreadcrumbJsonLd.*from") {
    Write-Host "⏭️  $($file.Name) - Already has import" -ForegroundColor Gray
    $skipped++
    continue
  }
    
  # 添加 import - 在第一个 import 之后添加
  if ($content -match "import type \{ Metadata \} from ['`"]next['`"];") {
    $newContent = $content -replace "(import type \{ Metadata \} from ['`"]next['`"];)", "`$1`nimport { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';"
    Set-Content $file.FullName -Value $newContent -NoNewline
    Write-Host "✅ $($file.Name) - Added import" -ForegroundColor Green
    $fixed++
  }
  elseif ($content -match "^import") {
    # 如果没有 Metadata import，在第一个 import 后添加
    $newContent = $content -replace "(^import[^\n]+\n)", "`$1import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';`n"
    Set-Content $file.FullName -Value $newContent -NoNewline
    Write-Host "✅ $($file.Name) - Added import" -ForegroundColor Green
    $fixed++
  }
  else {
    Write-Host "⚠️  $($file.Name) - No import found to insert after" -ForegroundColor Yellow
    $skipped++
  }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "✅ Fixed: $fixed files" -ForegroundColor Green
Write-Host "⏭️  Skipped: $skipped files" -ForegroundColor Gray
Write-Host "📁 Total: $($files.Count) files"

