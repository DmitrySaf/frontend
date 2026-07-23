"use client";

import { usePathname } from "next/navigation";
import type { ElementType } from "react";
import { Tab } from "./Tab";

export interface TabItem {
  id: string;
  name: string;
  href: string;
  icon?: ElementType;
}

export interface TabsProps {
  items: TabItem[];
  className?: string;
}

export function Tabs({ items, className }: TabsProps) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Tab
            key={item.id}
            text={item.name}
            href={item.href}
            isActive={pathname === item.href}
            Icon={Icon}
          />
        );
      })}
    </nav>
  );
}
