"use client";

import { POST_TITLE_MAX_LENGTH, type PostFormData, postFormSchema } from "@/entities/post";
import { Button, Form, toast } from "@/shared/components";
import { fileToDataUrl } from "@/shared/utils";
import { AddPhoto16, XMarkBold16 } from "@frosted-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface PostFormProps {
  initialValues?: PostFormData & { coverUrl?: string | null };
  submitLabel: string;
  onSubmit: (data: PostFormData & { coverUrl: string | null }) => Promise<void>;
  onCancel: () => void;
}

/**
 * Форма поста: заголовок + текст + обложка. Используется инлайн-композером
 * (создание) и карточкой (редактирование).
 */
export function PostForm({ initialValues, submitLabel, onSubmit, onCancel }: PostFormProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(initialValues?.coverUrl ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      content: initialValues?.content ?? "",
    },
  });

  const {
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const handleCoverChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      setCoverUrl(await fileToDataUrl(file));
    } catch (error) {
      toast.error("Не удалось загрузить изображение", {
        description: error instanceof Error ? error.message : "Попробуйте другой файл",
      });
    }
  };

  const handleSubmit = async (data: PostFormData) => {
    await onSubmit({ ...data, coverUrl });
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          {...register("title")}
          placeholder="Заголовок"
          maxLength={POST_TITLE_MAX_LENGTH}
          autoFocus
          className="w-full bg-transparent text-lg font-bold text-ink placeholder:text-gray-400 focus:outline-none"
        />
        {errors.title?.message && (
          <p className="mt-1 text-sm text-danger">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("content")}
          placeholder="Расскажите подробнее…"
          rows={4}
          className="w-full resize-none bg-transparent text-base text-gray-800 leading-[1.5] placeholder:text-gray-400 focus:outline-none"
        />
        {errors.content?.message && (
          <p className="mt-1 text-sm text-danger">{errors.content.message}</p>
        )}
      </div>

      {coverUrl ? (
        <div className="relative overflow-hidden rounded-lg border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt="Обложка поста" className="w-full max-h-72 object-cover" />
          <button
            type="button"
            onClick={() => setCoverUrl(null)}
            aria-label="Убрать обложку"
            className="absolute top-2.5 right-2.5 size-8 flex items-center justify-center rounded-[10px] bg-surface/90 border border-gray-200 text-gray-600 hover:text-ink cursor-pointer"
          >
            <XMarkBold16 className="size-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3.5 h-9 rounded-[10px] border border-dashed border-gray-300 text-sm text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <AddPhoto16 className="size-4" />
          Добавить обложку
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
        className="hidden"
      />

      <div className="flex items-center justify-end gap-2 pt-1">
        <Button theme="ghost" size="lg" type="button" onClick={onCancel}>
          Отмена
        </Button>
        <Button theme="primary" size="lg" type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </Form>
  );
}
