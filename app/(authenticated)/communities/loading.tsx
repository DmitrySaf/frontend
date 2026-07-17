import { ChannelSkeleton } from "@/pages/community-channel";

// /communities почти всегда редиректит в сообщество — показываем скелетон канала
// (куда идём), чтобы вход после логина не мигал спиннером.
export default function Loading() {
  return <ChannelSkeleton />;
}
