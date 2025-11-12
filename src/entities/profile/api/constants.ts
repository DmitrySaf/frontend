export const profileQueryKeys = {
  all: ["profile"] as const,
  profile: ["profile", "current"] as const,
  authUser: ["profile", "auth-user"] as const,
};
