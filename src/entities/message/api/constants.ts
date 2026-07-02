// Query keys для типизированного кэширования
export const messageQueryKeys = {
  messages: (channelId: string) => ["messages", channelId],
};
