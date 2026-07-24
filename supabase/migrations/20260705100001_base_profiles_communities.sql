-- Базовая схема: профили, соцссылки, сообщества.
-- БД проекта Bean пуста — создаём всё с нуля по docs/db-schema.md.

create type public.social_platform as enum ('instagram', 'telegram', 'vk', 'youtube', 'website');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  display_name text not null,
  avatar_url text,
  bio text,
  privacy_settings jsonb not null default '{
    "show_owned_communities": {"enabled": true},
    "show_subscriptions": {"enabled": true},
    "allow_messaging": {"enabled": true}
  }'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profile_social_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  platform public.social_platform not null,
  label text,
  link text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index profile_social_links_profile_id_idx on public.profile_social_links (profile_id);

create table public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  display_name text not null,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  description text not null default '',
  cover_url text,
  logo_url text,
  visibility text not null default 'hidden' check (visibility in ('hidden', 'unlisted', 'live')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index communities_owner_id_idx on public.communities (owner_id);

create function public.set_updated_at() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end $$;

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_communities_updated_at before update on public.communities
  for each row execute function public.set_updated_at();

-- Профиль создаётся автоматически при регистрации (username из локальной части почты)
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  base_username text;
  candidate text;
  suffix int := 0;
begin
  base_username := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-zA-Z0-9_]', '', 'g'));
  if base_username is null or base_username = '' then
    base_username := 'user';
  end if;

  candidate := base_username;
  while exists (select 1 from public.profiles where username = candidate) loop
    suffix := suffix + 1;
    candidate := base_username || suffix::text;
  end loop;

  insert into public.profiles (id, username, display_name)
  values (new.id, candidate, split_part(new.email, '@', 1));

  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Бэкфил профилей для пользователей, зарегистрированных до миграции
insert into public.profiles (id, username, display_name)
select
  u.id,
  lower(regexp_replace(split_part(u.email, '@', 1), '[^a-zA-Z0-9_]', '', 'g')) || substr(u.id::text, 1, 4),
  split_part(u.email, '@', 1)
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

create type public.social_link_data as (
  platform public.social_platform,
  label text,
  link text
);

-- Атомарное обновление профиля вместе с полным набором соцссылок
create function public.update_profile_with_social_links(
  p_username text default null,
  p_display_name text default null,
  p_avatar_url text default null,
  p_bio text default null,
  p_social_links jsonb default null,
  p_privacy_settings jsonb default null
) returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then
    raise exception 'Требуется авторизация';
  end if;

  -- Для avatar_url/bio пустая строка = «очистить» (сигнал от клиента),
  -- null = «не трогать»; nullif превращает '' обратно в SQL NULL
  update public.profiles set
    username = coalesce(p_username, username),
    display_name = coalesce(p_display_name, display_name),
    avatar_url = case when p_avatar_url is null then avatar_url else nullif(p_avatar_url, '') end,
    bio = case when p_bio is null then bio else nullif(p_bio, '') end,
    privacy_settings = coalesce(p_privacy_settings, privacy_settings)
  where id = auth.uid();

  if p_social_links is not null then
    delete from public.profile_social_links where profile_id = auth.uid();

    insert into public.profile_social_links (profile_id, platform, label, link)
    select
      auth.uid(),
      (elem->>'platform')::public.social_platform,
      nullif(elem->>'label', ''),
      elem->>'link'
    from jsonb_array_elements(p_social_links) as elem
    where coalesce(elem->>'link', '') <> '';
  end if;
end $$;
