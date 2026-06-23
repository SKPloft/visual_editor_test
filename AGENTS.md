# visual_editor_test

A rogue engine visual editor built with Three.js, Express, TypeScript, and Webpack.

## Tech stack
- **Runtime**: Node.js
- **Language**: TypeScript (tsconfig.json)
- **Bundler**: Webpack 5 (webpack.config.js, webpack.config.rogue.js, webpack.config.user.js)
- **3D**: Three.js 0.182
- **Server**: Express + CORS (file-server.js)

## Build & run
- Install: `npm install`
- Build: `npm run build` (cross-env NODE_ENV=production webpack --progress)
- Build output goes to `dist/`

## Project structure
- `Assets/` — static assets
- `Static/` — static files
- `_Rogue/` — engine internals
- `dist/` — webpack output (gitignored)
- `scratch/` — scratch/experimental work
- `rogue-config.json`, `user-config.json` — configuration
- `tsconfig.json`, `tsconfig.rogue.json`, `tsconfig.user.json` — TypeScript configs
- `webpack.config.js`, `webpack.config.rogue.js`, `webpack.config.user.js` — Webpack configs

## Conventions
- Use TypeScript for all new code
- Place 3D/scene code using Three.js in `_Rogue/`
- Server logic lives in `file-server.js` (Express)
- Keep configuration in JSON files, not hardcoded
