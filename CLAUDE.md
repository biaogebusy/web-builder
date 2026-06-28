# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Xinshi (信使) Web Builder** — an AI-powered low-code platform for building modern responsive web applications. Built with Angular + Angular Material + TailwindCSS, using Drupal as headless CMS backend via JSON:API.

## Common Commands

- `npm start` — local dev server (proxies API to builder.design via `config/proxy.config.js`)
- `npm run build` — production build plus static asset precompression (`ng build --configuration production && npm run precompress`)
- `npm test` — run unit tests once (Vitest via Angular unit-test builder)
- `npm run test:watch` — run unit tests in watch mode
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run e2e` — end-to-end tests (Playwright)
- `npm run e2e:ui` — Playwright UI mode
- `npm run serve:ssr:xinshi` — serve SSR build (`node dist/server/server.mjs`)

Pre-commit hook runs `lint-staged` which auto-fixes `*.ts` and `*.html` with ESLint and formats `*.md` with Prettier.

## Architecture

### Module Structure (`src/app/`)

- **`core/`** — singleton services, state management, guards, pipes, directives, interfaces, DI tokens, and factory functions
- **`uiux/`** — all visual components, split into:
  - `widgets/` — atomic UI elements (card, btn, text, img, icon, title, etc.) — **fully standalone**
  - `combs/` — composite page sections (hero, showcase, carousel, list, chart, form, map, etc.) — **fully standalone**
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
- `CalendarState` — calendar state
- `ScreenState` — responsive breakpoints, drawer toggle

### Dependency Injection Tokens

Global app state is provided via InjectionToken factories in `core/token/token-providers.ts` and `core/factory/factory.ts`. Key tokens: `CORE_CONFIG`, `BRANDING`, `PAGE_CONTENT`, `USER`, `THEME`, `LANG`, `API_URL`, `BUILDER_CONFIG`, `CURRENT_CHAT`.

### Environment Configuration (`src/environments/`)

- `environment.ts` — dev config. Key flags:
  - `production: false` → uses local JSON files for page content instead of live API
  - `multiLang` / `langs` — multi-language support with lang prefix routing
- `environment.prod.ts` — production config (apiUrl: `https://builder.design`)

### SSR

Angular SSR is configured with `@angular/ssr`. Entry point: `src/server.ts`. The app uses zoneless change detection (`provideZonelessChangeDetection()`) and incremental hydration.

### Styling

- SCSS with TailwindCSS. Theme SCSS files are in `src/theme/` (included via `stylePreprocessorOptions`).
- Angular Material theming with multiple switchable themes (stored in localStorage).
- Components use SCSS files co-located with their `.ts` files.
- **Prefer TailwindCSS `@apply` in component SCSS for layout, spacing, sizing, flex/grid, and typography utilities** — instead of hand-writing equivalent CSS properties. Example: `@apply flex justify-center items-center gap-3 p-3;` rather than `display: flex; justify-content: center; ...`. This keeps styles consistent with Tailwind's design tokens and matches the established pattern across the codebase (235+ usages). Reserve raw CSS for things Tailwind can't express cleanly (complex selectors, `::ng-deep` overrides, keyframes, Material system variables for colors/borders).
- **Use Material system variables (`var(--mat-sys-*)`) for color/border in component styles by default** — avoid hardcoded hex/rgb values unless there is a special reason (e.g., third-party widget needs a fixed contrast). System tokens auto-adapt across themes.
  - Default theme: `src/theme/theme-config/_light-colors.scss` (light, primary `#0049db`)
  - Dark theme: `src/theme/theme-config/_dark-colors.scss` (dark)
  - Common tokens: `--mat-sys-primary` / `--mat-sys-on-primary`, `--mat-sys-surface` / `--mat-sys-on-surface`, `--mat-sys-surface-container[-low|-high|-highest]`, `--mat-sys-outline` / `--mat-sys-outline-variant`, `--mat-sys-inverse-surface` / `--mat-sys-inverse-on-surface`, `--mat-sys-error` / `--mat-sys-on-error`
  - Note: `inverse-surface` flips between themes (dark in light theme, light in dark theme). Pick tokens that yield the correct contrast in both themes for the content rendered on top.

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

