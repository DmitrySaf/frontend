import type { ProfileWithSocials, PrivacySettings as _PrivacySettings } from "@/api/profiles";
import type { PrivacySettings, Profile } from "../api/types";

/**
 * Transform API profile with social links to domain model
 */
export const transformProfile = (response: ProfileWithSocials): Profile => {
  return {
    username: response.username,
    displayName: response.display_name,
    avatarUrl: response.avatar_url,
    bio: response.bio,
    privacySettings: transformPrivacySettings(response.privacy_settings),
    socialLinks: response.social_links.map((link) => ({
      platform: link.platform,
      label: link.label,
      link: link.link,
    })),
  };
};

/**
 * Transform privacy settings from API JSON to domain model with default values
 */
export const transformPrivacySettings = (
  settings: _PrivacySettings | null | undefined
): PrivacySettings => {
  return {
    showOwnedCommunities: settings?.show_owned_communities?.enabled ?? true,
    showSubscriptions: settings?.show_subscriptions?.enabled ?? true,
    allowMessaging: settings?.allow_messaging?.enabled ?? true,
  };
};

/**
 * Transform privacy settings from domain to API format
 */
export const transformPrivacySettingsToApi = (
  settings: Partial<PrivacySettings>
): _PrivacySettings => {
  const result: _PrivacySettings = {};

  if (settings.showOwnedCommunities !== undefined) {
    result.show_owned_communities = { enabled: settings.showOwnedCommunities };
  }

  if (settings.showSubscriptions !== undefined) {
    result.show_subscriptions = { enabled: settings.showSubscriptions };
  }

  if (settings.allowMessaging !== undefined) {
    result.allow_messaging = { enabled: settings.allowMessaging };
  }

  return result;
};
