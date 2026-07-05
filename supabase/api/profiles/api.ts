import { type TypedSupabaseClient } from "../types";
import {
  type ProfileWithSocials,
  type UpdateProfileData,
  type SocialLinkInput,
} from "./types";

const PROFILES_TABLE = 'profiles';
const SOCIAL_LINKS_TABLE = 'profile_social_links';

/**
 * Get profile with social links
 */
export async function getProfile(
  client: TypedSupabaseClient,
): Promise<{ data: ProfileWithSocials | null, error: any }> {
  // Профили видны всем участникам (авторы сообщений/постов),
  // поэтому свой профиль выбираем явно по auth-сессии
  const { data: sessionData } = await client.auth.getSession();
  const userId = sessionData.session?.user.id;

  if (!userId) {
    return { data: null, error: new Error("Требуется авторизация") };
  }

  const { data, error } = await client
    .from(PROFILES_TABLE)
    .select(`
      username,
      display_name,
      avatar_url,
      bio,
      privacy_settings,
      social_links:${SOCIAL_LINKS_TABLE}(platform, label, link)
    `)
    .eq('id', userId)
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data: data as ProfileWithSocials, error: null };
}

/**
 * Update profile with social links using RPC
 */
export async function updateProfile(
  client: TypedSupabaseClient,
  data: UpdateProfileData
): Promise<{ data: ProfileWithSocials | null, error: any }> {
  // Transform social links to match RPC expected format
  const socialLinksForRpc = data.social_links?.map(link => ({
    platform: link.platform,
    label: link.label ?? null,
    link: link.link
  }));

  const { error } = await client.rpc('update_profile_with_social_links', {
    p_username: data.username ?? undefined,
    p_display_name: data.display_name ?? undefined,
    p_avatar_url: data.avatar_url ?? undefined,
    p_bio: data.bio ?? undefined,
    p_social_links: socialLinksForRpc ?? undefined,
    p_privacy_settings: (data.privacy_settings as any) ?? undefined
  });

  if (error) {
    return { data: null, error };
  }

  // After update, fetch full profile with social links
  return getProfile(client);
}
