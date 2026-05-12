# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, eslint.config.mjs)

## Architecture

Next.js 16 app using the App Router with TypeScript, React 19, and Tailwind CSS v4.

- `src/app/` — App Router directory (layouts, pages, styles)
- `@/*` path alias maps to `./src/*` (configured in tsconfig.json)
- Styling: Tailwind CSS v4 via `@tailwindcss/postcss`; global styles in `src/app/globals.css`
- Fonts: Geist and Geist Mono loaded via `next/font/google`

## Conventions

- Use functional components only — no class components
- Next.js 16 may have breaking changes vs. training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code involving Next.js APIs

## Workflow

- **Auto-commit and push**: When a task is completed, commit all related changes and push directly to `main` without asking. Do not wait for confirmation.
- **Screenshot cleanup**: Any screenshot files (`.png`, `.jpg`, `.jpeg`) created during debugging or visual verification must be deleted before committing. Never commit screenshot files to the repo.
