import { BookOpen, MessageCircle, Newspaper, Star, Users, Video } from "lucide-react";

interface FeatureIconMeta {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

// Фиксированный набор иконок для пунктов «Что внутри»
export const STOREFRONT_FEATURE_ICONS: Record<string, FeatureIconMeta> = {
  "book-open": { icon: BookOpen, name: "Курсы" },
  newspaper: { icon: Newspaper, name: "Посты" },
  "message-circle": { icon: MessageCircle, name: "Чат" },
  users: { icon: Users, name: "Комьюнити" },
  video: { icon: Video, name: "Эфиры" },
  star: { icon: Star, name: "Другое" },
};

export const DEFAULT_FEATURE_ICON = "star";
