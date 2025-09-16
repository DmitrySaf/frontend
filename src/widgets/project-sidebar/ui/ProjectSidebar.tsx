"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS, BOTTOM_ITEMS } from "../model";

interface ProjectSidebarProps {
  slug: string;
}

export default function ProjectSidebar({ slug }: ProjectSidebarProps) {
  const pathname = usePathname();
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
              <Link
                key={item.id}
                href={href}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
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
              <Link
                key={item.id}
                href={href}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-left transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

