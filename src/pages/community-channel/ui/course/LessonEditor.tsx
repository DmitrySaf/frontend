"use client";

import { useCommunityQuery } from "@/entities/community";
import {
  LESSON_TITLE_MAX_LENGTH,
  type Lesson,
  type LessonFormData,
  type LessonInput,
  lessonFormSchema,
  uploadLessonVideo,
  useLessonVideoUrlQuery,
} from "@/entities/course";
import { Button, Form, Input, Textarea } from "@/shared/components";
import { formatDuration, getVideoFileDuration } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Loader2, Trash2, Upload, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LessonEditorProps {
  lesson: Lesson;
  onSave: (lessonId: string, input: LessonInput) => Promise<unknown>;
  onDelete: (lessonId: string) => void;
}

export function LessonEditor({ lesson, onSave, onDelete }: LessonEditorProps) {
  const [videoPath, setVideoPath] = useState<string | null>(lesson.videoPath);
  const [durationSeconds, setDurationSeconds] = useState<number | null>(lesson.durationSeconds);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const params = useParams();
  const { data: community } = useCommunityQuery((params?.slug as string) ?? "");
  const { data: videoUrl } = useLessonVideoUrlQuery(videoPath);

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
  }, [
    lesson.id,
    lesson.title,
    lesson.description,
    lesson.videoPath,
    lesson.durationSeconds,
    reset,
  ]);

  const handleVideoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !community) return;

    setIsUploading(true);
    try {
      const [duration, path] = await Promise.all([
        getVideoFileDuration(file),
        uploadLessonVideo(community.id, file),
      ]);
      setVideoPath(path);
      setDurationSeconds(duration);
      toast.success("Видео загружено");
    } catch (error) {
      toast.error("Не удалось загрузить видео", {
        description: error instanceof Error ? error.message : "Попробуйте еще раз",
      });
    } finally {
      setIsUploading(false);
    }
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
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-5">
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
            <span className="text-sm font-medium text-ink">Видео</span>
            {isUploading ? (
              <div className="w-full h-28 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 text-gray-600">
                <Loader2 className="size-5 animate-spin" />
                <span className="text-sm font-medium">Загружаем видео…</span>
              </div>
            ) : videoPath ? (
              <div className="space-y-2">
                {videoUrl ? (
                  <video
                    controls
                    src={videoUrl}
                    className="w-full aspect-video rounded-lg bg-black"
                  />
                ) : (
                  <div className="w-full aspect-video rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <Loader2 className="size-8 animate-spin text-gray-400" />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {durationSeconds != null && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="size-3" />
                      {formatDuration(durationSeconds)}
                    </span>
                  )}
                  <div className="flex-1" />
                  <Button
                    theme="outline"
                    size="m"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Заменить
                  </Button>
                  <Button
                    theme="ghost"
                    size="m"
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
                className="w-full h-28 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-ink transition-colors cursor-pointer"
              >
                <Upload className="size-5" />
                <span className="text-sm font-medium">Загрузить видео</span>
                <span className="text-xs text-gray-500">
                  Необязательно — урок может быть текстовым
                </span>
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
            <Button theme="primary" size="l" type="submit" isLoading={isSubmitting}>
              Сохранить урок
            </Button>
            <div className="flex-1" />
            <Button
              theme="destructiveGhost"
              size="l"
              type="button"
              Icon={Trash2}
              onClick={() => onDelete(lesson.id)}
            >
              Удалить урок
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
