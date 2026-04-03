"use client";

import { FormEvent, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import Link from "next/link";

export default function NewProductPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = String(formData.get("title") ?? "");
        const file = formData.get("image") as File | null;

        if (!title || !file || file.size === 0) {
            setError("Please provide a product title and image.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const supabaseBrowser = getSupabase();
            if (!supabaseBrowser) {
                setError("Database connection unavailable.");
                return;
            }

            const { data: authData } = await supabaseBrowser.auth.getUser();
            if (!authData.user) {
                setError("You must be logged in to upload products.");
                return;
            }

            // Upload image to product-images
            const fileName = `${authData.user.id}/${Date.now()}-${file.name}`;
            const { data: uploadData, error: uploadError } = await supabaseBrowser
                .storage
                .from("product-images")
                .upload(fileName, file);

            if (uploadError) {
                setError("Could not upload image. " + uploadError.message);
                return;
            }

            const { data: publicUrlData } = supabaseBrowser
                .storage
                .from("product-images")
                .getPublicUrl(uploadData.path);

            const imageUrl = publicUrlData.publicUrl;

            // Insert record into adverts as product
            const { error: insertError } = await supabaseBrowser
                .from("adverts")
                .insert({
                    owner_id: authData.user.id,
                    title: title,
                    image_path: uploadData.path,
                    image_url: imageUrl,
                    target_country: "Kenya",
                    status: "active"
                });

            if (insertError) {
                setError("Failed to create product listing. " + insertError.message);
                return;
            }

            setSuccess("Product successfully listed!");
            (event.target as HTMLFormElement).reset();

        } catch (e: any) {
            setError(e.message ?? "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-slate-900">
                        Upload new product
                    </h1>
                    <Link href="/dashboard" className="text-sm text-primary hover:underline">
                        Back to dashboard
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label="Product Title"
                        name="title"
                        placeholder="e.g. Japanese minimalist desk lamp"
                        required
                    />
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-900 shadow-[0_0_0_transparent]">Product Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            required
                            className="block w-full text-sm text-slate-500
                file:mr-4 file:rounded-full file:border-0
                file:bg-primary/10 file:px-4
                file:py-2 file:text-sm
                file:font-semibold file:text-primary
                hover:file:bg-primary/20"
                        />
                    </div>

                    {error && <div className="text-sm text-red-600 font-medium">{error}</div>}
                    {success && <div className="text-sm text-green-600 font-medium">{success}</div>}

                    <Button type="submit" className="w-full mt-4" loading={loading}>
                        List Product
                    </Button>
                </form>
            </div>
        </div>
    );
}
