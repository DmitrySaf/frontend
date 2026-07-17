import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transformCourse } from "../model/mappers";
import { getCourse, getLessonVideoUrl } from "./api";
import { courseQueryKeys } from "./constants";

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
 * Префетч курса канала (наводка/тач по строке канала). getCourse требует и id, и имя —
 * оба есть на объекте Channel в строке сайдбара.
 */
export const usePrefetchCourse = () => {
  const queryClient = useQueryClient();

  return (channelId: string, channelName: string) => {
    if (!channelId) return;
    queryClient.prefetchQuery({
      queryKey: courseQueryKeys.course(channelId),
      queryFn: () => getCourse(channelId, channelName),
      staleTime: 60 * 1000,
    });
  };
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
