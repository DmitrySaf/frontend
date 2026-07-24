-- RPC: витрина (server-side проверка приватности), вступление, инвайты, симуляция покупки.
-- Все проверки срока/лимита инвайтов — атомарные, на сервере (спецификация 2026-07-04).

-- ============================================================
-- Витрина сообщества одним запросом.
-- hidden без валидного инвайта → found=false (единообразный 404).
-- Скрытые тарифы включаются только при валидном инвайте.
-- ============================================================

create function public.get_storefront(p_slug text, p_invite_code text default null)
returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  comm record;
  inv record;
  inv_valid boolean := false;
  invite_json jsonb := null;
  viewer_is_member boolean := false;
  viewer_is_owner boolean := false;
  has_access boolean;
  tiers_json jsonb;
  storefront_json jsonb;
  owner_json jsonb;
  members_count int;
begin
  select id, name, display_name, description, cover_url, logo_url, visibility, owner_id
  into comm
  from communities
  where name = p_slug;

  if not found then
    return jsonb_build_object('found', false);
  end if;

  if p_invite_code is not null then
    select * into inv
    from community_invites
    where code = p_invite_code and community_id = comm.id;

    if found then
      inv_valid := inv.revoked_at is null
        and (inv.expires_at is null or inv.expires_at > now())
        and (inv.max_uses is null or inv.uses < inv.max_uses);

      invite_json := jsonb_build_object(
        'code', inv.code,
        'channel_id', inv.channel_id,
        'valid', inv_valid
      );
    end if;
  end if;

  if auth.uid() is not null then
    viewer_is_owner := comm.owner_id = auth.uid();
    viewer_is_member := viewer_is_owner or exists (
      select 1 from community_members
      where community_id = comm.id and user_id = auth.uid()
    );
  end if;

  has_access := comm.visibility in ('unlisted', 'live')
    or viewer_is_member
    or inv_valid;

  if not has_access then
    return jsonb_build_object('found', false);
  end if;

  select coalesce(jsonb_agg(to_jsonb(t) order by t.position, t.created_at), '[]'::jsonb)
  into tiers_json
  from (
    select id, name, kind, is_hidden, price_kopeks, period_months,
           discount_percent, is_active, position, created_at
    from pricing_tiers
    where community_id = comm.id
      and is_active
      and (not is_hidden or inv_valid)
  ) t;

  select jsonb_build_object(
    'description', s.description,
    'media', s.media,
    'features', s.features
  )
  into storefront_json
  from community_storefronts s
  where s.community_id = comm.id;

  select jsonb_build_object(
    'display_name', p.display_name,
    'username', p.username,
    'avatar_url', p.avatar_url,
    'bio', p.bio
  )
  into owner_json
  from profiles p
  where p.id = comm.owner_id;

  select count(*) into members_count
  from community_members
  where community_id = comm.id;

  return jsonb_build_object(
    'found', true,
    'community', jsonb_build_object(
      'id', comm.id,
      'name', comm.name,
      'display_name', comm.display_name,
      'description', comm.description,
      'cover_url', comm.cover_url,
      'logo_url', comm.logo_url,
      'visibility', comm.visibility
    ),
    'storefront', coalesce(storefront_json, jsonb_build_object(
      'description', '', 'media', '[]'::jsonb, 'features', '[]'::jsonb
    )),
    'owner', owner_json,
    'members_count', members_count,
    'tiers', tiers_json,
    'invite', invite_json,
    'viewer', jsonb_build_object('is_member', viewer_is_member, 'is_owner', viewer_is_owner)
  );
end $$;

-- ============================================================
-- Бесплатное вступление с открытой витрины (без инвайта)
-- ============================================================

create function public.join_free_community(p_community_id uuid)
returns void
language plpgsql volatile security definer set search_path = public as $$
begin
  if auth.uid() is null then
    raise exception 'Требуется авторизация';
  end if;

  if exists (
    select 1 from community_members
    where community_id = p_community_id and user_id = auth.uid()
  ) then
    return;
  end if;

  if not public.community_is_open(p_community_id) then
    raise exception 'Сообщество недоступно';
  end if;

  -- Любой активный тариф (в т.ч. hidden invite-only) → сообщество платное.
  -- hidden — замена bypass-флагам, оплата только через simulate_purchase.
  if exists (
    select 1 from pricing_tiers
    where community_id = p_community_id and is_active
  ) then
    raise exception 'PAYMENT_REQUIRED';
  end if;

  insert into community_members (community_id, user_id, role)
  values (p_community_id, auth.uid(), 'member')
  on conflict (community_id, user_id) do nothing;
