"use client";

import { Toast as HeroToast, toast as heroToast } from "@heroui/react";

/* HeroUI Toast вместо sonner. Один провайдер в layout, глобальный `toast` пишет в дефолтную
   очередь HeroUI — они связаны без явной queue. `toast`-shim добавляет алиас .error → .danger
   (у HeroUI ошибка называется `danger`), чтобы не трогать ~18 call-sites. Паттерн Bean
   сохраняется: success без description, error с description. */

// bottom по центру — как дефолт sonner в Bean; z тосты держат сами (см. globals.css §z-шкала).
function Toaster() {
  return <HeroToast.Provider placement="bottom" className="z-[var(--z-toast)]" />;
}

// Алиас .error → .danger. Мутируем singleton — безвредно (лишь добавляет метод-алиас),
// зато call-sites `toast.error(msg, { description })` работают без правок.
const toast = Object.assign(heroToast, { error: heroToast.danger });

export { Toaster, toast };
