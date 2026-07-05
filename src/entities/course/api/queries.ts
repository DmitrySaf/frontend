import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourse, getLessonVideoUrl } from "./api";
import { courseQueryKeys } from "./constants";
import { transformCourse } from "../model/mappers";

/**
 * Курс канала
 */
export const useCourseQuery = (channelId: string, channelName: string) => {
  return useQuery({
    queryKey: courseQueryKeys.course(channelId),
    queryFn: () => getCourse(channelId, channelName),
    enabled: !!channelId,
    select: transformCourse,
  });
};

/**
 * Signed URL видео урока (живёт час — обновляем за 45 минут)
 */
export const useLessonVideoUrlQuery = (videoPath: string | null) => {
  return useQuery({
    queryKey: courseQueryKeys.lessonVideoUrl(videoPath ?? ""),
    queryFn: () => getLessonVideoUrl(videoPath as string),
    enabled: !!videoPath,
    staleTime: 1000 * 60 * 45,
  });
};

/**
 * Хук для инвалидации курса
 */
export const useInvalidateCourse = () => {
  const queryClient = useQueryClient();

  return (channelId: string) => {
    queryClient.invalidateQueries({ queryKey: courseQueryKeys.course(channelId) });
  };
};