end $$;

-- ============================================================
-- Переход по инвайту: атомарная проверка + membership (бесплатные сообщества)
-- + грант канала. Действующий участник uses не тратит.
-- Платное сообщество без membership → PAYMENT_REQUIRED (оплата через simulate_purchase).
-- ============================================================

create function public.consume_invite(p_code text)
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare
  inv record;
  was_member boolean;
begin
  if auth.uid() is null then
    raise exception 'Требуется авторизация';
  end if;

  select * into inv
  from community_invites
  where code = p_code
  for update;

  if not found
    or inv.revoked_at is not null
    or (inv.expires_at is not null and inv.expires_at <= now())
    or (inv.max_uses is not null and inv.uses >= inv.max_uses)
  then
    raise exception 'Ссылка недействительна';
  end if;

  was_member := exists (
    select 1 from community_members
    where community_id = inv.community_id and user_id = auth.uid()
  );

  if not was_member then
    if exists (
      select 1 from pricing_tiers
      where community_id = inv.community_id and is_active
    ) then
      raise exception 'PAYMENT_REQUIRED';
    end if;

    insert into community_members (community_id, user_id, role)
    values (inv.community_id, auth.uid(), 'member')
    on conflict (community_id, user_id) do nothing;

    update community_invites set uses = uses + 1 where id = inv.id;
  end if;

  if inv.channel_id is not null then
    insert into channel_grants (channel_id, user_id)
    values (inv.channel_id, auth.uid())
    on conflict (channel_id, user_id) do nothing;
  end if;

  return jsonb_build_object('community_id', inv.community_id, 'channel_id', inv.channel_id);
end $$;

-- ============================================================
-- Симуляция покупки: подписка + транзакция + membership атомарно.
-- Скрытый тариф требует валидный инвайт; hidden-сообщество — доступ по инвайту/membership.
-- ============================================================

create function public.simulate_purchase(p_tier_id uuid, p_invite_code text default null)
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare
  tier record;
  inv record;
  inv_valid boolean := false;
  was_member boolean;
  sub_expires timestamptz;
begin
  if auth.uid() is null then
    raise exception 'Требуется авторизация';
  end if;

  select * into tier from pricing_tiers where id = p_tier_id;

  if not found or not tier.is_active then
    raise exception 'Тариф недоступен';
  end if;

  if p_invite_code is not null then
    select * into inv
    from community_invites
    where code = p_invite_code and community_id = tier.community_id
    for update;

    if found then
      inv_valid := inv.revoked_at is null
        and (inv.expires_at is null or inv.expires_at > now())
        and (inv.max_uses is null or inv.uses < inv.max_uses);
    end if;
  end if;

  was_member := exists (
    select 1 from community_members
    where community_id = tier.community_id and user_id = auth.uid()
  );

  if not (public.community_is_open(tier.community_id) or was_member or inv_valid) then
    raise exception 'Сообщество недоступно';
  end if;

  if tier.is_hidden and not inv_valid then
    raise exception 'Тариф доступен только по приглашению';
  end if;

  sub_expires := case
    when tier.kind = 'recurring' and tier.period_months is not null
      then now() + make_interval(months => tier.period_months)
    else null
  end;

  -- Не плодим дубли active-подписок (двойной клик, апгрейд/продление тарифа)
  update subscriptions set status = 'canceled'
  where user_id = auth.uid() and community_id = tier.community_id and status = 'active';

  insert into subscriptions (user_id, community_id, tier_id, status, started_at, expires_at)
  values (auth.uid(), tier.community_id, tier.id, 'active', now(), sub_expires);

  insert into transactions (user_id, community_id, type, amount_kopeks, status, metadata)
  values (
    auth.uid(), tier.community_id, 'subscription', tier.price_kopeks, 'succeeded',
    jsonb_build_object('tier_id', tier.id, 'tier_name', tier.name)
  );

  insert into community_members (community_id, user_id, role)
  values (tier.community_id, auth.uid(), 'member')
  on conflict (community_id, user_id) do nothing;

  if inv_valid then
    if not was_member then
      update community_invites set uses = uses + 1 where id = inv.id;
    end if;

    if inv.channel_id is not null then
      insert into channel_grants (channel_id, user_id)
      values (inv.channel_id, auth.uid())
      on conflict (channel_id, user_id) do nothing;
    end if;
  end if;

  return jsonb_build_object('community_id', tier.community_id);
end $$;
