"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { UserProfileForm } from "./UserProfileForm";

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabaseBrowser = getSupabase();
    if (!supabaseBrowser) {
      return;
    }

    supabaseBrowser.auth.getUser().then(({ data: authData }) => {
      const user = authData.user;
      if (user) {
        setEmail(user.email ?? null);
        supabaseBrowser.from("profiles").select("*").eq("id", user.id).single().then(({ data: profileData }) => {
          setProfile(profileData || { id: user.id, full_name: "", country: "Kenya", role: "buyer" });
          setLoading(false);
        });
      } else {
        window.location.href = "/auth/login";
      }
    });
  }, []);

  async function handleSignOut() {
    const supabaseBrowser = getSupabase();
    if (!supabaseBrowser) {
      return;
    }
    await supabaseBrowser.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return <div className="p-8 text-center text-sm text-slate-500">Loading...</div>;
  }

  const role = profile?.role ?? "buyer";

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <header className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              Your dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your profile and account settings.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            {email && (
              <span className="rounded-full bg-slate-100 px-3 py-1">
                Signed in as <span className="font-medium">{email}</span>
              </span>
            )}
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        </header>

        <div className="mt-8 space-y-8">
          <section>
            <UserProfileForm initialProfile={profile} />
          </section>

          {role === "seller" ? (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">Seller Tools</h2>
              <div className="grid gap-5 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Products to Kenya
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Add or update catalog items visible to Kenyan buyers.
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-600">
                    <li>• Localized pricing in KES</li>
                    <li>• Delivery estimates per city</li>
                    <li>• Import documentation checklist</li>
                  </ul>
                  <Link href="/dashboard/products/new" className="block">
                    <Button variant="primary" size="sm" className="mt-4 w-full">
                      Upload new product
                    </Button>
                  </Link>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Adverts &amp; campaigns
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Upload creative assets to appear as sponsored banners.
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-600">
                    <li>• Target by category &amp; city</li>
                    <li>• Track clicks and conversions</li>
                    <li>• Hosted securely in Supabase storage</li>
                  </ul>
                  <Link href="/dashboard/adverts" className="block">
                    <Button variant="success" size="sm" className="mt-4 w-full">
                      Upload advert
                    </Button>
                  </Link>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-semibold text-slate-900">
                    Kenyan buyer insights
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Understand which cities and categories are driving demand.
                  </p>
                  <div className="mt-3 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center justify-between">
                      <span>Nairobi</span>
                      <Badge variant="accent">68% of orders</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Mombasa</span>
                      <Badge variant="neutral">16% of orders</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Kisumu &amp; other</span>
                      <Badge variant="outline">16% of orders</Badge>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="mt-4 inline-block text-xs font-medium text-primary hover:underline"
                  >
                    View detailed analytics
                  </Link>
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Become a Seller</h2>
              <p className="mt-2 text-sm text-slate-600 mb-4 max-w-md">
                Want to reach Kenyan buyers? Upgrade your account to upload products, run adverts, and access detailed analytics.
              </p>
              <Button variant="outline" className="text-sm">Apply to Sell</Button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

