# Agent Guidance

This repository is a Vue 3 + Vite portfolio deployed to GitHub Pages. Start with [README.md](README.md), [package.json](package.json), and [vite.config.js](vite.config.js) when you need project rules or commands.

## Working Rules

- Keep edits focused on the owning Vue SFC or asset file; section components live under [src/components](src/components).
- Do not edit generated output in `dist/`; rebuild it with `npm run build` or `npm run deploy`.
- Treat [public/legacy](public/legacy) as static historical content. Preserve it unless the user explicitly wants legacy updates.
- Respect the GitHub Pages base path `/My-Portfolio/` configured in [vite.config.js](vite.config.js).
- Prefer incremental changes and keep the existing Vuetify/Vue style unless the user asks for a redesign.

## Common Commands

- `npm install` - install dependencies.
- `npm run dev` - start the local Vite dev server.
- `npm run build` - create a production build.
- `npm run preview` - preview the production build locally.
- `npm run deploy` - build and publish `dist/` to GitHub Pages via `gh-pages`.

## Change Checks

- Run `npm run build` after non-trivial UI or asset changes.
- Run `npm run deploy` only when you need the live GitHub Pages site updated.
- If you change asset paths, base URLs, or deploy behavior, verify the result against the live site URL in [README.md](README.md).