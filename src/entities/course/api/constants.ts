// Query keys для типизированного кэширования
export const courseQueryKeys = {
  course: (channelId: string) => ["course", channelId],
  lessonVideoUrl: (videoPath: string) => ["lesson-video-url", videoPath],
};
