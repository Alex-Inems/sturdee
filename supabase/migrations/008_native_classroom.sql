-- Sturdee-native classroom (LiveKit): provider selection, room identity, and
-- authoritative attendance recorded from LiveKit webhooks.

-- 1. Provider + room identity on live_classes
alter table public.live_classes
    add column if not exists provider text not null default 'livekit'
        check (provider in ('livekit', 'meet')),
    add column if not exists room_name text unique,
    add column if not exists recording_enabled boolean not null default false;

-- Backfill: any existing class with a Meet link stays on Meet
update public.live_classes
set provider = 'meet'
where meet_url <> '' and provider = 'livekit';

-- 2. Attendance: one row per participant "session" in a room (join -> leave)
create table if not exists public.live_class_attendance (
    id uuid primary key default gen_random_uuid(),
    class_id uuid not null references public.live_classes (id) on delete cascade,
    user_id uuid references auth.users (id) on delete set null,
    identity text not null default '',
    display_name text not null default '',
    role text not null default 'student' check (role in ('student', 'host', 'admin')),
    joined_at timestamptz not null default now(),
    left_at timestamptz,
    duration_seconds int,
    -- LiveKit participant SID makes each join/leave pair idempotent
    participant_sid text,
    created_at timestamptz not null default now(),
    unique (class_id, participant_sid)
);

create index if not exists live_class_attendance_class_id_idx
    on public.live_class_attendance (class_id);
create index if not exists live_class_attendance_user_id_idx
    on public.live_class_attendance (user_id);

alter table public.live_class_attendance enable row level security;

-- Students see their own attendance; hosts see attendance for their classes; admins all.
create policy "Users can view own attendance"
    on public.live_class_attendance for select
    using (auth.uid() = user_id);

create policy "Hosts can view attendance for their classes"
    on public.live_class_attendance for select
    using (
        exists (
            select 1 from public.live_classes c
            where c.id = class_id and c.host_user_id = auth.uid()
        )
    );

create policy "Admins can view all attendance"
    on public.live_class_attendance for select
    using (public.is_admin());

-- No client writes: attendance is written by the LiveKit webhook using the
-- service role key (bypasses RLS). No insert/update/delete policies on purpose.

-- 3. Attendance rollup per class (used by the host dashboard)
create or replace view public.live_class_attendance_summary as
select
    a.class_id,
    a.user_id,
    max(a.display_name) as display_name,
    max(a.role) as role,
    min(a.joined_at) as first_joined_at,
    max(coalesce(a.left_at, now())) as last_seen_at,
    count(*)::int as sessions,
    coalesce(sum(coalesce(a.duration_seconds, 0)), 0)::int as total_seconds
from public.live_class_attendance a
group by a.class_id, a.user_id;

grant select on public.live_class_attendance_summary to authenticated;
