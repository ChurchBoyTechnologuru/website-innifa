/**
 * Public Supabase config for browser + middleware + callback route.
 * Supports legacy anon JWT and new publishable key (`sb_publishable_...`).
 */
export function getPublicSupabaseConfig(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    "";
  return { url, key };
}
