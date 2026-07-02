"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Form,
  Dropdown,
} from "@/shared/components";
import { cn } from "@/shared/utils";
import {
  CHANNEL_TYPE_META,
  createChannelSchema,
  CHANNEL_NAME_MAX_LENGTH,
  type CreateChannelFormData,
  type ChannelType,
} from "@/entities/channel";

const CHANNEL_TYPES: ChannelType[] = ["chat", "posts", "course"];

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
}

export function ChannelCreateModal({
  isOpen,
  onClose,
  onSubmit,
  categories,
  defaultCategoryId,
}: ChannelCreateModalProps) {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const methods = useForm<CreateChannelFormData>({
    resolver: zodResolver(createChannelSchema),
    defaultValues: {
      type: "chat",
      name: "",
      categoryId: defaultCategoryId ?? categories[0]?.id,
      newCategoryName: undefined,
    },
  });

  const {
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = methods;

  const selectedType = watch("type");
  const selectedCategoryId = watch("categoryId");

  // Модалка может открываться с «+» конкретной категории — синхронизируем дефолт
  useEffect(() => {
    if (isOpen) {
      setIsCreatingCategory(false);
      reset({
        type: "chat",
        name: "",
        categoryId: defaultCategoryId ?? categories[0]?.id,
        newCategoryName: undefined,
      });
    }
  }, [isOpen, defaultCategoryId, categories, reset]);

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
      icon: Plus,
      label: "Новая категория",
      onClick: () => {
        setIsCreatingCategory(true);
        setValue("categoryId", undefined, { shouldValidate: false });
      },
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Новый таб</DialogTitle>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit} className="space-y-4">
          {/* Тип таба */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-black">Тип</span>
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
                      "flex-1 flex flex-col items-center gap-2 py-4 px-2.5 rounded-[13px] border transition-colors cursor-pointer",
                      isSelected
                        ? "border-gray-400 bg-gray-100 inset-ring inset-ring-gray-400"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    )}
                  >
                    <Icon className={cn("size-[22px]", isSelected ? "text-black" : "text-gray-600")} />
                    <span
                      className={cn(
                        "text-[13px] font-semibold",
                        isSelected ? "text-black" : "text-gray-600"
                      )}
                    >
                      {meta.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Input
            name="name"
            size="m"
            label="Название таба"
            placeholder={NAME_PLACEHOLDERS[selectedType]}
            maxLength={CHANNEL_NAME_MAX_LENGTH}
            error={errors.name?.message}
          />

          {/* Категория */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-black">Категория</span>
            {isCreatingCategory ? (
              <Input
                name="newCategoryName"
                size="m"
                placeholder="Название новой категории"
                error={errors.categoryId?.message}
              />
            ) : (
              <>
                <Dropdown
                  trigger={
                    <button
                      type="button"
                      className="w-full h-11 flex items-center gap-2 px-3.5 rounded-[14px] bg-white inset-ring inset-ring-gray-200 text-sm text-black cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex-1 text-left truncate">{selectedCategoryName}</span>
                      <ChevronDown className="size-4 text-gray-500" />
                    </button>
                  }
                  items={categoryItems}
                  align="start"
                  className="w-(--radix-dropdown-menu-trigger-width)"
                />
                {errors.categoryId?.message && (
                  <p className="text-sm text-danger">{errors.categoryId.message}</p>
                )}
              </>
            )}
          </div>

          <DialogFooter>
            <Button type="button" theme="ghost" size="m" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" theme="primary" size="m" isLoading={isSubmitting}>
              Создать
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
