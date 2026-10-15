/* Pro plan ($20/mo) for AI Tutor, Practice Coach, and AI skill matching */

alter table public.profiles
    add column if not exists plan text not null default 'free';

alter table public.profiles
    drop constraint if exists profiles_plan_check;

alter table public.profiles
    add constraint profiles_plan_check check (plan in ('free', 'pro'));

alter table public.profiles
    add column if not exists plan_status text not null default 'inactive';

alter table public.profiles
    drop constraint if exists profiles_plan_status_check;

alter table public.profiles
    add constraint profiles_plan_status_check
        check (plan_status in ('inactive', 'active', 'past_due', 'canceled', 'trialing'));

alter table public.profiles
    add column if not exists stripe_customer_id text;

alter table public.profiles
    add column if not exists stripe_subscription_id text;

alter table public.profiles
    add column if not exists plan_period_end timestamptz;

create index if not exists profiles_stripe_customer_id_idx
    on public.profiles (stripe_customer_id)
    where stripe_customer_id is not null;

create index if not exists profiles_plan_idx
    on public.profiles (plan, plan_status);
