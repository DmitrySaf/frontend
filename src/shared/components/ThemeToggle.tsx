"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/shared/utils";
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
          "size-10 flex items-center justify-center rounded-[12px] text-gray-600 hover:text-ink hover:bg-gray-100 active:scale-90 transition-[background-color,color,transform] duration-150 ease-out-quart cursor-pointer",
          className
        )}
      >
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </button>
    </Tooltip>
  );
}
