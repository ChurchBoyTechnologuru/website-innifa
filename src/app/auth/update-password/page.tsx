"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabaseClient";
import {
  serviceUnavailableMessage,
  updatePasswordErrorMessage,
} from "@/lib/authMessages";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { AuthNotice } from "@/components/ui/AuthNotice";

export default function UpdatePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    setMessage(null);
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const supabaseBrowser = getSupabase();
    if (!supabaseBrowser) {
      setError(serviceUnavailableMessage());
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabaseBrowser.auth.updateUser({
      password,
    });
    setLoading(false);

    if (updateError) {
      setError(updatePasswordErrorMessage(updateError));
      return;
    }

    setMessage("Your password was updated. You can sign in now.");
  }

  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Set new password</h1>
        <p className="mt-1 text-sm text-slate-600">
          Choose a strong password for your Innifa account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <FormInput
            label="New password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            required
          />
          <FormInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            required
          />

          {error && <AuthNotice>{error}</AuthNotice>}
          {message && <AuthNotice tone="success">{message}</AuthNotice>}

          <Button type="submit" className="w-full" loading={loading}>
            Update password
          </Button>
        </form>

        <p className="mt-4 text-xs text-slate-600">
          Back to{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}

