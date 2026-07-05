import { createBrowserClient } from "@/api/utils/client";
import { useMemo } from "react";

/**
 * Hook to get Supabase browser client
 */
export const useBrowserClient = () => {
  return useMemo(() => createBrowserClient(), []);
};
