// Формы записей повторяют docs/db-schema.md (courses, course_modules, course_lessons, lesson_progress).
// В мок-режиме video_path — фиктивный путь в Storage; плеер играет общий демо-ролик.

export interface CourseRecord {
  id: string;
  channel_id: string;
  title: string;
  description: string;
  cover_url: string | null;
  created_at: string;
}

export interface CourseModuleRecord {
  id: string;
  course_id: string;
  title: string;
  position: number;
  created_at: string;
}

export interface CourseLessonRecord {
  id: string;
  module_id: string;
  title: string;
  description: string;
  video_path: string | null;
  duration_seconds: number | null;
  position: number;
  created_at: string;
}

export interface LessonProgressRecord {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: string;
}

// Доменные типы (для UI)
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoPath: string | null;
  durationSeconds: number | null;
  position: number;
  completed: boolean;
  /** Последовательное прохождение: урок заблокирован, пока не пройден предыдущий */
  locked: boolean;
  /** Сквозной номер урока в курсе (с 1) */
  number: number;
}

export interface CourseModule {
  id: string;
  title: string;
  position: number;
  lessons: Lesson[];
}

export interface CourseView {
  id: string;
  channelId: string;
  title: string;
  description: string;
  modules: CourseModule[];
  totalLessons: number;
  completedLessons: number;
}

export interface CourseData {
  course: CourseRecord;
  modules: CourseModuleRecord[];
  lessons: CourseLessonRecord[];
  progress: LessonProgressRecord[];
}

export interface LessonInput {
  title: string;
  description: string;
  videoPath: string | null;
  durationSeconds: number | null;
}
