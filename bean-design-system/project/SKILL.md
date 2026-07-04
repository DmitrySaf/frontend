---
name: bean-design
description: Use this skill to generate well-branded interfaces and assets for Bean, either for production or throwaway prototypes/mocks/etc. Bean is a Russian-language platform where creators run paid communities, courses and posts and get paid. Reconciled against the live Next.js + Tailwind + Supabase codebase. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Key files:
- `README.md` — brand context, content fundamentals, visual foundations, iconography, index.
- `colors_and_type.css` — color + type tokens (CSS vars), radii, shadows, spacing, semantic type classes. Import this in every Bean artifact.
- `assets/` — brand/visual assets (e.g. `login-bg.png`).
- `preview/` — design-system reference cards (colors, type, spacing, components, brand).
- `ui_kits/bean-app/` — interactive recreation of the Bean web app (auth, community app shell + home, public community preview, settings with 5 sections) with reusable React components.

Quick rules: build white surfaces on a `#F5F5F5` gutter; body text `#1C1C1C`; actions in blue `#0071E3`; brand lime `#DEFCAD` (logo tile); destructive orange `#D8400C`. Radii 12 / 14 / **16 (base)** / 18 / 24 / full. Use **Geist** (self-hosted via the CSS) + **Geist Mono** and **Lucide** icons via CDN. Russian copy, sentence case, address the user as **вы**, no emoji. The codebase is the source of truth — a dark theme exists (`.dark`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
