const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const docsDir = path.resolve(__dirname, '../.docs');
const rogueDir = path.join(docsDir, 'rogue-engine');
const threeDir = path.join(docsDir, 'threejs');

function splitCamelCase(str) {
  // Add space before capital letters and capitalize the first letter
  let result = str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function getSafeFilename(name) {
  return name.replace(/[<>:"\/\\|?*]+/g, '-');
}

function getOldFilename(name) {
  // This matches the getFilename logic from batch_scrape.js
  return name.replace(/\//g, '-').replace(/^-|-$/g, '').toLowerCase() + '.md';
}

console.log('--- Organizing Rogue Engine Docs ---');
const rogueLinks = JSON.parse(fs.readFileSync('rogue_links.json', 'utf8'));
for (const link of rogueLinks) {
  if (link === '/') continue;
  const oldBase = link.replace(/^\/|\.html$/g, ''); // e.g. GettingStarted/YourFirstProject
  const oldFilename = getOldFilename(oldBase);
  const oldPath = path.join(rogueDir, oldFilename);
  
  if (fs.existsSync(oldPath)) {
    const parts = oldBase.split('/');
    const visualParts = parts.map(p => splitCamelCase(p));
    
    const newDir = path.join(rogueDir, ...visualParts.slice(0, -1));
    const newFilename = getSafeFilename(visualParts[visualParts.length - 1]) + '.md';
    const newPath = path.join(newDir, newFilename);
    
    fs.mkdirSync(newDir, { recursive: true });
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`Moved: ${oldFilename} -> ${path.join(...visualParts.slice(0, -1), newFilename)}`);
    }
  }
}

console.log('\n--- Organizing Three.js Manuals ---');
const manualList = JSON.parse(fs.readFileSync('manual_list.json', 'utf8'));
const enManuals = manualList['en'];
const manualBaseDir = path.join(threeDir, 'Manual');

for (const [category, links] of Object.entries(enManuals)) {
  for (const [title, link] of Object.entries(links)) {
    const oldFilename = getOldFilename(link);
    const oldPath = path.join(threeDir, oldFilename);
    
    if (fs.existsSync(oldPath)) {
      const newDir = path.join(manualBaseDir, getSafeFilename(category));
      const newFilename = getSafeFilename(title) + '.md';
      const newPath = path.join(newDir, newFilename);
      
      fs.mkdirSync(newDir, { recursive: true });
      if (oldPath !== newPath) {
        fs.renameSync(oldPath, newPath);
        console.log(`Moved: ${oldFilename} -> Manual/${category}/${newFilename}`);
      }
    }
  }
}

console.log('\n--- Organizing Three.js API ---');
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
        const oldFilename = getOldFilename(href.replace(/\.html$/, ''));
        let oldPath = path.join(threeDir, oldFilename);
        
        // Sometimes Three.js doc scraper saved as filename in lower-case from URL directly
        if (!fs.existsSync(oldPath)) {
           // fallback check if there are other filename variations
           // some pages were fetched as e.g. webglrenderer.md
           oldPath = path.join(threeDir, getOldFilename(className));
        }

        if (fs.existsSync(oldPath)) {
          let newDir = path.join(apiBaseDir, getSafeFilename(currentH2));
          if (currentH3) {
            newDir = path.join(newDir, getSafeFilename(currentH3));
          }
          const newFilename = getSafeFilename(className) + '.md';
          const newPath = path.join(newDir, newFilename);
          
          fs.mkdirSync(newDir, { recursive: true });
          if (oldPath !== newPath) {
            fs.renameSync(oldPath, newPath);
            console.log(`Moved: ${path.basename(oldPath)} -> API/${currentH2}/${currentH3 ? currentH3 + '/' : ''}${newFilename}`);
          }
        }
      }
    });
  }
});

console.log('\n--- Cleanup ---');
// Let's identify files in threejs/ that are still in the root dir (not in Manual or API)
const files = fs.readdirSync(threeDir);
for (const file of files) {
  const filePath = path.join(threeDir, file);
  if (fs.statSync(filePath).isFile() && file.endsWith('.md')) {
    const uncatDir = path.join(threeDir, 'Uncategorized');
    fs.mkdirSync(uncatDir, { recursive: true });
    fs.renameSync(filePath, path.join(uncatDir, file));
    console.log(`Moved uncategorized: ${file} -> Uncategorized/${file}`);
  }
}
