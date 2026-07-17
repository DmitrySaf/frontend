"use client";

import { useCallback, useEffect, useRef } from "react";

const HOVER_INTENT_MS = 150;

/**
 * Обработчики «намерения» для префетча по наведению. Мышь/фокус — с задержкой
 * ~150мс (провод курсором по списку не выстреливает N запросов, срабатывает только
 * задержавшийся элемент); тач — сразу (тап уже намерение). Возвращает готовый набор
 * DOM-обработчиков для навешивания на ссылку/плитку.
 */
export function useHoverIntent(onIntent: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const arm = useCallback(() => {
    clear();
    timerRef.current = setTimeout(onIntent, HOVER_INTENT_MS);
  }, [clear, onIntent]);

  // Снять висящий таймер при размонтировании
  useEffect(() => clear, [clear]);

  return {
    onMouseEnter: arm,
    onMouseLeave: clear,
    onFocus: arm,
    onTouchStart: onIntent,
  };
}
