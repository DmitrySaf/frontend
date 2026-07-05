/**
 * Генерирует прямую URL для получения favicon через Google Favicons API
 * Используется для статических/проверенных доменов (соцсети)
 * @param domain - доменное имя (например, "telegram.org")
 * @param size - размер иконки в пикселях (по умолчанию 64)
 * @returns Прямая URL на Google Favicons API
 */
export const getDirectFaviconUrl = (domain: string, size = 64): string => {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`;
};

/**
 * Генерирует URL для получения favicon через наш API route (с проверкой)
 * API route проксирует запрос к Google Favicons API с проверкой доступности
 * Используется для пользовательских ссылок с неизвестными доменами
 * @param domain - доменное имя (например, "example.com")
 * @param size - размер иконки в пикселях (по умолчанию 64)
 * @returns URL для загрузки favicon через прокси
 */
export const getFaviconUrl = (domain: string, size = 64): string => {
  return `/api/favicon?domain=${encodeURIComponent(domain)}&size=${size}`;
};

/**
 * Извлекает доменное имя из URL
 * @param url - полный URL или доменное имя
 * @returns доменное имя без www. префикса или пустая строка при ошибке
 */
export const extractDomain = (url: string): string => {
  try {
    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
    return urlObj.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};
