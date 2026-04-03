create extension if not exists pgcrypto;

-- =========================
-- Profiles (account dashboard)
-- =========================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  role text not null default 'buyer' check (role in ('buyer', 'seller', 'admin')),
  country text default 'Kenya',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at_column();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'role', 'buyer')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = coalesce(nullif(excluded.full_name, ''), public.profiles.full_name),
    role = public.profiles.role;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by owner or admin" on public.profiles;
create policy "Profiles are viewable by owner or admin"
on public.profiles
for select
to authenticated
using (auth.uid() = id or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

drop policy if exists "Profiles are insertable by owner or admin" on public.profiles;
create policy "Profiles are insertable by owner or admin"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

drop policy if exists "Profiles are updateable by owner or admin" on public.profiles;
create policy "Profiles are updateable by owner or admin"
on public.profiles
for update
to authenticated
using (auth.uid() = id or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
))
with check (auth.uid() = id or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

-- =========================
-- Adverts
-- =========================
create table if not exists public.adverts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  image_path text not null,
  image_url text not null,
  target_country text not null default 'Kenya',
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  clicks integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_adverts_updated_at on public.adverts;
create trigger trg_adverts_updated_at
before update on public.adverts
for each row
execute function public.update_updated_at_column();

alter table public.adverts enable row level security;

drop policy if exists "Public can view active adverts" on public.adverts;
create policy "Public can view active adverts"
on public.adverts
for select
to anon, authenticated
using (status = 'active' or owner_id = auth.uid() or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

drop policy if exists "Authenticated users can create own adverts" on public.adverts;
create policy "Authenticated users can create own adverts"
on public.adverts
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "Owners or admins can update adverts" on public.adverts;
create policy "Owners or admins can update adverts"
on public.adverts
for update
to authenticated
using (owner_id = auth.uid() or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
))
with check (owner_id = auth.uid() or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

drop policy if exists "Owners or admins can delete adverts" on public.adverts;
create policy "Owners or admins can delete adverts"
on public.adverts
for delete
to authenticated
using (owner_id = auth.uid() or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

-- =========================
-- Product images
-- =========================
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  product_id text,
  image_path text not null,
  image_url text not null,
  alt_text text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_product_images_updated_at on public.product_images;
create trigger trg_product_images_updated_at
before update on public.product_images
for each row
execute function public.update_updated_at_column();

alter table public.product_images enable row level security;

drop policy if exists "Public can view product images" on public.product_images;
create policy "Public can view product images"
on public.product_images
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can create own product images" on public.product_images;
create policy "Authenticated users can create own product images"
on public.product_images
for insert
to authenticated
with check (owner_id = auth.uid());

drop policy if exists "Owners or admins can update product images" on public.product_images;
create policy "Owners or admins can update product images"
on public.product_images
for update
to authenticated
using (owner_id = auth.uid() or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
))
with check (owner_id = auth.uid() or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

drop policy if exists "Owners or admins can delete product images" on public.product_images;
create policy "Owners or admins can delete product images"
on public.product_images
for delete
to authenticated
using (owner_id = auth.uid() or exists (
  select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
));

-- =========================
-- Storage policies
-- Buckets expected:
--   ad-banners
--   product-images
-- =========================
drop policy if exists "Public can read ad banners" on storage.objects;
create policy "Public can read ad banners"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'ad-banners');

drop policy if exists "Authenticated can upload own ad banners" on storage.objects;
create policy "Authenticated can upload own ad banners"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'ad-banners'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists "Owners or admins can update own ad banners" on storage.objects;
create policy "Owners or admins can update own ad banners"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'ad-banners'
  and (
    split_part(name, '/', 1) = auth.uid()::text
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
)
with check (
  bucket_id = 'ad-banners'
  and (
    split_part(name, '/', 1) = auth.uid()::text
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
);

drop policy if exists "Owners or admins can delete own ad banners" on storage.objects;
create policy "Owners or admins can delete own ad banners"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'ad-banners'
  and (
    split_part(name, '/', 1) = auth.uid()::text
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
);

drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Authenticated can upload own product images" on storage.objects;
create policy "Authenticated can upload own product images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and split_part(name, '/', 1) = auth.uid()::text
);

drop policy if exists "Owners or admins can update own product images" on storage.objects;
create policy "Owners or admins can update own product images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'product-images'
  and (
    split_part(name, '/', 1) = auth.uid()::text
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
)
with check (
  bucket_id = 'product-images'
  and (
    split_part(name, '/', 1) = auth.uid()::text
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
);

drop policy if exists "Owners or admins can delete own product images" on storage.objects;
create policy "Owners or admins can delete own product images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'product-images'
  and (
    split_part(name, '/', 1) = auth.uid()::text
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  )
);

