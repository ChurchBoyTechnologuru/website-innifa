"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabaseClient";
import {
  serviceUnavailableMessage,
  uploadFailedMessage,
} from "@/lib/authMessages";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { AuthNotice } from "@/components/ui/AuthNotice";

interface UploadedAd {
  id: string;
  name: string;
  publicUrl: string;
  status: "draft" | "active" | "archived";
  createdAt: string;
}

const BUCKET = "ad-banners";

export default function AdvertsPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedAds, setUploadedAds] = useState<UploadedAd[]>([]);

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      return;
    }

    client.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      setUserEmail(user?.email ?? null);

      if (!user) {
        return;
      }

      const { data: adverts, error: advertsError } = await client
        .from("adverts")
        .select("id, title, image_url, status, created_at")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (!advertsError && adverts) {
        setUploadedAds(
          adverts.map((ad) => ({
            id: ad.id,
            name: ad.title,
            publicUrl: ad.image_url,
            status: ad.status as UploadedAd["status"],
            createdAt: ad.created_at,
          })),
        );
      }
    });
  }, []);

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const supabaseBrowser = getSupabase();
    if (!supabaseBrowser) {
      setError(serviceUnavailableMessage());
      return;
    }

    const { data: userData } = await supabaseBrowser.auth.getUser();
    if (!userData.user) {
      setError("You must sign in first before uploading adverts.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = String(formData.get("title") ?? "").trim();
    const file = formData.get("image") as File | null;

    if (!title) {
      setError("Please provide an advert title.");
      return;
    }
    if (!file || !file.name) {
      setError("Please choose an image to upload.");
      return;
    }

    setLoading(true);
    const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
    const path = `${userData.user.id}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabaseBrowser.storage
      .from(BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[upload]", uploadError.message);
      }
      setLoading(false);
      setError(uploadFailedMessage());
      return;
    }

    const { data: publicData } = supabaseBrowser.storage
      .from(BUCKET)
      .getPublicUrl(path);
    const publicUrl = publicData.publicUrl;
    const { data: createdAd, error: insertError } = await supabaseBrowser
      .from("adverts")
      .insert({
        owner_id: userData.user.id,
        title,
        image_path: path,
        image_url: publicUrl,
        target_country: "Kenya",
        status: "draft",
      })
      .select("id, title, image_url, status, created_at")
      .single();

    if (insertError || !createdAd) {
      if (process.env.NODE_ENV === "development" && insertError) {
        console.warn("[adverts insert]", insertError.message);
      }
      setLoading(false);
      setError(uploadFailedMessage());
      return;
    }

    setUploadedAds((prev) => [
      {
        id: createdAd.id,
        name: createdAd.title,
        publicUrl: createdAd.image_url,
        status: createdAd.status as UploadedAd["status"],
        createdAt: createdAd.created_at,
      },
      ...prev,
    ]);
    setMessage("Advert image uploaded and saved to database as draft.");
    form.reset();
    setLoading(false);
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Dashboard / Adverts
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Upload advert creatives
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Upload banner images to Supabase Storage bucket <code>{BUCKET}</code>.
          </p>
          {userEmail && (
            <p className="mt-2 text-xs text-slate-500">
              Signed in as <span className="font-medium">{userEmail}</span>
            </p>
          )}
        </header>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <form onSubmit={handleUpload} className="space-y-4">
            <FormInput
              label="Advert title"
              name="title"
              placeholder="E.g. New arrivals from Tokyo"
              required
            />

            <div className="space-y-1.5">
              <label
                htmlFor="ad-image"
                className="block text-xs font-medium uppercase tracking-wide text-slate-600"
              >
                Advert image
              </label>
              <input
                id="ad-image"
                name="image"
                type="file"
                accept="image/*"
                required
                className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {error && <AuthNotice>{error}</AuthNotice>}
            {message && <AuthNotice tone="success">{message}</AuthNotice>}

            <div className="flex flex-wrap gap-3">
              <Button type="submit" loading={loading}>
                Upload to storage
              </Button>
              <Link href="/dashboard">
                <Button type="button" variant="outline">
                  Back to dashboard
                </Button>
              </Link>
            </div>
          </form>
        </div>

        {uploadedAds.length > 0 && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Uploaded this session
            </h2>
            <ul className="mt-3 space-y-2 text-xs text-slate-700">
              {uploadedAds.map((ad) => (
                <li key={ad.id} className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{ad.name}</p>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-600">
                      {ad.status}
                    </span>
                  </div>
                  <a
                    href={ad.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-primary hover:underline"
                  >
                    {ad.publicUrl}
                  </a>
                  <p className="text-[10px] text-slate-500">
                    {new Date(ad.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