- **Standalone Components (Fully migrated 2026-05-20)**: Every `@Component` in the codebase is standalone (no `standalone: false` remains anywhere in `src/app/`). This covers `uiux/widgets`, `uiux/combs/*` (including `profile`), `core/branding` (header tree, footer tree, menus, dynamic-menu, accordion-menu), `modules/manage`, `modules/user`, `modules/page`, and the root `AppComponent`.
  - **NgModules retained as thin shells**: `AppModule`, `AppServerModule`, `BrandingModule`, `ShareModule`, `WidgetsModule`, feature module shells (`UserModule`, `PageModule`, `ManageModule`, `BuilderModule`), and `uiux/combs/*` module shells still exist. Their `declarations: []` are empty; standalone components are listed in `imports: []` so the modules can re-export them for legacy consumers (e.g. `BrandingModule.exports` is consumed by `PageComponent`). Routing modules continue to work unchanged with `component: XxxComponent` referring to standalone classes.
  - **Key patterns used**:
    - `forwardRef(() => Component)` in `@Component.imports` to resolve circular dependencies — required for recursive components (`SubMenuComponent`, `AccordionMenuComponent`, `CommentItemComponent`, `DialogComponent ↔ DynamicComponentComponent`)
    - Explicit imports of all dependencies: Material modules (MatButtonModule, MatIconModule, etc.), Angular pipes (AsyncPipe, DatePipe, etc.), NgPipesModule, custom pipes (SafeHtmlPipe), directives (ReqRolesDirective, CheckChildMenuActiveDirective), Router primitives (RouterOutlet, RouterLink, RouterLinkActive), and child standalone components
    - Common path corrections: `MediaObjectComponent` at `@uiux/widgets/media/media-object/`, `PaginationLinksComponent` at `@uiux/widgets/pagination/pagination-links/`, `ListThinComponent` at `@uiux/combs/list/list/list-thin/`
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

- **All components are now standalone** (migration completed 2026-05-20)
- For new components: Always use standalone components (default in Angular v20+, no need to set `standalone: true`)
- When working with existing standalone components:
  - All dependencies must be explicitly imported in `@Component.imports` array
  - Use `forwardRef(() => Component)` for circular dependencies
  - Common dependencies: Material modules, Angular pipes (AsyncPipe, DatePipe, SlicePipe), NgPipesModule, SafeHtmlPipe, ReactiveFormsModule
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

### Unified Widget Components

**General rule**: When building combs or new components, prefer the atomic widgets in `@uiux/widgets/*` over raw HTML / Material elements whenever an equivalent widget exists. Widgets centralize inline editing (`ContenteditDirective`), role gating (`ReqRolesDirective`), routing (`RouteService`), theming via `--mat-sys-*` tokens, and accessibility behavior. Reaching for the underlying HTML/Material element should be a deliberate exception, not the default.

Key widgets and what they replace:

- **`app-btn`** (`widgets/btn/`) — replaces raw `<button mat-button>` / `<button>` / `<a>`-as-button. Accepts an `IBtn` content input.
- **`app-icon`** (`widgets/icon/`) — replaces raw `<mat-icon>` / `<i class="fa-*">`. Unifies Material, SVG, and font-icon sources.
- **`app-img`** (`widgets/img/`) — replaces raw `<img>`. Integrates `NgOptimizedImage`, lightbox, and responsive sources.
- **`app-title`** (`widgets/title/`) — replaces ad-hoc `<h1>`–`<h6>` headings with style/level/alignment config.
- **`app-text`** (`widgets/text/`) — replaces raw `<p>` / `innerHTML` blocks for rich text bodies (supports `SafeHtmlPipe`).
- **`app-link`** (`widgets/link/`) — replaces raw `<a [routerLink]>` for CMS-driven links (handles internal/external, lang prefix, role gating).
- **`app-card`** (`widgets/card/`) — replaces hand-rolled card markup.
- **`app-media`** (`widgets/media/`) — replaces media-object compositions (img + body).
- **`app-dialog`** (`widgets/dialog/`) — replaces direct `MatDialog.open()` usage for CMS-driven dialogs.
- **`app-notify`** (`widgets/notify/`) — replaces ad-hoc `MatSnackBar` / alert markup.
- **`app-pagination`** (`widgets/pagination/`) — replaces hand-rolled pagers / `MatPaginator` wiring.
- **`app-loading`** / **`app-spinner`** (`widgets/loading/`, `widgets/spinner/`) — replaces ad-hoc loading states.
- **`app-progress-bar`** / **`app-progress-group`** (`widgets/progress-bar/`, `widgets/progress-group/`) — replaces raw `<mat-progress-bar>`.
- **`app-divider`** (`widgets/divider/`) — replaces raw `<mat-divider>` / `<hr>`.
- **`app-dropdown-menu`** (`widgets/dropdown-menu/`) — replaces hand-built `MatMenu` triggers for CMS-driven menus.
- **`app-feature-box`**, **`app-content-box`**, **`app-content-text-center`**, **`app-box`**, **`app-panel`**, **`app-sidebar`**, **`app-bg`**, **`app-bg-img`**, **`app-shape`**, **`app-spacer`** — layout/decoration primitives; prefer them over bespoke wrappers.

Full inventory lives in `src/app/uiux/widgets/`. Before adding new markup, check if a widget already covers the need.

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

# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
