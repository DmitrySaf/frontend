# Bean — Design System

**Bean** (rendered with a lime‑green bean mark) is a **Russian‑language platform for creators to run paid communities, courses and posts — and get paid for them.** A creator builds a community, sets up free or paid subscription **tiers**, publishes content (courses, posts), gets verified, and withdraws earnings. Members discover a community on its **public preview page** and join.

> **Source of truth = the codebase.** This system is reconciled against the live **Next.js 15 + Tailwind v4 + Supabase** app (Feature‑Sliced Design). Where this doc and the old Figma disagree, the *code wins*. `colors_and_type.css` mirrors `app/globals.css` `@theme`.

> **Naming:** the brand mark is the **Bean** bean‑on‑lime logo (`public/logo.svg`). The code still ships a placeholder wordmark **"ProFound"** (login screen, `profound.com/` URLs, "ProFound University"). Treat "ProFound" as scaffolding to be replaced by **Bean**.

## What the product does (by route)
- **`/login`** — auth: email sign‑in + confirmation code, plus VK / Yandex OAuth. Full‑bleed photo background, centered white card.
- **`/communities/[slug]`** — the **community app**: left icon **rail** (communities switcher) → community **sidebar** (banner + nav + collapsible course/section groups) → **header** (back, ⌘K search, help, bell) → content (home / course / posts).
- **`/[slug]`** — a community's **public preview** page: media carousel, description, sticky **pricing card** (free join or paid tiers) + author card. Joining while logged‑out opens an auth dialog.
- **`/settings/*`** — account settings, five sections (see below).
- **Create community** — modal from the rail's **+** button (name → auto‑transliterated URL slug).

### Settings sections (`src/widgets/settings-sidebar`)
| id | label (ru) | icon (Lucide) | state |
|---|---|---|---|
| `profile` | Профиль | `user` | full form (name, @username, bio, social rows, custom link) + sticky save‑bar |
| `security` | Конфиденциальность | `shield` | email/phone change + privacy toggles |
| `verification` | Верификация | `badge-check` | stub (passport / self‑employed / ИП / ООО — TODO) |
| `payment` | Вывод средств | `credit-card` | stub (cards / payout methods — TODO) |
| `billing` | Транзакции | `receipt-text` | stub (payment history — TODO) |

A red‑orange **"Выйти из аккаунта"** (log out) sits below the nav.

---

## CONTENT FUNDAMENTALS

**Language:** Russian (ru). English appears only as URLs/handles (`t.me/`, `@nickname`, `profound.com/slug`) and the wordmark. *(Some community‑preview mock copy is still in English placeholder — Russian is the target.)*

**Voice & tone:** Plain, friendly, direct. Benefit‑led and money‑aware. Short sentences; no jargon, no hype, no exclamation marks.

**Person:** Addresses the user as **вы** (polite). Instructions use imperatives: *"Расскажите о себе"*, *"Создать новое сообщество"*, *"Пройдите верификацию"*.

**Casing:** **Sentence case** everywhere — headings ("Настройки аккаунта", "Создать новое сообщество"), buttons ("Сохранить", "Продолжить", "Создать", "Изменить"), labels ("Имя", "Почта", "Название сообщества"). No Title Case, no ALL CAPS.

**Labels & placeholders:** Labels 1–2 words ("Имя", "Почта", "URL"). Placeholders model the answer: "Введите название сообщества", "Расскажите о себе", "example@gmail.com", "+7 (999) 123‑45‑67". Inputs carry prefixes ("@", "https://", "profound.com/") and a char counter when `maxLength` is set.

**Microcopy examples:**
- Section titles: "Настройки аккаунта", "Безопасность", "Социальные сети", "О сообществе".
- Buttons: "Сохранить", "Сбросить", "Продолжить", "Создать", "Изменить", "Выйти из аккаунта".
- Status: "У вас есть несохранённые изменения" (sticky save‑bar).
- Community menu: "Пригласить в сообщество", "Покинуть сообщество" (danger).

**Emoji:** **None in product copy.** (Mock data uses placeholder 🐼 avatars — swap for real images.)

**Vibe:** Calm, utilitarian, modern‑Apple‑adjacent. Trustworthy fintech‑for‑creators.

---

## VISUAL FOUNDATIONS

