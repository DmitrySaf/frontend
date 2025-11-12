import type { SocialPlatform } from "@/api/profiles";

// Domain types for UI
export interface SocialLink {
  platform: SocialPlatform;
  label: string | null;
  link: string;
}

export interface PrivacySettings {
  showOwnedCommunities: boolean;
  showSubscriptions: boolean;
  allowMessaging: boolean;
}

export interface Profile {
  username: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  privacySettings: PrivacySettings;
  socialLinks: SocialLink[];
}

export interface AuthUser {
  email: string | null;
  phone: string | null;
}
