-- Контент: чат, посты, курсы

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.community_channels (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  attachments jsonb,
  created_at timestamptz not null default now(),
  -- updated_at ставится клиентом только при редактировании текста (метка «изменено»)
  updated_at timestamptz,
  deleted_at timestamptz
);

create index messages_channel_created_idx on public.messages (channel_id, created_at);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references public.community_channels (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  content text not null,
  cover_url text,
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index posts_channel_id_idx on public.posts (channel_id);

create table public.post_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

create table public.post_bookmarks (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

create table public.post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index post_comments_post_id_idx on public.post_comments (post_id);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null unique references public.community_channels (id) on delete cascade,
  title text not null default '',
  description text not null default '',
  cover_url text,
  created_at timestamptz not null default now()
);

create table public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  title text not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index course_modules_course_id_idx on public.course_modules (course_id);

create table public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules (id) on delete cascade,
  title text not null,
  description text not null default '',
  video_path text,
  duration_seconds int,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index course_lessons_module_id_idx on public.course_lessons (module_id);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.course_lessons (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (lesson_id, user_id)
);

create index lesson_progress_user_id_idx on public.lesson_progress (user_id);
