"use client";

import { useState } from "react";
import { Check, Lock, Pencil, Play, Plus, Trash2 } from "lucide-react";
import type { CourseView, Lesson } from "@/entities/course";
import { MODULE_TITLE_MAX_LENGTH } from "@/entities/course";
import { cn, formatDuration } from "@/shared/utils";

interface LessonListProps {
  course: CourseView;
  selectedLessonId: string | null;
  onSelectLesson: (lesson: Lesson) => void;
  isEditMode: boolean;
  onCreateModule: (title: string) => void;
  onRenameModule: (moduleId: string, title: string) => void;
  onDeleteModule: (moduleId: string) => void;
  onCreateLesson: (moduleId: string) => void;
}

function LessonIcon({ lesson }: { lesson: Lesson }) {
  const Icon = lesson.locked ? Lock : lesson.completed ? Check : Play;
  return (
    <div
      className={cn(
        "size-[22px] shrink-0 rounded-full border flex items-center justify-center",
        lesson.completed ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"
      )}
    >
      <Icon className="size-3 text-gray-600" />
    </div>
  );
}

function ModuleTitleEditor({
  initialValue,
  onSubmit,
  onCancel,
}: {
  initialValue: string;
  onSubmit: (title: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initialValue);

  const submit = () => {
    const title = value.trim();
    if (title) {
      onSubmit(title);
    } else {
      onCancel();
    }
  };

  return (
    <input
      value={value}
      autoFocus
      maxLength={MODULE_TITLE_MAX_LENGTH}
      onChange={(event) => setValue(event.target.value)}
      onBlur={submit}
      onKeyDown={(event) => {
        if (event.key === "Enter") submit();
        if (event.key === "Escape") onCancel();
      }}
      className="flex-1 min-w-0 bg-white rounded-md px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-[.05em] text-black inset-ring inset-ring-primary-500 focus:outline-none"
    />
  );
}

export function LessonList({
  course,
  selectedLessonId,
  onSelectLesson,
  isEditMode,
  onCreateModule,
  onRenameModule,
  onDeleteModule,
  onCreateLesson,
}: LessonListProps) {
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [isAddingModule, setIsAddingModule] = useState(false);

  const progressPercent =
    course.totalLessons > 0 ? (course.completedLessons / course.totalLessons) * 100 : 0;

  return (
    <div className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col min-h-0">
      {/* Заголовок курса + прогресс */}
      <div className="shrink-0 px-4 pt-4 pb-3 border-b border-gray-200">
        <p className="text-sm font-bold text-black truncate">{course.title}</p>
        {course.totalLessons > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-primary-600 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-gray-500">
              {course.completedLessons}/{course.totalLessons}
            </span>
          </div>
        )}
      </div>

      {/* Модули и уроки */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2.5 pb-3">
        {course.modules.map((module, index) => (
          <div key={module.id}>
            <div className="group flex items-center gap-1.5 pt-3.5 pb-1.5 px-1.5">
              {editingModuleId === module.id ? (
                <ModuleTitleEditor
                  initialValue={module.title}
                  onSubmit={(title) => {
                    onRenameModule(module.id, title);
                    setEditingModuleId(null);
                  }}
                  onCancel={() => setEditingModuleId(null)}
                />
              ) : (
                <>
                  <span className="flex-1 min-w-0 truncate text-[11px] font-bold uppercase tracking-[.05em] text-gray-500">
                    Модуль {index + 1} · {module.title}
                  </span>
                  {isEditMode && (
                    <div className="hidden group-hover:flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingModuleId(module.id)}
                        aria-label="Переименовать модуль"
                        className="text-gray-500 hover:text-black cursor-pointer"
                      >
                        <Pencil className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteModule(module.id)}
                        aria-label="Удалить модуль"
                        className="text-gray-500 hover:text-danger cursor-pointer"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="space-y-0.5">
              {module.lessons.map((lesson) => {
                const isActive = lesson.id === selectedLessonId;
                const isDisabled = !isEditMode && lesson.locked;
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => onSelectLesson(lesson)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-[10px] text-left transition-colors",
                      isActive
                        ? "bg-[#D3D3D340] inset-ring inset-ring-[#D3D3D3]"
                        : isDisabled
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:bg-[#D3D3D325] cursor-pointer"
                    )}
                  >
                    <LessonIcon lesson={lesson} />
                    <span
                      className={cn(
                        "flex-1 min-w-0 truncate text-[13px]",
                        isActive ? "font-semibold text-black" : "font-medium text-gray-600"
                      )}
                    >
                      {lesson.title}
                    </span>
                    {lesson.durationSeconds != null && (
                      <span className="text-[11px] font-mono text-gray-500">
                        {formatDuration(lesson.durationSeconds)}
                      </span>
                    )}
                  </button>
                );
              })}

              {isEditMode && (
                <button
                  type="button"
                  onClick={() => onCreateLesson(module.id)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-[10px] text-[13px] font-medium text-gray-500 hover:text-black hover:bg-[#D3D3D325] transition-colors cursor-pointer"
                >
                  <Plus className="size-4" />
                  Добавить урок
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Новый модуль */}
        {isEditMode &&
          (isAddingModule ? (
            <div className="pt-3.5 px-1.5">
              <ModuleTitleEditor
                initialValue=""
                onSubmit={(title) => {
                  onCreateModule(title);
                  setIsAddingModule(false);
                }}
                onCancel={() => setIsAddingModule(false)}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingModule(true)}
              className="mt-3.5 w-full flex items-center justify-center gap-2 px-2.5 py-2 rounded-[10px] border border-dashed border-gray-300 text-[13px] font-medium text-gray-600 hover:border-gray-400 hover:text-black transition-colors cursor-pointer"
            >
              <Plus className="size-4" />
              Добавить модуль
            </button>
          ))}
      </div>
    </div>
  );
}
