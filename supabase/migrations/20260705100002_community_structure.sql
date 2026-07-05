-- Структура сообщества: витрина, участники, инвайты, категории, каналы, гранты

create table public.community_storefronts (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null unique references public.communities (id) on delete cascade,
  description text not null default '',
  media jsonb not null default '[]'::jsonb,
  features jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now()
);

create trigger set_community_storefronts_updated_at before update on public.community_storefronts
  for each row execute function public.set_updated_at();

create table public.community_members (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  unique (community_id, user_id)
);

create index community_members_user_id_idx on public.community_members (user_id);

create table public.community_categories (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities (id) on delete cascade,
  name text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index community_categories_community_id_idx on public.community_categories (community_id);

create table public.community_channels (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities (id) on delete cascade,
  category_id uuid references public.community_categories (id) on delete set null,
  type text not null check (type in ('chat', 'posts', 'course')),
  name text not null,
  slug text not null,
  access text not null default 'open' check (access in ('open', 'private', 'secret')),
  position int not null default 0,
  created_at timestamptz not null default now(),
  unique (community_id, slug)
);

create index community_channels_community_id_idx on public.community_channels (community_id);

create table public.channel_grants (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.community_channels (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  granted_at timestamptz not null default now(),
  unique (channel_id, user_id)
);

create index channel_grants_user_id_idx on public.channel_grants (user_id);

create table public.community_invites (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities (id) on delete cascade,
  -- Инвайт на private/secret-канал: membership + грант канала одним действием
  channel_id uuid references public.community_channels (id) on delete cascade,
  code text not null unique,
  created_by uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz,
  max_uses int,
  uses int not null default 0,
  revoked_at timestamptz
);

create index community_invites_community_id_idx on public.community_invites (community_id);

-- Новое сообщество: membership владельца + витрина + структура по умолчанию («Начало» + #общий-чат)
create function public.handle_new_community() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  new_category_id uuid;
begin
  insert into public.community_members (community_id, user_id, role)
  values (new.id, new.owner_id, 'owner');

  insert into public.community_storefronts (community_id)
  values (new.id);

  insert into public.community_categories (community_id, name, position)
  values (new.id, 'Начало', 0)
  returning id into new_category_id;

  insert into public.community_channels (community_id, category_id, type, name, slug, position)
  values (new.id, new_category_id, 'chat', 'общий-чат', 'obschiy-chat', 0);

  return new;
end $$;

create trigger on_community_created after insert on public.communities
  for each row execute function public.handle_new_community();
