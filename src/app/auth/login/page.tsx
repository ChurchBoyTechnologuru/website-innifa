"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabaseClient";
import { signInErrorMessage, serviceUnavailableMessage } from "@/lib/authMessages";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { AuthNotice } from "@/components/ui/AuthNotice";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setLoading(true);
    setError(null);

    try {
      const supabaseBrowser = getSupabase();
      if (!supabaseBrowser) {
        setError(serviceUnavailableMessage());
        return;
      }

      const { data, error: signInError } =
        await supabaseBrowser.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInErrorMessage(signInError));
      } else if (!data.session) {
        setError(
          "Your email may still need confirming. Check your inbox, then try again.",
        );
      } else {
        window.location.href = "/catalog";
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          Log in to Innifa
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Access your seller dashboard or buyer account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
          {error && <AuthNotice>{error}</AuthNotice>}
          <Button type="submit" className="w-full" loading={loading}>
            Continue
          </Button>
        </form>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
          <Link href="/auth/reset-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
          <span>
            New here?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Create account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

