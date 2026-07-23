"use client";

import { useState } from "react";

import { cn } from "@/shared/utils";

// Детерминированная пастельная палитра для фолбэка с инициалами (Discord-style).
// TODO(ds, Этап B): увести хексы в токен-фолбэк при токен-аудите.
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

/* Контентная шкала 32/40/48 (size-8/10/12) — ровно то, что давал HeroUI Avatar sm/md/lg. */
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

/* Движок не нужен — это <img> поверх слоя-фолбэка. Инициал на пастельном фоне лежит базой
   и проступает, пока картинка грузится или если не загрузилась (onError снимает <img>). */
function Avatar({ name, src, size = "m", shape = "circle", className }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = Boolean(src) && !imgFailed;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden",
        sizeClasses[size],
        shape === "circle" ? "rounded-full" : squareRadius[size],
        colorFromName(name),
        className
      )}
    >
      <span className={cn("font-semibold text-ink", textSizeClasses[size])} aria-hidden={showImage}>
        {initial}
      </span>
      {showImage && (
        <img
          src={src ?? undefined}
          alt={name}
          className="absolute inset-0 size-full object-cover"
          onError={() => setImgFailed(true)}
        />
      )}
    </span>
  );
}

export { Avatar };
