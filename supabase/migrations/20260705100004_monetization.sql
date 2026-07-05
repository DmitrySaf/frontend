-- Монетизация: тарифы, подписки, транзакции, вывод средств, верификация

create table public.pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities (id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('recurring', 'one_time')),
  -- Скрытый тариф виден только по invite-ссылке (замена bypass-флагам)
  is_hidden boolean not null default false,
  price_kopeks int not null check (price_kopeks > 0),
  period_months int check (period_months > 0),
  discount_percent int check (discount_percent between 1 and 99),
  is_active boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index pricing_tiers_community_id_idx on public.pricing_tiers (community_id);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  community_id uuid not null references public.communities (id) on delete cascade,
  -- set null: удаление тарифа не стирает историю подписок
  tier_id uuid references public.pricing_tiers (id) on delete set null,
  status text not null default 'active' check (status in ('active', 'canceled', 'expired')),
  started_at timestamptz not null default now(),
  -- null — бессрочно (one_time)
  expires_at timestamptz
);

create index subscriptions_community_id_idx on public.subscriptions (community_id);
create index subscriptions_user_id_idx on public.subscriptions (user_id);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  community_id uuid references public.communities (id) on delete set null,
  type text not null check (type in ('subscription', 'payout')),
  amount_kopeks int not null,
  status text not null default 'succeeded' check (status in ('succeeded', 'pending', 'failed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index transactions_user_id_idx on public.transactions (user_id);
create index transactions_community_id_idx on public.transactions (community_id);

create table public.payout_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null default 'card' check (kind = 'card'),
  last4 text not null,
  brand text not null,
  holder_name text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index payout_methods_user_id_idx on public.payout_methods (user_id);

create table public.verification_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('passport', 'self_employed', 'ip', 'ooo')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  data jsonb not null default '{}'::jsonb,
  submitted_at timestamptz not null default now()
);

create index verification_requests_user_id_idx on public.verification_requests (user_id);
