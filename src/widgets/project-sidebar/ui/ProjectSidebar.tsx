"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Tab } from "@/shared/components";
import { SIDEBAR_ITEMS, BOTTOM_ITEMS } from "../model";

interface ProjectSidebarProps {
  slug: string;
}

export default function ProjectSidebar({ slug }: ProjectSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center">
            <Image src="/lightbulb.svg" alt="ProFound" width={20} height={20} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">ProFound University</h2>
            <p className="text-xs text-gray-500">32 участника</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const href = `/projects/${slug}${item.path}`;
            const isActive = pathname === href;
            
            return (
              <Tab
                key={item.id}
                text={item.name}
                isActive={isActive}
                onClick={() => router.push(href)}
                Icon={Icon}
              />
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200">
        <nav className="space-y-2">
          {BOTTOM_ITEMS.map((item) => {
            const Icon = item.icon;
            const href = `/projects/${slug}${item.path}`;
            const isActive = pathname === href;
            
            return (
              <Tab
                key={item.id}
                text={item.name}
                isActive={isActive}
                onClick={() => router.push(href)}
                Icon={Icon}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}

