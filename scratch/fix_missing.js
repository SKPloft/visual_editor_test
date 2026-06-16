const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

async function fetchRogueAudioAssets() {
  console.log('Fetching Audio Assets...');
  const url = 'https://docs.rogueengine.io/assets/AudioAssets';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  const contentHtml = $('.theme-default-content').html() || $('.page').html() || $('body').html();
  const markdown = turndownService.turndown(contentHtml);
  const finalContent = `Title: AudioAssets\nSource URL: ${url}\n\n${markdown}`;
  
  const targetPath = path.resolve(__dirname, '../.docs/rogue-engine/Assets/Audio Assets.md');
  fs.writeFileSync(targetPath, finalContent);
  console.log('Saved Audio Assets.md');
}

fetchRogueAudioAssets().catch(console.error);
