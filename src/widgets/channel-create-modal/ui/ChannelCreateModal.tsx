"use client";

import {
  CHANNEL_ACCESS_META,
  CHANNEL_NAME_MAX_LENGTH,
  CHANNEL_TYPE_META,
  type Channel,
  type ChannelAccess,
  type ChannelType,
  type CreateChannelFormData,
  createChannelSchema,
} from "@/entities/channel";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dropdown,
  Form,
  Input,
} from "@/shared/components";
import { cn } from "@/shared/utils";
import { ChevronDownBold16, PlusBold16 } from "@frosted-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CHANNEL_TYPES: ChannelType[] = ["chat", "posts", "course"];
const CHANNEL_ACCESSES: ChannelAccess[] = ["open", "private", "secret"];

const NAME_PLACEHOLDERS: Record<ChannelType, string> = {
  chat: "например, общий-чат",
  posts: "например, объявления",
  course: "например, основы бренда",
};

interface CategoryOption {
  id: string;
  name: string;
}

interface ChannelCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateChannelFormData) => Promise<void>;
  categories: CategoryOption[];
  defaultCategoryId?: string;
  /** Передан — режим «Настройки таба» (тип не меняется) */
  channel?: Channel | null;
}

export function ChannelCreateModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  defaultCategoryId,
  channel,
}: ChannelCreateModalProps) {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const isEditing = !!channel;

  const methods = useForm<CreateChannelFormData>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      type: "chat",
      access: "open",
      name: "",
      categoryId: defaultCategoryId ?? categories[0]?.id,
      newCategoryName: undefined,
    },
  });

  const {
    formState: { errors, isSubmitting, isDirty },
    reset,
    watch,
    setValue,
  } = methods;

  const selectedType = watch("type");
  const selectedAccess = watch("access");
  const selectedCategoryId = watch("categoryId");

  // Синхронизация при открытии: «+» категории или настройки существующего таба
  useEffect(() => {
    if (isOpen) {
      setIsCreatingCategory(false);
      reset({
        type: channel?.type ?? "chat",
        access: channel?.access ?? "open",
        name: channel?.name ?? "",
        categoryId: channel?.categoryId ?? defaultCategoryId ?? categories[0]?.id,
        newCategoryName: undefined,
      });
    }
  }, [isOpen, channel, defaultCategoryId, categories, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async (data: CreateChannelFormData) => {
    await onSubmit(data);
    handleClose();
  };

  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategoryId)?.name ?? "Категория";

  const categoryItems = [
    ...categories.map((category) => ({
      label: category.name,
      onClick: () => {
        setIsCreatingCategory(false);
        setValue("categoryId", category.id, { shouldValidate: true });
        setValue("newCategoryName", undefined);
      },
    })),
    "separator" as const,
    {
      icon: PlusBold16,
      label: "Новая категория",
      onClick: () => {
        setIsCreatingCategory(true);
        setValue("categoryId", undefined, { shouldValidate: false });
      },
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Форма: заполненную не закрыть случайным кликом снаружи — только явной «Отменой» */}
      <DialogContent
        className="sm:max-w-md"
        aria-describedby={undefined}
        dismissOnOutside={!isDirty}
      >
        <DialogHeader>
          <DialogTitle>{isEditing ? "Настройки таба" : "Новый таб"}</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit} className="space-y-4">
          {/* Тип таба — только при создании */}
          {!isEditing && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-ink">Тип</span>
              <div className="flex gap-2.5">
                {CHANNEL_TYPES.map((type) => {
                  const meta = CHANNEL_TYPE_META[type];
                  const Icon = meta.icon;
                  const isSelected = selectedType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setValue("type", type, { shouldValidate: true })}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-2 py-4 px-2.5 rounded-lg border transition-[border-color,background-color,transform] duration-150 ease-out-quart active:scale-[0.98] cursor-pointer",
                        isSelected
                          ? "border-primary-500 bg-primary-50 inset-ring inset-ring-primary-500"
                          : "border-gray-200 bg-surface hover:bg-gray-50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-[22px] transition-colors duration-150",
                          isSelected ? "text-primary-700" : "text-gray-600"
                        )}
                      />
                      <span
                        className={cn(
                          "text-[13px] font-semibold transition-colors duration-150",
                          isSelected ? "text-ink" : "text-gray-600"
                        )}
                      >
                        {meta.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Input
            name="name"
            size="lg"
            label="Название таба"
            placeholder={NAME_PLACEHOLDERS[selectedType]}
            maxLength={CHANNEL_NAME_MAX_LENGTH}
            error={errors.name?.message}
          />

          {/* Категория */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-ink">Категория</span>
            {isCreatingCategory ? (
              <Input
                name="newCategoryName"
                size="lg"
                placeholder="Название новой категории"
                error={errors.categoryId?.message}
              />
            ) : (
              <>
                <Dropdown
                  trigger={
                    <button
                      type="button"
                      className="group w-full h-11 flex items-center gap-2 px-3.5 rounded-lg bg-surface inset-ring inset-ring-gray-200 text-sm text-ink cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                    >
                      <span className="flex-1 text-left truncate">{selectedCategoryName}</span>
                      <ChevronDownBold16 className="size-4 text-gray-500 transition-transform duration-200 ease-out-quart group-aria-expanded:rotate-180" />
                    </button>
                  }
                  items={categoryItems}
                  align="start"
                  className="w-(--trigger-width)"
                />
                {errors.categoryId?.message && (
                  <p className="text-sm text-danger">{errors.categoryId.message}</p>
                )}
              </>
            )}
          </div>

          {/* Доступ (спецификация приватности) */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-ink">Доступ</span>
            <div className="space-y-1.5">
              {CHANNEL_ACCESSES.map((access) => {
                const meta = CHANNEL_ACCESS_META[access];
                const Icon = meta.icon;
                const isSelected = selectedAccess === access;
                return (
                  <button
                    key={access}
                    type="button"
                    onClick={() => setValue("access", access, { shouldValidate: true })}
                    className={cn(
                      "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg border text-left transition-[border-color,background-color,transform] duration-150 ease-out-quart active:scale-[0.99] cursor-pointer",
                      isSelected
                        ? "border-primary-500 bg-primary-50 inset-ring inset-ring-primary-500"
                        : "border-gray-200 bg-surface hover:bg-gray-50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0 transition-colors duration-150",
                        isSelected ? "text-primary-700" : "text-gray-600"
                      )}
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13px] font-semibold text-ink">{meta.name}</span>
                      <span className="block text-xs text-gray-600">{meta.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {isEditing && selectedAccess !== channel?.access && (
              <p className="text-xs text-gray-500">
                Смена доступа не отзывает уже выданные приглашения.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" theme="secondary" size="lg" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" theme="primary" size="lg" isLoading={isSubmitting}>
              {isEditing ? "Сохранить" : "Создать"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
