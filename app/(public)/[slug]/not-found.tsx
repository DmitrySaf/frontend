import { StorefrontNotFound } from "@/pages/community-preview";

/**
 * Сегментный 404 витрины (рендерится при notFound() в page.tsx с корректным HTTP 404).
 * Единый экран для hidden и несуществующих сообществ. Без сетевых вызовов — 404
 * должен рендериться надёжно даже при недоступной БД; шапка показывает «Войти»
 * (авторизованный редко попадает на 404 витрины).
 */
export default function StorefrontNotFoundPage() {
  return <StorefrontNotFound isAuthed={false} />;
}
