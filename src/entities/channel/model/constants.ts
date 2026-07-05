import { BookOpen, EyeOff, Globe, Hash, Lock, Newspaper } from "lucide-react";
import type { ChannelAccess, ChannelType } from "../api/types";

interface ChannelTypeMeta {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

// Иконки и подписи типов табов (по DS: hash / newspaper / book-open)
export const CHANNEL_TYPE_META: Record<ChannelType, ChannelTypeMeta> = {
  chat: { icon: Hash, name: "Чат" },
  posts: { icon: Newspaper, name: "Посты" },
  course: { icon: BookOpen, name: "Курс" },
};

interface ChannelAccessMeta {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
}

// Уровни доступа таба по спецификации приватности
export const CHANNEL_ACCESS_META: Record<ChannelAccess, ChannelAccessMeta> = {
  open: { icon: Globe, name: "Открытый", description: "Доступен всем участникам" },
  private: { icon: Lock, name: "Приватный", description: "Виден с замком, вход по приглашению" },
  secret: { icon: EyeOff, name: "Секретный", description: "Не виден без приглашения" },
};
