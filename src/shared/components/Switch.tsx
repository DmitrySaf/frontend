import { cn } from "@/shared/utils";
import { Lock } from "lucide-react";
import * as React from "react";

export interface SwitchProps {
  // State
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;

  // Styling
  className?: string;

  // Behavior
  disabled?: boolean;

  // Accessibility
  id?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, className, id, ...props }, ref) => {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-out-quart cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed",
          checked ? "bg-primary-500" : "bg-gray-200",
          className
        )}
        ref={ref}
        id={id}
        {...props}
      >
        <span
          className={cn(
            "inline-flex size-5 items-center justify-center transform rounded-full bg-surface shadow-sm transition-transform duration-200 ease-out-quart",
            checked && !disabled ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        >
          {disabled && <Lock className="h-2 w-2 text-gray-400" />}
        </span>
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
