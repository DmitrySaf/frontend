import type { CourseData, CourseView, Lesson } from "../api/types";

/**
 * Собирает представление курса: модули с уроками, сквозная нумерация,
 * прогресс и последовательная разблокировка (урок открыт, если все
 * предыдущие пройдены)
 */
export const transformCourse = (data: CourseData): CourseView => {
  const completedLessonIds = new Set(data.progress.map((record) => record.lesson_id));
  const byPosition = <T extends { position: number }>(a: T, b: T) => a.position - b.position;

  let lessonNumber = 0;
  let previousCompleted = true;

  const modules = data.modules
    .slice()
    .sort(byPosition)
    .map((module) => {
      const lessons: Lesson[] = data.lessons
        .filter((lesson) => lesson.module_id === module.id)
        .sort(byPosition)
        .map((lesson) => {
          lessonNumber += 1;
          const completed = completedLessonIds.has(lesson.id);
          const locked = !completed && !previousCompleted;
          previousCompleted = previousCompleted && completed;

          return {
            id: lesson.id,
            moduleId: lesson.module_id,
            title: lesson.title,
            description: lesson.description,
            videoPath: lesson.video_path,
            durationSeconds: lesson.duration_seconds,
            position: lesson.position,
            completed,
            locked,
            number: lessonNumber,
          };
        });

      return {
        id: module.id,
        title: module.title,
        position: module.position,
        lessons,
      };
    });

  return {
    id: data.course.id,
    channelId: data.course.channel_id,
    title: data.course.title,
    description: data.course.description,
    modules,
    totalLessons: lessonNumber,
    completedLessons: data.progress.length,
  };
};
