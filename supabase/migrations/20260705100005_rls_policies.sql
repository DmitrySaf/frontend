-- RLS: хелперы (security definer — без рекурсии политик) + политики по матрице прав.
-- Ключевые правила: прямой URL ≠ доступ; hidden-сообщество не видно гостю;
-- контент канала — только участникам с доступом; посты пишет только владелец сообщества.

-- ============================================================
-- Хелперы
-- ============================================================

create function public.is_community_member(p_community_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from community_members
    where community_id = p_community_id and user_id = auth.uid()
  );
$$;

create function public.is_community_owner(p_community_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from communities
    where id = p_community_id and owner_id = auth.uid()
  );
$$;

create function public.is_community_admin(p_community_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select public.is_community_owner(p_community_id)
    or exists (
      select 1 from community_members
      where community_id = p_community_id
        and user_id = auth.uid()
        and role in ('owner', 'admin')
    );
$$;

-- Витрина открыта без инвайта (не hidden)
create function public.community_is_open(p_community_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from communities
    where id = p_community_id and visibility in ('unlisted', 'live')
  );
$$;

create function public.channel_community(p_channel_id uuid) returns uuid
language sql stable security definer set search_path = public as $$
  select community_id from community_channels where id = p_channel_id;
$$;

create function public.has_channel_grant(p_channel_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from channel_grants
    where channel_id = p_channel_id and user_id = auth.uid()
  );
$$;

-- Доступ к контенту канала: админ всегда; участник — open или по гранту
create function public.has_channel_access(p_channel_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from community_channels ch
    where ch.id = p_channel_id
      and (
        public.is_community_admin(ch.community_id)
        or (
          public.is_community_member(ch.community_id)
          and (ch.access = 'open' or public.has_channel_grant(ch.id))
        )
      )
  );
$$;

create function public.has_post_access(p_post_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from posts p
    where p.id = p_post_id and public.has_channel_access(p.channel_id)
  );
$$;

create function public.can_moderate_post(p_post_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from posts p
    where p.id = p_post_id
      and public.is_community_admin(public.channel_community(p.channel_id))
  );
$$;

create function public.course_channel(p_course_id uuid) returns uuid
language sql stable security definer set search_path = public as $$
  select channel_id from courses where id = p_course_id;
$$;

create function public.module_channel(p_module_id uuid) returns uuid
language sql stable security definer set search_path = public as $$
  select c.channel_id
  from course_modules m
  join courses c on c.id = m.course_id
  where m.id = p_module_id;
$$;

create function public.lesson_channel(p_lesson_id uuid) returns uuid
language sql stable security definer set search_path = public as $$
  select public.module_channel(l.module_id) from course_lessons l where l.id = p_lesson_id;
$$;

-- ============================================================
-- profiles / profile_social_links
-- ============================================================

alter table public.profiles enable row level security;

create policy "profiles_select_all" on public.profiles
  for select to anon, authenticated using (true);

create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (id = auth.uid());

create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

alter table public.profile_social_links enable row level security;

create policy "social_links_select_all" on public.profile_social_links
  for select to anon, authenticated using (true);

create policy "social_links_insert_own" on public.profile_social_links
  for insert to authenticated with check (profile_id = auth.uid());

create policy "social_links_update_own" on public.profile_social_links
  for update to authenticated using (profile_id = auth.uid()) with check (profile_id = auth.uid());

create policy "social_links_delete_own" on public.profile_social_links
  for delete to authenticated using (profile_id = auth.uid());

-- ============================================================
-- communities: hidden не виден гостю (единообразный 404 на клиенте)
-- ============================================================

alter table public.communities enable row level security;

create policy "communities_select_visible" on public.communities
  for select to anon, authenticated
  using (
    visibility in ('unlisted', 'live')
    or owner_id = auth.uid()
    or public.is_community_member(id)
  );

create policy "communities_insert_own" on public.communities
  for insert to authenticated with check (owner_id = auth.uid());

create policy "communities_update_owner" on public.communities
  for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

create policy "communities_delete_owner" on public.communities
  for delete to authenticated using (owner_id = auth.uid());

-- ============================================================
-- community_storefronts
-- ============================================================

alter table public.community_storefronts enable row level security;

create policy "storefronts_select_visible" on public.community_storefronts
  for select to anon, authenticated
  using (
    public.community_is_open(community_id)
    or public.is_community_member(community_id)
    or public.is_community_admin(community_id)
  );

create policy "storefronts_insert_admin" on public.community_storefronts
  for insert to authenticated with check (public.is_community_admin(community_id));

create policy "storefronts_update_admin" on public.community_storefronts
  for update to authenticated
  using (public.is_community_admin(community_id))
  with check (public.is_community_admin(community_id));

-- ============================================================
-- community_members: вступление только через RPC (security definer)
-- ============================================================

alter table public.community_members enable row level security;

create policy "members_select_own_or_admin" on public.community_members
  for select to authenticated
  using (user_id = auth.uid() or public.is_community_admin(community_id));

create policy "members_delete_leave" on public.community_members
  for delete to authenticated
  using (user_id = auth.uid() and role <> 'owner');

-- ============================================================
-- community_invites: создаёт любой участник, отзывает админ;
-- гостевая проверка кода — только через RPC validate_invite
-- ============================================================

alter table public.community_invites enable row level security;

create policy "invites_select_members" on public.community_invites
  for select to authenticated
  using (public.is_community_member(community_id) or public.is_community_admin(community_id));

create policy "invites_insert_members" on public.community_invites
  for insert to authenticated
  with check (
    created_by = auth.uid()
    and (public.is_community_member(community_id) or public.is_community_admin(community_id))
  );

create policy "invites_update_admin" on public.community_invites
  for update to authenticated
  using (public.is_community_admin(community_id))
  with check (public.is_community_admin(community_id));

-- ============================================================
-- community_categories / community_channels / channel_grants
-- ============================================================

alter table public.community_categories enable row level security;

create policy "categories_select_members" on public.community_categories
  for select to authenticated
  using (public.is_community_member(community_id) or public.is_community_admin(community_id));

create policy "categories_insert_admin" on public.community_categories
  for insert to authenticated with check (public.is_community_admin(community_id));

create policy "categories_update_admin" on public.community_categories
  for update to authenticated
  using (public.is_community_admin(community_id))
  with check (public.is_community_admin(community_id));

create policy "categories_delete_admin" on public.community_categories
  for delete to authenticated using (public.is_community_admin(community_id));

alter table public.community_channels enable row level security;

-- secret-канал не виден участнику без гранта; private виден (контент закрыт политиками контента)
create policy "channels_select_visible" on public.community_channels
  for select to authenticated
  using (
    public.is_community_admin(community_id)
    or (
      public.is_community_member(community_id)
      and (access in ('open', 'private') or public.has_channel_grant(id))
    )
  );

create policy "channels_insert_admin" on public.community_channels
  for insert to authenticated with check (public.is_community_admin(community_id));

create policy "channels_update_admin" on public.community_channels
  for update to authenticated
  using (public.is_community_admin(community_id))
  with check (public.is_community_admin(community_id));

create policy "channels_delete_admin" on public.community_channels
  for delete to authenticated using (public.is_community_admin(community_id));

alter table public.channel_grants enable row level security;

create policy "grants_select_own_or_admin" on public.channel_grants
  for select to authenticated
  using (user_id = auth.uid() or public.is_community_admin(public.channel_community(channel_id)));

create policy "grants_insert_admin" on public.channel_grants
  for insert to authenticated
  with check (public.is_community_admin(public.channel_community(channel_id)));

create policy "grants_delete_admin" on public.channel_grants
  for delete to authenticated
  using (public.is_community_admin(public.channel_community(channel_id)));

-- ============================================================
-- messages: писать может любой участник с доступом; редактирует автор;
-- soft delete (update deleted_at) — автор или админ
-- ============================================================

alter table public.messages enable row level security;

create policy "messages_select_access" on public.messages
  for select to authenticated using (public.has_channel_access(channel_id));

create policy "messages_insert_own" on public.messages
  for insert to authenticated
  with check (author_id = auth.uid() and public.has_channel_access(channel_id));

create policy "messages_update_author_or_admin" on public.messages
  for update to authenticated
  using (author_id = auth.uid() or public.is_community_admin(public.channel_community(channel_id)))
  with check (author_id = auth.uid() or public.is_community_admin(public.channel_community(channel_id)));

-- ============================================================
-- posts: читают участники с доступом; создаёт ТОЛЬКО владелец сообщества
-- (решение чекпоинта 2026-07-05); пин/удаление — автор или админ
-- ============================================================

alter table public.posts enable row level security;

create policy "posts_select_access" on public.posts
  for select to authenticated using (public.has_channel_access(channel_id));

create policy "posts_insert_owner_only" on public.posts
  for insert to authenticated
  with check (
    author_id = auth.uid()
    and public.is_community_owner(public.channel_community(channel_id))
  );

create policy "posts_update_author_or_admin" on public.posts
  for update to authenticated
  using (author_id = auth.uid() or public.is_community_admin(public.channel_community(channel_id)))
  with check (author_id = auth.uid() or public.is_community_admin(public.channel_community(channel_id)));

create policy "posts_delete_author_or_admin" on public.posts
  for delete to authenticated
  using (author_id = auth.uid() or public.is_community_admin(public.channel_community(channel_id)));

alter table public.post_likes enable row level security;

create policy "post_likes_select_access" on public.post_likes
  for select to authenticated using (public.has_post_access(post_id));

create policy "post_likes_insert_own" on public.post_likes
  for insert to authenticated
  with check (user_id = auth.uid() and public.has_post_access(post_id));

create policy "post_likes_delete_own" on public.post_likes
  for delete to authenticated using (user_id = auth.uid());

alter table public.post_bookmarks enable row level security;

create policy "post_bookmarks_select_own" on public.post_bookmarks
  for select to authenticated using (user_id = auth.uid());

create policy "post_bookmarks_insert_own" on public.post_bookmarks
  for insert to authenticated
  with check (user_id = auth.uid() and public.has_post_access(post_id));

create policy "post_bookmarks_delete_own" on public.post_bookmarks
  for delete to authenticated using (user_id = auth.uid());

alter table public.post_comments enable row level security;

create policy "post_comments_select_access" on public.post_comments
  for select to authenticated using (public.has_post_access(post_id));

create policy "post_comments_insert_own" on public.post_comments
  for insert to authenticated
  with check (author_id = auth.uid() and public.has_post_access(post_id));

create policy "post_comments_delete_author_or_admin" on public.post_comments
  for delete to authenticated
  using (author_id = auth.uid() or public.can_moderate_post(post_id));

-- ============================================================
-- courses / modules / lessons / progress
-- ============================================================

alter table public.courses enable row level security;

create policy "courses_select_access" on public.courses
  for select to authenticated using (public.has_channel_access(channel_id));

create policy "courses_insert_admin" on public.courses
  for insert to authenticated
  with check (public.is_community_admin(public.channel_community(channel_id)));

create policy "courses_update_admin" on public.courses
  for update to authenticated
  using (public.is_community_admin(public.channel_community(channel_id)))
  with check (public.is_community_admin(public.channel_community(channel_id)));

create policy "courses_delete_admin" on public.courses
  for delete to authenticated
  using (public.is_community_admin(public.channel_community(channel_id)));

alter table public.course_modules enable row level security;

create policy "modules_select_access" on public.course_modules
  for select to authenticated
  using (public.has_channel_access(public.course_channel(course_id)));

create policy "modules_insert_admin" on public.course_modules
  for insert to authenticated
  with check (public.is_community_admin(public.channel_community(public.course_channel(course_id))));

create policy "modules_update_admin" on public.course_modules
  for update to authenticated
  using (public.is_community_admin(public.channel_community(public.course_channel(course_id))))
  with check (public.is_community_admin(public.channel_community(public.course_channel(course_id))));

create policy "modules_delete_admin" on public.course_modules
  for delete to authenticated
  using (public.is_community_admin(public.channel_community(public.course_channel(course_id))));

alter table public.course_lessons enable row level security;

create policy "lessons_select_access" on public.course_lessons
  for select to authenticated
  using (public.has_channel_access(public.module_channel(module_id)));

create policy "lessons_insert_admin" on public.course_lessons
  for insert to authenticated
  with check (public.is_community_admin(public.channel_community(public.module_channel(module_id))));

create policy "lessons_update_admin" on public.course_lessons
  for update to authenticated
  using (public.is_community_admin(public.channel_community(public.module_channel(module_id))))
  with check (public.is_community_admin(public.channel_community(public.module_channel(module_id))));

create policy "lessons_delete_admin" on public.course_lessons
  for delete to authenticated
  using (public.is_community_admin(public.channel_community(public.module_channel(module_id))));

alter table public.lesson_progress enable row level security;

create policy "progress_select_own" on public.lesson_progress
  for select to authenticated using (user_id = auth.uid());

create policy "progress_insert_own" on public.lesson_progress
  for insert to authenticated
  with check (user_id = auth.uid() and public.has_channel_access(public.lesson_channel(lesson_id)));

create policy "progress_delete_own" on public.lesson_progress
  for delete to authenticated using (user_id = auth.uid());

-- ============================================================
-- Монетизация
-- ============================================================

alter table public.pricing_tiers enable row level security;

-- Гость видит активные нескрытые тарифы открытых сообществ; скрытые — только через RPC по инвайту
create policy "tiers_select_visible" on public.pricing_tiers
  for select to anon, authenticated
  using (
    public.is_community_admin(community_id)
    or (
      is_active
      and not is_hidden
      and (public.community_is_open(community_id) or public.is_community_member(community_id))
    )
  );

create policy "tiers_insert_admin" on public.pricing_tiers
  for insert to authenticated with check (public.is_community_admin(community_id));

create policy "tiers_update_admin" on public.pricing_tiers
  for update to authenticated
  using (public.is_community_admin(community_id))
  with check (public.is_community_admin(community_id));

create policy "tiers_delete_admin" on public.pricing_tiers
  for delete to authenticated using (public.is_community_admin(community_id));

-- Подписки/транзакции создаются только RPC simulate_purchase (security definer)
alter table public.subscriptions enable row level security;

create policy "subscriptions_select_own_or_admin" on public.subscriptions
  for select to authenticated
  using (user_id = auth.uid() or public.is_community_admin(community_id));

alter table public.transactions enable row level security;

create policy "transactions_select_own_or_admin" on public.transactions
  for select to authenticated
  using (
    user_id = auth.uid()
    or (community_id is not null and public.is_community_admin(community_id))
  );

alter table public.payout_methods enable row level security;

create policy "payout_methods_select_own" on public.payout_methods
  for select to authenticated using (user_id = auth.uid());

create policy "payout_methods_insert_own" on public.payout_methods
  for insert to authenticated with check (user_id = auth.uid());

create policy "payout_methods_update_own" on public.payout_methods
  for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "payout_methods_delete_own" on public.payout_methods
  for delete to authenticated using (user_id = auth.uid());

alter table public.verification_requests enable row level security;

create policy "verification_select_own" on public.verification_requests
  for select to authenticated using (user_id = auth.uid());

create policy "verification_insert_own" on public.verification_requests
  for insert to authenticated with check (user_id = auth.uid());

-- update своей заявки нужен для тест-кнопки «Симулировать одобрение» (v1)
create policy "verification_update_own" on public.verification_requests
  for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
