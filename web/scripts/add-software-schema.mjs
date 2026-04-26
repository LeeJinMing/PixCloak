import fs from 'fs';
import path from 'path';

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Add SoftwareAppJsonLd to the component if it's a tool page and doesn't have it
      if (!content.includes('<SoftwareAppJsonLd')) {
        // Ensure SoftwareAppJsonLd is imported
        if (content.includes('import { FaqJsonLd }')) {
          content = content.replace('import { FaqJsonLd }', 'import { SoftwareAppJsonLd, FaqJsonLd }');
          modified = true;
        } else if (content.includes('import { BreadcrumbJsonLd }')) {
          content = content.replace('import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";', 'import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";\nimport { SoftwareAppJsonLd } from "@/components/SeoJsonLd";');
          modified = true;
        }

        const titleMatch = content.match(/title:\s*(['"`])((?:(?!\1)[\s\S])*)\1/);
        const descMatch = content.match(/description:\s*(['"`])((?:(?!\1)[\s\S])*)\1/);
        
        if (titleMatch && descMatch) {
          const title = titleMatch[2].replace(' | PixCloak', '');
          const desc = descMatch[2];
          const url = fullPath.replace(/.*web[\\/]app/, '').replace(/[\\/]page\.tsx$/, '').replace(/\\/g, '/');
          
          const schemaStr = `\n      <SoftwareAppJsonLd\n        name="${title.split('—')[0].split(':')[0].trim()}"\n        url="${url || '/'}"\n        description="${desc.replace(/"/g, '\\"')}"\n      />`;
          
          // Insert after BreadcrumbJsonLd
          if (content.includes('</BreadcrumbJsonLd>')) {
            content = content.replace('</BreadcrumbJsonLd>', '</BreadcrumbJsonLd>' + schemaStr);
            modified = true;
          } else if (content.includes('<BreadcrumbJsonLd')) {
            content = content.replace(/(<BreadcrumbJsonLd[^>]*\/>)/, '$1' + schemaStr);
            modified = true;
          }
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

processDir('web/app/tools');
processDir('web/app/compress');
processDir('web/app/redact');
