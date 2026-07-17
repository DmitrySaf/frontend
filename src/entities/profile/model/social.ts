import type { SocialPlatform } from "@/api/profiles";
import type { SocialLink } from "../api/types";

interface SocialPlatformMeta {
  label: string;
  /** Домен-префикс платформы; в БД `link` хранится «хвостом» без него (формат формы настроек) */
  prefix: string | null;
  /** Путь к svg в public; null — платформа без фирменного знака (глобус на стороне UI) */
  icon: string | null;
}

/* Префиксы обязаны совпадать с SOCIAL_NETWORKS формы настроек
   (widgets/settings-profile-form/model/constants.ts) — иначе собранный URL
   разойдётся с тем, что пользователь видел при вводе. */
export const SOCIAL_PLATFORM_META: Record<SocialPlatform, SocialPlatformMeta> = {
  telegram: { label: "Telegram", prefix: "t.me/", icon: "/socials/telegram/regular.svg" },
  vk: { label: "ВКонтакте", prefix: "vk.com/", icon: "/socials/vk/regular.svg" },
  instagram: {
    label: "Instagram",
    prefix: "instagram.com/",
    icon: "/socials/instagram/regular.svg",
  },
  youtube: { label: "YouTube", prefix: "youtube.com/@", icon: "/socials/youtube/regular.svg" },
  website: { label: "Сайт", prefix: null, icon: null },
};

/* В БД link — «хвост» после префикса платформы («artemvolkov»), но пользователь мог
   вставить и полный адрес — все варианты приводим к абсолютному URL. */
export function getSocialLinkHref({ platform, link }: Pick<SocialLink, "platform" | "link">) {
  const value = link.trim();
  if (/^https?:\/\//i.test(value)) return value;

  const prefix = SOCIAL_PLATFORM_META[platform].prefix;
  if (!prefix) return `https://${value}`;
  if (value.startsWith(prefix)) return `https://${value}`;
  return `https://${prefix}${value.replace(/^@/, "")}`;
}
