-- Sturdee: micro-credentials via simulated Git workspaces
-- Run after 001_initial_schema.sql

-- ─── Simulated Git workspaces ────────────────────────────────────────────────

create table if not exists public.user_workspaces (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    challenge_id text not null,
    files jsonb not null default '{}',
    staged_files text[] not null default '{}',
    commits jsonb not null default '[]',
    updated_at timestamptz not null default now(),
    unique (user_id, challenge_id)
);

create index if not exists user_workspaces_user_id_idx on public.user_workspaces (user_id);

alter table public.user_workspaces enable row level security;

create policy "Users can view own workspaces"
    on public.user_workspaces for select
    using (auth.uid() = user_id);

create policy "Users can insert own workspaces"
    on public.user_workspaces for insert
    with check (auth.uid() = user_id);

create policy "Users can update own workspaces"
    on public.user_workspaces for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Admins can view all workspaces"
    on public.user_workspaces for select
    using (public.is_admin());

-- ─── Micro-certificates (cryptographically signed) ───────────────────────────

create table if not exists public.micro_certificates (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    user_name text not null,
    challenge_id text not null,
    title text not null,
    skill text not null,
    category text not null,
    commit_sha text not null,
    verification_code text not null unique,
    signature text not null,
    commit_log jsonb not null default '[]',
    files_snapshot jsonb not null default '{}',
    issued_at timestamptz not null default now(),
    unique (user_id, challenge_id)
);

create index if not exists micro_certificates_user_id_idx on public.micro_certificates (user_id);
create index if not exists micro_certificates_verification_code_idx on public.micro_certificates (verification_code);

alter table public.micro_certificates enable row level security;

create policy "Users can view own certificates"
    on public.micro_certificates for select
    using (auth.uid() = user_id);

create policy "Admins can view all certificates"
    on public.micro_certificates for select
    using (public.is_admin());

-- Public verification reads via service role API route only (no anon select)

create policy "Users can receive own certificates"
    on public.micro_certificates for insert
    with check (auth.uid() = user_id);

-- Public verification by code (security definer — no broad table exposure)

create or replace function public.get_certificate_by_code(p_code text)
returns json
language plpgsql
security definer
set search_path = public
stable
as $$
declare
    result json;
begin
    select to_json(c.*) into result
    from public.micro_certificates c
    where c.verification_code = p_code
    limit 1;
    return result;
end;
$$;

grant execute on function public.get_certificate_by_code(text) to anon, authenticated;
