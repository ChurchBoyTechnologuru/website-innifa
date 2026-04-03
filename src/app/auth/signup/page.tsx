"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabaseClient";
import { signUpErrorMessage, serviceUnavailableMessage } from "@/lib/authMessages";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { AuthNotice } from "@/components/ui/AuthNotice";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const role = String(formData.get("role") ?? "buyer");

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const supabaseBrowser = getSupabase();
      if (!supabaseBrowser) {
        setError(serviceUnavailableMessage());
        return;
      }

      const { data: signUpData, error: signUpError } =
        await supabaseBrowser.auth.signUp({
          email,
          password,
          options: {
            data: {
              role,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/catalog`,
          },
        });

      if (signUpError) {
        setError(signUpErrorMessage(signUpError));
      } else if (signUpData.session) {
        setSuccess("Account created. Redirecting…");
        window.location.href = "/catalog";
      } else {
        setSuccess(
          "Check your email and confirm your account. After that you can sign in.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          One account works for both Kenyan buyers and international sellers.
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
            placeholder="At least 8 characters"
            required
          />
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-900 block">
              Account Type
            </label>
            <select
              name="role"
              required
              className="block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="buyer">I want to buy products</option>
              <option value="seller">I want to sell products</option>
            </select>
          </div>
          {error && <AuthNotice>{error}</AuthNotice>}
          {success && <AuthNotice tone="success">{success}</AuthNotice>}
          <Button type="submit" className="w-full" loading={loading}>
            Sign up
          </Button>
        </form>

        <p className="mt-4 text-xs text-slate-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

