"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import {
  DEMO_VIDEO_URL,
  lessonFormSchema,
  LESSON_TITLE_MAX_LENGTH,
  type Lesson,
  type LessonFormData,
  type LessonInput,
} from "@/entities/course";
import { Button, Form, Input, Textarea } from "@/shared/components";
import { formatDuration, getVideoFileDuration } from "@/shared/utils";

interface LessonEditorProps {
  lesson: Lesson;
  onSave: (lessonId: string, input: LessonInput) => Promise<unknown>;
  onDelete: (lessonId: string) => void;
}

export function LessonEditor({ lesson, onSave, onDelete }: LessonEditorProps) {
  const [videoPath, setVideoPath] = useState<string | null>(lesson.videoPath);
  const [durationSeconds, setDurationSeconds] = useState<number | null>(lesson.durationSeconds);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<LessonFormData>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: { title: lesson.title, description: lesson.description },
  });

  const {
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  // Переключение на другой урок — сбрасываем форму и видео
  useEffect(() => {
    reset({ title: lesson.title, description: lesson.description });
    setVideoPath(lesson.videoPath);
    setDurationSeconds(lesson.durationSeconds);
  }, [lesson.id, lesson.title, lesson.description, lesson.videoPath, lesson.durationSeconds, reset]);

  const handleVideoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const duration = await getVideoFileDuration(file);
    // Фиктивный путь в Storage — реальная загрузка появится на этапе БД
    setVideoPath(`lesson-videos/${crypto.randomUUID()}.mp4`);
    setDurationSeconds(duration);
    toast.success("Видео добавлено");
  };

  const handleSubmit = async (data: LessonFormData) => {
    await onSave(lesson.id, {
      title: data.title,
      description: data.description,
      videoPath,
      durationSeconds,
    });
  };

  return (
    <div className="flex-1 min-w-0 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-5">
        <Form methods={methods} onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            size="m"
            label="Название урока"
            maxLength={LESSON_TITLE_MAX_LENGTH}
            error={errors.title?.message}
          />

          <Textarea
            name="description"
            size="m"
            label="Описание"
            placeholder="О чём этот урок"
            rows={4}
            error={errors.description?.message}
          />

          {/* Видео (необязательно) */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-black">Видео</span>
            {videoPath ? (
              <div className="space-y-2">
                <video
                  controls
                  src={DEMO_VIDEO_URL}
                  className="w-full aspect-video rounded-[14px] bg-black"
                />
                <div className="flex items-center gap-3">
                  {durationSeconds != null && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="size-3" />
                      {formatDuration(durationSeconds)}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    Демо-ролик — файл заменится после подключения хранилища
                  </span>
                  <div className="flex-1" />
                  <Button
                    theme="outline"
                    size="s"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Заменить
                  </Button>
                  <Button
                    theme="ghost"
                    size="s"
                    type="button"
                    Icon={X}
                    onClick={() => {
                      setVideoPath(null);
                      setDurationSeconds(null);
                    }}
                    aria-label="Убрать видео"
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-28 flex flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                <Upload className="size-5" />
                <span className="text-sm font-medium">Загрузить видео</span>
                <span className="text-xs text-gray-500">Необязательно — урок может быть текстовым</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="hidden"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <Button theme="primary" size="m" type="submit" isLoading={isSubmitting}>
              Сохранить урок
            </Button>
            <div className="flex-1" />
            <Button
              theme="ghost"
              size="m"
              type="button"
              onClick={() => onDelete(lesson.id)}
              className="text-danger hover:bg-danger/10"
            >
              <Trash2 className="size-4" />
              Удалить урок
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
