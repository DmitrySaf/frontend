import { cva } from "class-variance-authority";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/shared/utils";

const tabVariants = cva(
  "w-full flex items-center space-x-2.5 pl-3 pr-4 py-2.5 rounded-[10px] text-left transition-colors duration-150 ease-out-quart font-semibold cursor-pointer",
  {
    variants: {
      isActive: {
        true: "bg-gray-200/70 text-ink ring-1 ring-gray-300/70",
        false: "text-gray-800 hover:bg-gray-200/45 hover:text-ink active:bg-gray-200/70",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface TabProps {
  text: string;
  href: string;
  Icon?: React.ElementType;
  className?: string;
  isActive?: boolean;
}

const Tab = React.forwardRef<HTMLAnchorElement, TabProps>(
  ({ className, isActive, Icon, text, href, ...props }, ref) => {
    return (
      <Link href={href} className={cn(tabVariants({ isActive, className }))} ref={ref} {...props}>
        {Icon && <Icon className="size-5 flex-shrink-0" />}
        <span>{text}</span>
      </Link>
    );
  }
);
Tab.displayName = "Tab";

export { Tab, tabVariants };
