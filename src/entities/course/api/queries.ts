import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourse } from "./api";
import { courseQueryKeys } from "./constants";
import { transformCourse } from "../model/mappers";

/**
 * Курс канала. Мок-хранилище в localStorage — хук только клиентский.
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
 * Хук для инвалидации курса
 */
export const useInvalidateCourse = () => {
  const queryClient = useQueryClient();

  return (channelId: string) => {
    queryClient.invalidateQueries({ queryKey: courseQueryKeys.course(channelId) });
  };
};
