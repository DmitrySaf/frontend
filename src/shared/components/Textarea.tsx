"use client";

import { cn } from "@/shared/utils";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

export interface TextareaProps {
  // Form integration
  name: string;

  // Custom Props
  size: "m" | "l" | "xl";
  label?: string;
  error?: string;
  description?: string;
  maxLength?: number;
  showCounter?: boolean;
  /** Крестик очистки при непустом значении — в правом верхнем углу поля */
  isClearable?: boolean;

  // Styling
  className?: string;

  // Standard HTML Textarea Props
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

const textareaVariants = cva(
  "w-full inset-ring inset-ring-gray-200 placeholder:text-gray-500 focus:outline-0 focus:inset-ring-2 focus:inset-ring-primary-500 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      // Ступени и радиусы — как у Input и Button. Кегль 16px на всех: ниже 16px
      // Safari на iOS зумит страницу при фокусе (см. комментарий в Input.tsx).
      // Прежняя ступень `s` удалена: она отличалась от `m` только паддингом
      // (py-1.5 против py-3) при одинаковом кегле — это не ступень.
      size: {
        m: "text-base py-2 px-3 rounded-[10px]",
        l: "text-base py-2.5 px-3.5 rounded-[12px]",
        xl: "text-base py-3 px-4 rounded-[14px]",
      },
      hasError: {
        true: "inset-ring-danger focus:inset-ring-danger",
        false: "",
      },
      // Место под крестик очистки, чтобы текст не заезжал под него
      hasClear: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { hasClear: true, size: "m", class: "pr-9" },
      { hasClear: true, size: "l", class: "pr-10" },
      { hasClear: true, size: "xl", class: "pr-10" },
    ],
    defaultVariants: {
      size: "l",
      hasError: false,
    },
  }
);

// Позиция крестика повторяет внутренний паддинг ступени
const CLEAR_POS = {
  m: "top-2 right-2",
  l: "top-2.5 right-2.5",
  xl: "top-3 right-3",
};

const CLEAR_SIZE = {
  m: "size-[18px] [&_svg]:size-2.5",
  l: "size-5 [&_svg]:size-3",
  xl: "size-[22px] [&_svg]:size-3",
};

const Textarea = ({
  name,
  className,
  label,
  size,
  maxLength,
  showCounter,
  isClearable,
  error,
  description,
  disabled,
  rows,
  placeholder,
}: TextareaProps) => {
  const { register, setValue, watch } = useFormContext();
  const currentValue = watch(name) || "";

  const showClear = !!isClearable && !!currentValue && !disabled;

  return (
    <div className="space-y-1">
      <label className="space-y-1 block">
        {label && <div className="text-sm font-medium">{label}</div>}
        <div className="relative">
          <textarea
            {...register(name)}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            placeholder={placeholder}
            className={cn(
              textareaVariants({ size, hasError: !!error, hasClear: showClear }),
              className
            )}
          />
          {/* mousedown гасится, чтобы клик по крестику не уводил фокус из поля */}
          {showClear && (
            <button
              type="button"
              aria-label="Очистить"
              className={cn(
                "absolute flex items-center justify-center rounded-full bg-fill text-gray-500 cursor-pointer transition-[background-color,color] duration-150 hover:bg-fill-hover hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45",
                CLEAR_POS[size],
                CLEAR_SIZE[size]
              )}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setValue(name, "", { shouldDirty: true, shouldValidate: true })}
            >
              <X />
            </button>
          )}
        </div>
      </label>

      <div className="flex justify-between items-center">
        <div className="space-y-1">
          {description && <p className="text-sm text-gray-500">{description}</p>}
          {error && <p className="text-sm text-danger">{error}</p>}
        </div>

        {showCounter && maxLength && (
          <div className="text-sm text-gray-500">
            {String(currentValue).length} / {maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
