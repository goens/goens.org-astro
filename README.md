## Development

```sh
nix develop            # enter dev shell (Node 24, pnpm 9, Vercel CLI, uv)
astro dev              # start dev server
astro build            # production build → /dist
astro check            # TypeScript type checking
```

Copy `.env.example` to `.env` and set `SITE_URL=https://goens.org` before building.

## News

News posts are Markdown files in `src/content/news/`.

### Adding a post

Create a file named `YYYY-MM-DD-slug.md` (the filename becomes the URL):

```markdown
---
title: "Something happened"
date: 2026-04-10
thumbnail: ../../assets/images/news/optional-photo.jpg   # optional, relative to content file
---

Body text in **Markdown** here.
```

The post is available at `/news/YYYY-MM-DD-slug`. The index at `/news` lists all posts sorted by date.

## Static assets

```
src/assets/images/
  authors/    ← author/team photos (Astro-optimized)
  news/       ← news thumbnails (Astro-optimized)
public/
  fonts/      ← self-hosted fonts
  pdfs/       ← publication PDFs
```

Images under `src/assets/` are processed by Astro at build time (WebP conversion, lazy loading, layout shift prevention). Reference them with paths relative to the content file, e.g. `../../assets/images/authors/photo.jpg`. PDFs and fonts go in `public/` and are served as-is.

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
