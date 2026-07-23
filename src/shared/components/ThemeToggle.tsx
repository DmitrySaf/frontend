"use client";

import { cn } from "@/shared/utils";
import { MoonBold20, Sun20 } from "@frosted-ui/icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tooltip } from "./Tooltip";

/**
 * Тумблер светлой/тёмной темы. mounted-гейт: до гидратации resolvedTheme
 * неизвестен, поэтому иконка фиксируется (Moon) — без hydration-mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Tooltip content={isDark ? "Светлая тема" : "Тёмная тема"} side="right">
      <button
        type="button"
        aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "size-10 flex items-center justify-center rounded-(--radius-control-lg) text-gray-600 hover:text-ink hover:bg-gray-100 active:scale-90 transition-[background-color,color,transform] duration-150 ease-out-quart cursor-pointer",
          className
        )}
      >
        {isDark ? <Sun20 className="size-5" /> : <MoonBold20 className="size-5" />}
      </button>
    </Tooltip>
  );
}
