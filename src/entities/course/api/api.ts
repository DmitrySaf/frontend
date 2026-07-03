import { createMockCollection } from "@/shared/utils";
import { CURRENT_USER_ID } from "@/entities/message";
import type {
  CourseRecord,
  CourseModuleRecord,
  CourseLessonRecord,
  LessonProgressRecord,
  CourseData,
  LessonInput,
} from "./types";

const courses = createMockCollection<CourseRecord>("courses");
const modules = createMockCollection<CourseModuleRecord>("course_modules");
const lessons = createMockCollection<CourseLessonRecord>("course_lessons");
const progress = createMockCollection<LessonProgressRecord>("lesson_progress");

/**
 * Курс канала (1:1 с табом типа «курс»); создаётся пустым при первом открытии
 */
export const getCourse = async (channelId: string, channelName: string): Promise<CourseData> => {
  const allCourses = await courses.list();
  let course = allCourses.find((record) => record.channel_id === channelId);

  if (!course) {
    course = await courses.insert({
      channel_id: channelId,
      title: channelName,
      description: "",
      cover_url: null,
      created_at: new Date().toISOString(),
    });
  }

  const [allModules, allLessons, allProgress] = await Promise.all([
    modules.list(),
    lessons.list(),
    progress.list(),
  ]);

  const courseModules = allModules.filter((module) => module.course_id === course.id);
  const moduleIds = new Set(courseModules.map((module) => module.id));
  const courseLessons = allLessons.filter((lesson) => moduleIds.has(lesson.module_id));
  const lessonIds = new Set(courseLessons.map((lesson) => lesson.id));

  return {
    course,
    modules: courseModules,
    lessons: courseLessons,
    progress: allProgress.filter(
      (record) => record.user_id === CURRENT_USER_ID && lessonIds.has(record.lesson_id)
    ),
  };
};

/**
 * Переименование курса / описание
 */
export const updateCourse = async (
  courseId: string,
  patch: { title?: string; description?: string }
): Promise<CourseRecord> => {
  return courses.update(courseId, patch);
};

/**
 * Новый модуль (в конец)
 */
export const createModule = async (courseId: string, title: string): Promise<CourseModuleRecord> => {
  const allModules = await modules.list();
  const siblings = allModules.filter((module) => module.course_id === courseId);

  return modules.insert({
    course_id: courseId,
    title,
    position: siblings.length,
    created_at: new Date().toISOString(),
  });
};

export const renameModule = async (moduleId: string, title: string): Promise<CourseModuleRecord> => {
  return modules.update(moduleId, { title });
};

/**
 * Удаление модуля вместе с уроками и прогрессом по ним
 */
export const deleteModule = async (moduleId: string): Promise<void> => {
  const [allLessons, allProgress] = await Promise.all([lessons.list(), progress.list()]);
  const moduleLessons = allLessons.filter((lesson) => lesson.module_id === moduleId);
  const lessonIds = new Set(moduleLessons.map((lesson) => lesson.id));

  await modules.remove(moduleId);
  await Promise.all([
    ...moduleLessons.map((lesson) => lessons.remove(lesson.id)),
    ...allProgress
      .filter((record) => lessonIds.has(record.lesson_id))
      .map((record) => progress.remove(record.id)),
  ]);
};

/**
 * Новый урок (в конец модуля)
 */
export const createLesson = async (
  moduleId: string,
  input: LessonInput
): Promise<CourseLessonRecord> => {
  const allLessons = await lessons.list();
  const siblings = allLessons.filter((lesson) => lesson.module_id === moduleId);

  return lessons.insert({
    module_id: moduleId,
    title: input.title,
    description: input.description,
    video_path: input.videoPath,
    duration_seconds: input.durationSeconds,
    position: siblings.length,
    created_at: new Date().toISOString(),
  });
};

export const updateLesson = async (
  lessonId: string,
  input: LessonInput
): Promise<CourseLessonRecord> => {
  return lessons.update(lessonId, {
    title: input.title,
    description: input.description,
    video_path: input.videoPath,
    duration_seconds: input.durationSeconds,
  });
};

export const deleteLesson = async (lessonId: string): Promise<void> => {
  const allProgress = await progress.list();

  await lessons.remove(lessonId);
  await Promise.all(
    allProgress
      .filter((record) => record.lesson_id === lessonId)
      .map((record) => progress.remove(record.id))
  );
};

/**
 * Отметка «пройдено» текущего пользователя (toggle)
 */
export const toggleLessonComplete = async (lessonId: string): Promise<void> => {
  const allProgress = await progress.list();
  const existing = allProgress.find(
    (record) => record.lesson_id === lessonId && record.user_id === CURRENT_USER_ID
  );

  if (existing) {
    await progress.remove(existing.id);
  } else {
    await progress.insert({
      user_id: CURRENT_USER_ID,
      lesson_id: lessonId,
      completed_at: new Date().toISOString(),
    });
  }
};
