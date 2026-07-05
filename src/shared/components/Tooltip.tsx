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
              "z-50 max-w-[220px] rounded-xl bg-black px-3 py-2",
              "text-[12.5px] font-medium leading-[1.45] text-white shadow-lg",
              "animate-in fade-in-0 zoom-in-95",
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
