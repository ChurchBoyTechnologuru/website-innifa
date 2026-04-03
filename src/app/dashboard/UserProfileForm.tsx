"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/Button";

interface UserProfileFormProps {
    initialProfile: {
        id: string;
        full_name: string | null;
        country: string | null;
    };
}

export function UserProfileForm({ initialProfile }: UserProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        full_name: initialProfile.full_name || "",
        country: initialProfile.country || "Kenya",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

        const supabase = getSupabase();
        if (!supabase) return;

        const { error } = await supabase
            .from("profiles")
            .upsert({
                id: initialProfile.id,
                full_name: formData.full_name,
                country: formData.country,
            });

        setLoading(false);
        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg("Profile updated successfully!");
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Your Profile</h2>
            <p className="mt-1 mb-4 text-sm text-slate-600">
                Update your profile details below. This information is private and not shared with others.
            </p>

            {successMsg && <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">{successMsg}</div>}
            {errorMsg && <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                    Full Name
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="rounded-lg border border-slate-300 px-3 py-2 flex-1 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="John Doe"
                    />
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                    Country
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="rounded-lg border border-slate-300 px-3 py-2 flex-1 bg-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="Kenya">Kenya</option>
                        <option value="China">China</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="Japan">Japan</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <Button type="submit" variant="primary" className="mt-2 w-full max-w-[150px]" disabled={loading}>
                    {loading ? "Saving..." : "Save Profile"}
                </Button>
            </form>
        </div>
    );
}
