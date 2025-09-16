import {
  BookOpen,
  FileText,
  Home,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  { id: "home", name: "Главная", icon: Home, path: "" },
  { id: "posts", name: "Посты", icon: FileText, path: "/posts" },
  { id: "courses", name: "Курсы", icon: BookOpen, path: "/courses" },
  { id: "articles", name: "Статьи", icon: FileText, path: "/articles" },
  { id: "chat", name: "Чат", icon: MessageCircle, badge: 3, path: "/chat" },
];

export const BOTTOM_ITEMS = [
  { id: "members", name: "Участники", icon: Users, path: "/members" },
  { id: "settings", name: "Настройки", icon: Settings, path: "/settings" },
];
