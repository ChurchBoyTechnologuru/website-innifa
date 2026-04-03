import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseConfig } from "./supabaseEnv";

/**
 * Cookie-aware browser client (recommended for Next.js + publishable keys).
 * Only cache after successful creation — never cache a failed init.
 */
let browserClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (browserClient) {
    return browserClient;
  }

  const { url, key } = getPublicSupabaseConfig();

  if (!url || !key) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Innifa] Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY), then restart the dev server.",
      );
    }
    return null;
  }

  browserClient = createBrowserClient(url, key);
  return browserClient;
}
