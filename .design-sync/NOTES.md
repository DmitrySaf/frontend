# design-sync notes — Bean UI-kit

Repo-specific knowledge for future syncs. This is a **Next.js app** (not a published component
library), so the sync runs the **package shape in synth-entry mode**.

## ⚠️ Engine is now HYBRID (post-RAC-migration) — RE-SYNC REQUIRED

The kit migrated **off HeroUI** for primitives. **Bucket A** (Button, Input, Textarea, Switch,
Separator, Skeleton, Tabs, SegmentedControl, Tooltip, Dropdown) is now **`react-aria-components`
or engine-free** (native `<input>`/`<textarea>`/`<div>` + RHF). **Bucket B** stays on HeroUI —
`Dialog` (in the core set via the `overrides.Dialog` render), `Toast` (not in core), and **`Avatar`**
(HeroUI's compound Avatar, image→fallback — moved back to HeroUI by owner decision).
Consequences for the next sync:

- The bundle / previews / `.cache` captured below were built from the **old HeroUI** code — **stale**.
  Re-run `cfg.buildCmd` + converter to regenerate before trusting any preview.
- Migrated components' CSS is now **our own utility classes** (no HeroUI BEM chrome to neutralize).
  `@import "@heroui/styles"` stays in `globals.css` (bucket B), so compiled `bean-tw.css` still carries it.
- `tailwind-variants` is **removed** (single variant engine = **cva**) — nothing in the entry imports it.
- Boundary is now lint-enforced (`noRestrictedImports` in `biome.json`): both engines only inside
  `src/shared/components/**`. The entry/stubs sit outside that tree and are exempt by design.

## How the bundle is built
- **Entry**: `.design-sync/bean-entry.ts` — a curated re-export of the **core-12** components
  (NOT the full `@/shared/components` barrel). Scoped deliberately for a small, reliable first
  import. Adding a component means editing BOTH `bean-entry.ts` AND `componentSrcMap`.
- **@/\* resolution**: esbuild's native tsconfig auto-discovery picks up the app `tsconfig.json`.
  The custom paths-plugin (`cfg.tsconfig` = `.design-sync/tsconfig.designsync.json`) does NOT
  follow `extends` and fires only for its listed prefixes — it aliases ONLY two modules (below).
- **Browser-unsafe stubs** (`.design-sync/stubs/`): `next/link` and `@/api/browser-client` are
  aliased to stubs. Both pull `process.env.NEXT_*` / `NEXT_PUBLIC_SUPABASE_*` at module-init;
  `process` is undefined in the browser bundle → `ReferenceError` → nothing lands on
  `window.BeanUI`. The stubs (`<a>` for Link, no-op client) neutralize this. `@/shared/utils`
  drags in the supabase client transitively via its `storageUpload` re-export (every component
  imports `cn` from that barrel).
- **RHF context**: `Input`/`Textarea` read `useFormContext`. The entry re-exports
  `FormProvider`/`useForm` from `react-hook-form` so previews wrap fields in the **same** RHF
  instance the components use — a separate copy = different context object = blank fields.
  Preview files import `FormProvider`/`useForm` from `"frontend"`, never from `"react-hook-form"`.

## CSS + fonts
- **cssEntry is compiled**: `cfg.buildCmd` runs the Tailwind v4 CLI over `app/globals.css` →
  `.design-sync/.cache/bean-tw.css` (gitignored, ~503 KB — utilities + `@theme` tokens + HeroUI
  `@import` + `@font-face`). Raw `globals.css` won't work (`@import "tailwindcss"` is unresolved).
  **Re-sync must regenerate it first** — `cfg.buildCmd` does this before the converter.
- **Fonts**: Onest woff2 ship via `cfg.extraFonts` = `.design-sync/onest-fonts.css` (repo-relative
  urls → `public/fonts/*`). The app references them web-absolute (`/fonts/*`), which the converter
  can't resolve, so this side file bridges it.

## Known render warns (triaged — not new)
- `[TOKENS_MISSING]` — 7 vars: `--disclosure-panel-height`, `--toast-width`,
  `--color-area-background`, `--color-area-thumb-color`, `--color-swatch-current`,
  `--color-field-border-invalid`, `--front-height`. All belong to HeroUI components **not in our
  core set** (ColorArea, Swatch, Disclosure, Toast) and are injected at runtime. Expected absent;
  non-blocking. If a re-sync adds those components, wire their tokens; otherwise ignore.
- **Post-migration:** the migrated bucket-A components (Button/Input/Switch/…) no longer inject any
  HeroUI runtime vars — their styles are pure utility classes. So on re-sync expect **fewer**
  HeroUI-runtime `[TOKENS_MISSING]`, not more; only the bucket-B `Dialog` still carries HeroUI tokens.

## Toolchain quirks
- `~/.npm` cache had a permission error; installed `playwright@1.61.1` into `.ds-sync/` with
  `--cache <scratch>`. chromium via `npx playwright install chromium` → `~/Library/Caches/ms-playwright`
  (macOS location, NOT `~/.cache`).
- `cfg.overrides.Dialog` = `{cardMode:"single", viewport:"860x600"}` — renders the open modal in-card.

## Re-sync risks (watch-list)
- `bean-tw.css` is gitignored → regenerate via `buildCmd` before building, or previews render unstyled.
- Curated **core-12 only**: 10 kit components are NOT yet synced (DeleteDialog, ContentErrorState,
  Form, Logo\*, OfflineBanner, HydrationBoundary, Tabs, ThemeToggle is in). Floor-card or author them
  on a later sync by extending `bean-entry.ts` + `componentSrcMap`.
- Stubs are load-bearing: if Button's link handling or a newly-synced component's deps change, revisit
  `.design-sync/stubs/` and `tsconfig.designsync.json`.
- `Avatar` `WithImage` cell uses external image URLs (pravatar/picsum) — network-dependent at capture.
