-- Learning batches: cohorts with a tutor; students auto-assign on registration.

create table if not exists public.learning_batches (
    id uuid primary key default gen_random_uuid(),
    skill_slug text not null,
    tutor_user_id uuid not null references auth.users (id) on delete cascade,
    tutor_name text not null default '',
    title text not null,
    capacity int not null default 15 check (capacity > 0 and capacity <= 100),
    starts_at timestamptz,
    status text not null default 'open'
        check (status in ('open', 'full', 'closed')),
    created_at timestamptz not null default now()
);

create index if not exists learning_batches_skill_status_idx
    on public.learning_batches (skill_slug, status);
create index if not exists learning_batches_tutor_user_id_idx
    on public.learning_batches (tutor_user_id);

-- Extend bookings for skill registration + batch assignment
alter table public.bookings
    add column if not exists skill_slug text,
    add column if not exists batch_id uuid references public.learning_batches (id) on delete set null,
    add column if not exists tutor_user_id uuid references auth.users (id) on delete set null,
    add column if not exists tutor_name text not null default '';

alter table public.bookings alter column date drop not null;
alter table public.bookings alter column time drop not null;

create index if not exists bookings_skill_slug_idx on public.bookings (skill_slug);
create index if not exists bookings_batch_id_idx on public.bookings (batch_id);

-- Count active enrollments per batch (pending + confirmed)
create or replace function public.batch_enrollment_count(p_batch_id uuid)
returns int
language sql
stable
security definer
set search_path = public
as $$
    select count(*)::int
    from public.bookings
    where batch_id = p_batch_id
      and status in ('pending', 'confirmed');
$$;

-- Atomically assign a pending booking to an open batch with capacity
create or replace function public.assign_booking_to_batch(p_booking_id uuid)
returns public.bookings
language plpgsql
security definer
set search_path = public
as $$
declare
    v_booking public.bookings;
    v_batch public.learning_batches;
    v_count int;
    v_date date;
    v_time text;
begin
    select * into v_booking
    from public.bookings
    where id = p_booking_id
    for update;

    if v_booking.id is null then
        raise exception 'Booking not found';
    end if;

    if v_booking.batch_id is not null then
        return v_booking;
    end if;

    if v_booking.skill_slug is null or v_booking.skill_slug = '' then
        return v_booking;
    end if;

    select b.* into v_batch
    from public.learning_batches b
    where b.skill_slug = v_booking.skill_slug
      and b.status = 'open'
      and public.batch_enrollment_count(b.id) < b.capacity
    order by b.starts_at nulls last, b.created_at
    limit 1
    for update skip locked;

    if v_batch.id is null then
        return v_booking;
    end if;

    v_count := public.batch_enrollment_count(v_batch.id) + 1;

    if v_batch.starts_at is not null then
        v_date := (v_batch.starts_at at time zone 'UTC')::date;
        v_time := to_char(v_batch.starts_at at time zone 'UTC', 'HH12:MI AM');
    end if;

    update public.bookings
    set
        batch_id = v_batch.id,
        tutor_user_id = v_batch.tutor_user_id,
        tutor_name = v_batch.tutor_name,
        date = coalesce(v_date, date),
        time = coalesce(v_time, time, 'TBD'),
        status = 'confirmed'
    where id = p_booking_id
    returning * into v_booking;

    if v_count >= v_batch.capacity then
        update public.learning_batches
        set status = 'full'
        where id = v_batch.id;
    end if;

    return v_booking;
end;
$$;

alter table public.learning_batches enable row level security;

create policy "Anyone can view open learning batches"
    on public.learning_batches for select
    using (status in ('open', 'full'));

create policy "Tutors can view own batches"
    on public.learning_batches for select
    using (auth.uid() = tutor_user_id);

create policy "Admins can view all learning batches"
    on public.learning_batches for select
    using (public.is_admin());

create policy "Tutors can create own batches"
    on public.learning_batches for insert
    with check (
        auth.uid() = tutor_user_id
        and exists (
            select 1 from public.profiles p
            where p.id = auth.uid() and p.role in ('tutor', 'admin')
        )
    );

create policy "Tutors can update own batches"
    on public.learning_batches for update
    using (auth.uid() = tutor_user_id)
    with check (auth.uid() = tutor_user_id);

create policy "Admins can manage all learning batches"
    on public.learning_batches for all
    using (public.is_admin());

grant execute on function public.assign_booking_to_batch(uuid) to authenticated;
grant execute on function public.batch_enrollment_count(uuid) to authenticated;
