/* Design-sync stub for `@/api/browser-client`. The real module pulls Supabase env
   (process.env.NEXT_PUBLIC_SUPABASE_*), which is undefined in the browser bundle and throws
   at module-init. Reached only transitively (utils barrel → storageUpload) — no core preview
   ever calls it, so a no-op client is safe. */
export const createBrowserClient = () => ({}) as unknown;
