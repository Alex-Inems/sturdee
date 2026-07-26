-- Live classroom sessions powered by Google Meet (up to 100 students)

create table if not exists public.live_classes (
    id uuid primary key default gen_random_uuid(),
    host_user_id uuid not null references auth.users (id) on delete cascade,
    host_name text not null default '',
    host_email text not null default '',
    title text not null,
    slug text not null unique,
    description text not null default '',
    topic text not null default '',
    meet_url text not null default '',
    meet_space_name text not null default '',
    meet_code text not null default '',
    starts_at timestamptz not null,
    ends_at timestamptz,
    capacity int not null default 100 check (capacity > 0 and capacity <= 100),
    status text not null default 'scheduled'
        check (status in ('draft', 'scheduled', 'live', 'ended', 'cancelled')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists live_classes_status_starts_idx
    on public.live_classes (status, starts_at);
create index if not exists live_classes_host_user_id_idx
    on public.live_classes (host_user_id);
create index if not exists live_classes_slug_idx
    on public.live_classes (slug);

create table if not exists public.live_class_enrollments (
    id uuid primary key default gen_random_uuid(),
    class_id uuid not null references public.live_classes (id) on delete cascade,
    user_id uuid not null references auth.users (id) on delete cascade,
    user_email text not null default '',
    user_name text not null default '',
    joined_at timestamptz,
    created_at timestamptz not null default now(),
    unique (class_id, user_id)
);

create index if not exists live_class_enrollments_class_id_idx
    on public.live_class_enrollments (class_id);
create index if not exists live_class_enrollments_user_id_idx
    on public.live_class_enrollments (user_id);

-- Capacity guard: refuse enrollments past the class capacity (max 100)
create or replace function public.enforce_live_class_capacity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    current_count int;
    max_capacity int;
begin
    select capacity into max_capacity
    from public.live_classes
    where id = new.class_id;

    if max_capacity is null then
        raise exception 'Class not found';
    end if;

    select count(*)::int into current_count
    from public.live_class_enrollments
    where class_id = new.class_id;

    if current_count >= max_capacity then
        raise exception 'This class is full (max % students)', max_capacity;
    end if;

    return new;
end;
$$;

drop trigger if exists live_class_capacity_guard on public.live_class_enrollments;
create trigger live_class_capacity_guard
    before insert on public.live_class_enrollments
    for each row execute function public.enforce_live_class_capacity();

alter table public.live_classes enable row level security;
alter table public.live_class_enrollments enable row level security;

-- Classes: public can see scheduled/live; hosts see own; admins see all
create policy "Anyone can view open live classes"
    on public.live_classes for select
    using (status in ('scheduled', 'live', 'ended'));

create policy "Hosts can view own live classes"
    on public.live_classes for select
    using (auth.uid() = host_user_id);

create policy "Admins can view all live classes"
    on public.live_classes for select
    using (public.is_admin());

create policy "Authenticated users can create live classes"
    on public.live_classes for insert
    with check (auth.uid() = host_user_id);

create policy "Hosts can update own live classes"
    on public.live_classes for update
    using (auth.uid() = host_user_id)
    with check (auth.uid() = host_user_id);

create policy "Admins can update all live classes"
    on public.live_classes for update
    using (public.is_admin());

create policy "Hosts can delete own live classes"
    on public.live_classes for delete
    using (auth.uid() = host_user_id);

create policy "Admins can delete all live classes"
    on public.live_classes for delete
    using (public.is_admin());

-- Enrollments
create policy "Users can view own enrollments"
    on public.live_class_enrollments for select
    using (auth.uid() = user_id);

create policy "Hosts can view enrollments for their classes"
    on public.live_class_enrollments for select
    using (
        exists (
            select 1 from public.live_classes c
            where c.id = class_id and c.host_user_id = auth.uid()
        )
    );

create policy "Admins can view all enrollments"
    on public.live_class_enrollments for select
    using (public.is_admin());

create policy "Users can enroll themselves"
    on public.live_class_enrollments for insert
    with check (auth.uid() = user_id);

create policy "Users can leave (delete) own enrollment"
    on public.live_class_enrollments for delete
    using (auth.uid() = user_id);

create policy "Hosts can update enrollments for their classes"
    on public.live_class_enrollments for update
    using (
        exists (
            select 1 from public.live_classes c
            where c.id = class_id and c.host_user_id = auth.uid()
        )
    );

-- Public listing view (hides draft/cancelled)
create or replace view public.live_class_listings as
select
    id,
    host_user_id,
    host_name,
    title,
    slug,
    description,
    topic,
    starts_at,
    ends_at,
    capacity,
    status,
    created_at,
    (select count(*)::int from public.live_class_enrollments e where e.class_id = live_classes.id) as enrolled_count
from public.live_classes
where status in ('scheduled', 'live', 'ended');

grant select on public.live_class_listings to anon, authenticated;
