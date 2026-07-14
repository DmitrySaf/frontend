"use client";

import { cn } from "@/shared/utils";
import { cva } from "class-variance-authority";
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
    },
    defaultVariants: {
      size: "l",
      hasError: false,
    },
  }
);

const Textarea = ({
  name,
  className,
  label,
  size,
  maxLength,
  showCounter,
  error,
  description,
  disabled,
  rows,
  placeholder,
}: TextareaProps) => {
  const { register, watch } = useFormContext();
  const currentValue = watch(name) || "";

  return (
    <div className="space-y-1">
      <label className="space-y-1 block">
        {label && <div className="text-sm font-medium">{label}</div>}
        <textarea
          {...register(name)}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          placeholder={placeholder}
          className={cn(textareaVariants({ size, hasError: !!error }), className)}
        />
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
