-- Sturdee: profiles + bookings with Row Level Security
-- Run in Supabase SQL Editor or via `supabase db push`

-- ─── Profiles ───────────────────────────────────────────────────────────────

create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    email text not null,
    name text not null,
    role text not null default 'user' check (role in ('user', 'admin')),
    created_at timestamptz not null default now()
);

-- ─── Helper: admin check (avoids RLS recursion) ─────────────────────────────

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
    select exists (
        select 1 from public.profiles
        where id = auth.uid() and role = 'admin'
    );
$$;

alter table public.profiles enable row level security;

create policy "Users can view own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Admins can view all profiles"
    on public.profiles for select
    using (public.is_admin());

create policy "Users can update own profile"
    on public.profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

-- ─── Bookings ───────────────────────────────────────────────────────────────

create table if not exists public.bookings (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    user_email text not null,
    user_name text not null,
    service text not null,
    date date not null,
    time text not null,
    status text not null default 'pending'
        check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
    notes text not null default '',
    created_at timestamptz not null default now()
);

create index if not exists bookings_user_id_idx on public.bookings (user_id);
create index if not exists bookings_created_at_idx on public.bookings (created_at desc);

alter table public.bookings enable row level security;

create policy "Users can view own bookings"
    on public.bookings for select
    using (auth.uid() = user_id);

create policy "Admins can view all bookings"
    on public.bookings for select
    using (public.is_admin());

create policy "Users can create own bookings"
    on public.bookings for insert
    with check (auth.uid() = user_id);

create policy "Admins can update all bookings"
    on public.bookings for update
    using (public.is_admin());

-- ─── Auto-create profile on sign-up ─────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, email, name, role)
    values (
        new.id,
        new.email,
        coalesce(
            new.raw_user_meta_data ->> 'name',
            new.raw_user_meta_data ->> 'full_name',
            split_part(new.email, '@', 1)
        ),
        case
            when new.email in ('admin@sturdee.online') then 'admin'
            else 'user'
        end
    );
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- ─── Promote an existing user to admin ──────────────────────────────────────
-- update public.profiles set role = 'admin' where email = 'you@company.com';