**Overall feel:** Clean, bright, high‑contrast. White surfaces sit on a `#F5F5F5` app gutter; near‑black text; hairline grey borders; soft shadows. The brand jolt is **lime‑green** (logo tile). Action color is a confident **Apple‑style blue**. Closer to iOS/macOS system UI than a colorful social app. **A dark theme exists in code** (`.dark`) — see `colors_and_type.css`.

**Color usage** *(see `colors_and_type.css` for exact tokens)*
- **Backgrounds:** white (`#FFFFFF`) surfaces; `#F5F5F5` app gutter / recessed fill; `oklch(.96)` ≈ `#F2F2F2` hover/accent. Public preview page uses `gray‑50` `#F9FAFB`. Auth screens use a full‑bleed cool photographic background with a centered white card.
- **Text:** body default `#1C1C1C` (the `--black` token); `#404040` secondary; `#8F8F8F` muted/placeholder.
- **Primary (blue `#0071E3`):** primary buttons, links, focus ring, selected pricing tier. The blue ramp varies only in *lightness* (`hsl(210 100%)`, 49→40%).
- **Secondary (lime `#DEFCAD`):** the logo tile fill. Used sparingly as brand identity. *(Older docs said `#CFFF81`; the shipped `logo.svg` is `#DEFCAD`.)*
- **Destructive / danger (`#D8400C`, a warm orange‑red):** the single status color actually tokenised in code (`--danger`). Used for log‑out, "leave community", and input errors — with soft `#D8400C13` hover / `#D8400C33` press washes. **There is no separate error/warning/success palette in the codebase;** for design artifacts the DS adds a small harmonious **semantic status palette** — `--info` (= primary blue), `--success` (green, lime‑adjacent), `--warning` (amber), `--error` (= danger), each with a soft `…-fill` surface + `…-border` hairline (see `colors_and_type.css`). It supersedes the ad‑hoc Tailwind `blue‑100/700`, `red‑100/500` the product currently reaches for. These status tokens are a **DS proposal, not yet in code** — wire them into `@theme` to ship.
- **Imagery vibe:** cool, natural, slightly desaturated photography.

**Typography:** **Geist** (sans) everywhere; **Geist Mono** for codes/numbers. The app styles type with the **Tailwind text scale** (`text-sm` 14 = labels/tabs, `text-base` 16 = body, **`text-2xl` 24 / bold = page titles**, `text-lg` 18 = sub‑heads). Headings are weight 600–700.

**Spacing & layout:** 4px base grid; common gaps 8 / 12 / 16 / 24 / 32. The authenticated shell is a `p-2` gutter holding a **60px icon rail** + a white `rounded-md` content panel. Community view = `256px` sidebar + header + content. Settings = `230px` sidebar + `~672px` form column. A **sticky bottom save‑bar** appears on unsaved profile changes.

**Corner radii** *(this replaces the old 8/16/18/24 scale)*
- `12px` (`--radius-md`) — chips, **size‑S buttons**, app content panel, community avatars.
- `14px` (`--radius-lg`) — **size‑M inputs**, nav tabs.
- `16px` (`--radius-xl`) — **base**: M/L buttons, L inputs, cards, the logo tile.
- `18px` — the expanding profile button in the rail.
- `24px` — auth card + dialogs.
- `full` (`9999px`) — pills, badges, **toggles**, avatars. **Buttons are never fully round.**

**Cards & surfaces:** White fill, 1px `#E2E2E2` hairline, soft `--shadow-card`. No heavy/neumorphic shadows; no colored left‑border accent cards.

**Buttons** (`src/shared/components/Button.tsx`) — themes × sizes:
- *Themes:* **primary** (solid `#0071E3`, white, shadow; hover `primary‑500`, active `primary‑400`) · **outline** (white, `--input` border, hover `accent`) · **destructive** · **ghost** (transparent; hover `gray‑100`).
- *Sizes:* **s** `h‑32 px‑8 text‑xs rounded‑12` · **m** `h‑44 px‑14 text‑sm rounded‑16` · **l** `h‑48 px‑16 text‑base semibold rounded‑16`.
- `iconOnly` → square; `fluid` → full‑width. Icon‑only ghost buttons are the rail/header pattern.

