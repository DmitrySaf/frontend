import { getSessionUserId, getSessionUserIdOrNull } from "@/api/auth";
import { createBrowserClient } from "@/api/browser-client";
import type {
  CourseData,
  CourseLessonRecord,
  CourseModuleRecord,
  CourseRecord,
  LessonInput,
  LessonProgressRecord,
} from "./types";

const COURSE_FIELDS = "id, channel_id, title, description, cover_url, created_at";
const MODULE_FIELDS = "id, course_id, title, position, created_at";
const LESSON_FIELDS =
  "id, module_id, title, description, video_path, duration_seconds, position, created_at";

/**
 * Курс канала (1:1 с табом типа «курс»). Строка курса создаётся вместе с табом;
 * для старых табов владелец досоздаёт её при первом открытии.
 */
export const getCourse = async (channelId: string, channelName: string): Promise<CourseData> => {
  const client = createBrowserClient();

  const { data: existing, error: courseError } = await client
    .from("courses")
    .select(COURSE_FIELDS)
    .eq("channel_id", channelId)
    .maybeSingle();

  if (courseError) {
    throw new Error(courseError.message);
  }

  let course = existing as CourseRecord | null;

  if (!course) {
    const { data: created, error: insertError } = await client
      .from("courses")
      .insert({ channel_id: channelId, title: channelName })
      .select(COURSE_FIELDS)
      .single();

    if (insertError) {
      // 42501 = участнику RLS запрещает insert — показываем пустой курс.
      // Остальные ошибки (сеть/констрейнты) пробрасываем, чтобы не маскировать сбой.
      if (insertError.code !== "42501") {
        throw new Error(insertError.message);
      }
      return {
        course: {
          id: "",
          channel_id: channelId,
          title: channelName,
          description: "",
          cover_url: null,
          created_at: new Date().toISOString(),
        },
        modules: [],
        lessons: [],
        progress: [],
      };
    }
    course = created as CourseRecord;
  }

  const { data: modulesData, error: modulesError } = await client
    .from("course_modules")
    .select(MODULE_FIELDS)
    .eq("course_id", course.id)
    .order("position");

  if (modulesError) {
    throw new Error(modulesError.message);
  }

  const modules = (modulesData ?? []) as CourseModuleRecord[];
  const moduleIds = modules.map((module) => module.id);

  let lessons: CourseLessonRecord[] = [];
  if (moduleIds.length > 0) {
    const { data: lessonsData, error: lessonsError } = await client
      .from("course_lessons")
      .select(LESSON_FIELDS)
      .in("module_id", moduleIds)
      .order("position");

    if (lessonsError) {
      throw new Error(lessonsError.message);
    }
    lessons = (lessonsData ?? []) as CourseLessonRecord[];
  }

  let progress: LessonProgressRecord[] = [];
  const userId = await getSessionUserIdOrNull(client);
  if (userId && lessons.length > 0) {
    const { data: progressData, error: progressError } = await client
      .from("lesson_progress")
      .select("id, lesson_id, user_id, completed_at")
      .eq("user_id", userId)
      .in(
        "lesson_id",
        lessons.map((lesson) => lesson.id)
      );

    if (progressError) {
      throw new Error(progressError.message);
    }
    progress = (progressData ?? []) as LessonProgressRecord[];
  }

  return { course, modules, lessons, progress };
};

/**
 * Переименование курса / описание
 */
export const updateCourse = async (
  courseId: string,
  patch: { title?: string; description?: string }
): Promise<void> => {
  const client = createBrowserClient();
  const { error } = await client.from("courses").update(patch).eq("id", courseId);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Новый модуль (в конец)
 */
export const createModule = async (
  courseId: string,
  title: string
): Promise<CourseModuleRecord> => {
  const client = createBrowserClient();

  const { count, error: countError } = await client
    .from("course_modules")
    .select("id", { count: "exact", head: true })
    .eq("course_id", courseId);

  if (countError) {
    throw new Error(countError.message);
  }

  const { data, error } = await client
    .from("course_modules")
    .insert({ course_id: courseId, title, position: count ?? 0 })
    .select(MODULE_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CourseModuleRecord;
};

export const renameModule = async (moduleId: string, title: string): Promise<void> => {
  const client = createBrowserClient();
  const { error } = await client.from("course_modules").update({ title }).eq("id", moduleId);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Удаление модуля (уроки и прогресс удаляются каскадом)
 */
export const deleteModule = async (moduleId: string): Promise<void> => {
  const client = createBrowserClient();
  const { error } = await client.from("course_modules").delete().eq("id", moduleId);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Новый урок (в конец модуля)
 */
export const createLesson = async (
  moduleId: string,
  input: LessonInput
): Promise<CourseLessonRecord> => {
  const client = createBrowserClient();

  const { count, error: countError } = await client
    .from("course_lessons")
    .select("id", { count: "exact", head: true })
    .eq("module_id", moduleId);

  if (countError) {
    throw new Error(countError.message);
  }

  const { data, error } = await client
    .from("course_lessons")
    .insert({
      module_id: moduleId,
      title: input.title,
      description: input.description,
      video_path: input.videoPath,
      duration_seconds: input.durationSeconds,
      position: count ?? 0,
    })
    .select(LESSON_FIELDS)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CourseLessonRecord;
};

export const updateLesson = async (lessonId: string, input: LessonInput): Promise<void> => {
  const client = createBrowserClient();

  const { error } = await client
    .from("course_lessons")
    .update({
      title: input.title,
      description: input.description,
      video_path: input.videoPath,
      duration_seconds: input.durationSeconds,
    })
    .eq("id", lessonId);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteLesson = async (lessonId: string): Promise<void> => {
  const client = createBrowserClient();
  const { error } = await client.from("course_lessons").delete().eq("id", lessonId);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Отметка «пройдено» текущего пользователя (toggle)
 */
export const toggleLessonComplete = async (lessonId: string): Promise<void> => {
  const client = createBrowserClient();
  const userId = await getSessionUserId(client);

  const { data: existing, error: selectError } = await client
    .from("lesson_progress")
    .select("id")
    .eq("lesson_id", lessonId)
    .eq("user_id", userId)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }

  const { error } = existing
    ? await client.from("lesson_progress").delete().eq("id", existing.id)
    : await client.from("lesson_progress").insert({ lesson_id: lessonId, user_id: userId });

  // 23505 = дубль при быстром двойном тапе; отметка уже стоит, ошибку не показываем
  if (error && error.code !== "23505") {
    throw new Error(error.message);
  }
};

/**
 * Загрузка видео урока в Storage (bucket lesson-videos, путь {community_id}/...).
 * Возвращает video_path для записи урока.
 */
export const uploadLessonVideo = async (communityId: string, file: File): Promise<string> => {
  const client = createBrowserClient();
  const extension = file.name.split(".").pop()?.toLowerCase() || "mp4";
  const path = `${communityId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await client.storage.from("lesson-videos").upload(path, file, {
    contentType: file.type || "video/mp4",
  });

  if (error) {
    throw new Error(error.message || "Не удалось загрузить видео");
  }

  return path;
};

/**
 * Временная ссылка на видео урока (RLS Storage: только участники сообщества)
 */
export const getLessonVideoUrl = async (videoPath: string): Promise<string> => {
  const client = createBrowserClient();

  const { data, error } = await client.storage
    .from("lesson-videos")
    .createSignedUrl(videoPath, 60 * 60);

  if (error) {
    throw new Error(error.message || "Не удалось получить ссылку на видео");
  }

  return data.signedUrl;
};
