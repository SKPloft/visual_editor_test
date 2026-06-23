const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const docsDir = path.resolve(__dirname, '../.docs');
const rogueDir = path.join(docsDir, 'rogue-engine');
const threeDir = path.join(docsDir, 'threejs');

function splitCamelCase(str) {
  let result = str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function getSafeFilename(name) {
  return name.replace(/[<>:"\/\\|?*]+/g, '-');
}

const missingOrSuspicious = {
  rogue: [],
  threeManual: [],
  threeApi: []
};

function checkFile(expectedPath, label, name, originalUrl) {
  if (!fs.existsSync(expectedPath)) {
    missingOrSuspicious[label].push({ name, reason: 'Missing file', expectedPath, originalUrl });
    return;
  }
  
  const content = fs.readFileSync(expectedPath, 'utf8');
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  
  // The scraper prepends Title: and Source URL:, so there's always at least 2 lines.
  // If lines <= 3, the actual content is basically empty.
  if (lines.length <= 3) {
    missingOrSuspicious[label].push({ name, reason: 'Suspiciously small (empty content)', lines: lines.length, expectedPath, originalUrl });
  }
}

// 1. Rogue Engine
const rogueLinks = JSON.parse(fs.readFileSync('rogue_links.json', 'utf8'));
for (const link of rogueLinks) {
  if (link === '/') continue;
  const oldBase = link.replace(/^\/|\.html$/g, '');
  const parts = oldBase.split('/');
  const visualParts = parts.map(p => splitCamelCase(p));
  
  const newDir = path.join(rogueDir, ...visualParts.slice(0, -1));
  const newFilename = getSafeFilename(visualParts[visualParts.length - 1]) + '.md';
  const expectedPath = path.join(newDir, newFilename);
  
  checkFile(expectedPath, 'rogue', newFilename, link);
}

// 2. Three.js Manuals
const manualList = JSON.parse(fs.readFileSync('manual_list.json', 'utf8'));
const enManuals = manualList['en'];
const manualBaseDir = path.join(threeDir, 'Manual');

for (const [category, links] of Object.entries(enManuals)) {
  for (const [title, link] of Object.entries(links)) {
    const newDir = path.join(manualBaseDir, getSafeFilename(category));
    const newFilename = getSafeFilename(title) + '.md';
    const expectedPath = path.join(newDir, newFilename);
    
    checkFile(expectedPath, 'threeManual', newFilename, link);
  }
}

// 3. Three.js API
const threeDocsHtml = fs.readFileSync('three_docs.html', 'utf8');
const $ = cheerio.load(threeDocsHtml);
const apiBaseDir = path.join(threeDir, 'API');

let currentH2 = '';
let currentH3 = '';

$('h2, h3, ul').each((i, el) => {
  if (el.tagName === 'h2') {
    currentH2 = $(el).text().trim();
    currentH3 = '';
  } else if (el.tagName === 'h3') {
    currentH3 = $(el).text().trim();
  } else if (el.tagName === 'ul') {
    $(el).find('li > a').each((j, a) => {
      const href = $(a).attr('href');
      if (href && href.endsWith('.html')) {
        const className = $(a).text().trim();
        let newDir = path.join(apiBaseDir, getSafeFilename(currentH2));
        if (currentH3) {
          newDir = path.join(newDir, getSafeFilename(currentH3));
        }
        const newFilename = getSafeFilename(className) + '.md';
        const expectedPath = path.join(newDir, newFilename);
        
        checkFile(expectedPath, 'threeApi', newFilename, href);
      }
    });
  }
});

console.log(JSON.stringify(missingOrSuspicious, null, 2));