**Inputs** (`src/shared/components/Input.tsx`): white fill with an **inset ring** (`inset-ring-gray-200`); focus → **2px `inset-ring-primary-500`**; error → `inset-ring-danger` + danger helper. Sizes **l** (`h‑48 rounded‑16 text‑base`) / **m** (`h‑40 rounded‑14 text‑sm`). `gray‑500` placeholder. Optional `prefix` string (`@`, `https://`, `profound.com/`) and `prefixElement` (a 32×32 bordered, `rounded‑10`, shadowed brand‑icon tile for social rows). Label `text‑sm/500` above; helper/counter `text‑sm` below.

**Toggle / Switch** (`src/shared/components/Switch.tsx`): `h‑24 w‑44` `rounded‑full` track, `16×16` white knob. **On = `blue‑600`**, off = `gray‑200`. Disabled shows a `lock` glyph in the knob.

**Tabs** (`src/shared/components/Tabs`): row item `pl‑12 pr‑16 py‑10 rounded‑14`, `font‑semibold`, `size‑20` icon. **Active** = `#D3D3D340` fill + `1px #D3D3D3` ring + black text; **inactive** = `#404040` text, hover `#D3D3D325`. Used by both the settings nav and the community sidebar nav. Beyond this vertical nav tab, content areas use three lighter patterns: a **segmented control** (recessed `#F5F5F5` track, one white raised pill, `rounded‑9` inside `rounded‑12`), **underline tabs** (2px primary‑600 rule under the active item, optional count), and **filter chips** (see Tags & filters).

**Code input (OTP):** the confirmation‑code field on `/login` — **4 single‑digit cells**, `54×62`, `rounded‑14`, **Geist Mono** at `text‑2xl`. Empty cells show a `·` placeholder in `gray‑400`; the active cell takes the **2px `primary‑500`** focus ring + blinking caret; an invalid code swaps to a `1.5px --danger` ring with danger helper text. Treat as an input variant, not a separate component.

**Modals & dialogs:** centered white card over a `rgba(10,12,20,.32)` scrim, `rounded‑24` (`--radius-2xl`), `--shadow-pop`. Header = sentence‑case title + `x` close (`gray‑500`). Two shapes: a **form modal** (e.g. *Создать новое сообщество* — dashed upload tile, inputs, full‑width primary `Создать`) and a **destructive confirm** (danger‑soft icon tile, body copy, split **outline `Отмена` + destructive** action). Auth dialogs over the public preview reuse the same shell at `rounded‑20`.

**Cards & surfaces:** white fill, `1px #E2E2E2` hairline, `rounded‑16`, `--shadow-card`. Recurring kinds: **stat card** (label / `text‑2xl` Geist‑Mono value / `trending‑up` delta in primary), **author card** (avatar + name + `badge‑check`), **pricing‑tier selector** (radio rows; selected = `2px primary‑600` ring + `primary‑50` fill + discount badge), and **community preview card** (cover + overlapping `rounded‑14` lime logo tile + name + `Присоединиться`). No colored left‑border accents.

**Posts:** a **composer** row (avatar + recessed *Написать пост…* field + image button + primary `Опубликовать`) and **post cards**. A post card stacks an author row (avatar, name · `автор` in primary, relative time, optional lime `Закреплено` pin, `more‑horizontal`), a `text‑lg/700` title, an excerpt, an optional full‑bleed cover, and a **reactions bar** (`heart` — liked = danger, `message‑circle`, `share‑2`, trailing `bookmark`) above a hairline. Text‑only posts drop the cover and inline the reactions.

**Tags:** content labels & topics — distinct from status **badges** (which signal state). Pill‑shaped (`rounded‑full`), default a soft recessed `#F5F5F5` chip in `text‑secondary`; variants **outline**, **solid** (near‑black), and **brand** (lime wash). Topic tags lead with a muted `#`; category tags carry a Lucide icon; editable tags show a trailing `×` and an outlined‑primary *Добавить тег*.

**Tabs & filters (content):** see Tabs above — **segmented control**, **underline tabs**, and **filter chips** (multi‑select pills, active fills near‑black; an outlined‑primary `Фильтры` chip opens advanced filtering).

**Hover / press / focus:** subtle grey washes on ghost/tab items; filled buttons darken; focus shifts the ring toward blue. **Motion** is restrained — short `ease-out` ~120–200ms; no bounce/parallax.

**Avoid:** purple/blue gradients, emoji cards (placeholder 🐼s are temporary), colored left‑border cards, warm/grainy imagery, ALL‑CAPS, heavy shadows.

---

## NAVIGATION & SHELL

