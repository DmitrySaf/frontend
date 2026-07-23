"use client";

import { XMarkBold12 } from "@frosted-ui/icons";
import { cva } from "class-variance-authority";
import { useId } from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/shared/utils";

export interface TextareaProps {
  // Form integration
  name: string;

  // Custom Props
  size: "md" | "lg" | "xl";
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

/* Движок не нужен: RHF register + нативный <textarea>. Хром — на самом поле (inset-ring как
   единственная рамка, радиус/паддинг по шкале контролов). border-0/shadow-none/focus:ring-0
   держат поле чистым от UA-стилей. Кегль 16px на всех ступенях (ниже Safari на iOS зумит). */
const textareaVariants = cva(
  "w-full inset-ring inset-ring-gray-200 border-0 bg-transparent shadow-none placeholder:text-gray-500 focus:outline-0 focus:ring-0 focus:inset-ring-2 focus:inset-ring-primary-500 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      // Ступени и радиусы — как у Input и Button (--radius-control-*). Кегль 16px везде.
      size: {
        md: "text-base py-2 px-3 rounded-(--radius-control-md)",
        lg: "text-base py-2.5 px-3.5 rounded-(--radius-control-lg)",
        xl: "text-base py-3 px-4 rounded-(--radius-control-xl)",
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
      { hasClear: true, size: "md", class: "pr-9" },
      { hasClear: true, size: "lg", class: "pr-10" },
      { hasClear: true, size: "xl", class: "pr-10" },
    ],
    defaultVariants: {
      size: "lg",
      hasError: false,
    },
  }
);

// Позиция крестика повторяет внутренний паддинг ступени
const CLEAR_POS = {
  md: "top-2 right-2",
  lg: "top-2.5 right-2.5",
  xl: "top-3 right-3",
};

// Ghost-прямоугольник, радиус по закону концентричности — как у крестика в Input
const CLEAR_SIZE = {
  md: "size-[18px] rounded-[6px] [&_svg]:size-2.5",
  lg: "size-5 rounded-[6px] [&_svg]:size-3",
  xl: "size-[22px] rounded-[8px] [&_svg]:size-3",
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
  const textareaId = useId();

  const showClear = !!isClearable && !!currentValue && !disabled;

  return (
    <div className="space-y-1">
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "block text-sm font-medium text-ink",
              disabled && "opacity-50",
              error && "text-danger"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            {...register(name)}
            id={textareaId}
            disabled={disabled}
            maxLength={maxLength}
            rows={rows}
            placeholder={placeholder}
            aria-invalid={!!error || undefined}
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
                "absolute flex items-center justify-center text-gray-500 cursor-pointer transition-[background-color,color] duration-150 hover:bg-fill hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45",
                CLEAR_POS[size],
                CLEAR_SIZE[size]
              )}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setValue(name, "", { shouldDirty: true, shouldValidate: true })}
            >
              <XMarkBold12 />
            </button>
          )}
        </div>
      </div>

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
