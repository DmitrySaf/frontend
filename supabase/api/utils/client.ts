import { createBrowserClient as _createBrowserClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./env";

export function createBrowserClient() {
  return _createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}
