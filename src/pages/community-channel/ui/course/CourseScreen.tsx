"use client";

import type { Channel } from "@/entities/channel";
import {
  type Lesson,
  type LessonInput,
  useCourseQuery,
  useCreateLessonMutation,
  useCreateModuleMutation,
  useDeleteLessonMutation,
  useDeleteModuleMutation,
  useRenameModuleMutation,
  useToggleLessonCompleteMutation,
  useUpdateLessonMutation,
} from "@/entities/course";
import { useCommunityRole } from "@/entities/member";
import { ContentErrorState, DeleteDialog, SegmentedControl, Skeleton } from "@/shared/components";
import { cn } from "@/shared/utils";
import { ArrowLeft, BookOpen, Eye, Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LessonEditor } from "./LessonEditor";
import { LessonList } from "./LessonList";
import { LessonView } from "./LessonView";

type CourseMode = "view" | "edit";

export function CourseScreen({ channel }: { channel: Channel }) {
  const { data: course, isLoading, isError, refetch } = useCourseQuery(channel.id, channel.name);

  const createModule = useCreateModuleMutation(channel.id);
  const renameModule = useRenameModuleMutation(channel.id);
  const deleteModule = useDeleteModuleMutation(channel.id);
  const createLesson = useCreateLessonMutation(channel.id);
  const updateLesson = useUpdateLessonMutation(channel.id);
  const deleteLesson = useDeleteLessonMutation(channel.id);
  const toggleComplete = useToggleLessonCompleteMutation(channel.id);

  const params = useParams();
  const { isAdmin } = useCommunityRole((params?.slug as string) ?? "");

  const [mode, setMode] = useState<CourseMode>("view");
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<{ kind: "module" | "lesson"; id: string } | null>(null);
  // На мобиле список и урок — два «экрана»: выбор урока открывает урок, «назад» возвращает к списку
  const [isListOpenOnMobile, setIsListOpenOnMobile] = useState(true);

  const allLessons = useMemo(
    () => course?.modules.flatMap((module) => module.lessons) ?? [],
    [course]
  );

  const selectedLesson = allLessons.find((lesson) => lesson.id === selectedLessonId) ?? null;

  // Дефолтный выбор: первый непройденный доступный урок, иначе первый
  useEffect(() => {
    if (!course || selectedLesson) return;
    const target =
      allLessons.find((lesson) => !lesson.completed && !lesson.locked) ?? allLessons[0];
    setSelectedLessonId(target?.id ?? null);
  }, [course, allLessons, selectedLesson]);

  if (isError && !course) {
    return <ContentErrorState onRetry={() => refetch()} />;
  }

  if (isLoading || !course) {
    return (
      <div className="flex-1 flex min-h-0">
        {/* Столбец списка уроков */}
        <div className="hidden md:flex flex-col gap-2 w-72 shrink-0 border-r border-gray-200 p-3">
          <Skeleton height={14} width={120} radius={6} className="mb-1" />
          {[0, 1, 2, 3].map((index) => (
            <Skeleton key={index} height={40} radius={10} />
          ))}
        </div>
        {/* Область урока */}
        <div className="flex-1 min-w-0 p-4 md:p-6 space-y-4">
          <Skeleton height={200} radius={16} />
          <Skeleton height={24} width="60%" radius={8} />
          <Skeleton height={80} radius={12} />
        </div>
      </div>
    );
  }

  const isEditMode = isAdmin && mode === "edit";

  const handleCreateLesson = async (moduleId: string) => {
    const lesson = await createLesson.mutateAsync({
      moduleId,
      lesson: { title: "Новый урок", description: "", videoPath: null, durationSeconds: null },
    });
    setSelectedLessonId(lesson.id);
  };

  const handleSaveLesson = (lessonId: string, input: LessonInput) =>
    updateLesson.mutateAsync({ lessonId, lesson: input });

  const isEmpty = course.totalLessons === 0 && course.modules.length === 0;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Панель режима (модель A): Просмотр ↔ Редактирование */}
      {isAdmin && (
        <div className="shrink-0 flex items-center justify-end px-4 h-12 border-b border-gray-200 bg-surface">
          <SegmentedControl<CourseMode>
            size="s"
            value={mode}
            onChange={setMode}
            options={[
              { value: "view", label: "Просмотр", icon: Eye },
              { value: "edit", label: "Редактирование", icon: Pencil },
            ]}
          />
        </div>
      )}

      <div className="flex-1 flex min-h-0">
        {(isEditMode || !isEmpty) && (
          <LessonList
            course={course}
            selectedLessonId={selectedLessonId}
            onSelectLesson={(lesson) => {
              setSelectedLessonId(lesson.id);
              setIsListOpenOnMobile(false);
            }}
            isEditMode={isEditMode}
            onCreateModule={(title) => createModule.mutate({ courseId: course.id, title })}
            onRenameModule={(moduleId, title) => renameModule.mutate({ moduleId, title })}
            onDeleteModule={(moduleId) => setDeleting({ kind: "module", id: moduleId })}
            onCreateLesson={handleCreateLesson}
            className={cn(!isListOpenOnMobile && "hidden md:flex")}
          />
        )}

        <div
          className={cn(
            "flex-1 min-w-0 flex-col min-h-0",
            isListOpenOnMobile && !isEmpty ? "hidden md:flex" : "flex"
          )}
        >
          {/* Мобильный возврат к списку уроков */}
          {!isEmpty && (
            <button
              type="button"
              onClick={() => setIsListOpenOnMobile(true)}
              className="md:hidden shrink-0 flex items-center gap-1.5 px-4 h-12 text-[13px] font-medium text-gray-600 border-b border-gray-200 bg-surface cursor-pointer"
            >
              <ArrowLeft className="size-4" />К списку уроков
            </button>
          )}

          {isEditMode ? (
            selectedLesson ? (
              <LessonEditor
                lesson={selectedLesson}
                onSave={handleSaveLesson}
                onDelete={(lessonId) => setDeleting({ kind: "lesson", id: lessonId })}
              />
            ) : (
              <EmptyPane
                title={course.modules.length === 0 ? "Начните с модуля" : "Добавьте урок"}
                description={
                  course.modules.length === 0
                    ? "Создайте первый модуль в списке слева, затем добавьте в него уроки."
                    : "Выберите урок слева или добавьте новый в модуль."
                }
              />
            )
          ) : selectedLesson ? (
            <LessonView
              course={course}
              lesson={selectedLesson}
              onSelectLesson={(lesson) => setSelectedLessonId(lesson.id)}
              onToggleComplete={(lessonId) => toggleComplete.mutate(lessonId)}
              isTogglingComplete={toggleComplete.isPending}
            />
          ) : (
            <EmptyPane
              title="Курс наполняется"
              description="Автор ещё готовит уроки — загляните позже."
            />
          )}
        </div>
      </div>

      <DeleteDialog
        isOpen={deleting !== null}
        onClose={() => setDeleting(null)}
        onDelete={async () => {
          if (!deleting) return;
          if (deleting.kind === "module") {
            await deleteModule.mutateAsync(deleting.id);
          } else {
            await deleteLesson.mutateAsync(deleting.id);
            if (selectedLessonId === deleting.id) {
              setSelectedLessonId(null);
            }
          }
        }}
        title={deleting?.kind === "module" ? "Удалить модуль?" : "Удалить урок?"}
        description={
          deleting?.kind === "module"
            ? "Модуль будет удалён вместе со всеми уроками и прогрессом участников."
            : "Урок и прогресс по нему будут удалены. Это действие нельзя отменить."
        }
      />
    </div>
  );
}

function EmptyPane({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 max-w-xs text-center">
        <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
          <BookOpen className="size-6 text-gray-500" />
        </div>
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
