import {
  getProfile as _getProfile,
  updateProfile as _updateProfile,
  type ProfileWithSocials,
  type UpdateProfileData,
} from "@/api/profiles";
import {
  getAuthUser as _getAuthUser,
  updateAuthUser as _updateAuthUser,
  type UpdateAuthUserData,
} from "@/api/auth";
import { type TypedSupabaseClient } from "@/api";
import type { AuthUser } from "./types";

/**
 * Get current user profile with social links
 */
export const getProfile = async (
  client: TypedSupabaseClient
): Promise<ProfileWithSocials> => {
  const { data, error } = await _getProfile(client);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Profile not found");
  }

  return data;
};

/**
 * Update current user profile with social links
 */
export const updateProfile = async (
  client: TypedSupabaseClient,
  profileData: UpdateProfileData
): Promise<ProfileWithSocials> => {
  const { data, error } = await _updateProfile(client, profileData);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Failed to update profile");
  }

  return data;
};

/**
 * Get current auth user (email, phone)
 */
export const getAuthUser = async (client: TypedSupabaseClient): Promise<AuthUser> => {
  const { data, error } = await _getAuthUser(client);

  if (error || !data.user) {
    throw new Error("User not authenticated");
  }

  return {
    email: data.user.email || null,
    phone: data.user.phone || null,
  };
};

/**
 * Update auth user (email, phone, password)
 */
export const updateAuthUser = async (
  client: TypedSupabaseClient,
  userData: UpdateAuthUserData
): Promise<void> => {
  const { error } = await _updateAuthUser(client, userData);

  if (error) {
    throw new Error(error.message);
  }
};
