const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Avoid converting anchors inside header tags to markdown links if they are just section identifiers
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

const rogueEngineUrls = [
  { name: 'getting-started-index', url: 'https://docs.rogueengine.io/GettingStarted/YourFirstProject' }, // fallback index
  { name: 'getting-started-first-project', url: 'https://docs.rogueengine.io/GettingStarted/YourFirstProject' },
  { name: 'getting-started-next-steps', url: 'https://docs.rogueengine.io/GettingStarted/NextSteps' },
  { name: 'workflow-editor-layout', url: 'https://docs.rogueengine.io/Workflow/EditorLayout' },
  { name: 'workflow-visual-components', url: 'https://docs.rogueengine.io/Workflow/VisualComponents' },
  { name: 'workflow-importing-assets', url: 'https://docs.rogueengine.io/Workflow/ImportingAssets' },
  { name: 'workflow-loading-assets', url: 'https://docs.rogueengine.io/Workflow/LoadingAssets' },
  { name: 'workflow-asset-manager', url: 'https://docs.rogueengine.io/Workflow/AssetManager' },
  { name: 'workflow-building-your-project', url: 'https://docs.rogueengine.io/Workflow/BuildingYourProject' },
  { name: 'workflow-static-assets', url: 'https://docs.rogueengine.io/Workflow/StaticAssets' },
  { name: 'workflow-marketplace', url: 'https://docs.rogueengine.io/Workflow/Marketplace' },
  { name: 'workflow-input-manager', url: 'https://docs.rogueengine.io/Workflow/InputManager' },
  { name: 'assets-scenes', url: 'https://docs.rogueengine.io/assets/Scenes' },
  { name: 'assets-materials', url: 'https://docs.rogueengine.io/assets/Materials' },
  { name: 'assets-components', url: 'https://docs.rogueengine.io/assets/Components' },
  { name: 'assets-audio-assets', url: 'https://docs.rogueengine.io/assets/AudioAssets' },
  { name: 'assets-prefabs', url: 'https://docs.rogueengine.io/assets/Prefabs' },
  { name: 'engine-api-app', url: 'https://docs.rogueengine.io/EngineAPI/App' },
  { name: 'engine-api-audio-asset', url: 'https://docs.rogueengine.io/EngineAPI/AudioAsset' },
  { name: 'engine-api-component', url: 'https://docs.rogueengine.io/EngineAPI/Component' },
  { name: 'engine-api-visual-component', url: 'https://docs.rogueengine.io/EngineAPI/VisualComponent' },
  { name: 'engine-api-debug', url: 'https://docs.rogueengine.io/EngineAPI/Debug' },
  { name: 'engine-api-input-mouse', url: 'https://docs.rogueengine.io/EngineAPI/Input/Mouse' },
  { name: 'engine-api-input-keyboard', url: 'https://docs.rogueengine.io/EngineAPI/Input/Keyboard' },
  { name: 'engine-api-input-touch', url: 'https://docs.rogueengine.io/EngineAPI/Input/TouchController' },
  { name: 'engine-api-input-gamepad', url: 'https://docs.rogueengine.io/EngineAPI/Input/GamepadController' },
  { name: 'engine-api-prefab', url: 'https://docs.rogueengine.io/EngineAPI/Prefab' },
  { name: 'engine-api-runtime', url: 'https://docs.rogueengine.io/EngineAPI/Runtime' },
  { name: 'engine-api-scene-controller', url: 'https://docs.rogueengine.io/EngineAPI/SceneController' },
  { name: 'engine-api-functions', url: 'https://docs.rogueengine.io/EngineAPI/Functions' },
  { name: 'engine-api-events', url: 'https://docs.rogueengine.io/EngineAPI/Events' },
  { name: 'engine-api-tags', url: 'https://docs.rogueengine.io/EngineAPI/Tags' }
];

const threejsUrls = [
  // Manuals
  { name: 'creating-a-scene', url: 'https://threejs.org/manual/en/creating-a-scene.html', type: 'manual' },
  { name: 'fundamentals', url: 'https://threejs.org/manual/en/fundamentals.html', type: 'manual' },
  { name: 'responsive', url: 'https://threejs.org/manual/en/responsive.html', type: 'manual' },
  { name: 'scenegraph', url: 'https://threejs.org/manual/en/scenegraph.html', type: 'manual' },
  { name: 'materials', url: 'https://threejs.org/manual/en/materials.html', type: 'manual' },
  { name: 'textures', url: 'https://threejs.org/manual/en/textures.html', type: 'manual' },
  { name: 'lights', url: 'https://threejs.org/manual/en/lights.html', type: 'manual' },
  { name: 'cameras', url: 'https://threejs.org/manual/en/cameras.html', type: 'manual' },
  { name: 'shadows', url: 'https://threejs.org/manual/en/shadows.html', type: 'manual' },
  { name: 'cleanup', url: 'https://threejs.org/manual/en/cleanup.html', type: 'manual' },
  // API pages
  { name: 'webgl-renderer', url: 'https://threejs.org/docs/pages/WebGLRenderer.html', type: 'api' },
  { name: 'scene', url: 'https://threejs.org/docs/pages/Scene.html', type: 'api' },
  { name: 'object3d', url: 'https://threejs.org/docs/pages/Object3D.html', type: 'api' },
  { name: 'mesh', url: 'https://threejs.org/docs/pages/Mesh.html', type: 'api' },
  { name: 'buffer-geometry', url: 'https://threejs.org/docs/pages/BufferGeometry.html', type: 'api' },
  { name: 'perspective-camera', url: 'https://threejs.org/docs/pages/PerspectiveCamera.html', type: 'api' }
];

async function scrapePage(targetDir, name, url, type = 'rogue') {
  const filePath = path.join(targetDir, `${name}.md`);

  console.log(`[FETCHING] ${name} from ${url}...`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    let contentHtml = '';

    if (type === 'rogue') {
      // VuePress container
      contentHtml = $('.theme-default-content').html() || $('.page').html() || $('body').html();
    } else if (type === 'manual') {
      // Three.js Manual Container
      contentHtml = $('.lesson-main').html() || $('.container').html() || $('body').html();
    } else if (type === 'api') {
      // Three.js API Container
      // Remove styles and scripts to keep the document clean
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
    console.log(`[SUCCESS] Saved ${name}.md (${finalContent.length} chars)`);
  } catch (error) {
    console.error(`[ERROR] Failed to fetch ${name}:`, error.message);
  }
}

async function main() {
  const docsDir = path.resolve(__dirname, '../.docs');
  const rogueDir = path.join(docsDir, 'rogue-engine');
  const threeDir = path.join(docsDir, 'threejs');

  fs.mkdirSync(rogueDir, { recursive: true });
  fs.mkdirSync(threeDir, { recursive: true });

  console.log('Starting Rogue Engine Docs Scrape...');
  for (const page of rogueEngineUrls) {
    await scrapePage(rogueDir, page.name, page.url, 'rogue');
    await delay(1000);
  }

  console.log('\nStarting Three.js Docs Scrape...');
  for (const page of threejsUrls) {
    await scrapePage(threeDir, page.name, page.url, page.type);
    await delay(1000);
  }

  console.log('\nScrape Complete!');
}

main().catch(console.error);
