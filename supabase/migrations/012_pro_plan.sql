-- Pro plan ($20/mo) for AI Tutor, Practice Coach, and AI skill matching.

alter table public.profiles
    add column if not exists plan text not null default 'free'
        check (plan in ('free', 'pro')),
    add column if not exists plan_status text not null default 'inactive'
        check (plan_status in ('inactive', 'active', 'past_due', 'canceled', 'trialing')),
    add column if not exists stripe_customer_id text,
    add column if not exists stripe_subscription_id text,
    add column if not exists plan_period_end timestamptz;

create index if not exists profiles_stripe_customer_id_idx
    on public.profiles (stripe_customer_id)
    where stripe_customer_id is not null;

create index if not exists profiles_plan_idx
    on public.profiles (plan, plan_status);

-- Admins always treated as Pro in app logic; DB can stay free.
