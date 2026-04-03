"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabaseClient";
import { resetPasswordMessage, serviceUnavailableMessage } from "@/lib/authMessages";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { AuthNotice } from "@/components/ui/AuthNotice";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    setLoading(true);
    setMessage(null);

    try {
      const supabaseBrowser = getSupabase();
      if (!supabaseBrowser) {
        setMessage(serviceUnavailableMessage());
        return;
      }

      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
      const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/auth/update-password`,
      });

      setMessage(resetPasswordMessage(error ?? null, !error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">
          Reset your password
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          We will email you a secure link to update your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
          {message && <AuthNotice>{message}</AuthNotice>}
          <Button type="submit" className="w-full" loading={loading}>
            Send reset link
          </Button>
        </form>

        <p className="mt-4 text-xs text-slate-600">
          Remembered your password?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