- **Icon rail** (`main-sidebar`, 60px): Bean **logo** → messages (`message-circle-more`) + search (`search`) → **community avatars** (`rounded‑12`; active = a 3px black bar on the right edge) → **`+`** create (primary button) → at the bottom, a **profile button** that expands left on hover (`rounded‑18`, `ring gray‑200`) to reveal name/@handle + `more-horizontal` & `settings` icons.
- **Community sidebar** (`community-sidebar`, 256px): a **banner** (160px with cover image + dark overlay, or a 60px plain header) carrying the logo, community name, and a `chevron-down` menu (Пригласить / Покинуть) → main tabs (`Главная` = `home`) → **collapsible sections** (`folder` header, e.g. a course "Тест" → "Курс" `book-open`).
- **Community header** (`community-header`): back arrow, centered ⌘K search input, `help-circle`, `bell`.
- **Public header** (`community-preview`): for logged‑out preview pages.

---

## ICONOGRAPHY

**System:** **Lucide** throughout (`iconLibrary: "lucide"`; `lucide-react` in code). Outline / ~2px stroke / rounded caps, single‑color (inherits text). Sizes 16 / 20 / 24. Names seen in code: `home`, `book-open`, `folder`, `user`, `shield`, `badge-check`, `credit-card`, `receipt-text`, `log-out`, `message-circle-more`, `search`, `plus`, `bell`, `help-circle`, `settings`, `more-horizontal`, `chevron-down`, `user-plus`, `users`, `globe`, `lock`, `loader-2`, `bean`.

> **Implementation note:** use **Lucide from CDN** (`https://unpkg.com/lucide@latest`) for HTML artifacts — a 1:1 match for the `lucide-react` the app uses.

**Brand / logo mark:** the **bean** glyph (dark 2px stroke) centered on a **lime `#DEFCAD`** rounded‑16 tile — see `public/logo.svg` (copied to `assets/logo.svg`).

**Social brand icons:** Telegram / VK / Instagram / YouTube (+ a website/`globe` fallback) appear as small bordered tiles in the profile social rows. The ui_kit reconstructs the handful it needs as clean inline SVGs (`ui_kits/bean-app/primitives.jsx`, `SOCIALS`). Swap in official vectors for production.

**Emoji:** not iconography. Mock 🐼 placeholders stand in for community/user avatars.

---

## INDEX — what's in this folder

- **`README.md`** — this file.
- **`colors_and_type.css`** — CSS custom properties mirroring the app's `@theme` (core, primary/gray ramps, lime, danger, radii, shadows, spacing, Tailwind text scale, dark theme) + semantic type classes. Import in any Bean artifact.
- **`SKILL.md`** — Agent‑Skill manifest.
- **`assets/`** — `login-bg.png` (auth background) + `logo.svg` (Bean mark).
- **`preview/`** — design‑system reference cards (colors, type, spacing, components, navigation, brand) shown in the Design System tab. Every **component** card is now an **exhaustive state matrix** — sizes × states (default / hover / focus / active / disabled) × variants/colors × icon treatments, with validation (error/success) where it applies. Components cover buttons, inputs, **code input (OTP)**, **radio**, toggle, badges, **tags**, vertical nav tabs, **segmented tabs & filters**, **avatars**, **tooltips**, **alerts / status**, **toast**, **rating**, sidebar, community nav, **posts**, and **modals & dialogs**. Foundations stay split into Colors / Type / Spacing; **Brand** holds only the logo + wordmark. *(Cards & surfaces are documented in Visual Foundations below; there's no standalone card matrix.)*
- **`ui_kits/bean-app/`** — high‑fidelity, interactive recreation of the Bean app (auth, **community app shell + home**, **public community preview**, **settings (5 sections)**, components). See its own `README.md`.

## Quick‑start for designers
1. Link `colors_and_type.css`; add **Lucide** (`https://unpkg.com/lucide@latest`) + Google Fonts **Geist Mono** (Geist is self‑hosted via the CSS).
2. Build on white over a `#F5F5F5` gutter; body text `#1C1C1C`; actions in blue `#0071E3`; brand moments in lime `#DEFCAD`; destructive in orange `#D8400C`.
3. Radii: 12 / 14 / **16 (base)** / 18 / 24 / full. Geist; sentence‑case Russian copy; **вы**; no emoji.
4. Pull components/screens from `ui_kits/bean-app/`.
