# Copilot Instructions

This repository is a Vue 3 + Vite portfolio with Vuetify and GitHub Pages deployment. Use [AGENTS.md](../AGENTS.md), [README.md](../README.md), and [vite.config.js](../vite.config.js) as the primary references for repo-wide behavior.

## Frontend Conventions

- Keep changes focused on the owning Vue SFC under [src/components](../src/components) or the related asset file.
- Prefer incremental edits that preserve the existing Vuetify layout, spacing, and styling language unless the user explicitly asks for a redesign.
- Treat `public/legacy` as historical content and avoid modifying it unless the task is specifically about legacy content.
- Respect the GitHub Pages base path `/My-Portfolio/` when editing asset URLs, routing, or deploy behavior.
- Use existing assets in [src/assets](../src/assets) and [public](../public) before adding new ones.
- Keep accessibility in mind: use semantic labels, keyboard support, visible focus states, and readable alt text for interactive UI elements.

## Validation

- Run `npm run build` after non-trivial UI or asset changes.
- Run `npm run deploy` only when the live GitHub Pages site should be updated.
- Prefer the smallest validation command that can confirm the touched slice before broadening scope.

## What Not To Do

- Do not edit generated files in `dist`.
- Do not rewrite the legacy portfolio unless the user asks.
- Do not duplicate documentation that already exists in [README.md](../README.md) or [AGENTS.md](../AGENTS.md); link to it instead.
