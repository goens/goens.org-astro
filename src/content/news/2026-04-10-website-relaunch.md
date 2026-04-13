---
title: "Website Relaunch"
date: 2026-04-10
---

After a long time running on an older setup, the website has been fully relaunched.

The new site is built with [Astro](https://astro.build) — a static site generator that keeps things fast and simple, with zero runtime JavaScript by default. Everything is pre-rendered at build time, which makes pages load instantly and keeps the structure easy to reason about.

A few things that changed:

- **Publications** are now generated automatically from a BibTeX file (`publications.bib`). Running `uv run scripts/sync_publications.py` syncs entries to typed JSON, which Astro picks up as a content collection. Each publication gets its own page, with optional links for PDF, DOI, artifact, and repository.
- **News** (this section) is written as plain Markdown files under `src/content/news/`. Add a file, set a title and date in the frontmatter, write the post — done.
- The design uses a warm color palette and self-hosted fonts with no external dependencies.

The source is straightforward enough that adding a new page, post, or section should take minutes rather than hours.
