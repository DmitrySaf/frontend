import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/shared/utils";

const tabVariants = cva(
  "w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-colors font-medium cursor-pointer",
  {
    variants: {
      theme: {
        primary: "bg-blue-50 text-blue-600",
        secondary: "bg-orange-50 text-orange-600", 
        default: "text-gray-700 hover:bg-gray-50",
        danger: "text-red-600 hover:bg-red-50",
      },
      active: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        active: true,
        theme: "primary",
        class: "bg-blue-50 text-blue-600",
      },
      {
        active: true,
        theme: "secondary", 
        class: "bg-orange-50 text-orange-600",
      },
      {
        active: false,
        theme: ["primary", "secondary"],
        class: "text-gray-700 hover:bg-gray-50",
      },
    ],
    defaultVariants: {
      theme: "primary",
      active: false,
    },
  }
);

export interface TabProps {
  // Content
  children?: React.ReactNode;
  // TODO: пофиксить
  icon?: any;
  badge?: number | string;
  
  // Styling & Variants  
  className?: string;
  theme?: "primary" | "secondary" | "default" | "danger";
  active?: boolean;
  
  // Behavior
  asChild?: boolean;
  
  // Standard HTML Button Props
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, theme, active, icon, badge, asChild = false, children, disabled, ...props }, ref) => {
    return (
      <button 
        className={cn(tabVariants({ theme, active, className }))} 
        ref={ref} 
        disabled={disabled}
        {...props}
      >
        {icon && <span className="w-5 h-5 flex-shrink-0 [&>svg]:w-5 [&>svg]:h-5">{icon}</span>}
        <span>{children}</span>
        {badge && (
          <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge}
          </span>
        )}
      </button>
    );
  }
);
Tab.displayName = "Tab";

export { Tab, tabVariants };
