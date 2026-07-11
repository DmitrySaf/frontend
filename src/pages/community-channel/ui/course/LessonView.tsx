"use client";

import { type CourseView, type Lesson, useLessonVideoUrlQuery } from "@/entities/course";
import { Button } from "@/shared/components";
import { formatDuration } from "@/shared/utils";
import { ArrowLeft, ArrowRight, Check, Clock, Loader2, PlayCircle } from "lucide-react";

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
            <div className="w-full aspect-video rounded-[14px] bg-gray-100 border border-gray-200 flex items-center justify-center">
              <Loader2 className="size-8 animate-spin text-gray-400" />
            </div>
          ) : (
            <video
              key={lesson.id}
              controls
              src={videoUrl}
              className="w-full aspect-video rounded-[14px] bg-black"
            />
          )
        ) : (
          <div className="w-full aspect-video rounded-[14px] bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-2">
            <PlayCircle className="size-10 text-gray-400" />
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
              <Clock className="size-3" />
              {formatDuration(lesson.durationSeconds)}
            </span>
          )}
        </div>

        <h2 className="text-[22px] font-bold text-black leading-[1.2]">{lesson.title}</h2>

        {lesson.description && (
          <p className="text-sm text-gray-800 leading-[1.6] whitespace-pre-wrap">
            {lesson.description}
          </p>
        )}

        {/* Навигация */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            theme="outline"
            size="m"
            isDisabled={!previous}
            onClick={() => previous && onSelectLesson(previous)}
          >
            <ArrowLeft className="size-4" />
            Назад
          </Button>
          <Button
            theme="primary"
            size="m"
            isDisabled={!next || next.locked}
            onClick={() => next && onSelectLesson(next)}
          >
            Следующий урок
            <ArrowRight className="size-4" />
          </Button>
          <div className="flex-1" />
          <Button
            theme={lesson.completed ? "outline" : "ghost"}
            size="m"
            isLoading={isTogglingComplete}
            onClick={() => onToggleComplete(lesson.id)}
          >
            <Check className="size-4" />
            {lesson.completed ? "Пройдено" : "Отметить пройденным"}
          </Button>
        </div>
      </div>
    </div>
  );
}
