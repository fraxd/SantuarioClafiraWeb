/**
 * Pre-renders the Handlebars template for ES and EN into static HTML files.
 * Output goes to dist-static/ for Netlify deployment.
 */
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');

const { AppService } = require('../dist/app.service');

const outDir = path.join(__dirname, '..', 'dist-static');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(path.join(outDir, 'en'), { recursive: true });

// Copy public assets
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
copyDir(path.join(__dirname, '..', 'public'), outDir);

// Register helpers
hbs.registerHelper('eq', (a, b) => a === b);
hbs.registerHelper('lookup', (arr, idx) => arr[idx]);

// Compile template
const templateSrc = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'index.hbs'),
  'utf-8'
);
const template = hbs.compile(templateSrc);

const svc = new AppService();

// Render ES (root index.html)
const esData = svc.getPageData('es');
const esHtml = template(esData);
fs.writeFileSync(path.join(outDir, 'index.html'), esHtml, 'utf-8');
console.log('✓ Generated dist-static/index.html (ES)');

// Render EN (en/index.html)
const enData = svc.getPageData('en');
// Fix lang toggle href for static site
enData.nav.langHref = '/';
esData.nav.langHref = '/en/';
const enHtml = template(enData);
fs.writeFileSync(path.join(outDir, 'en', 'index.html'), enHtml, 'utf-8');
console.log('✓ Generated dist-static/en/index.html (EN)');

// Re-render ES with corrected langHref
const esHtml2 = template(esData);
fs.writeFileSync(path.join(outDir, 'index.html'), esHtml2, 'utf-8');

console.log('\nStatic build complete → dist-static/');
