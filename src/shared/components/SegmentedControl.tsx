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

/**
 * Сегмент-контрол по DS: утопленный трек #F5F5F5, активный сегмент —
 * белая пилюля (rounded-9 внутри rounded-12), скользящая между сегментами
 */
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
      className={cn("inline-flex items-center gap-0.5 p-[3px] rounded-xl bg-gray-100", className)}
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
              "relative flex items-center gap-1.5 rounded-[9px] font-medium transition-colors duration-150 cursor-pointer",
              size === "s" ? "px-2.5 h-7 text-xs" : "px-3.5 h-8 text-sm",
              isActive ? "text-black" : "text-gray-600 hover:text-black"
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
                className="absolute inset-0 rounded-[9px] bg-white shadow-sm inset-ring inset-ring-gray-200"
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
