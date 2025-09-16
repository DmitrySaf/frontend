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
