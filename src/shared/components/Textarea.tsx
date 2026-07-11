"use client";

import { cn } from "@/shared/utils";
import { cva } from "class-variance-authority";
import { useFormContext } from "react-hook-form";

export interface TextareaProps {
  // Form integration
  name: string;

  // Custom Props
  size: "l" | "m" | "s";
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
  "w-full text-base border focus:outline-none focus:border-black transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        l: "py-3.5 px-4 rounded-xl",
        m: "py-3 px-3 rounded-xl",
        s: "py-1.5 px-3 rounded-xl",
      },
      hasError: {
        true: "border-red-300 focus:ring-red-500",
        false: "border-gray-300 focus:ring-blue-500",
      },
    },
    defaultVariants: {
      size: "m",
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
      {label && <label className="block font-medium text-gray-700">{label}</label>}
      <textarea
        {...register(name)}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        placeholder={placeholder}
        className={cn(textareaVariants({ size, hasError: !!error }), className)}
      />

      <div className="flex justify-between items-center">
        <div className="space-y-1">
          {description && <p className="text-sm text-gray-600">{description}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
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
