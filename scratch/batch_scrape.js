const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

turndownService.addRule('header-anchors', {
  filter: function (node, options) {
    return (
      node.nodeName === 'A' &&
      node.getAttribute('href') &&
      node.getAttribute('href').startsWith('#') &&
      (node.textContent === '#' || node.textContent === '')
    );
  },
  replacement: function (content, node) {
    return ''; // strip out VuePress header anchors
  }
});

const docsDir = path.resolve(__dirname, '../.docs');
const rogueDir = path.join(docsDir, 'rogue-engine');
const threeDir = path.join(docsDir, 'threejs');

function getFilename(name) {
  // convert name to kebab-case
  return name.replace(/\//g, '-').replace(/^-|-$/g, '').toLowerCase() + '.md';
}

async function scrapePage(targetDir, name, url, type = 'rogue') {
  const fileName = getFilename(name);
  const filePath = path.join(targetDir, fileName);

  if (fs.existsSync(filePath)) {
    // console.log(`[SKIPPING] ${fileName} already exists.`);
    return;
  }

  console.log(`[FETCHING] ${fileName} from ${url}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let contentHtml = '';

    if (type === 'rogue') {
      contentHtml = $('.theme-default-content').html() || $('.page').html() || $('body').html();
    } else if (type === 'manual') {
      contentHtml = $('.lesson-main').html() || $('.container').html() || $('body').html();
    } else if (type === 'api') {
      $('style').remove();
      $('script').remove();
      contentHtml = $('body').html();
    }

    if (!contentHtml) {
      throw new Error('Could not find content container in HTML');
    }

    const markdown = turndownService.turndown(contentHtml);
    const finalContent = `Title: ${name}\nSource URL: ${url}\n\n${markdown}`;

    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`[SUCCESS] Saved ${fileName} (${finalContent.length} chars)`);
  } catch (error) {
    console.error(`[ERROR] Failed to fetch ${name}:`, error.message);
  }
}

async function main() {
  fs.mkdirSync(rogueDir, { recursive: true });
  fs.mkdirSync(threeDir, { recursive: true });

  // 1. Rogue Engine
  console.log('\n--- Scraping Rogue Engine Docs ---');
  const rogueLinks = JSON.parse(fs.readFileSync('rogue_links.json', 'utf8'));
  for (const link of rogueLinks) {
    if (link === '/') continue;
    // link is like /GettingStarted/YourFirstProject.html
    const name = link.replace(/^\/|\.html$/g, '');
    const url = `https://docs.rogueengine.io${link.replace(/\.html$/, '')}`; // The site doesn't use .html for endpoints typically
    await scrapePage(rogueDir, name, url, 'rogue');
    await delay(200);
  }

  // 2. Three.js Manuals
  console.log('\n--- Scraping Three.js Manuals ---');
  const manualList = JSON.parse(fs.readFileSync('manual_list.json', 'utf8'));
  const enManuals = manualList['en'];
  for (const category of Object.values(enManuals)) {
    for (const link of Object.values(category)) {
      // link is like en/creating-a-scene
      const name = link;
      const url = `https://threejs.org/manual/${link}.html`;
      await scrapePage(threeDir, name, url, 'manual');
      await delay(200);
    }
  }

  // 3. Three.js API
  console.log('\n--- Scraping Three.js API ---');
  const threeDocsHtml = fs.readFileSync('three_docs.html', 'utf8');
  const apiMatches = threeDocsHtml.match(/href="([^"]+\.html)"/g);
  if (apiMatches) {
    for (const match of apiMatches) {
      const fileName = match.match(/href="([^"]+\.html)"/)[1];
      // Skip files that are likely not API pages if any, but all .html here seem to be API
      const name = fileName.replace(/\.html$/, '');
      const url = `https://threejs.org/docs/pages/${fileName}`;
      await scrapePage(threeDir, name, url, 'api');
      await delay(200);
    }
  }

  console.log('\nScrape Complete!');
}

main().catch(console.error);
