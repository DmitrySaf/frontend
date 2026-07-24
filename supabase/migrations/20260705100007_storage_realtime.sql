-- Storage-бакеты (путь всегда начинается с {community_id}/) + realtime-публикация
-- lesson-videos: путь {community_id}/{channel_id}/… — доступ гейтится по каналу

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

-- Видео уроков — по доступу к каналу урока (video_path = имя объекта в бакете),
-- а не по одному лишь membership: иначе free-участник качал бы signed URL для
-- платного/приватного курса. Путь остаётся {community_id}/{file} — канал берём
-- из урока. has_channel_access покрывает и админа, и участника с грантом/open.
create policy "lesson_videos_member_read" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'lesson-videos'
    and exists (
      select 1 from public.course_lessons l
      where l.video_path = storage.objects.name
        and public.has_channel_access(public.lesson_channel(l.id))
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
