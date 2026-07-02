const LAST_VISITED_COMMUNITY_KEY = "bean:last-community";

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
}

export function clearLastVisitedCommunity(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(LAST_VISITED_COMMUNITY_KEY);
}
