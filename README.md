# xuanyu.io

Personal blog built with Astro and Retypeset.

## Development

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:4321/`.

## Content

Posts live in `src/content/posts/`.

```md
---
title: 'Post title'
published: 2026-01-01
description: 'Short description.'
tags: ['writing']
---
```

The About page content lives in `src/content/about/about.md`.

## Configuration

Theme and site settings are in `src/config.ts`.

The current setup is single-language English, with comments and analytics
disabled. It keeps RSS/Atom, sitemap, OpenGraph images, TOC, KaTeX, Mermaid,
and theme color customization.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm new-post
pnpm update-theme
```

## Theme Updates

This repository uses Retypeset as copied source, not as an npm package. To pull
in upstream theme changes, run the included `pnpm update-theme` flow and resolve
any local differences.
