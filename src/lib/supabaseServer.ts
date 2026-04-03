import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getPublicSupabaseConfig } from "./supabaseEnv";

export async function createClient() {
    const cookieStore = await cookies();
    const { url, key } = getPublicSupabaseConfig();

    if (!url || !key) {
        throw new Error("Missing Supabase config");
    }

    return createServerClient(url, key, {
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
}
