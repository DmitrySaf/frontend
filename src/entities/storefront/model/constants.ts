import { BookBold20, Document20, MessageBold20, PeopleBold20, Star20, VideoFilled20 } from "@frosted-ui/icons";

interface FeatureIconMeta {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

// Фиксированный набор иконок для пунктов «Что внутри»
export const STOREFRONT_FEATURE_ICONS: Record<string, FeatureIconMeta> = {
  "book-open": { icon: BookBold20, name: "Курсы" },
  newspaper: { icon: Document20, name: "Посты" },
  "message-circle": { icon: MessageBold20, name: "Чат" },
  users: { icon: PeopleBold20, name: "Комьюнити" },
  video: { icon: VideoFilled20, name: "Эфиры" },
  star: { icon: Star20, name: "Другое" },
};

export const DEFAULT_FEATURE_ICON = "star";
