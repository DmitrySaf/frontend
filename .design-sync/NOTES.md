# design-sync notes — Bean UI-kit

Repo-specific knowledge for future syncs. This is a **Next.js app** (not a published component
library), so the sync runs the **package shape** with a curated entry (`bean-entry.ts`), NOT a
published `dist/`. Project: **Bean Design System** (`4db95f96-6d77-459d-8927-4bafe1d60586`).

**Scope: 16 user-facing components** (as of the 2026-07 re-sync). Core: Button, Input, Textarea,
Switch, SegmentedControl, Avatar, Dropdown, Tooltip, Dialog, Skeleton, Separator, ThemeToggle.
Added this sync: **Select, Tabs, Toaster, DeleteDialog**. Not synced (app-specific/infra): Logo\*,
ContentErrorState, OfflineBanner, Form, HydrationBoundary, and the `Tab` primitive (excluded via
`componentSrcMap: {"Tab": null}` but exported so the Tabs preview can compose it).

## Engine: HYBRID (post-RAC-migration)
- **Bucket A** (Button, Input, Textarea, Switch, Separator, Skeleton, Tabs, SegmentedControl,
  Tooltip, Dropdown, **Select**) → `react-aria-components` or engine-free (native `<input>`/
  `<textarea>`/`<div>` + RHF). Styling = our own utility classes (no HeroUI BEM chrome to neutralize).
- **Bucket B** → HeroUI: `Dialog`/`DeleteDialog` (Modal+Drawer), `Toaster`/`toast`, **`Avatar`**
  (HeroUI compound, image→fallback). `@import "@heroui/styles"` stays in `globals.css`, so compiled
  `bean-tw.css` carries it.
- Single variant engine = **cva** (`tailwind-variants` removed). Engine boundary is lint-enforced
  (`noRestrictedImports` in `biome.json`): both engines only inside `src/shared/components/**`; the
  entry/stubs sit outside and are exempt.

## ⚠️ CRITICAL: `@frosted-ui/icons` BARREL hangs the preview compile — use SUBPATH imports
The app migrated icons **off `lucide-react`** (no longer a direct dep — only transitive in the pnpm
store) **onto `@frosted-ui/icons`** (direct dep). Two consequences for previews:
- Previews must NOT import `lucide-react` (won't resolve) — use `@frosted-ui/icons`.
- **NEVER import from the `@frosted-ui/icons` barrel in a preview.** The esm barrel re-exports
  **5132 modules**, and the preview compiler's resolve-policy plugin (`lib/story-imports.mjs`, a
  catch-all `onResolve` that runs `b.resolve`+`realpathSync` per import) walks *every* one → the
  build **hangs for minutes** (looks like a stall after `previews: N user-owned`). Verified: barrel
  import >180s vs **subpath 109ms**. Always: `import { PlusBold16 } from "@frosted-ui/icons/PlusBold16";`
  (one line per icon; files carry both a named and a default export). The **main bundle** uses a
  different resolver, so app code's barrel imports (`@/shared/components/Button.tsx`) are fine — this
  bites previews only.

## How the bundle is built
- **Entry**: `.design-sync/bean-entry.ts` — curated re-exports of the 16 components (NOT the full
  `@/shared/components` barrel). Passed via `--entry`. Adding a component = edit BOTH `bean-entry.ts`
  AND `componentSrcMap`. Also re-exports `FormProvider`/`useForm` (RHF) and the `Tab` primitive.
- **@/\* resolution**: esbuild's native tsconfig auto-discovery picks up the app `tsconfig.json`.
  `cfg.tsconfig` (`.design-sync/tsconfig.designsync.json`) aliases only browser-unsafe modules to
  stubs — it does NOT follow `extends`, fires only for its listed prefixes.
