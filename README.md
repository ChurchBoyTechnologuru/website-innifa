## Innifa Marketplace

Innifa is a Next.js marketplace connecting global sellers (China, Japan, UK, US) with Kenyan buyers.

### Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Environment variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — use the **anon / public** key from Supabase (legacy `eyJ...` JWT), **or** put your **`sb_publishable_...`** key here — both work with `createBrowserClient`
- Optionally `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` if you prefer to store the publishable key separately (the app reads anon first, then publishable)
- `NEXT_PUBLIC_SITE_URL` (e.g. `http://localhost:3000` locally, your production URL on Vercel)

### Supabase setup (Auth + Storage + Database)

1. Create Supabase project.
2. Enable Email provider in Auth.
3. Under **Authentication → URL configuration**, add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/auth/update-password`
   - `https://<your-domain>/auth/callback`
   - `https://<your-domain>/auth/update-password`
4. If sign-in returns no session, confirm the user’s email or turn off “Confirm email” in **Authentication → Providers → Email** (for testing only).
5. Create storage buckets:
   - `ad-banners`
   - `product-images`
6. Run SQL migration in Supabase SQL editor:
   - `supabase/migrations/20260323_init_innifa_schema.sql`

This migration creates:

- `profiles` table (user account/dashboard data)
- `adverts` table (advert metadata linked to uploaded images)
- `product_images` table (image storage metadata)
- trigger to auto-create profile on signup
- RLS policies for tables and storage objects

### Vercel deployment

In Vercel project settings, add the same environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

Then redeploy.
