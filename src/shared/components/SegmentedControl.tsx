"use client";

import { cn } from "@/shared/utils";

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
 * белая приподнятая пилюля (rounded-9 внутри rounded-12)
 */
function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "m",
  className,
}: SegmentedControlProps<T>) {
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
              "flex items-center gap-1.5 rounded-[9px] font-medium transition-all cursor-pointer",
              size === "s" ? "px-2.5 h-7 text-xs" : "px-3.5 h-8 text-sm",
              isActive
                ? "bg-white text-black shadow-sm inset-ring inset-ring-gray-200"
                : "text-gray-600 hover:text-black"
            )}
          >
            {Icon && <Icon className={size === "s" ? "size-3.5" : "size-4"} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export { SegmentedControl };
