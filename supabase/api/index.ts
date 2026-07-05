export type { TypedSupabaseClient } from "./types";
export {
  getProfile,
  updateProfile,
  type ProfileWithSocials,
  type SocialLinkInput,
  type UpdateProfileData,
  type SocialPlatform,
  type PrivacySettings,
} from "./profiles";
export { updateAuthUser, getAuthUser, type UpdateAuthUserData } from "./auth";
