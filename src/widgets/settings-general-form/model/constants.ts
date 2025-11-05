export interface SocialNetwork {
  key: "telegram" | "vk" | "instagram" | "youtube";
  label: string;
  baseUrl: string;
  domain: string;
}

export const SOCIAL_NETWORKS: SocialNetwork[] = [
  { key: "telegram", label: "Telegram", baseUrl: "t.me/", domain: "telegram.org" },
  { key: "vk", label: "VK", baseUrl: "vk.com/", domain: "vk.com" },
  { key: "instagram", label: "Instagram", baseUrl: "instagram.com/", domain: "instagram.com" },
  { key: "youtube", label: "YouTube", baseUrl: "youtube.com/@", domain: "youtube.com" },
];

export const FAVICON_SIZE = 64;
export const FAVICON_DISPLAY_SIZE = 20;

