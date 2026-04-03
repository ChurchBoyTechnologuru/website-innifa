"use client";

import Link from "next/link";
import { getSupabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export function AuthNav({ user }: { user: any }) {
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = getSupabase();
        if (supabase) {
            await supabase.auth.signOut();
            router.push("/");
            router.refresh();
        }
    };

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                    Profile
                </Link>
                <button
                    onClick={handleSignOut}
                    className="text-sm font-medium text-slate-700 hover:text-red-600 transition-colors"
                >
                    Log out
                </button>
            </div>
        );
    }

    return (
        <>
            <Link
                href="/auth/login"
                className="hidden rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 hover:border-primary/30 hover:text-primary md:inline-flex"
            >
                Log in
            </Link>
            <Link
                href="/auth/signup"
                className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
            >
                Get started
            </Link>
        </>
    );
}
