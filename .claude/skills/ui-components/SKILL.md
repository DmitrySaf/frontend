---
name: ui-components
description: Standards and patterns for creating and using UI components in shared/components (hybrid engine — react-aria-components for primitives, HeroUI v3 for Dialog/Drawer/Toast; Bean/Apple-like theme)
triggers:
  - "component"
  - "shared/components"
  - "ui component"
  - "Button"
  - "Input"
  - "Dialog"
  - "Dropdown"
  - "props interface"
  - "styling"
  - "heroui"
  - "react-aria"
---

# UI Components Guidelines

Стандарты и паттерны создания и использования компонентов UI-кита.
**Движок кита — гибрид: `react-aria-components` (RAC) для примитивов, HeroUI v3 для тяжёлого поведения (Dialog/Drawer/Toast). Визуальная система — всегда наша (Apple-like Bean).**
Полная дизайн-правда — [DESIGN.md §4](../../../DESIGN.md); эстетика — скилл `apple-design`.

## ⚠️ CRITICAL: приоритет использования

### Всегда используй готовый компонент кита

Прежде чем писать новый компонент или брать нативный HTML-тег:

1. **Проверь `src/shared/components/`** — компонент почти наверняка уже есть.
2. **Импортируй из барреля**, не из файла: ✅ `import { Button } from "@/shared/components"` — ❌ не `.../components/Button`.
3. **Используй готовый вместо нативного тега:**
   - ❌ `<button>` → ✅ `<Button theme="ghost" size="sm" Icon={IconName} />`
   - ❌ `<input>` → ✅ `<Input name="..." size="lg" />`
   - ❌ свой дропдаун на `useState` → ✅ `<Dropdown>` из кита

## Два движка, одна граница

Кит стоит на **двух** движках, и оба видны **только внутри `src/shared/components/**`** — граница защищена линтом (`noRestrictedImports` в `biome.json`; временный allowlist — `CommunityShell`). Снаружи приложение знает лишь баррель `@/shared/components`; движок за фасадом заменяем, не трогая потребителей.

| Bucket | Движок | Компоненты |
|---|---|---|
| **A — примитивы** | **RAC** (`react-aria-components`) | Button, Switch, Tabs, SegmentedControl, Tooltip, Dropdown |
| **A — без движка** | нативный тег / RHF / `<img>` | Input, Textarea, Avatar, Separator, Skeleton |
| **B — тяжёлое поведение** | **HeroUI v3** (`@heroui/react`) | Dialog (Modal+Sheet), Drawer (CommunityShell), Toast |

Radix / shadcn / sonner из проекта удалены — **не возвращать**.

### Новый компонент кита: keep-vs-migrate

1. **Стилизованный примитив** (наша логика от движка не зависит) → **RAC** или вовсе без движка. По умолчанию сюда.
2. **Тяжёлое поведение, которого в RAC нет из коробки** (dual-tree модалка, очередь тостов, drag-slide лист) → **HeroUI** (bucket B). Редкий случай, решает владелец.
3. **Оборачивай движок в свой PascalCase-компонент** с Bean-API (`theme`/`size`/`name`/`error`), а не тащи движок в call-sites. Баррель — фасад.
4. **Движок — поведение/a11y, а не источник вида.** Родные `size`/`variant`/`color` не передаём — размер и цвет задают наши классы.

```tsx
// ✅ CORRECT (bucket A): RAC-примитив под нашим API
import { Button as AriaButton } from "react-aria-components";
export const Button = (props: ButtonProps) => <AriaButton className={ourClasses} {...} />;

// ✅ CORRECT (bucket A без движка): нативный тег + наши классы
export const Avatar = (props: AvatarProps) => <span className={ourClasses}><img .../></span>;

// ❌ WRONG: вернуть Radix/shadcn (удалено из проекта)
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
```

### Почему так

- **A11y**: React Aria (и RAC, и движок HeroUI) даёт фокус-менеджмент, клавиатуру, ARIA из коробки.
- **Единый вид**: за фасадом барреля меняем движок, не трогая потребителей.
- **Наш вид неизменен**: Apple-like тема живёт в наших классах/токенах, а не в дефолтах движка.

