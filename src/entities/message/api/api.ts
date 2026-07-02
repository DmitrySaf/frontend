import { createMockCollection } from "@/shared/utils";
import { CURRENT_USER_ID, MOCK_MEMBERS } from "../model/constants";
import type {
  MessageRecord,
  SendMessageInput,
  UpdateMessageInput,
} from "./types";

const messages = createMockCollection<MessageRecord>("messages");

// Каналы, для которых сид-история уже создавалась (чтобы пустой после удаления чат не сидировался заново)
const seededChannels = createMockCollection<{ id: string }>("messages_seeded_channels");

const SEED_TEXTS: { memberIndex: number; hoursAgo: number; content: string }[] = [
  { memberIndex: 0, hoursAgo: 26, content: "Всем привет! Рада присоединиться к сообществу." },
  { memberIndex: 1, hoursAgo: 25.5, content: "Добро пожаловать! Здесь обсуждаем всё по теме и делимся результатами." },
  { memberIndex: 0, hoursAgo: 25.4, content: "Отлично, как раз искала место, где можно задавать вопросы." },
  { memberIndex: 2, hoursAgo: 20, content: "Подскажите, с чего лучше начать новичку?" },
  { memberIndex: 1, hoursAgo: 4, content: "Загляните в закреплённые материалы — там собрана база." },
  { memberIndex: 2, hoursAgo: 3.5, content: "Спасибо! Уже смотрю." },
  { memberIndex: 0, hoursAgo: 1, content: "Кто идёт на сегодняшний эфир? Начало в 19:00." },
];

/**
 * Первое открытие чата — генерируем историю от вымышленных участников
 * (вчера и сегодня — видны разделители дней и группировка)
 */
async function seedChatHistory(channelId: string): Promise<MessageRecord[]> {
  const now = Date.now();

  const seeded: MessageRecord[] = SEED_TEXTS.map((item, index) => ({
    id: crypto.randomUUID(),
    channel_id: channelId,
    author_id: MOCK_MEMBERS[item.memberIndex].id,
    content: item.content,
    attachments: null,
    created_at: new Date(now - item.hoursAgo * 60 * 60 * 1000).toISOString(),
    updated_at: null,
    deleted_at: null,
    // index сохраняет порядок при равных временах
  })).sort((a, b) => a.created_at.localeCompare(b.created_at));

  await messages.insertMany(seeded);
  await seededChannels.insert({ id: channelId });

  return seeded;
}

/**
 * Сообщения канала (по возрастанию времени)
 */
export const getMessages = async (channelId: string): Promise<MessageRecord[]> => {
  const [all, seeded] = await Promise.all([messages.list(), seededChannels.list()]);

  const channelMessages = all
    .filter((message) => message.channel_id === channelId && !message.deleted_at)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));

  const alreadySeeded = seeded.some((record) => record.id === channelId);
  if (channelMessages.length === 0 && !alreadySeeded) {
    return seedChatHistory(channelId);
  }

  return channelMessages;
};

/**
 * Отправка сообщения от текущего пользователя
 */
export const sendMessage = async (input: SendMessageInput): Promise<MessageRecord> => {
  return messages.insert({
    channel_id: input.channelId,
    author_id: CURRENT_USER_ID,
    content: input.content,
    attachments: null,
    created_at: new Date().toISOString(),
    updated_at: null,
    deleted_at: null,
  });
};

/**
 * Редактирование своего сообщения
 */
export const updateMessage = async (input: UpdateMessageInput): Promise<MessageRecord> => {
  return messages.update(input.messageId, {
    content: input.content,
    updated_at: new Date().toISOString(),
  });
};

/**
 * Удаление сообщения (soft delete, как в схеме)
 */
export const deleteMessage = async (messageId: string): Promise<void> => {
  await messages.update(messageId, { deleted_at: new Date().toISOString() });
};
