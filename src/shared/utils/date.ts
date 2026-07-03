/**
 * Время в формате «14:02»
 */
export function formatTimeShort(iso: string): string {
  return new Date(iso).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function startOfDay(date: Date): number {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy.getTime();
}

/**
 * Подпись дня для разделителей ленты: «сегодня», «вчера» или «28 мая»
 */
export function formatDayLabel(iso: string): string {
  const date = new Date(iso);
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const dayMs = 24 * 60 * 60 * 1000;

  if (target === today) return "сегодня";
  if (target === today - dayMs) return "вчера";

  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    ...(date.getFullYear() !== new Date().getFullYear() ? { year: "numeric" } : {}),
  });
}

/**
 * Ключ дня для группировки (локальная дата)
 */
export function dayKey(iso: string): string {
  const date = new Date(iso);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/**
 * Относительное время для карточек: «только что», «5 мин назад», «3 часа назад»,
 * «вчера, 18:40», далее — дата
 */
export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);

  if (minutes < 1) return "только что";
  if (minutes < 60) return `${minutes} мин назад`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24 && dayKey(iso) === dayKey(new Date().toISOString())) {
    const lastDigit = hours % 10;
    const word =
      hours % 100 >= 11 && hours % 100 <= 14
        ? "часов"
        : lastDigit === 1
          ? "час"
          : lastDigit >= 2 && lastDigit <= 4
            ? "часа"
            : "часов";
    return `${hours} ${word} назад`;
  }

  const label = formatDayLabel(iso);
  if (label === "вчера" || label === "сегодня") {
    return `${label}, ${formatTimeShort(iso)}`;
  }
  return label;
}
