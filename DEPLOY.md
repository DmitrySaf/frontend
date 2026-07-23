# Деплой (Netlify)

GitHub Pages не подходит: это статический хостинг, а приложению нужен Node-сервер
(Supabase-auth по кукам, `proxy.ts`, middleware, Server Components, route handlers).
Деплоим на Netlify — бесплатный тариф крутит всё это как есть.

## Один раз: подключить репозиторий

1. netlify.com → **Add new site → Import from Git** → выбрать этот репозиторий.
2. Build-настройки Netlify подтянет из [`netlify.toml`](netlify.toml) — менять ничего не надо.
3. **Site settings → Environment variables** добавить (значения из своего Supabase-проекта):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. **Deploy site.**

Дальше каждый пуш в `main` = автодеплой. Пул-реквесты получают deploy preview. Отдельный
workflow для деплоя не нужен — Netlify делает это сам.

## Supabase: добавить домен

После первого деплоя в Supabase → **Authentication → URL Configuration**:
добавить netlify-домен (`https://<site>.netlify.app`) в **Site URL** и **Redirect URLs**,
иначе OAuth/confirm-редиректы (`app/auth/confirm`) сломаются.

## CI

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) гоняет `pnpm lint` + `pnpm build`
на пушах и PR. Для сборки нужны те же две переменные в **GitHub → Settings → Secrets and
variables → Actions**. Деплой сюда не входит — это забота Netlify.
