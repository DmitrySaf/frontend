import { ChannelSkeleton } from "@/pages/community-channel";

// Мгновенный fallback при переходе в канал: сайдбары сохраняются, тело — скелетон.
// Тот же ChannelSkeleton показывает CommunityChannelPage, пока грузит структуру,
// — переход loading.tsx → страница → контент бесшовный.
export default function Loading() {
  return <ChannelSkeleton />;
}
