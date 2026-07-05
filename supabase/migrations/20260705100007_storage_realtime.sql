-- Storage-бакеты (путь всегда начинается с {community_id}/) + realtime-публикация

insert into storage.buckets (id, name, public)
values
  ('community-covers', 'community-covers', true),
  ('community-logos', 'community-logos', true),
  ('post-covers', 'post-covers', true),
  ('lesson-videos', 'lesson-videos', false)
on conflict (id) do nothing;

-- Публичные медиа читают все (обложки, логотипы, обложки постов)
create policy "media_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id in ('community-covers', 'community-logos', 'post-covers'));

-- Видео уроков — только участникам сообщества (signed URL создаётся под этой политикой)
create policy "lesson_videos_member_read" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'lesson-videos'
    and (
      public.is_community_member(((storage.foldername(name))[1])::uuid)
      or public.is_community_admin(((storage.foldername(name))[1])::uuid)
    )
  );

-- Запись во все бакеты — только админ сообщества из первого сегмента пути
create policy "community_media_admin_insert" on storage.objects
  for insert to authenticated
  with check (
    bucket_id in ('community-covers', 'community-logos', 'post-covers', 'lesson-videos')
    and public.is_community_admin(((storage.foldername(name))[1])::uuid)
  );

create policy "community_media_admin_update" on storage.objects
  for update to authenticated
  using (
    bucket_id in ('community-covers', 'community-logos', 'post-covers', 'lesson-videos')
    and public.is_community_admin(((storage.foldername(name))[1])::uuid)
  )
  with check (
    bucket_id in ('community-covers', 'community-logos', 'post-covers', 'lesson-videos')
    and public.is_community_admin(((storage.foldername(name))[1])::uuid)
  );

create policy "community_media_admin_delete" on storage.objects
  for delete to authenticated
  using (
    bucket_id in ('community-covers', 'community-logos', 'post-covers', 'lesson-videos')
    and public.is_community_admin(((storage.foldername(name))[1])::uuid)
  );

-- Realtime: чат и посты (postgres_changes уважает RLS подписчика)
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.posts;
alter publication supabase_realtime add table public.post_comments;
