"use client";

import { CHANNEL_TYPE_META, type Channel } from "@/entities/channel";

export function ChannelTitleBar({ channel }: { channel: Channel }) {
  const meta = CHANNEL_TYPE_META[channel.type];
  const Icon = meta.icon;

  return (
    <div className="shrink-0 flex items-center gap-2 px-4 md:px-6 py-3 border-b border-gray-200 bg-white">
      <Icon className="size-[19px] text-gray-500" />
      <span className="text-[15px] font-bold text-black">{channel.name}</span>
      <span className="ml-1 px-2.5 py-0.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
        {meta.name}
      </span>
    </div>
  );
}
