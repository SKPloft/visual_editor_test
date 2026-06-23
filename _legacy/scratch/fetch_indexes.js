const cheerio = require('cheerio');
const fs = require('fs');

async function fetchRogue() {
  const res = await fetch('https://docs.rogueengine.io/');
  const html = await res.text();
  const $ = cheerio.load(html);
  const links = [];
  $('a.sidebar-link').each((i, el) => {
    links.push($(el).attr('href'));
  });
  console.log('Rogue links:', links.length);
  fs.writeFileSync('rogue_links.json', JSON.stringify(links, null, 2));
}

async function fetchThree() {
  const res = await fetch('https://threejs.org/docs/list.json');
  const list = await res.json();
  const links = [];
  
  for (const lang of Object.keys(list)) {
      if (lang !== 'en') continue; // only English for now
      const sections = list[lang];
      for (const section of Object.keys(sections)) {
          const pages = sections[section];
          for (const pageName of Object.keys(pages)) {
              const urlParts = pages[pageName];
              // The JSON structure is like: "Developer Reference": { "WebGLRenderer": "api/en/renderers/WebGLRenderer" }
              // The corresponding page URL in threejs is docs/pages/[urlPart].html or api/en/...
              // Wait, the documentation says:
              //   Target: .../docs/pages/WebGLRenderer.html
              //   Or for manual: .../manual/en/creating-a-scene.html
              // Let's just store the values and we will construct URLs later
              links.push({
                 section,
                 name: pageName,
                 path: urlParts
              });
          }
      }
  }
  console.log('Three.js links:', links.length);
  fs.writeFileSync('three_links.json', JSON.stringify(links, null, 2));
}

async function fetchThreeManual() {
  // Let's fetch the manual index just in case it's in the HTML
  const res = await fetch('https://threejs.org/manual/en/');
  const html = await res.text();
  const $ = cheerio.load(html);
  const links = [];
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && href.endsWith('.html')) {
        links.push(href);
    }
  });
  console.log('Three manual links:', links.length);
  fs.writeFileSync('three_manual_links.json', JSON.stringify(links, null, 2));
}

async function main() {
  await fetchRogue();
  await fetchThree();
  await fetchThreeManual();
}

main().catch(console.error);
