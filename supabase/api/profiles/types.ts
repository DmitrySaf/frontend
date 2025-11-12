import { Tables, TablesInsert, TablesUpdate, Enums } from "../types/database";

export type ProfileRow = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;

export type ProfileSocialLinkRow = Tables<'profile_social_links'>;
export type ProfileSocialLinkInsert = TablesInsert<'profile_social_links'>;
export type ProfileSocialLinkUpdate = TablesUpdate<'profile_social_links'>;

export type SocialPlatform = Enums<'social_platform'>;

export interface SocialLinkInput {
  platform: SocialPlatform;
  label?: string | null;
  link: string;
}

export interface ProfileWithSocials extends Omit<ProfileRow, 'id' | 'privacy_settings' | 'created_at' | 'updated_at'> {
  social_links: Omit<ProfileSocialLinkRow, 'id' | 'profile_id' | 'created_at' | 'updated_at'>[];
  privacy_settings: PrivacySettings;
}

export type SocialLink = ProfileSocialLinkRow;

export interface UpdateProfileData {
  username?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  social_links?: SocialLinkInput[];
  privacy_settings?: PrivacySettings;
}

export interface PrivacySettings {
  show_owned_communities?: {
    enabled: boolean;
  };
  show_subscriptions?: {
    enabled: boolean;
  };
  allow_messaging?: {
    enabled: boolean;
  };
}
