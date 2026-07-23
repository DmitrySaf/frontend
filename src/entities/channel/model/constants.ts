import { BookBold16, Document16, EyeSlashed16, GlobeBold16, Hashtag16, LockBold16 } from "@frosted-ui/icons";
import type { ChannelAccess, ChannelType } from "../api/types";

interface ChannelTypeMeta {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

// Иконки и подписи типов табов (по DS: hash / newspaper / book-open)
export const CHANNEL_TYPE_META: Record<ChannelType, ChannelTypeMeta> = {
  chat: { icon: Hashtag16, name: "Чат" },
  posts: { icon: Document16, name: "Посты" },
  course: { icon: BookBold16, name: "Курс" },
};

interface ChannelAccessMeta {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  description: string;
}

// Уровни доступа таба по спецификации приватности
export const CHANNEL_ACCESS_META: Record<ChannelAccess, ChannelAccessMeta> = {
  open: { icon: GlobeBold16, name: "Открытый", description: "Доступен всем участникам" },
  private: { icon: LockBold16, name: "Приватный", description: "Виден с замком, вход по приглашению" },
  secret: { icon: EyeSlashed16, name: "Секретный", description: "Не виден без приглашения" },
};
