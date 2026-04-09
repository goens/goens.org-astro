# Astro Baseline
A boring, production-ready Astro starter.

Astro Baseline is an HTML-first starter designed for developers who want a clean foundation, not a framework demo.

No UI kit.<br>
No runtime JavaScript by default.<br>
No magic.

Just solid structure, senior defaults, and a clear separation of concerns.

## Philosophy

Astro Baseline follows a simple rule:

**HTML is the source of truth.**

- Structure lives in `.astro` files
- Content lives in data (`site.ts`, Markdown, YAML, etc.)
- Behavior is opt-in and explicit
- CSS is boring, predictable, and layered

This starter is meant to disappear once you start building.

## What you get

### Structure

- Clean layout system (`Base.astro`)
- Header / Footer components
- Skip link for accessibility
- 404 page included
- Predictable file organization

### SEO (done properly)

- Centralized SEO.astro component
- Canonical URLs
- Open Graph & Twitter cards
- JSON-LD support (opt-in, per page)
- Robots meta handling
- Theme color

### Accessibility basics

- Skip link (SkipLink.astro)
- Semantic HTML
- Focusable main content
- No JS-only interactions

### CSS architecture

No framework. No Tailwind by default.

Layered CSS structure:

```
src/styles/
├─ global.css
├─ partials/
│  ├─ tokens.css      // design tokens (colors, spacing, fonts)
│  ├─ reset.css       // minimal reset
│  ├─ fonts.css       // @font-face declarations
│  ├─ behaviors.css   // behavior-related CSS (x-dialog, etc.)
│  └─ structure.css   // layout & base styles
```

- BEM-friendly
- Easy to delete or replace
- Easy to extend

### Fonts

- Fonts served from `/public/fonts`
- Explicit @font-face
- No external font dependency by default

### Configuration as data

All site metadata lives in one place:

```
// src/content/site.ts
export const site = {
  name,
  tagline,
  description,
  url,
  locale,
  author,
  nav,
  seo
};
```

Used consistently across:

- Header
- Footer
- SEO
- Pages
- JSON-LD

No duplication.

## Layout API

The layout is explicit and declarative.

Example:

```
<Base
  title="Contact"
  description="Get in touch"
  canonicalPath="/contact"
  mainCentered
>
  ...
</Base>
```

Supported layout flags:

- `mainCentered` (example)
- Easy to extend (`mainWide`, `mainNarrow`, etc.)

The layout never guesses.
Pages declare intent.

## JSON-LD (opt-in)

JSON-LD is rendered only if provided.

Example:

```
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url
};
```

Passed directly to the layout:

`<Base jsonLd={jsonLd}>`

No JSON-LD pollution by default.

## Environment

Astro Baseline expects the following environment variable:

`SITE_URL=https://example.com`

Create a `.env` file:

`cp .env.example .env`

Update `SITE_URL` with your domain.

Used for:
- Canonical URLs
- JSON-LD
- SEO consistency

Documented, explicit, predictable.

## Who this is for

This starter is for developers who:

- Prefer HTML over abstractions
- Care about SEO and accessibility
- Want a clean base, not opinions forced on them
- Are tired of over-engineered starters

If you want a UI kit or heavy interactivity out of the box, this is not for you.

## Who this is not for

- Page builders
- No-code tools
- “Install and ship in 5 minutes” demos
- Framework-centric mental models

## Extending Astro Baseline

Astro Baseline is designed to pair naturally with:

- **Astro Content Collections**
- **Build-time tools** (e.g. Frontmatter Core)
- **HTML-first behavior layers** (e.g. Web Components, Alpine.js)
- **Progressive enhancement**

You add complexity only when you need it.

## License

MIT

Do whatever you want.
Build good websites.

## Final note

Astro Baseline is intentionally boring.

That’s the point.

If you never think about this starter again once your project starts, it did its job.



## Development

```sh
nix develop            # enter dev shell (Node 24, pnpm 9, Vercel CLI, uv)
astro dev              # start dev server
astro build            # production build → /dist
astro check            # TypeScript type checking
```

Copy `.env.example` to `.env` and set `SITE_URL=https://goens.org` before building.

## Publications

Publications are sourced from `publications.bib` and synced to `src/content/publications/{key}.json`.

### Syncing from BibTeX

```sh
uv run scripts/sync_publications.py
```

Run this whenever `publications.bib` changes. The script:
- Writes bib-derived fields (title, authors, DOI, year, venue, type, bibtex) from the `.bib` file
- **Preserves** any manually-added fields in existing JSON files (pdf, artifact, repository, etc.)

### Adding links to a publication

Each `src/content/publications/{key}.json` accepts four optional fields you add by hand:

| Field        | Type   | Description                                       |
|--------------|--------|---------------------------------------------------|
| `pdf`        | URL    | Direct link to the PDF                            |
| `artifact`   | DOI    | DOI of an artifact (e.g. Zenodo, ACM DL artifact) |
| `repository` | URL    | Link to source code repository                    |
| `bibtex`     | string | Raw BibTeX (auto-populated by the sync script)    |

Open the relevant JSON and add the fields directly:

```json
{
  "key": "schneider_pldi25",
  "title": "...",
  "doi": "10.1145/3729326",
  "pdf": "https://dl.acm.org/doi/pdf/10.1145/3729326",
  "artifact": "10.5281/zenodo.12345678",
  "repository": "https://github.com/you/repo"
}
```

Re-running the sync script will not overwrite these fields. The publication detail page renders an icon button for each field that is present.
