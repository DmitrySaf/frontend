# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 application with Supabase backend, following a modular Feature-Sliced Design architecture. The project uses:

- **Next.js 16** (App Router, Turbopack, React 19)
- **Supabase** for authentication and database
- **React Query** (@tanstack/react-query) for data fetching
- **React Hook Form** + **Zod** for form validation
- **Tailwind CSS v4** (CSS-first `@theme` in `app/globals.css`, no JS config)
- **Hybrid UI engine** — the shared UI-kit is built on **`react-aria-components` (RAC)** for primitives (bucket A: Button, Input, Switch, Tabs, Tooltip, Dropdown, …) and **HeroUI v3** (`@heroui/react`) for heavy behavior and Avatar (bucket B: Dialog, Drawer, Toast, Avatar). Both engines live only inside `src/shared/components/**` (lint-enforced). Bean's Apple-like theme lives in our own wrapper classes + tokens. See DESIGN.md §4
- **TypeScript** for type safety

## Common Commands

### Development
```bash
pnpm dev              # Start development server at http://localhost:3000
pnpm build            # Build for production
pnpm start            # Start production server
```

### Code Quality
```bash
pnpm lint             # Lint code with Biome
pnpm format           # Format code with Biome
pnpm check            # Run Biome check and auto-fix
```

### Database
```bash
pnpm gen-supabase-types  # Generate TypeScript types from Supabase schema
```

## Architecture Overview

### Folder Structure

The project follows a modular architecture pattern:

```
app/                    # Next.js App Router (routing, layouts, providers)
  layout.tsx           # Root layout with providers
  (authenticated)/     # Protected routes (requires auth)
  (public)/            # Public routes (login, etc.)

src/
  pages/               # Page-specific sections (complex, page-scoped components)
  features/            # Business logic and user flows
  entities/            # Business entities (e.g., course, profile, post)
  widgets/             # Composite UI blocks (e.g., forms, modals)
  shared/              # Reusable, app-wide modules
    composables/       # Global custom hooks
    utils/             # Global utility functions
    components/        # Global components, UI-kit
    config/            # Global configurations and constants
    types/             # Common TypeScript definitions

public/                # Static assets (images, fonts, icons)

supabase/              # Supabase-specific code
  api/                 # Supabase client configurations
  migrations/          # Database migrations
```

### Key Architectural Principles

1. **Dependency Direction**: `app` and `pages` → `widgets` → `features` → `entities` → `shared` (no cycles)
2. **Public API Boundaries**: Each slice exposes only what's needed via `index.ts`. No deep imports.
3. **No Wildcard Exports**: All `index.ts` files use specific named exports. Never use `export * from`.
4. **No Type Re-exports**: Inside `entities/` and `features/`, import types from `@/api` directly.
5. **Server Components First**: Prefer Server Components by default. Use `'use client'` only where necessary.
6. **Domain-specific Logic**: All domain logic (API functions, query keys, hooks) lives in the corresponding domain slice (`entities/` or `features/`), NOT in `shared`.

### Entities Layer Structure

Each entity follows this file structure:

```
src/entities/{entity}/
  api/
    api.ts          # Pure API functions (HTTP calls only)
    types.ts        # API types and interfaces
    queries.ts      # React Query hooks (client + server)
    mutations.ts    # React Query mutations
    constants.ts    # Query keys for typed caching
    realtime.ts     # Realtime subscriptions (optional)
    index.ts        # API layer exports
  model/
    mappers.ts      # Data transformation functions
    validation.ts   # Zod schemas and types
    index.ts        # Model layer exports
  ui/
    {Entity}Card.tsx   # UI components
    index.ts           # UI layer exports
  index.ts          # Public entity API
```

### Pages Naming Convention

- Entity view (details): `{entity}-details`
- Entity list: `{entity}-list`
- Entity create/update: `{entity}-create` / `{entity}-update`
- Non-entity pages: plain names without postfixes (`settings`, `login`, etc.)

### Import Rules

- **Absolute imports**: Use `@/*` alias pointing to `src/*`
- **Cross-slice imports**: Must go through each slice's public API (`index.ts`)
- **Shared layer imports**: Always import through index.ts files:
  - ✅ `import { Button } from '@/shared/components'`
  - ❌ `import { Button } from '@/shared/components/button'`

## Data Layer Patterns

### API Functions (api.ts)
- Pure HTTP calls only, no React Query logic
- Use `apiClient` from `@/shared/config` for REST APIs
- Use Supabase client for database operations
- **NEVER use `select('*')`** - always specify exact fields

### React Query Hooks (queries.ts)
- Client and server hooks in the same file
- Use mappers in `select` to transform API responses
- Export invalidation hooks for cache management

### Mutations (mutations.ts)
- Use `toast` from `@/shared/components` (HeroUI Toast; the shim aliases `.error`→`.danger`) for success/error notifications — never import from `sonner`
- Always invalidate cache manually using invalidation hooks
- Success toasts without description, error toasts with description

### Realtime (realtime.ts)
- Domain-specific hooks using `useSupabaseRealtime` from shared
- Enable/disable subscriptions conditionally

## Form Architecture

Forms are built as widgets in `src/widgets/{form-name}/`:

