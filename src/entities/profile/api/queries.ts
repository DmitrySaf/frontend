import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile, getAuthUser } from "./api";
import { transformProfile } from "../model/mappers";
import { profileQueryKeys } from "./constants";
import { useBrowserClient } from "@/shared/composables";
import type { Profile, AuthUser } from "./types";

/**
 * Hook to fetch current user profile with social links and privacy settings
 */
export const useProfileQuery = () => {
  const client = useBrowserClient();

  return useQuery<Profile>({
    queryKey: profileQueryKeys.profile,
    queryFn: async () => {
      const data = await getProfile(client);
      return transformProfile(data);
    },
  });
};

/**
 * Hook to fetch authenticated user (email, phone)
 */
export const useAuthUserQuery = () => {
  const client = useBrowserClient();

  return useQuery<AuthUser>({
    queryKey: profileQueryKeys.authUser,
    queryFn: () => getAuthUser(client),
  });
};

/**
 * Hook to invalidate profile cache
 */
export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: profileQueryKeys.profile });
  };
};

/**
 * Hook to invalidate auth user cache
 */
export const useInvalidateAuthUser = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: profileQueryKeys.authUser });
  };
};
