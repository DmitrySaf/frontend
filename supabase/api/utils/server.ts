import { createServerClient as _createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./env";
import { createFetchWithTimeout } from "./fetch-with-timeout";

export async function createServerClient() {
  const cookieStore = await cookies();

  return _createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { fetch: createFetchWithTimeout() },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
