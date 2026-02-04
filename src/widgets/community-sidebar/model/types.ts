export type NavigationItemId =
  | "home"
  | "posts"
  | "courses"
  | "articles"
  | "chat"
  | "members"
  | "settings";

export interface NavigationItem {
  id: NavigationItemId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number;
}

export interface SidebarTab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

export interface SidebarSection {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  tabs: SidebarTab[];
}
