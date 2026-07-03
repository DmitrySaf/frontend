"use client";

import { Loader2 } from "lucide-react";
import { useCommunityStructureQuery } from "@/entities/channel";
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

  if (!channel) {
    return (
      <CenteredState>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-[15px] font-semibold text-black">Таб не найден</p>
          <p className="text-sm text-gray-600">Возможно, его удалили или ссылка устарела.</p>
        </div>
      </CenteredState>
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
