import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  updateCourse,
  createModule,
  renameModule,
  deleteModule,
  createLesson,
  updateLesson,
  deleteLesson,
  toggleLessonComplete,
} from "./api";
import { useInvalidateCourse } from "./queries";
import type { LessonInput } from "./types";

/**
 * Хук для обновления названия/описания курса
 */
export const useUpdateCourseMutation = (channelId: string) => {
  const invalidateCourse = useInvalidateCourse();

  return useMutation({
    mutationFn: (input: { courseId: string; title?: string; description?: string }) =>
      updateCourse(input.courseId, { title: input.title, description: input.description }),
    onSuccess: () => {
      toast.success("Курс обновлён");
      invalidateCourse(channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении курса", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для добавления модуля
 */
export const useCreateModuleMutation = (channelId: string) => {
  const invalidateCourse = useInvalidateCourse();

  return useMutation({
    mutationFn: (input: { courseId: string; title: string }) =>
      createModule(input.courseId, input.title),
    onSuccess: () => {
      toast.success("Модуль добавлен");
      invalidateCourse(channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при добавлении модуля", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для переименования модуля
 */
export const useRenameModuleMutation = (channelId: string) => {
  const invalidateCourse = useInvalidateCourse();

  return useMutation({
    mutationFn: (input: { moduleId: string; title: string }) =>
      renameModule(input.moduleId, input.title),
    onSuccess: () => {
      invalidateCourse(channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при переименовании модуля", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления модуля
 */
export const useDeleteModuleMutation = (channelId: string) => {
  const invalidateCourse = useInvalidateCourse();

  return useMutation({
    mutationFn: (moduleId: string) => deleteModule(moduleId),
    onSuccess: () => {
      toast.success("Модуль удалён");
      invalidateCourse(channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при удалении модуля", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для добавления урока
 */
export const useCreateLessonMutation = (channelId: string) => {
  const invalidateCourse = useInvalidateCourse();

  return useMutation({
    mutationFn: (input: { moduleId: string; lesson: LessonInput }) =>
      createLesson(input.moduleId, input.lesson),
    onSuccess: () => {
      toast.success("Урок добавлен");
      invalidateCourse(channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при добавлении урока", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для обновления урока
 */
export const useUpdateLessonMutation = (channelId: string) => {
  const invalidateCourse = useInvalidateCourse();

  return useMutation({
    mutationFn: (input: { lessonId: string; lesson: LessonInput }) =>
      updateLesson(input.lessonId, input.lesson),
    onSuccess: () => {
      toast.success("Урок сохранён");
      invalidateCourse(channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при сохранении урока", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для удаления урока
 */
export const useDeleteLessonMutation = (channelId: string) => {
  const invalidateCourse = useInvalidateCourse();

  return useMutation({
    mutationFn: (lessonId: string) => deleteLesson(lessonId),
    onSuccess: () => {
      toast.success("Урок удалён");
      invalidateCourse(channelId);
    },
    onError: (error) => {
      toast.error("Ошибка при удалении урока", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};

/**
 * Хук для отметки «пройдено» (без success-тоста: прогресс виден в списке уроков)
 */
export const useToggleLessonCompleteMutation = (channelId: string) => {
  const invalidateCourse = useInvalidateCourse();

  return useMutation({
    mutationFn: (lessonId: string) => toggleLessonComplete(lessonId),
    onSuccess: () => {
      invalidateCourse(channelId);
    },
    onError: (error) => {
      toast.error("Не удалось сохранить прогресс", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    },
  });
};