- **Browser-unsafe stubs** (`.design-sync/stubs/`): `next/link` (→ `<a>`), `@/api/browser-client`
  (→ no-op), and **`next/navigation`** (→ `usePathname()=""` etc. — Tabs calls it at render; without
  the stub Next's client router reads `process.env` at init → `ReferenceError`). `@/shared/utils`
  drags the supabase client transitively (every component imports `cn` from that barrel).
- **RHF context**: `Input`/`Textarea`/`Select` read `useFormContext`. Their previews wrap fields in a
  `FormProvider` from **"frontend"** (the bundle's RHF instance) — a separate `react-hook-form` copy =
  different context object = blank fields.

## Previews (`.design-sync/previews/`) — variation-matrix style
Fluent-2-style: sizes across, metrics down. True 2D matrices where 2D variation exists (Button 7×4,
Avatar shape×size, Switch state×enabled, SegmentedControl); labeled state galleries for fields;
open modals for Dialog/DeleteDialog; trigger-only for Dropdown/Tooltip (menu/plate show on
interaction, not statically).
- **cardMode overrides** (config): `column` for wide matrices/stacks (Button, Input, Textarea,
  Select, SegmentedControl, Tabs, Skeleton); `single` + viewport for portals (Dialog 920x700 w/
  `primaryStory: FormDialog`, DeleteDialog 860x600, Toaster 520x440).
- **Avatar `WithImage` uses data-URI SVGs, NOT external hosts.** pravatar/picsum stall the headless
  render check on `networkidle` (contributed to a multi-minute validate). Keep images self-contained.
- **Toaster**: imperative — the preview mounts `<Toaster/>` and fires `toast.success/.error` on mount.
  Only ONE toast reliably captures (transient/stacked; the error+description shows, success may be
  off-frame). That's expected — the card proves the component; don't chase both.

## CSS + fonts
- **cssEntry is compiled**: `cfg.buildCmd` runs the Tailwind v4 CLI over `app/globals.css` →
  `.design-sync/.cache/bean-tw.css` (gitignored, ~509 KB — utilities + `@theme` tokens + HeroUI
  `@import` + `@font-face`). Raw `globals.css` won't work. **Re-sync must regenerate it first**
  (`cfg.buildCmd`); the driver does not run it — run it by hand before the driver.
- **Fonts**: Onest woff2 ship via `cfg.extraFonts` = `.design-sync/onest-fonts.css` (repo-relative
  urls → `public/fonts/*`); the app references them web-absolute, which the side file bridges.

## Known render warns (triaged — not new)
- `[TOKENS_MISSING]` — 6 vars: `--var` (a scrape artifact), `--disclosure-panel-height`,
  `--color-area-background`, `--color-area-thumb-color`, `--color-swatch-current`,
  `--color-field-border-invalid`. All belong to HeroUI components NOT in our set (ColorArea, Swatch,
  Disclosure) and are injected at runtime. Expected absent; non-blocking.
- Migrated bucket-A components inject no HeroUI runtime vars (pure utility classes), so expect FEWER
  HeroUI `[TOKENS_MISSING]`, not more — only bucket-B (Dialog/Avatar/Toast) still carry HeroUI tokens.

## Toolchain quirks
- playwright@1.61.1 installed into `.ds-sync/` pins **chromium-1228** (cached at
  `~/Library/Caches/ms-playwright`, macOS location). Render check works with this pairing.
- If a run stalls, kill stragglers by SPECIFIC name (`package-build`, `resync.mjs`, `esbuild --service`,
  `ms-playwright/chromium`) — NEVER a broad `pkill node` (would kill the `claude` process).

## Re-sync risks (watch-list)
- `bean-tw.css` is gitignored → regenerate via `buildCmd` before the driver, or previews render unstyled.
- **Icon barrel hang** (see CRITICAL above) is the #1 trap — any new preview icon MUST use a subpath.
- If `@frosted-ui/icons` names change (canary `0.0.1-canary.153`), preview subpath imports break;
  grep `node_modules/@frosted-ui/icons/dist/esm/*.js` for the exact `<Name>Bold16` file.
- Stubs are load-bearing: if Button's link handling, Tabs' navigation, or a new component's deps
  change, revisit `.design-sync/stubs/` + `tsconfig.designsync.json`.
- Curated 16 only: Logo\*, ContentErrorState, OfflineBanner, Form, HydrationBoundary NOT synced —
  extend `bean-entry.ts` + `componentSrcMap` to add them later.
