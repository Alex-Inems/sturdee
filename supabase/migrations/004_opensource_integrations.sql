-- Sturdee: open-source integration points + GitHub verification
-- Run after 003_micro_credentials.sql

alter table public.profiles
    add column if not exists github_username text,
    add column if not exists integration_points integer not null default 0;

-- ─── Integration completions ───────────────────────────────────────────────────

create table if not exists public.integration_completions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    tool_slug text not null,
    points integer not null,
    github_repo text,
    github_commit_sha text,
    github_push_url text,
    completed_at timestamptz not null default now(),
    unique (user_id, tool_slug)
);

create index if not exists integration_completions_user_id_idx on public.integration_completions (user_id);
create index if not exists integration_completions_tool_slug_idx on public.integration_completions (tool_slug);

alter table public.integration_completions enable row level security;

create policy "Users can view own integrations"
    on public.integration_completions for select
    using (auth.uid() = user_id);

create policy "Users can insert own integrations"
    on public.integration_completions for insert
    with check (auth.uid() = user_id);

create policy "Admins can view all integrations"
    on public.integration_completions for select
    using (public.is_admin());

-- ─── Integration workspaces (reuse pattern from micro-credentials) ───────────

create table if not exists public.integration_workspaces (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    tool_slug text not null,
    files jsonb not null default '{}',
    staged_files text[] not null default '{}',
    commits jsonb not null default '[]',
    updated_at timestamptz not null default now(),
    unique (user_id, tool_slug)
);

create index if not exists integration_workspaces_user_id_idx on public.integration_workspaces (user_id);

alter table public.integration_workspaces enable row level security;

create policy "Users can manage own integration workspaces"
    on public.integration_workspaces for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Admins can view all integration workspaces"
    on public.integration_workspaces for select
    using (public.is_admin());

-- Bump integration_points on completion

create or replace function public.award_integration_points()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    update public.profiles
    set integration_points = integration_points + new.points
    where id = new.user_id;
    return new;
end;
$$;

create trigger integration_points_award
    after insert on public.integration_completions
    for each row
    execute function public.award_integration_points();
