# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, eslint.config.mjs)
- `npm run format` — format code with Prettier

## Architecture

Next.js 16 app using the App Router with TypeScript, React 19, and Tailwind CSS v4.

- `src/app/` — App Router pages and layouts; routes: `/`, `/posts`, `/users`, `/comments`
- `src/app/api/` — Route Handlers that proxy JSONPlaceholder and transform data
- `src/components/` — Shared UI components (Header, StatCard, Pagination, SkeletonCard, ErrorBanner, etc.)
- `src/context/` — React Contexts for theme (light/dark) and i18n (en/es)
- `src/hooks/` — Custom hooks (`useFetch<T>` for client-side data fetching with loading/error/refetch)
- `src/i18n/` — Type-safe translations (`TranslationKey` union type, `useTranslation()` hook)
- `src/types/` — Shared TypeScript interfaces (User, Post, Comment, PaginatedResponse)
- `@/*` path alias maps to `./src/*` (configured in tsconfig.json)

### Data flow

All pages are client components (`"use client"`) that fetch from internal API routes via `useFetch`. API routes (`src/app/api/`) fetch from JSONPlaceholder, transform external types into internal types (e.g., `ExternalPost` → `Post`), and support `?search=`, `?page=`, `?limit=` query params. The `/api/stats` route aggregates all three endpoints using `Promise.allSettled`.

### Styling

- Tailwind CSS v4 via `@tailwindcss/postcss`; global styles in `src/app/globals.css`
- Dark mode: custom variant `@custom-variant dark` applied by toggling `.dark` class on `<html>`
- Fonts: Geist and Geist Mono loaded via `next/font/google`
- Page layout pattern: `max-w-6xl mx-auto` with responsive padding (`px-4 sm:px-6 lg:px-8`)

### State management

- **Theme**: `ThemeContext` — persists to localStorage key `"theme"`, applies CSS class on `<html>`
- **i18n**: `I18nProvider` — persists to localStorage key `"locale"`, auto-detects browser language
- **Providers wrapper**: `src/components/Providers.tsx` composes both contexts

## Conventions

- Use functional components only — no class components
- Next.js 16 may have breaking changes vs. training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code involving Next.js APIs
- All pages share a consistent layout shell: `bg-zinc-50 dark:bg-black` wrapper, `max-w-6xl` main, and a shared footer

## Workflow

- **Auto-commit and push**: When a task is completed, commit all related changes and push directly to `main` without asking. Do not wait for confirmation.
- **Screenshot cleanup**: Any screenshot files (`.png`, `.jpg`, `.jpeg`) created during debugging or visual verification must be deleted before committing. Never commit screenshot files to the repo.
