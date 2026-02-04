import { BookOpen, Home, Folder } from "lucide-react";
import type { SidebarTab, SidebarSection } from "./types";

// Main tabs (not in any group)
export const MAIN_TABS: SidebarTab[] = [
  { id: "home", name: "Главная", icon: Home, path: "" },
];

// Collapsible sections with nested tabs
export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    id: "test-section",
    title: "Тест",
    icon: Folder,
    tabs: [
      { id: "course", name: "Курс", icon: BookOpen, path: "/test-course-slug-123" },
    ],
  },
];
