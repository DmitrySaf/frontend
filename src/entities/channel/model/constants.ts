import { Hash, Newspaper, BookOpen } from "lucide-react";
import type { ChannelType } from "../api/types";

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
