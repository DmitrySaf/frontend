"use client";

import { Loader2 } from "lucide-react";
import { CHANNEL_TYPE_META, useCommunityStructureQuery, type Channel } from "@/entities/channel";
import { ChannelTitleBar } from "./ChannelTitleBar";

interface CommunityChannelPageProps {
  slug: string;
  tabSlug: string;
}

function CenteredState({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 flex items-center justify-center">{children}</div>;
}

// Плейсхолдеры контента по типу таба — заменяются на этапах 5 (чат), 6 (посты), 7 (курсы)
function ChannelContentPlaceholder({ channel }: { channel: Channel }) {
  const meta = CHANNEL_TYPE_META[channel.type];
  const Icon = meta.icon;

  const description = {
    chat: "Сообщения появятся здесь. Раздел в разработке.",
    posts: "Лента постов появится здесь. Раздел в разработке.",
    course: "Уроки курса появятся здесь. Раздел в разработке.",
  }[channel.type];

  return (
    <CenteredState>
      <div className="flex flex-col items-center gap-3 max-w-xs text-center">
        <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
          <Icon className="size-6 text-gray-500" />
        </div>
        <p className="text-[15px] font-semibold text-black">{channel.name}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </CenteredState>
  );
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
      <ChannelContentPlaceholder channel={channel} />
    </div>
  );
}
