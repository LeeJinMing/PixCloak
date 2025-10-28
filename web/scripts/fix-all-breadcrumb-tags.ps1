# 批量修复所有缺少 </> 闭合标签的文件

$guidesPath = "D:\20000\web\app\(marketing)\guides"
$files = Get-ChildItem -Path $guidesPath -Recurse -Filter "page.tsx"

$fixed = 0
$skipped = 0

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
    
  # 检查是否有 BreadcrumbJsonLd
  if ($content -notmatch 'BreadcrumbJsonLd') {
    Write-Host "⏭️  $($file.Name) - No BreadcrumbJsonLd" -ForegroundColor Gray
    $skipped++
    continue
  }
    
  # 检查是否已经有正确的闭合标签
  if ($content -match '\s*</>\s*\);') {
    Write-Host "⏭️  $($file.Name) - Already fixed" -ForegroundColor Gray
    $skipped++
    continue
  }
    
  # 修复：在 </div>\n  ); 之间添加 </> 
  if ($content -match '(</div>\r?\n\s{2}\);)') {
    $newContent = $content -replace '(</div>\r?\n)(\s{2}\);)', "`$1    </>`n`$2"
    Set-Content $file.FullName -Value $newContent -NoNewline
    Write-Host "✅ $($file.Name) - Fixed" -ForegroundColor Green
    $fixed++
  }
  else {
    Write-Host "⚠️  $($file.Name) - Pattern not found" -ForegroundColor Yellow
    $skipped++
  }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "✅ Fixed: $fixed files" -ForegroundColor Green
Write-Host "⏭️  Skipped: $skipped files" -ForegroundColor Gray
Write-Host "📁 Total: $($files.Count) files"