## Оформление: RAC/без-движка гасить нечего; HeroUI — да (bucket B)

- **RAC и без-движка (bucket A) — чистый лист.** У headless-RAC нет дефолтной заливки, а голую `<button>`/`<input>` сбрасывает Tailwind preflight. **Нейтрализаторов не нужно** — вешаем наши классы прямо на элемент. (Historical: у HeroUI-версий Button/Input стояли сбросы `[--button-bg:transparent]` и гашение слота input — при переходе на RAC они **сняты**.)
- **HeroUI (bucket B) — хром гасить.** HeroUI красит дефолты на BEM-классах (`.button--primary` ставит `--button-bg: var(--accent)`; `.input` кладёт border/shadow/`sm:text-sm`). Каскад `@layer` — арбитр: HeroUI объявляет `@layer theme, base, components, utilities`; наши utility-классы лежат в **utilities**, старше `components`/`theme`, поэтому перебивают. Где вид держим мы — гасим переменные явно.

### Состояния и варианты

- **Состояния** (hover/press/focus/selected/disabled) у RAC — через `data-*`: `data-[selected]`, `data-[pressed]`, `data-[focus-visible]`, `data-[disabled]` (у контейнера — `group` + `group-data-[…]`). У **полиморфного** Button (`<button>` ЛИБО `<a>` через `next/link`) — CSS-псевдоклассы (`hover:`/`active:`/`focus-visible:`), т.к. якорь RAC data-* не отдаёт.
- **Варианты** — один движок, **cva** (`tailwind-variants` удалён). cva — только статические оси (theme/size/shape); состояния — `data-*`-классами. `cn()` = clsx + tailwind-merge разруливает конфликты классов.
- **Ловушка tailwind-merge:** токен-размер пишем `text-(length:--text-btn-md)`, **никогда** голым `text-(--text-btn-md)` — bare-форму twMerge принимает за цвет и съедает соседний `text-white`/`text-ink`, текст падает в чёрный (реальный баг). Так же `bg-(--…)`/`rounded-(--…)` однозначны и безопасны, а `text-(--…)` — нет.

## Коллекции React Aria (Menu / ListBox / Tabs)

Внутри `Menu`/`ListBox` **каждый ребёнок обязан быть collection-компонентом** (`Item`/`Header`/`Separator` из
`react-aria-components` — все `createLeafComponent`). **Один голый `<div>` схлопывает всю коллекцию в 0 элементов.**
Это реальный баг из миграции: заметка-`<div>` в меню → пустой дропдаун. Заметка → `<Header>`, разделитель → `<Separator>` (RAC, не наш `Separator`).

## Триггеры оверлеев: Pressable / Focusable, не `.Trigger`

Оборачивая **уже-интерактивный** элемент (наш `Button`, ссылку) в триггер дропдауна/тултипа — используй
`<Pressable>` / `<Focusable>` из `react-aria-components`: они через `Children.only` + `cloneElement` вешают
пропы/ref **прямо на ребёнка, без лишнего DOM**. Обёртка-`.Trigger` со своим `<div role="button">`
→ «кнопка в кнопке» (дубль accessible-name, невалидная вложенность, падение strict-mode в e2e).
Ребёнок обязан форвардить `ref` на фокусируемый DOM-узел (поэтому [Button.tsx](../../../src/shared/components/Button.tsx) — `forwardRef`).

## Core Principles

### 1. Именование
- PascalCase для компонентов и файлов (`Button.tsx`, `Input.tsx`), экспорт под тем же именем.

### 2. Встроенный вид
- Компонент несёт весь базовый вид сам; снаружи — только layout/позиционирование (`w-full`, `mb-4`).
- **Радиусы — из лестничных токенов**, не литералами: `rounded-(--radius-control-sm|md|lg|xl)` (10/10/12/14),
  `--radius-card` (16), `--radius-modal` (24). Никаких `rounded-xl`/`rounded-[10px]` по месту. Правило «нет круглых кнопок» ([DESIGN.md §4.2](../../../DESIGN.md)) в силе — `pill` только осознанно.

