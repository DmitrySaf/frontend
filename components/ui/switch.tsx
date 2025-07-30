import * as React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
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
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "disabled:cursor-not-allowed",
          checked ? "bg-blue-600" : "bg-gray-200",
          className
        )}
        ref={ref}
        id={id}
        {...props}
      >
        <span
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center transform rounded-full bg-white transition-transform",
            checked && !disabled ? "translate-x-6" : "translate-x-1"
          )}
        >
          {disabled && (
            <Lock className="h-2 w-2 text-gray-400" />
          )}
        </span>
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch }; 