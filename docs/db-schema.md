# Bean — схема данных (контракт для моков)

> Утверждено 2026-07-02. UI строится на моках этой формы; миграции применяются на финальном этапе.
> Существующие таблицы: `profiles`, `profile_social_links`, `communities`.

## Сообщества

### `communities` (расширение существующей)

| Поле | Тип | Комментарий |
|---|---|---|
| id | uuid PK | есть |
| name | text unique | slug, есть |
| display_name | text | есть |
| owner_id | uuid → profiles | есть |
| description | text | новое |
| cover_url | text | обложка (админ → Внешний вид) |
| logo_url | text | логотип |
| accent_color | text | hex, акцент оформления |
| theme | `light` \| `dark` \| `system` | тема сообщества |
| visibility | `public` \| `private` | публичное = открыта витрина |

### `community_members`

| Поле | Тип |
|---|---|
| community_id + user_id | unique pair |
| role | `owner` \| `admin` \| `member` |
| joined_at | timestamptz |

Роль ≥ `admin` включает модель A (переключатель «Просмотр ↔ Редактирование», админ-меню по фото сообщества).

### `community_invites`

`community_id`, `code` (unique), `created_by`, `expires_at`, `max_uses`, `uses`.

## Структура (Discord-стиль)

### `community_categories`
`community_id`, `name`, `position`. Сворачиваемые секции сайдбара.

### `community_channels`
`community_id`, `category_id` (nullable), `type` (`chat` | `posts` | `course`), `name`, `slug`, `position`. «Главная» — встроенный таб, в БД не хранится.

## Чат

### `messages`
`channel_id`, `author_id`, `content`, `attachments jsonb`, `created_at`, `updated_at` (метка «изменено»), `deleted_at` (soft delete).

Функционал v1: отправка, редактирование/удаление своих сообщений, удаление любых админом, разделители по дням. Реакции и ответы — вне v1.

## Посты

### `posts`
`channel_id`, `author_id`, `title`, `content`, `cover_url`, `pinned`, `created_at`, `updated_at`.

### `post_likes`, `post_bookmarks`
Пары `post_id` + `user_id` (unique).

### `post_comments`
`post_id`, `author_id`, `content`, `created_at`. Один уровень (без вложенности), раскрывается лентой под постом по клику на счётчик.

## Курсы

### `courses`
1:1 с каналом типа `course`: `channel_id`, `title`, `description`, `cover_url`.

### `course_modules`
`course_id`, `title`, `position`.

### `course_lessons`
`module_id`, `title`, `description`, `video_path` (Supabase Storage), `duration_seconds`, `position`.

Видео загружается в Supabase Storage (bucket `lesson-videos`), проигрывается HTML5-плеером через signed URL.

### `lesson_progress`
`user_id` + `lesson_id` (unique), `completed_at`. Даёт прогресс «4/10» и галочки в списке уроков.

## Монетизация (симуляция платежей)

### `pricing_tiers` — полная гибкость

| Поле | Тип | Комментарий |
|---|---|---|
| community_id | uuid FK | |
| name | text | «Месячный», «Годовой», «Навсегда»… |
| kind | `recurring` \| `one_time` | подписка или разовый платёж за вход |
| price_kopeks | int | 0 недопустим; бесплатное вступление = сообщество без активных тарифов |
| period_months | int, nullable | только для recurring: 1/3/6/12 — любой |
| discount_percent | int, nullable | задаётся автором вручную, бейдж «−15%» |
| is_active | bool | тумблер в настройках сообщества |
| position | int | порядок в списке |

### `subscriptions`
`user_id`, `community_id`, `tier_id`, `status` (`active` | `canceled` | `expired`), `started_at`, `expires_at` (null для one_time — бессрочно).

### `transactions`
`user_id`, `community_id` (nullable), `type` (`subscription` | `payout`), `amount_kopeks`, `status` (`succeeded` | `pending` | `failed`), `metadata jsonb`, `created_at`. Питает экран «Транзакции» и дашборд дохода.

### `payout_methods`
`user_id`, `kind` (`card`), `last4`, `brand`, `is_default`.

### `verification_requests`
`user_id`, `kind` (`passport` | `self_employed` | `ip` | `ooo`), `status` (`pending` | `approved` | `rejected`), `data jsonb`, `submitted_at`.

## Решения, принятые при согласовании

- **Комментарии**: раскрывающаяся лента под постом, один уровень.
- **Чат v1**: база + редактирование/удаление; реакции и reply — позже.
- **Видео**: Supabase Storage, не внешние embed.
- **Тарифы**: полная гибкость — recurring с любым периодом/ценой/скидкой, one-time платёж за вход, бесплатное сообщество = без тарифов.
- **Платежи**: симуляция — «оплата» проходит мгновенно, транзакция пишется в БД; реальный провайдер позже.
