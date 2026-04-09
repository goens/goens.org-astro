# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
# Development
pnpm install
pnpm dev          # Start dev server
pnpm build        # Build for production (output in /dist)
pnpm preview      # Preview production build
pnpm check        # TypeScript type checking

# Using Nix (preferred)
nix develop       # Enter dev shell (provides Node 24, pnpm 9, Vercel CLI, uv)
nix build         # Build the static site

# Publications bibliography
uv venv && uv pip install academic   # Set up Python environment for bib processing
```

Set up the environment variable before running:
```sh
cp .env.example .env   # then set SITE_URL=https://goens.org
```

No automated tests exist in this project.

## Architecture

This is an **Astro static site** (personal website for Andrés Goens) built on a minimal, HTML-first philosophy with zero runtime JavaScript by default.

### Key design principles
- **HTML is the source of truth**: structure in `.astro` files, content in data
- **Configuration as data**: all site metadata (name, nav, SEO, socials) lives in `src/content/site.ts`
- **Layout is declarative**: pages pass explicit props to `Base.astro` (e.g., `mainCentered`, `jsonLd`)

### Layout API (`src/layouts/Base.astro`)

Pages declare their intent via props:
```astro
<Base title="..." description="..." canonicalPath="/..." mainCentered jsonLd={...}>
```

JSON-LD is opt-in — only rendered when passed. Layout flags like `mainCentered` control the CSS class on `<main>`.

### CSS structure (`src/styles/`)

```
global.css          ← entry point
partials/
  tokens.css        ← design tokens (colors, spacing, fonts)
  reset.css         ← minimal reset
  fonts.css         ← @font-face (self-hosted in /public/fonts/)
  behaviors.css     ← behavior CSS
  structure.css     ← layout & base styles
```

**Color palette** (from `color-palette.md`):
- Highlight: `#FCEBE8` — soft blush
- Boxes/accent: `#F6AFA1` — warm salmon/terracotta
- Background: `#FFFAF9` — near-white with rosy warmth

### Adding pages

Create a `.astro` file under `src/pages/` — Astro generates routes automatically. Use `Base.astro` as the layout. Update `nav` in `src/content/site.ts` if the page should appear in navigation.

### Publications

`publications.bib` is a BibTeX file. The `academic` Python package (via `uv`) is used for bibliography processing.