```
widgets/{form-name}/
  ui/
    {FormName}.tsx     # Pure form component (no API logic)
  model/
    validation.ts      # Zod schemas
    constants.ts       # Default values
```

- Forms receive `initValues`, `onSubmit`, and `isLoading` props
- Parent components handle API calls, mutations, and toasts
- Use shared `Form` wrapper component (handles `handleSubmit` internally)

## UI Components Standards

- **Hybrid engine, our look**: The shared UI-kit (`src/shared/components`) runs on two engines, both invisible outside `shared/components` (enforced by `noRestrictedImports` in `biome.json`). **Bucket A — primitives on `react-aria-components` (RAC)** (Button, Switch, Tabs, SegmentedControl, Tooltip, Dropdown) or **no engine at all** (Input, Textarea, Separator, Skeleton = RHF + native element / `<div>`). **Bucket B — HeroUI v3** (Dialog, Drawer in CommunityShell, Toast, Avatar — HeroUI's compound Avatar for robust image→fallback). Never add Radix/shadcn. Sizing rides Bean's 4-step control ladder `sm/md/lg/xl` = 32/36/40/48 (see DESIGN.md §4), driven by our own classes (the engine's native sizes are not used).
- **Neutralize chrome only for bucket B (HeroUI)**: HeroUI paints defaults on its base classes (`.button--primary` sets `--button-bg: var(--accent)`; `.input` adds border/shadow/padding/`sm:text-sm`) — neutralize with utility classes (utilities layer wins over HeroUI's `theme`/`components` layers). **RAC / no-engine primitives have nothing to neutralize** (headless = zero pixels; a bare `<button>` is reset by Tailwind preflight). Interactive states on RAC via `data-*` (`data-[selected]`, `data-[pressed]`, `data-[focus-visible]`); polymorphic Button (`<button>`/`<a>`) uses CSS pseudo-classes. One variant engine — **cva** (`tailwind-variants` removed); `cn()` = clsx + tailwind-merge. Gotcha: size tokens must be `text-(length:--var)` — bare `text-(--var)` is read as a color by tailwind-merge and eats `text-white` (→ black text).
- **Collections need real React Aria nodes**: inside `Menu`/`ListBox`, every child must be a collection component (`Item`/`Header`/`Separator`) — a stray `<div>` collapses the whole collection to empty. Dropdown triggers wrap the existing button in `<Pressable>` (no extra DOM), never `Dropdown.Trigger` (double-button hydration error).
- **PascalCase naming**: All components (e.g., `Button.tsx`, `Input.tsx`)
- **Explicit props**: No `extends React.HTMLAttributes` - define all props explicitly
- **Built-in styling**: Components include base styles (radius/kegль tokens, states, etc.)
- **External styling**: Only layout/positioning classes (`w-full`, `mb-4`, etc.)

## Next.js Specific

- Route segments in `app/` re-export page components from `src/pages` when appropriate:
  ```tsx
  export { EntityPage as default } from '@/pages/entity'
  ```
- Metadata (`generateMetadata`, `generateStaticParams`) stays in `app/` files
- Data fetching in Server Components, pass data to UI via props
- Default tab redirects configured in `next.config.ts`

## Supabase Integration

- Client configurations in `supabase/api/utils/`:
  - `client.ts` - Browser client
  - `server.ts` - Server-side client
  - `middleware.ts` - Middleware client
- Authentication handled via Supabase Auth
- Realtime subscriptions for automatic cache invalidation
- Type generation: `pnpm gen-supabase-types`

## Code Style

- Use Biome for linting and formatting
- TypeScript strict mode enabled
- Prefer explicit types over inference for public APIs
- Use `const` over `let` where possible
- Async/await over `.then()` chains

## graphify

There is a knowledge graph of this codebase at `graphify-out/` (nodes, cross-file edges, communities). **Orient with the graph first, then fall back to grep/read when it doesn't help** — a PreToolUse hook reminds you of this on shell calls. The graph compresses whole-codebase orientation hard (`graphify benchmark`: ~13x fewer tokens/query vs. dumping the corpus, up to ~140x on structural questions), so reaching for it first is usually the cheaper path. But it is not always the right tool, and falling back is expected — the rules below say when.

- **`graphify explain "<symbol>"` and `graphify path "<A>" "<B>"` are reliable.** They resolve by exact symbol name and give precise callers/callees and relationships. Prefer them for "what touches X" and "how do A and B connect".
- **`graphify query "<question>"` is for orientation only, and it is weak.** Seed nodes are picked by *lexical* match of question words against node labels, so a question phrased by behaviour ("post-login redirect") does not find code named by structure (`CommunityListPage`). Verified: it returned 189 nodes and missed the actual implementation. **Do not treat its output as authoritative, and do not skip grep/read because of it.**
- Grep and file reads remain the right tool for "where is X implemented" and for reading actual logic. The graph complements them; it does not replace them.
- `graphify-out/GRAPH_REPORT.md` — for a broad architecture pass only.
- After changing code, `graphify update .` refreshes the graph (AST-only, no LLM cost). Note it does **not** rebuild the semantic/doc layer — concept→code edges come only from a full rebuild.
