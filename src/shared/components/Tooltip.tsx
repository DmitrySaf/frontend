"use client";

import type * as React from "react";
import {
  Focusable,
  OverlayArrow,
  Tooltip as AriaTooltip,
  TooltipTrigger,
} from "react-aria-components";

import { cn } from "@/shared/utils";

interface TooltipProps {
  // Custom Props
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  /** Единственный уже-фокусируемый элемент (Button/ссылка/native button), форвардящий ref */
  children: React.ReactElement;

  // Styling
  className?: string;
}

/**
 * Тултип по DS: тёмная плашка #000, белый текст 12.5px, r12, стрелка. Точная ретема под
 * токены — Phase 3; здесь сохраняем прежний вид литералами.
 *
 * Триггер — <Focusable>, а НЕ собственный триггер TooltipTrigger: последний обернул бы
 * ребёнка в свою кнопку и на уже-интерактивном ребёнке дал бы «кнопку в кнопке» (дубль
 * accessible-name, невалидная вложенность). Focusable через cloneElement вешает focus/hover-
 * пропы прямо на ребёнка — без лишнего DOM (ребёнок обязан форвардить ref).
 */
function Tooltip({ content, side = "top", children, className }: TooltipProps) {
  return (
    <TooltipTrigger delay={300}>
      <Focusable>{children as React.ReactElement<React.HTMLAttributes<Element>, string>}</Focusable>
      <AriaTooltip
        placement={side}
        offset={8}
        className={cn(
          "max-w-[220px] rounded-[12px] bg-black px-3 py-2",
          "text-[12.5px] font-medium leading-[1.45] text-white shadow-lg",
          className
        )}
      >
        {/* RAC сам позиционирует стрелку у нужной кромки; нам остаётся повернуть SVG-остриё
            к триггеру по data-placement (group на OverlayArrow → вариант на дочернем svg). */}
        <OverlayArrow className="group">
          <svg
            aria-hidden="true"
            role="presentation"
            width={12}
            height={6}
            viewBox="0 0 12 6"
            className="block fill-black group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90"
          >
            <path d="M0 0 L6 6 L12 0 Z" />
          </svg>
        </OverlayArrow>
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}

export { Tooltip };
