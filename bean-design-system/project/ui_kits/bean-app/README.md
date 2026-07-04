# Bean — App UI Kit

High-fidelity, interactive recreation of the **Bean** creator‑profile web app, built from the Figma source. Cosmetic recreation (not production logic) — components are modular and reusable.

## Run
Open `index.html`. It loads React 18 + Babel + Lucide (CDN) + the shared `../../colors_and_type.css`, then mounts the babel JSX files below.

## Interactive flow
1. **Auth** (`AuthScreen.jsx`) — full‑bleed photo background, centered card, email + VK/Yandex OAuth. Press **Продолжить** (or any OAuth) → app.
2. **App shell** — left icon rail (`Sidebar.jsx`) + **profile settings** editor (`SettingsScreen.jsx`). Tabs switch the right pane: Профиль (full form), Приватность (toggles), Вывод средств / Транзакции (states). A sticky **save‑bar** appears at the bottom; editing the name/bio brings it to full opacity.
3. **Public profile** (`PublicProfile.jsx`) — link‑in‑bio view. Open it via the **👁 Профиль** preview button in settings, or by clicking the Bean logo in the rail. **Назад к настройкам** returns.

## Files
| File | What |
|---|---|
| `index.html` | Entry — script tags + mount point |
| `primitives.jsx` | `Icon` (Lucide), `Button`, `Input`, `Toggle`, `BeanLogo`, `SocialGlyph` + `SOCIALS` map |
| `Sidebar.jsx` | Vertical icon nav rail (logo → nav → cat avatar) |
| `AuthScreen.jsx` | Sign‑in / sign‑up |
| `SettingsScreen.jsx` | Settings editor: tabs, form, social connect rows, save‑bar, privacy toggles |
| `PublicProfile.jsx` | Public link‑in‑bio profile with social link cards |
| `app.jsx` | Screen router (`auth → app → public`) |

## Conventions
- **Icons:** Lucide via `<Icon name="…" />`. Outline, ~2px stroke.
- **Color/type:** all from `colors_and_type.css` CSS vars. Blue = action, lime = brand, near‑black text.
- **Copy:** Russian, sentence case, polite **вы**, no emoji.
- **Each component file** assigns its exports to `window` (babel scripts don't share scope).

## Known simplifications
- Social **brand glyphs** (`SOCIALS` in `primitives.jsx`) are clean single‑color reconstructions of Telegram / YouTube / Instagram / X / Discord / TikTok / VK / Yandex — the Figma's multi‑path brand exports were fragmented. They're recognizable but not the official vector marks. Swap in official assets for production.
- Forms are presentational (local state only); no real validation, upload, or persistence.
- Only the **Профиль** and **Приватность** tabs are fully built out; **Вывод средств** / **Транзакции** show representative empty states (the Figma didn't define them in detail).
