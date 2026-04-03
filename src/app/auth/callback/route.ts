import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getPublicSupabaseConfig } from "@/lib/supabaseEnv";

/**
 * Handles email confirmation / OAuth redirects from Supabase.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const nextRaw = searchParams.get("next") ?? "/catalog";
  const next = nextRaw.startsWith("/") ? nextRaw : "/catalog";

  const { url, key } = getPublicSupabaseConfig();
  if (!url || !key) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // ignore when called outside a mutable context
          }
        },
      },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error && process.env.NODE_ENV === "development") {
      console.warn("[auth/callback]", error.message);
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}
