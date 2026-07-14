"use client";

import { cn } from "@/shared/utils";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;

  // Styling
  size?: "s" | "m";
  className?: string;
}

/* Сегмент-контрол: утопленный трек, активный сегмент — светлая пилюля, скользящая
   между сегментами.

   Радиусы здесь НЕ выбираются, а выводятся: у вложенных скруглений внешний радиус
   обязан равняться внутреннему плюс отступ, иначе углы не концентричны и между
   пилюлей и треком видна щель переменной толщины. Раньше было p-3px + трек r16 при
   пилюле r10 — то есть 16 против положенных 13.

   При отступе 2px закон сходится со шкалой контролов, и все четыре числа оказываются
   «своими»:
     s: пилюля 28 r8  + 2×2 → трек 32, радиус 8+2  = 10
     m: пилюля 32 r10 + 2×2 → трек 36, радиус 10+2 = 12
   Высоты трека (32 и 36) попадают ровно в ступени s и m лестницы Button/Input. */
const TRACK = {
  s: "p-[2px] rounded-[10px]",
  m: "p-[2px] rounded-[12px]",
};

const SEGMENT = {
  s: "px-2.5 h-7 text-xs rounded-[8px]",
  m: "px-3.5 h-8 text-sm rounded-[10px]",
};

const PILL = {
  s: "rounded-[8px]",
  m: "rounded-[10px]",
};

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "m",
  className,
}: SegmentedControlProps<T>) {
  const id = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      role="tablist"
      className={cn("inline-flex items-center gap-0.5 bg-gray-100", TRACK[size], className)}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "relative flex items-center gap-1.5 font-medium transition-colors duration-150 cursor-pointer",
              SEGMENT[size],
              isActive ? "text-ink" : "text-gray-600 hover:text-ink"
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`${id}-pill`}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", bounce: 0.15, duration: 0.35 }
                }
                className={cn(
                  "absolute inset-0 bg-surface shadow-sm inset-ring inset-ring-gray-200",
                  PILL[size]
                )}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {Icon && <Icon className={size === "s" ? "size-3.5" : "size-4"} />}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export { SegmentedControl };
