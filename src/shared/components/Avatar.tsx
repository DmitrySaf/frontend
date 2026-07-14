"use client";

import { cn } from "@/shared/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

// Детерминированная пастельная палитра для фолбэка с инициалами (Discord-style)
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

const sizeClasses = {
  s: "size-8 text-sm",
  m: "size-10 text-base",
  l: "size-12 text-lg",
};

/* Радиус square растёт вместе с размером, а не стоит константой. Раньше на всех трёх
   размерах висел один `rounded-xl` (16px) — отношение радиуса к стороне выходило
   0.50 / 0.40 / 0.33, и аватарка 32px превращалась почти в круг, хотя `square`
   существует ровно затем, чтобы отличаться от `circle`. Отношение ≈0.28–0.31 — то же,
   что у кнопок и полей. Плитка логотипа в рейле стоит вплотную к аватаркам 48px,
   поэтому её радиус (Logo.tsx) обязан совпадать с `l`. */
const squareRadius = {
  s: "rounded-[10px]",
  m: "rounded-[12px]",
  l: "rounded-[14px]",
};

const Avatar = React.forwardRef<React.ComponentRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ name, src, size = "m", shape = "circle", className }, ref) => {
    const initial = name.trim().charAt(0).toUpperCase() || "?";

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden select-none",
          sizeClasses[size],
          shape === "square" ? squareRadius[size] : "rounded-full",
          className
        )}
      >
        {src && (
          <AvatarPrimitive.Image
            src={src}
            alt={name}
            className="aspect-square size-full object-cover"
          />
        )}
        <AvatarPrimitive.Fallback
          className={cn(
            "flex size-full items-center justify-center font-semibold text-ink",
            colorFromName(name)
          )}
        >
          {initial}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
