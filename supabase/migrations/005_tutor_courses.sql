-- Courses created by published tutors only

create table if not exists public.tutor_courses (
    id uuid primary key default gen_random_uuid(),
    tutor_profile_id uuid not null references public.tutor_profiles (id) on delete cascade,
    user_id uuid not null references auth.users (id) on delete cascade,
    slug text not null unique,
    code text not null default '',
    title text not null,
    category text not null
        check (category in ('Web Development', 'Programming', 'Cryptocurrency')),
    level text not null default 'Beginner'
        check (level in ('Beginner', 'Intermediate', 'Advanced')),
    duration text not null default '',
    hours int not null default 0,
    students int not null default 0,
    price numeric(10, 2) not null default 0,
    rating numeric(3, 2) not null default 0,
    reviews int not null default 0,
    description text not null default '',
    image_url text,
    format text not null default 'Cohort'
        check (format in ('Cohort', 'Self-paced', 'Live')),
    featured boolean not null default false,
    modules jsonb not null default '[]',
    status text not null default 'draft'
        check (status in ('draft', 'published', 'suspended')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    published_at timestamptz
);

create index if not exists tutor_courses_tutor_profile_id_idx on public.tutor_courses (tutor_profile_id);
create index if not exists tutor_courses_user_id_idx on public.tutor_courses (user_id);
create index if not exists tutor_courses_slug_idx on public.tutor_courses (slug);
create index if not exists tutor_courses_status_idx on public.tutor_courses (status);
create index if not exists tutor_courses_category_idx on public.tutor_courses (category);

alter table public.tutor_courses enable row level security;

create policy "Anyone can view published courses"
    on public.tutor_courses for select
    using (status = 'published');

create policy "Users can view own courses"
    on public.tutor_courses for select
    using (auth.uid() = user_id);

create policy "Admins can view all courses"
    on public.tutor_courses for select
    using (public.is_admin());

create policy "Published tutors can insert own courses"
    on public.tutor_courses for insert
    with check (
        auth.uid() = user_id
        and exists (
            select 1 from public.tutor_profiles tp
            where tp.user_id = auth.uid() and tp.status = 'published'
        )
    );

create policy "Users can update own courses"
    on public.tutor_courses for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Admins can update all courses"
    on public.tutor_courses for update
    using (public.is_admin());

create or replace view public.course_listings as
select
    c.id,
    c.tutor_profile_id,
    c.user_id,
    c.slug,
    c.code,
    c.title,
    c.category,
    c.level,
    c.duration,
    c.hours,
    c.students,
    c.price,
    c.rating,
    c.reviews,
    c.description,
    c.image_url,
    c.format,
    c.featured,
    c.modules,
    c.status,
    c.created_at,
    c.updated_at,
    c.published_at,
    t.slug as tutor_slug,
    t.display_name as tutor_name,
    t.title as tutor_title,
    t.image_url as tutor_image_url
from public.tutor_courses c
join public.tutor_profiles t on t.id = c.tutor_profile_id
where c.status = 'published' and t.status = 'published';

grant select on public.course_listings to anon, authenticated;
