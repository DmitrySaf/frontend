# Bean

Русскоязычная платформа платных сообществ: авторы ведут курсы, посты и чаты и зарабатывают на подписках. По позиционированию — «русский Whop»: структура сообщества и чат в духе Discord, монетизация и витрина — в духе Whop.

**Стек:** Next.js 15 (App Router) · Supabase (auth, БД, realtime, Storage) · React Query · React Hook Form + Zod · Tailwind v4 · TypeScript · Biome · Playwright.

## Быстрый старт

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Нужен `.env.local` с доступами к Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Обе переменные обязательны — при их отсутствии приложение падает на старте осознанно (`requireEnv` в [supabase/api/utils/env.ts](supabase/api/utils/env.ts)), чтобы не ловить невнятные ошибки в рантайме.

## Команды

| Команда | Что делает |
|---|---|
| `pnpm dev` / `pnpm build` / `pnpm start` | разработка / сборка / прод-сервер |
| `pnpm lint` · `pnpm format` · `pnpm check` | Biome: линт · форматирование · проверка с автофиксом |
| `pnpm e2e` · `pnpm e2e:desktop` | Playwright: весь набор · только desktop |
| `pnpm gen-supabase-types` | перегенерировать типы БД из схемы Supabase |

## Архитектура

Feature-Sliced Design, зависимости строго вниз и без циклов:

```
app → pages → widgets → features → entities → shared
```

- `app/` — роутинг App Router, лейауты, провайдеры; страницы ре-экспортируются из `src/pages`
- `src/entities/` — бизнес-сущности (community, channel, post, course, tier…): `api/` (запросы, мутации, ключи кэша, realtime), `model/` (мапперы, валидация), `ui/`
- `src/features/` · `src/widgets/` — пользовательские сценарии и составные блоки (формы, модалки, сайдбары)
- `src/shared/` — UI-кит, композаблы, утилиты, конфиг; ничего доменного
- `supabase/` — клиенты (browser/server/middleware) и миграции

Импорты между слоями — только через публичный `index.ts` слайса, без глубоких путей. Подробные правила — в [CLAUDE.md](CLAUDE.md).

## Документация

| Файл | О чём |
|---|---|
| [PRODUCT.md](PRODUCT.md) | продукт: аудитория, позиционирование, принципы |
| [DESIGN.md](DESIGN.md) | дизайн-система: токены, типографика, компоненты, моушн. **Источник истины — код**, этот файл — карта |
| [docs/plan.md](docs/plan.md) | мастер-план по этапам, статус и лог решений |
| [docs/db-schema.md](docs/db-schema.md) | контракт данных: таблицы, RLS, RPC |
| [CLAUDE.md](CLAUDE.md) | правила для агентов: архитектура, слои, паттерны |

## Знание о кодовой базе (graphify)

В `graphify-out/` лежит граф кодовой базы: связи между файлами, ключевые узлы, кластеры.

```bash
graphify explain "useCommunityQuery()"      # что за узел и с чем связан
graphify path "Button" "CommunityShell"     # кратчайший путь между сущностями
graphify update .                            # пересобрать после правок кода (только AST, без LLM)
```

`explain` и `path` работают по точному имени символа и отвечают надёжно; `query` годится для ориентации, но точечные вопросы («где реализовано X») быстрее решаются обычным поиском по коду.
