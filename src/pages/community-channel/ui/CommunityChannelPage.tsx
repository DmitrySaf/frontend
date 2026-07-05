"use client";

import { useCommunityStructureQuery, useMyChannelGrantsQuery } from "@/entities/channel";
import { useCommunityRole } from "@/entities/member";
import { Loader2, Lock } from "lucide-react";
import { ChannelTitleBar } from "./ChannelTitleBar";
import { ChatScreen } from "./chat/ChatScreen";
import { CourseScreen } from "./course/CourseScreen";
import { PostsScreen } from "./posts/PostsScreen";

interface CommunityChannelPageProps {
  slug: string;
  tabSlug: string;
}

function CenteredState({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 flex items-center justify-center">{children}</div>;
}

export function CommunityChannelPage({ slug, tabSlug }: CommunityChannelPageProps) {
  const { data: structure, isLoading } = useCommunityStructureQuery(slug);
  const { data: grants } = useMyChannelGrantsQuery();
  const { isAdmin } = useCommunityRole(slug);

  if (isLoading || !structure) {
    return (
      <CenteredState>
        <Loader2 className="size-6 animate-spin text-gray-500" />
      </CenteredState>
    );
  }

  const allChannels = [
    ...structure.uncategorized,
    ...structure.categories.flatMap((category) => category.channels),
  ];
  const channel = allChannels.find((item) => item.slug === tabSlug);
  const hasGrant = channel ? (grants?.has(channel.id) ?? false) : false;

  // Секретный канал без гранта неотличим от несуществующего
  const isHiddenFromViewer = channel && !isAdmin && channel.access === "secret" && !hasGrant;

  if (!channel || isHiddenFromViewer) {
    return (
      <CenteredState>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[15px] font-semibold text-black">Таб не найден</p>
          <p className="text-sm text-gray-600">Возможно, его удалили или ссылка устарела.</p>
        </div>
      </CenteredState>
    );
  }

  // Приватный канал без гранта: виден, но контент закрыт
  if (!isAdmin && channel.access === "private" && !hasGrant) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <ChannelTitleBar channel={channel} />
        <CenteredState>
          <div className="flex flex-col items-center gap-3 max-w-xs text-center">
            <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
              <Lock className="size-6 text-gray-500" />
            </div>
            <p className="text-[15px] font-semibold text-black">Нужен доступ</p>
            <p className="text-sm text-gray-600">
              Этот таб приватный — попросите у администратора ссылку-приглашение.
            </p>
          </div>
        </CenteredState>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ChannelTitleBar channel={channel} />
      {channel.type === "chat" ? (
        <ChatScreen channel={channel} />
      ) : channel.type === "posts" ? (
        <PostsScreen channel={channel} />
      ) : (
        <CourseScreen channel={channel} />
      )}
    </div>
  );
}
