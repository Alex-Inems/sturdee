-- Tutor profiles: user-submitted, Upwork-style marketplace listings

create table if not exists public.tutor_profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null unique references auth.users (id) on delete cascade,
    slug text not null unique,
    display_name text not null default '',
    status text not null default 'draft'
        check (status in ('draft', 'published', 'suspended')),
    onboarding_step int not null default 1 check (onboarding_step between 1 and 5),

    title text not null default '',
    categories text[] not null default '{}',
    skills jsonb not null default '[]',

    bio text not null default '',
    overview text not null default '',
    location text not null default '',
    timezone text not null default 'UTC',
    english_level text not null default 'Fluent',
    languages jsonb not null default '[]',

    hourly_rate numeric(10, 2) not null default 0,
    availability text not null default 'Available now'
        check (availability in ('Available now', 'Limited availability', 'Not available')),

    education jsonb not null default '[]',
    certifications jsonb not null default '[]',
    portfolio jsonb not null default '[]',

    image_url text,
    cover_image_url text,

    job_success int not null default 100 check (job_success between 0 and 100),
    total_hours int not null default 0,
    total_jobs int not null default 0,
    response_time text not null default 'Within 24 hours',
    repeat_clients int not null default 0,
    verified boolean not null default true,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    published_at timestamptz
);

create index if not exists tutor_profiles_user_id_idx on public.tutor_profiles (user_id);
create index if not exists tutor_profiles_slug_idx on public.tutor_profiles (slug);
create index if not exists tutor_profiles_status_idx on public.tutor_profiles (status);

alter table public.tutor_profiles enable row level security;

create policy "Anyone can view published tutor profiles"
    on public.tutor_profiles for select
    using (status = 'published');

create policy "Users can view own tutor profile"
    on public.tutor_profiles for select
    using (auth.uid() = user_id);

create policy "Admins can view all tutor profiles"
    on public.tutor_profiles for select
    using (public.is_admin());

create policy "Users can insert own tutor profile"
    on public.tutor_profiles for insert
    with check (auth.uid() = user_id);

create policy "Users can update own tutor profile"
    on public.tutor_profiles for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Admins can update all tutor profiles"
    on public.tutor_profiles for update
    using (public.is_admin());

-- Public listings (no join to profiles — avoids RLS blocking names)
create or replace view public.tutor_listings as
select
    t.id,
    t.user_id,
    t.slug,
    t.status,
    t.onboarding_step,
    t.title,
    t.categories,
    t.skills,
    t.bio,
    t.overview,
    t.location,
    t.timezone,
    t.english_level,
    t.languages,
    t.hourly_rate,
    t.availability,
    t.education,
    t.certifications,
    t.portfolio,
    t.image_url,
    t.cover_image_url,
    t.job_success,
    t.total_hours,
    t.total_jobs,
    t.response_time,
    t.repeat_clients,
    t.verified,
    t.created_at,
    t.updated_at,
    t.published_at,
    t.display_name as user_name
from public.tutor_profiles t
where t.status = 'published';

grant select on public.tutor_listings to anon, authenticated;
