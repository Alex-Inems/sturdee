-- Student / Tutor account roles (replaces generic "user")
-- Drop ANY check constraint on profiles.role first, then migrate values.

do $$
declare
    r record;
begin
    for r in
        select c.conname
        from pg_constraint c
        join pg_class t on c.conrelid = t.oid
        join pg_namespace n on n.oid = t.relnamespace
        where t.relname = 'profiles'
          and n.nspname = 'public'
          and c.contype = 'c'
          and pg_get_constraintdef(c.oid) ilike '%role%'
    loop
        execute format('alter table public.profiles drop constraint %I', r.conname);
    end loop;
end $$;

-- Legacy rows used role = 'user'
update public.profiles set role = 'student' where role = 'user';

-- Guard: no unexpected role values before adding the new check
update public.profiles
set role = 'student'
where role is null or role not in ('student', 'tutor', 'admin');

alter table public.profiles
    add constraint profiles_role_check
    check (role in ('student', 'tutor', 'admin'));

alter table public.profiles
    alter column role set default 'student';

-- New sign-ups: honour account_role from auth metadata (student | tutor)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    chosen_role text;
begin
    chosen_role := lower(coalesce(new.raw_user_meta_data ->> 'account_role', 'student'));
    if chosen_role not in ('student', 'tutor') then
        chosen_role := 'student';
    end if;

    if new.email in ('admin@sturdee.online') then
        chosen_role := 'admin';
    end if;

    insert into public.profiles (id, email, name, role)
    values (
        new.id,
        new.email,
        coalesce(
            new.raw_user_meta_data ->> 'name',
            new.raw_user_meta_data ->> 'full_name',
            split_part(new.email, '@', 1)
        ),
        chosen_role
    );
    return new;
end;
$$;
