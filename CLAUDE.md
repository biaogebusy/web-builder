# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Xinshi (信使) Web Builder** — an AI-powered low-code platform for building modern responsive web applications. Built with Angular + Angular Material + TailwindCSS, using Drupal as headless CMS backend via JSON:API.

## Common Commands

- `npm start` — local dev server (proxies API to builder.design via `config/proxy.config.js`)
- `npm run build` — production build (`ng build --configuration production`)
- `npm test` — run unit tests (Karma + Jasmine)
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run e2e` — end-to-end tests (Protractor)
- `npm run serve:ssr:xinshi` — serve SSR build (`node dist/server/server.mjs`)

Pre-commit hook runs `lint-staged` which auto-fixes `*.ts` and `*.html` with ESLint and formats `*.md` with Prettier.

## Architecture

### Module Structure (`src/app/`)

- **`core/`** — singleton services, state management, guards, pipes, directives, interfaces, DI tokens, and factory functions
- **`uiux/`** — all visual components, split into:
  - `widgets/` — atomic UI elements (card, btn, text, img, icon, title, etc.)
  - `combs/` — composite page sections (hero, showcase, carousel, list, chart, form, map, etc.)
  - `base/` — abstract `BaseComponent` class that all combs extend, providing shared API/param helpers
- **`modules/`** — feature modules loaded by the router:
  - `page/` — renders CMS-driven pages
  - `builder/` — the drag-and-drop page builder (auth-guarded), includes AI chat sub-module
  - `user/` — user authentication and profile (lazy-loaded)
  - `manage/` — content management
- **`share/`** — SharedModule with commonly imported/exported modules

### Dynamic Component System

The app uses a JSON-driven dynamic component architecture. `ComponentService` (`core/service/component.service.ts`) maintains a registry mapping component type strings (e.g., `'hero-1v1'`, `'showcase-2v1'`, `'card-1v4'`) to lazy-loaded Angular modules. Pages are defined as JSON with a `body[]` array of component descriptors, each rendered dynamically at runtime.

Components follow a naming convention: `{type}-{major}v{minor}` (e.g., `showcase-3v5`). The component type string maps to a selector like `app-showcase3v5`.

### State Management

Uses RxJS `BehaviorSubject`/`Subject` pattern via injectable state classes (not NgRx):

- `ContentState` — page config, drawer, media assets, comments
- `BuilderState` — builder UI state (fullscreen, preview mode, drag-drop, theme mode)
- `AIState` — AI chat state
- `CalendarState` — calendar state
- `ScreenState` — responsive breakpoints, drawer toggle

### Dependency Injection Tokens

Global app state is provided via InjectionToken factories in `core/token/token-providers.ts` and `core/factory/factory.ts`. Key tokens: `CORE_CONFIG`, `BRANDING`, `PAGE_CONTENT`, `USER`, `THEME`, `LANG`, `API_URL`, `BUILDER_CONFIG`, `CURRENT_CHAT`.

### Environment Configuration (`src/environments/`)

- `environment.ts` — dev config. Key flags:
  - `production: false` → uses local JSON files for page content instead of live API
  - `drupalProxy` — enables Drupal-based auth
  - `multiLang` / `langs` — multi-language support with lang prefix routing
  - `cache` — enables API request caching
- `environment.prod.ts` — production config (apiUrl: `https://builder.design`)

### SSR

Angular SSR is configured with `@angular/ssr`. Entry point: `src/server.ts`. The app uses zoneless change detection (`provideZonelessChangeDetection()`) and incremental hydration.

### Styling

- SCSS with TailwindCSS. Theme SCSS files are in `src/theme/` (included via `stylePreprocessorOptions`).
- Angular Material theming with multiple switchable themes (stored in localStorage).
- Components use SCSS files co-located with their `.ts` files.

### Path Aliases (tsconfig.json)

- `@core/*` → `src/app/core/*`
- `@uiux/*` → `src/app/uiux/*`
- `@share/*` → `src/app/share/*`
- `@modules/*` → `src/app/modules/*`
- `@assets/*` → `src/assets/*`

## Key Libraries

- **@ngx-formly** — dynamic form generation
- **echarts** — charts
- **swiper** — carousels/sliders
- **video.js** — video player
- **monaco-editor** — code editor
- **quill** — rich text editor
- **lightgallery** — image gallery/lightbox
- **gsap** + **aos** — animations (GSAP for fine-grained, AOS for scroll-triggered)
- **openai** — AI chat integration
- **dayjs** — date manipulation
- **lodash-es** — utility functions
- **drupal-jsonapi-params** — Drupal JSON:API query builder
- **crypto-js** — user credential encryption

## Conventions

- Components use `standalone: false` with NgModules (not standalone components)
- Use `inject()` function for DI (not constructor injection)
- Use `npm install` only (not yarn or pnpm) — respects `package-lock.json`
- ESLint rules: single quotes, semicolons required, max line length 100 (warnings), `any` type is allowed
- Angular self-closing tags preferred in templates

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
