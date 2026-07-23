"use client";

import { type CourseView, type Lesson, useLessonVideoUrlQuery } from "@/entities/course";
import { Button, Skeleton } from "@/shared/components";
import { formatDuration } from "@/shared/utils";
import { ArrowLeftBold16, ArrowRightBold16, CheckmarkBold16, ClockBold12, PlayCircleBold32 } from "@frosted-ui/icons";

interface LessonViewProps {
  course: CourseView;
  lesson: Lesson;
  onSelectLesson: (lesson: Lesson) => void;
  onToggleComplete: (lessonId: string) => void;
  isTogglingComplete: boolean;
}

export function LessonView({
  course,
  lesson,
  onSelectLesson,
  onToggleComplete,
  isTogglingComplete,
}: LessonViewProps) {
  const allLessons = course.modules.flatMap((module) => module.lessons);
  const index = allLessons.findIndex((item) => item.id === lesson.id);
  const previous = index > 0 ? allLessons[index - 1] : null;
  const next = index < allLessons.length - 1 ? allLessons[index + 1] : null;

  // Видео из Storage — по временной signed-ссылке (только для участников)
  const { data: videoUrl, isLoading: isVideoLoading } = useLessonVideoUrlQuery(lesson.videoPath);

  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      {/* key: смена урока — мягкое появление контента */}
      <div
        key={lesson.id}
        className="max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out-quart"
      >
        {/* Видео или текстовый блок */}
        {lesson.videoPath ? (
          isVideoLoading || !videoUrl ? (
            <Skeleton className="w-full aspect-video" radius={8} />
          ) : (
            // biome-ignore lint/a11y/useMediaCaption: пользовательское видео урока без дорожки субтитров
            <video
              key={lesson.id}
              controls
              src={videoUrl}
              className="w-full aspect-video rounded-lg bg-black"
            />
          )
        ) : (
          <div className="w-full aspect-video rounded-lg bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-2">
            <PlayCircleBold32 className="size-10 text-gray-400" />
            <span className="text-sm text-gray-500">Урок без видео</span>
          </div>
        )}

        {/* Мета */}
        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
            Урок {lesson.number} из {course.totalLessons}
          </span>
          {lesson.durationSeconds != null && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
              <ClockBold12 className="size-3" />
              {formatDuration(lesson.durationSeconds)}
            </span>
          )}
        </div>

        {/* off-scale: дисплей-заголовок урока (22px) — единичный, вне шкалы текста */}
        <h2 className="text-[22px] font-bold text-ink leading-[1.2]">{lesson.title}</h2>

        {lesson.description && (
          <p className="text-sm text-gray-800 leading-[1.6] whitespace-pre-wrap">
            {lesson.description}
          </p>
        )}

        {/* Навигация: до lg «Отметить пройденным» — главное действие во всю ширину,
            под ним пара «Назад»/«Далее» (ряд из трёх l-кнопок не помещается ни на
            телефоне, ни в планшетной колонке урока); на lg+ прежний ряд */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 lg:flex lg:items-center lg:gap-3">
          <Button
            theme={lesson.completed ? "outline" : "primary"}
            size="lg"
            Icon={CheckmarkBold16}
            isLoading={isTogglingComplete}
            onClick={() => onToggleComplete(lesson.id)}
            className="col-span-2 lg:hidden"
          >
            {lesson.completed ? "Пройдено" : "Отметить пройденным"}
          </Button>
          <Button
            theme="outline"
            size="lg"
            Icon={ArrowLeftBold16}
            isDisabled={!previous}
            onClick={() => previous && onSelectLesson(previous)}
          >
            Назад
          </Button>
          <Button
            theme="primary"
            size="lg"
            IconRight={ArrowRightBold16}
            isDisabled={!next || next.locked}
            onClick={() => next && onSelectLesson(next)}
          >
            <span className="lg:hidden">Далее</span>
            <span className="hidden lg:inline">Следующий урок</span>
          </Button>
          <div className="hidden lg:block flex-1" />
          <Button
            theme={lesson.completed ? "outline" : "ghost"}
            size="lg"
            Icon={CheckmarkBold16}
            isLoading={isTogglingComplete}
            onClick={() => onToggleComplete(lesson.id)}
            className="hidden lg:inline-flex"
          >
            {lesson.completed ? "Пройдено" : "Отметить пройденным"}
          </Button>
        </div>
      </div>
    </div>
  );
}
