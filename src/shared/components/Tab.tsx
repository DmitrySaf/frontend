import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/utils";

const tabVariants = cva(
  "w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-colors font-medium cursor-pointer",
  {
    variants: {
      isActive: {
        true: "bg-blue-50 text-blue-600",
        false: "text-gray-700 hover:bg-gray-50",
      },
      isNegative: {
        true: "text-red-600 hover:bg-red-50",
        false: "",
      },
    },
    compoundVariants: [
      {
        isActive: true,
        isNegative: true,
        class: "bg-red-50 text-red-600",
      },
    ],
    defaultVariants: {
      isActive: false,
      isNegative: false,
    },
  }
);

export interface TabProps {
  text: string;
  Icon?: any;
  className?: string;
  isActive?: boolean;
  isNegative?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, isActive, isNegative, Icon, text, ...props }, ref) => {
    return (
      <button 
        className={cn(tabVariants({ isActive, isNegative, className }))} 
        ref={ref}
        {...props}
      >
        {Icon && <Icon className="size-4 flex-shrink-0" />}
        <span>{text}</span>
      </button>
    );
  }
);
Tab.displayName = "Tab";

export { Tab, tabVariants };
