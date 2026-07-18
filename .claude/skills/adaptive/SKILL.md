---
name: adaptive
description: Mobile/responsive design rules for Bean — breakpoints, safe-area, touch targets, sheets, sticky CTA, back-navigation
triggers:
  - "mobile"
  - "responsive"
  - "адаптив"
  - "мобильн"
  - "breakpoint"
  - "safe-area"
  - "touch"
  - "тач-цел"
  - "bottom sheet"
  - "drawer"
  - "sticky"
  - "планшет"
  - "tablet"
---

# Adaptive & Mobile Guidelines

Mobile — важнейшая часть внешнего вида Bean. Правила ниже обязательны для любой работы над
UI/страницами. **Полная версия с обоснованиями — [DESIGN.md §8](../../../DESIGN.md).** Здесь — чеклист.

## Перед версткой любого экрана

- [ ] Три полосы, не «телефон/десктоп»: `<md` телефон · `md–lg` планшет · `≥lg` десктоп.
      Вторая фиксированная колонка появляется на **`lg`**, не `md` (иначе на 768px нет места).
      `sm` — перестройки внутри телефонной полосы.
- [ ] Прод-проверка: `pnpm build && pnpm start`, ширины 320/390/768/1024 × light/dark.
      Не эмуляцией в devtools. Метод — `docs/mobile-audit.md`.

## Обязательные правила

- **Safe-area**: любая полоса у нижней кромки (композер, липкий CTA, футер шита, drawer) —
  `pb-safe` / `pb-safe-N`. `viewport-fit=cover` уже включён.
- **Тач-цели ≥44px**: мелкие иконки-кнопки → `touch-hit` (нужен ≥8px зазор до соседа);
  строки-ссылки → `min-h-11 lg:min-h-0`.
- **Поля ввода ≥16px** (иначе iOS Safari зумит) — см. DESIGN.md §4.3.
- **«Назад» = на уровень выше** (`router.back()` с фолбэком или ссылка на родителя),
  никогда «туда, где живёт резолвер».
- **Нет горизонтального скролла страницы**: широкий контент в своём `overflow-x-auto`;
  в flex-строке текст `min-w-0 truncate`, нетекстовый сосед `shrink-0 whitespace-nowrap`.

## Паттерны (переиспользовать, не изобретать)

| Задача | Паттерн | Референс |
|---|---|---|
| Секционные настройки | iOS drill-down список (не пиллы) | `SettingsHome`, `settings-layout` |
| Оплата/вступление на длинной странице | липкий CTA-бар (IntersectionObserver, `<lg`) | `StorefrontCtaBar` |
| Модалка на `<md` | bottom-sheet, свайп-вниз = клик снаружи (§4.1) | `Dialog` |
| Master-detail на планшете | список↔деталь чередуются до `lg` | `CourseScreen` |
| Открытие drawer | свайп от левой кромки (≤24px) | `CommunityShell` |
| Ряд из нескольких `size="l"` кнопок | перестроить (full-width + grid-cols-2 / стек), не сжимать | `LessonView` |

## Анти-паттерны

- ❌ Всё на одном `md` (планшет = мини-десктоп в тесноте).
- ❌ Кнопка схлопывается до голой иконки при нехватке места (текст исчез) — это баг.
- ❌ Дублирующие действия на мобиле (распирают строку).
- ❌ `slide-in-from-bottom-full` у tailwindcss-animate (молча не генерируется) — свои `@keyframes`.
