import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/utils";

const tabVariants = cva(
  "w-full flex items-center space-x-2.5 pl-3 pr-4 py-2.5 rounded-lg text-left transition-colors font-medium cursor-pointer font-semibold",
  {
    variants: {
      isActive: {
        true: "bg-[#D3D3D340] text-black ring-1 ring-[#D3D3D3]",
        false: "text-[#404040] hover:bg-[#D3D3D325] hover:text-black",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface TabProps {
  text: string;
  Icon?: any;
  className?: string;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ className, isActive, Icon, text, ...props }, ref) => {
    return (
      <button className={cn(tabVariants({ isActive, className }))} ref={ref} {...props}>
        {Icon && <Icon className="size-5 flex-shrink-0" />}
        <span>{text}</span>
      </button>
    );
  }
);
Tab.displayName = "Tab";

export { Tab, tabVariants };
