import type { SocialPlatform } from "@/api";

export interface SocialNetwork {
  id: Exclude<SocialPlatform, "website">;
  prefix: string;
  icon: string;
}

export const SOCIAL_NETWORKS: SocialNetwork[] = [
  { id: "telegram", prefix: "t.me/", icon: "/socials/telegram/regular.svg" },
  { id: "vk", prefix: "vk.com/", icon: "/socials/vk/regular.svg" },
  { id: "instagram", prefix: "instagram.com/", icon: "/socials/instagram/regular.svg" },
  { id: "youtube", prefix: "youtube.com/@", icon: "/socials/youtube/regular.svg" },
];
