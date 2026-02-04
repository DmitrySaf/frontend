"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils";

interface CollapsibleSectionProps {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-left transition-colors hover:bg-[#D3D3D325] group"
      >
        {isOpen ? (
          <ChevronDown className="size-4 flex-shrink-0 text-gray-600" />
        ) : (
          <ChevronRight className="size-4 flex-shrink-0 text-gray-600" />
        )}
        {Icon && <Icon className="size-4 flex-shrink-0 text-gray-600" />}
        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </span>
      </button>

      {isOpen && <div className="space-y-1 pl-2">{children}</div>}
    </div>
  );
}
