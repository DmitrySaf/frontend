"use client";

import { onlineManager } from "@tanstack/react-query";
import { WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Тихий баннер потери соединения. TanStack onlineManager паузит запросы офлайн
 * (скелетон не «врёт»), а при возврате сети refetchOnReconnect сам догоняет данные —
 * баннер лишь сообщает состояние, без красной паники (DESIGN.md).
 */
export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!onlineManager.isOnline());
    return onlineManager.subscribe((online) => setIsOffline(!online));
  }, []);

  if (!isOffline) return null;

  return (
    // role="status" — live-region: скринридер объявит потерю связи (семантического
    // элемента под баннер соединения нет)
    // biome-ignore lint/a11y/useSemanticElements: status live-region, не <output>
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[var(--z-toast)] flex items-center justify-center gap-2 h-8 bg-gray-800 text-white text-[13px] font-medium animate-in fade-in slide-in-from-top-2 duration-200 ease-out-quart"
    >
      <WifiOff className="size-3.5" />
      Нет соединения — ждём сеть…
    </div>
  );
}
