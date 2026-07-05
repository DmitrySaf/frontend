import type { CategoryRecord, Channel, ChannelRecord, CommunityStructure } from "../api/types";

export const transformChannel = (record: ChannelRecord): Channel => {
  return {
    id: record.id,
    categoryId: record.category_id,
    type: record.type,
    name: record.name,
    slug: record.slug,
    access: record.access ?? "open",
    position: record.position,
  };
};

export const transformCommunityStructure = (data: {
  categories: CategoryRecord[];
  channels: ChannelRecord[];
}): CommunityStructure => {
  const channels = data.channels.map(transformChannel);
  const byPosition = <T extends { position: number }>(a: T, b: T) => a.position - b.position;

  return {
    categories: data.categories
      .slice()
      .sort(byPosition)
      .map((category) => ({
        id: category.id,
        name: category.name,
        position: category.position,
        channels: channels.filter((channel) => channel.categoryId === category.id).sort(byPosition),
      })),
    uncategorized: channels.filter((channel) => channel.categoryId === null).sort(byPosition),
  };
};
