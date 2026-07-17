/**
 * Транзиентная ли ошибка — сетевой сбой или таймаут, которые стоит повторить.
 * Такие ошибки приходят «сырыми» (TypeError «Failed to fetch», DOMException
 * TimeoutError/AbortError от AbortSignal.timeout). Бизнес-ошибки PostgREST (RLS,
 * валидация) наш api-слой заворачивает в обычный Error с текстом — их не ретраим.
 */
export function isTransientError(error: unknown): boolean {
  if (error instanceof TypeError) return true; // fetch failed (сеть недоступна)
  if (error instanceof DOMException) {
    return error.name === "TimeoutError" || error.name === "AbortError";
  }
  if (error && typeof error === "object" && "name" in error) {
    const name = (error as { name?: unknown }).name;
    return name === "TimeoutError" || name === "AbortError";
  }
  return false;
}
