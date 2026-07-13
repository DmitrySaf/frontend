"use client";

import { cn } from "@/shared/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";

interface TooltipProps {
  // Custom Props
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;

  // Styling
  className?: string;
}

/**
 * Тултип по DS: тёмная плашка #1C1C1C, белый текст 12.5px, rounded-xl, стрелка
 */
function Tooltip({ content, side = "top", children, className }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={300}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={6}
            className={cn(
              "z-[var(--z-tooltip)] max-w-[220px] rounded-xl bg-black px-3 py-2",
              "text-[12.5px] font-medium leading-[1.45] text-white shadow-lg",
              "origin-[var(--radix-tooltip-content-transform-origin)] duration-150 ease-out-quart",
              "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-100",
              "fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "data-[state=instant-open]:animate-none",
              className
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-black" width={10} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

export { Tooltip };
