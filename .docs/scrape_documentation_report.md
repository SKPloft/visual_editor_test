# Documentation Scrape & Reorganization Report

This document details the workflow, URL mapping rules, and local directory structures used to successfully extract and organize the complete Rogue Engine and Three.js documentation into an LLM-friendly, hierarchical markdown format.

---

## 📋 Steps

### 1. Index Extraction
To ensure no pages were missed, we first dynamically extracted the official index maps for both frameworks:
* **Rogue Engine**: Scraped the sidebar navigation links from the VuePress homepage (`docs.rogueengine.io`) to capture all valid endpoints.
* **Three.js**:
  * **API**: Downloaded the main `threejs.org/docs/` SPA root layout and extracted all `[ClassName].html` references using Regex.
  * **Manual**: Parsed `threejs.org/manual/list.json` to get a structured tree of all English tutorial endpoints.

### 2. URL Strategy & Batch Fetching
To bypass client-side routing, SPA redirects, and 404 responses, we utilized the following URL mapping schemas during our batch-scrape:
* **Rogue Engine**: Appended the relative endpoints found in the sidebar directly to `https://docs.rogueengine.io/` (omitting `.html` extensions).
* **Three.js**:
  * **API Classes**: Routed directly to the underlying raw HTML pages hosted inside the `/docs/pages/` directory (e.g. `https://threejs.org/docs/pages/WebGLRenderer.html`), bypassing the redirection scripts entirely.
  * **Manual Lessons**: Routed to `https://threejs.org/manual/en/...` based on the paths defined in `list.json`.

### 3. DOM Extraction & Cleaning
Since raw HTML files contain boilerplate (like the 1,700-link Three.js sidebar), fetching them blindly confuses LLMs. We used a Node.js scraper script (`scratch/batch_scrape.js`) that:
* Fetches raw HTML.
* Employs **Cheerio** to isolate the specific content container (`.theme-default-content` for Rogue Engine; `.lesson-main` or `body` with scripts stripped for Three.js).
* Utilizes **Turndown** to cleanly convert HTML tables, code segments, and headings into standard markdown.

### 4. Hierarchical Reorganization
To make the downloaded documentation easy to navigate for both developers and LLMs, we built a post-processing script (`scratch/organize_docs.js`) to categorize and rename the flat markdown files into visual structures.
* **Rogue Engine**: Paths were split by `/`, and CamelCase names were formatted into standard readable text (e.g., `GettingStarted/YourFirstProject` became `Getting Started/Your First Project.md`).
* **Three.js Manuals**: Mapped directly into nested categories matching the official sidebar (e.g., `Manual/Getting Started/Creating a Scene.md`).
* **Three.js API**: Parsed the `three_docs.html` index to group over 850 API pages by their respective `<H2>` and `<H3>` category tags (e.g., `API/Core/Object3D.md`).

---

## 🌐 Final Targets

### 1. Rogue Engine Docs
* **Target Directory**: [.docs/rogue-engine/](file:///media/skp1238/LargeApps/A_Knowledge_learn/rogue_engine/visual_editor_test/.docs/rogue-engine)
* **Structure Example**:
  * `Getting Started/Your First Project.md`
  * `Engine API/Input/Gamepad Controller.md`
  * `Workflow/Visual Components.md`

### 2. Three.js Docs
* **Target Directory**: [.docs/threejs/](file:///media/skp1238/LargeApps/A_Knowledge_learn/rogue_engine/visual_editor_test/.docs/threejs)
* **Structure Example**:
  * `Manual/Getting Started/Creating a Scene.md`
  * `Manual/Fundamentals/Scenegraph.md`
  * `API/Core/Object3D.md`
  * `API/Geometries/BoxGeometry.md`

---

## 🛠️ Tooling
The scraper code and organization tools are available in your workspace:
* [scratch/fetch_indexes.js](file:///media/skp1238/LargeApps/A_Knowledge_learn/rogue_engine/visual_editor_test/scratch/fetch_indexes.js) - Pulls raw index lists from endpoints.
* [scratch/batch_scrape.js](file:///media/skp1238/LargeApps/A_Knowledge_learn/rogue_engine/visual_editor_test/scratch/batch_scrape.js) - Extracts HTML, uses `cheerio` for DOM parsing and `turndown` for Markdown generation.
* [scratch/organize_docs.js](file:///media/skp1238/LargeApps/A_Knowledge_learn/rogue_engine/visual_editor_test/scratch/organize_docs.js) - Recursively reorganizes the flat dumps into structured, readable directories.