### 3. Пропсы
- Явный интерфейс пропсов; **никаких `extends React.HTMLAttributes`** — все пропы перечислены поимённо.
- Группируй логически комментариями (Content, Styling & Variants, Behavior, A11y).

## Размерная лестница контролов (4 ступени)

Единая сетка `sm/md/lg/xl` = **32 / 36 / 40 / 48** ([DESIGN.md §4.2/4.3](../../../DESIGN.md)). Ступени 28 и 44 убраны.

| step | height | radius | kegль | icon | назначение |
|---|---|---|---|---|---|
| `sm` | 32 | 10 | 13 | 16 | плотные ряды, тулбары |
| `md` | 36 | 10 | 14 | 16 | дефолт компонента |
| `lg` | 40 | 12 | 16 | 18 | основная CTA / поля ввода / тач-цель |
| `xl` | 48 | 14 | 17 | 20 | герой-CTA |

- **Button** знает все 4 ступени. **Input/Textarea** — только `md/lg/xl` (поле ≥16px кегль — иначе iOS Safari зумит при фокусе; 32px полям не даём).
- Высоты/радиусы драйвим **своими классами** (`h-9/10/12`, `rounded-(--radius-control-*)`), движок размеров не навязывает.
- Инвариант: поле и кнопка одной ступени садятся по одной линии (Button `lg`=40 ↔ Input `lg`=40).

```tsx
interface ComponentProps {
  size: "sm" | "md" | "lg" | "xl";   // поля: "md" | "lg" | "xl"
  theme?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
  // Custom Props
  label?: string;
  error?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  // Events (только реально используемые)
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
```

## Реализация

- `React.forwardRef` для компонентов, чей ref нужен RAC-обёрткам (Focusable/Pressable/Tooltip).
- Состояния (`isLoading`/`isDisabled`/`hasError`) — внутри компонента, не снаружи.
- «Занят» ≠ «выключен»: во время загрузки кнопка держит цвет и ширину (спиннер абсолютом), гаснет только настоящий `disabled`.

## Styling Guidelines

**Внутри компонента (DO):** базовый вид, состояния (error/disabled/loading), радиусы из токенов, focus-visible-кольцо.
**Снаружи (DON'T):** внутренний вид (`rounded-*`, `resize-none`), ручные label/loading при встроенной поддержке, ручные оверрайды цвета движка на call-site.
**Снаружи (DO):** layout/позиционирование (`w-full`, `mb-4`, `flex`), варианты и размеры компонента (`theme="outline"`, `size="lg"`), встроенные пропы (`label`, `error`, `isLoading`).

## Чеклист нового компонента

- [ ] Bucket выбран осознанно: примитив → RAC/без-движка; тяжёлое поведение → HeroUI. Не Radix/shadcn.
- [ ] Движок импортируется только внутри `shared/components` (граница `biome.json` не нарушена)
- [ ] PascalCase, импорт/экспорт через баррель
- [ ] Явный интерфейс пропсов (без `extends`)
- [ ] Размеры на лестнице `sm/md/lg/xl` (поля — `md/lg/xl`), радиусы из `--radius-control-*`
- [ ] Варианты на cva; состояния — `data-*` (RAC) или CSS-псевдо (полиморфные); размер-токен `text-(length:--…)`
- [ ] Хром HeroUI нейтрализован **только для bucket B**; у RAC/без-движка гасить нечего
- [ ] Коллекции — только RAC-ноды (`Item`/`Header`/`Separator`); триггеры — `Pressable`/`Focusable`
- [ ] Состояния error/disabled/loading, focus-visible, a11y-атрибуты
- [ ] `forwardRef` если ref нужен обёрткам
- [ ] Тосты — `toast` из `@/shared/components` (HeroUI Toast, bucket B; `.error`→`.danger`), НЕ `sonner`
