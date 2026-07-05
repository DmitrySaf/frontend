"use client";

import { useQuery } from "@tanstack/react-query";
import { useBrowserClient } from "./useBrowserClient";

/**
 * Id текущего пользователя из Supabase-сессии (null — гость или ещё грузится).
 * Сессия локальная, поэтому запрос мгновенный; кэшируется навсегда до логаута.
 */
export const useSessionUserId = (): string | null => {
  const client = useBrowserClient();

  const { data } = useQuery({
    queryKey: ["session-user-id"],
    queryFn: async () => {
      const { data: sessionData } = await client.auth.getSession();
      return sessionData.session?.user.id ?? null;
    },
    staleTime: Number.POSITIVE_INFINITY,
  });

  return data ?? null;
};
