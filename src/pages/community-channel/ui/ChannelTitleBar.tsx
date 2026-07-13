"use client";

import { CHANNEL_TYPE_META, type Channel } from "@/entities/channel";

export function ChannelTitleBar({ channel }: { channel: Channel }) {
  const meta = CHANNEL_TYPE_META[channel.type];
  const Icon = meta.icon;

  return (
    <div className="shrink-0 flex items-center gap-2 px-4 md:px-6 h-12 border-b border-gray-200 bg-surface">
      <Icon className="size-[19px] shrink-0 text-gray-500" />
      <span className="min-w-0 truncate text-[15px] font-bold text-ink">{channel.name}</span>
      <span className="ml-1 shrink-0 px-2.5 py-0.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
        {meta.name}
      </span>
    </div>
  );
}
