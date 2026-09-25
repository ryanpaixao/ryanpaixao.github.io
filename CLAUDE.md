# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal portfolio site (Vue 3 + Vite + TypeScript + Tailwind v4 + vue-router), deployed to GitHub Pages as a static SPA. Node 24 is pinned via `mise.toml`.

## Commands

```sh
npm run dev              # Vite dev server on :5173
npm run build            # vite build, then copies dist/index.html -> dist/404.html (SPA fallback for GitHub Pages)
npm run preview          # serve dist/ on :4173
npm run type-check       # vue-tsc --build
npm run lint             # eslint .
npm run format           # prettier on src/ (no semicolons, single quotes, 100 cols)

npm run test:unit                        # vitest run (jsdom), excludes e2e/
npx vitest run src/lib/projects.spec.ts  # single unit test file
npx vitest run -t "test name"            # single unit test by name

npm run test:e2e                         # Playwright, all browsers (chromium/firefox/webkit)
npm run test:e2e:fast                    # chromium only
npx playwright test e2e/projects.spec.ts --project=chromium   # single e2e file
npx playwright test -g "test name"       # single e2e test by name
```

Playwright starts its own server: `npm run dev` (:5173) locally, reusing one if already running; with `CI` set it uses `npm run preview` (:4173), so `npm run build` must run first. Locally tests run headed (`headless: !!process.env.CI`). First run needs `npx playwright install`.

CI (`.github/workflows/deploy.yml`) runs lint → type-check → test:unit → build → test:e2e on PRs and pushes to `main`; pushes to `main` then deploy `dist/` to GitHub Pages.

## Architecture

- **Project content is static data**, not fetched. `src/data/projects.ts` holds the `projects` array (declared without an explicit type so `ProjectSlug` can be derived as a literal union) and exports derived views: `projectsByDate`, `featuredProjects`, `allTags`, and the `isProjectTag` type guard for narrowing untrusted strings (route params/query).
- **`src/types/project.ts`** defines `Project` and the closed `ProjectTag` union. A new technology tag must be added to `ProjectTag` first — this is intentional to prevent near-duplicate tags.
- **Pure logic lives in `src/lib/`** so it can be unit-tested without mounting components: `lib/projects.ts` (sort/filter/collect/find helpers) and `lib/components/appLink.ts` (`isExternalLink`, `shouldOpenNewTab`) backing `AppLink.vue`. Unit specs sit next to the code as `*.spec.ts`.
- **`AppLink.vue`** is the link component to use everywhere: renders a plain `<a>` (with `target="_blank" rel="noopener noreferrer"` for absolute http(s) URLs) for external links, otherwise a `RouterLink` in custom mode. It sets `inheritAttrs: false` and forwards `$attrs` to the inner `<a>`.
- **Routes** (`src/router/index.ts`): `/`, `/projects`, `/projects/:slug` (`ProjectDetailView`), `/about` (lazy-loaded). `ProjectDetailView` resolves the project by matching `/projects/${slug}` against `route.path`, and renders it via `ProjectCard`.
- **e2e tests import app data** (e.g. `import { projects } from '@/data/projects'`) via the `@` alias; `e2e/tsconfig.json` extends `tsconfig.app.json` for this. Keep link paths in components, router, and e2e assertions in sync.

## Conventions

- Commit messages use Conventional Commits with a scope, e.g. `fix(project card): ...`, `refactor(projects): ...`, `test(playwright): ...`.
- ESLint applies Playwright rules to `e2e/**/*.spec.ts`; the Vitest ESLint plugin is only configured for `src/**/__tests__/*`, so it does not currently lint the colocated `src/**/*.spec.ts` files.
