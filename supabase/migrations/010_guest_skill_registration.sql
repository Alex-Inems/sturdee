-- Allow skill registration without an account (guest bookings).

alter table public.bookings
    alter column user_id drop not null;

create index if not exists bookings_user_email_skill_idx
    on public.bookings (lower(user_email), skill_slug)
    where status in ('pending', 'confirmed');

-- Service role creates guest bookings + runs assignment RPC.
grant execute on function public.assign_booking_to_batch(uuid) to service_role;
grant execute on function public.batch_enrollment_count(uuid) to service_role;

