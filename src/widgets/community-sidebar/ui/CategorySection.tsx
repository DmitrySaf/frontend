"use client";

import { cn } from "@/shared/utils";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";

interface CategorySectionProps {
  name: string;
  canAddChannel: boolean;
  onAddChannel: () => void;
  children: React.ReactNode;
}

export default function CategorySection({
  name,
  canAddChannel,
  onAddChannel,
  children,
}: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className="group flex items-center gap-1 pt-3 pb-1 px-1.5">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 flex-1 min-w-0 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-150"
        >
          <ChevronDown
            className={cn(
              "size-3 shrink-0 transition-transform duration-200 ease-out-quart",
              !isOpen && "-rotate-90"
            )}
          />
          <span className="flex-1 min-w-0 truncate text-left text-[11px] font-bold uppercase tracking-[.05em]">
            {name}
          </span>
        </button>
        {canAddChannel && (
          <button
            type="button"
            onClick={onAddChannel}
            aria-label="Новый таб"
            className="md:opacity-0 md:group-hover:opacity-100 cursor-pointer text-gray-500 hover:text-gray-800 active:scale-90 transition-[color,opacity,transform] duration-150 ease-out-quart"
          >
            <Plus className="size-3.5" />
          </button>
        )}
      </div>

      {/* Схлопывание через grid-rows: анимируемая высота без JS */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out-quart",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-0.5">{children}</div>
        </div>
      </div>
    </div>
  );
}
