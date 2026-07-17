import Cookies from "js-cookie";

const LAST_VISITED_COMMUNITY_KEY = "bean:last-community";

/**
 * Имя cookie последнего сообщества. Не «bean:last-community» — двоеточие невалидно
 * в cookie-токене (RFC 6265). Читается серверными страницами резолва входа через
 * next/headers, пишется клиентом (js-cookie) параллельно с localStorage.
 */
export const LAST_VISITED_COMMUNITY_COOKIE = "bean_last_community";

/**
 * Слаг последнего посещённого сообщества (для редиректа после входа, как в Discord)
 */
export function getLastVisitedCommunity(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(LAST_VISITED_COMMUNITY_KEY);
}

export function setLastVisitedCommunity(slug: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LAST_VISITED_COMMUNITY_KEY, slug);
  // Cookie — чтобы серверный резолв входа знал последнее сообщество без клиентского хопа
  Cookies.set(LAST_VISITED_COMMUNITY_COOKIE, slug, {
    expires: 365,
    sameSite: "lax",
    path: "/",
  });
}

export function clearLastVisitedCommunity(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LAST_VISITED_COMMUNITY_KEY);
  Cookies.remove(LAST_VISITED_COMMUNITY_COOKIE, { path: "/" });
}
