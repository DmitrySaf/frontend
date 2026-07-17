import { ChannelSkeleton } from "@/pages/community-channel";

// Вход в сообщество → резолв первого канала. Тот же скелетон канала, что и на
// целевом маршруте — визуально переход не «прыгает».
export default function Loading() {
  return <ChannelSkeleton />;
}
