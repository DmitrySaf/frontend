import type { Channel, CommunityStructure } from "../api/types";

/**
 * Первый канал сообщества: неотнесённые каналы приоритетнее, затем каналы категорий
 * по порядку. Общий чистый хелпер для серверного резолва входа и клиентского
 * CommunityFirstChannelRedirect — оба выбирают одинаково.
 */
export function pickFirstChannel(structure: CommunityStructure): Channel | null {
  return (
    structure.uncategorized[0] ??
    structure.categories.flatMap((category) => category.channels)[0] ??
    null
  );
}
