"use client";

import { Avatar as HeroAvatar } from "@heroui/react";

import { cn } from "@/shared/utils";

// Детерминированная пастельная палитра для фолбэка с инициалами (Discord-style).
// off-scale: декоративный identity-цвет по хешу имени (как identicon) — палитра тут
// уместнее одиночного токена; красит ТОЛЬКО фолбэк, под собственным фото её не видно.
const FALLBACK_COLORS = [
  "bg-[#FBE4E4]",
  "bg-[#F9EED8]",
  "bg-[#ECF6D9]",
  "bg-[#E1F2E5]",
  "bg-[#DFEEF7]",
  "bg-[#E9E6F7]",
  "bg-[#FAE9DE]",
  "bg-[#F0F0F0]",
] as const;

function colorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
}

interface AvatarProps {
  // Custom Props
  name: string;
  src?: string | null;
  /** Контентная шкала (32/40/48), НЕ лестница контролов Button/Input — аватарка не
      выстраивается с кнопкой кромка в кромку, ей незачем совпадать с её высотами. */
  size?: "s" | "m" | "l";
  /** square — сообщества, circle — люди */
  shape?: "square" | "circle";

  // Styling
  className?: string;
}

/* Контентная шкала 32/40/48 (size-8/10/12), кегль инициала идёт с ней в ногу. */
const sizeClasses = { s: "size-8", m: "size-10", l: "size-12" } as const;
const textSizeClasses = { s: "text-sm", m: "text-base", l: "text-lg" } as const;

/* Радиус square растёт вместе с размером, а не стоит константой: отношение ≈0.28–0.31,
   то же, что у кнопок и полей — поэтому берём ту же лестницу --radius-control-* (10/12/14),
   а не отдельные литералы. Плитка логотипа в рейле (Logo.tsx) обязана совпадать с `l` (14). */
const squareRadius = {
  s: "rounded-(--radius-control-sm)",
  m: "rounded-(--radius-control-lg)",
  l: "rounded-(--radius-control-xl)",
} as const;

/* Bucket B — на HeroUI Avatar (compound Image/Fallback): движок сам держит загрузку фото
   и переключение на фолбэк (onError/задержка), поэтому ручной useState/onError не нужен.
   Вид — НАШ: размер и радиус кладём на корень (его overflow-hidden клипует и фото, и
   фолбэк), палитру+кегль — на фолбэк. Родные size/radius HeroUI (size-10 / rounded-3xl)
   НЕ используем — перекрываем утилитами (слой utilities бьёт слой components HeroUI). */
function Avatar({ name, src, size = "m", shape = "circle", className }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const radius = shape === "circle" ? "rounded-full" : squareRadius[size];

  return (
    <HeroAvatar className={cn("shrink-0", sizeClasses[size], radius, className)}>
      {src ? <HeroAvatar.Image alt={name} src={src} /> : null}
      <HeroAvatar.Fallback
        className={cn("font-semibold text-ink", colorFromName(name), textSizeClasses[size])}
      >
        {initial}
      </HeroAvatar.Fallback>
    </HeroAvatar>
  );
}

export { Avatar };
