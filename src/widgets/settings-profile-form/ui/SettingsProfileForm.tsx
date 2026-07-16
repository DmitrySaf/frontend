"use client";

import { Button, Form, Input, Textarea } from "@/shared/components";
import { cn } from "@/shared/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Globe, Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SOCIAL_NETWORKS, type UserSettingsData, userSettingsSchema } from "../model";
import { UnsavedChangesBar } from "./UnsavedChangesBar";

interface SettingsProfileFormProps {
  initValues: UserSettingsData;
  onSubmit: (data: UserSettingsData) => void;
  isLoading: boolean;
}

export function SettingsProfileForm({ initValues, onSubmit, isLoading }: SettingsProfileFormProps) {
  const methods = useForm<UserSettingsData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: initValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    control,
  } = methods;

  const { fields, remove } = useFieldArray<UserSettingsData>({
    control,
    name: "customLinks",
  });

  useEffect(() => {
    reset(initValues);
  }, [initValues, reset]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" />
          <p className="text-gray-600">Загружаем настройки...</p>
        </div>
      </div>
    );
  }

  const handleReset = () => {
    reset(initValues);
  };

  return (
    <>
      <Form
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        className={cn("relative space-y-6", !isDirty && "pb-[102px]")}
      >
        <Input name="name" size="xl" label="Имя" error={errors.name?.message} />

        <Input
          name="username"
          size="xl"
          label="Имя пользователя"
          prefix="@"
          error={errors.username?.message}
        />

        <Textarea
          name="bio"
          label="О себе"
          placeholder="Расскажите о себе"
          size="xl"
          rows={3}
          error={errors.bio?.message}
        />

        {/* Social Links Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-ink">Социальные сети</h2>

          {/* Static social networks */}
          <div className="space-y-2">
            {SOCIAL_NETWORKS.map((social) => (
              <Input
                key={social.id}
                name={social.id}
                size="l"
                prefix={social.prefix}
                Icon={
                  <Image src={social.icon} alt={social.id} width={20} height={20} unoptimized />
                }
                error={errors[social.id]?.message}
              />
            ))}
            <Input
              name="website"
              size="l"
              prefix="https://"
              Icon={Globe}
              error={errors.customLinks?.[0]?.url?.message}
            />
          </div>
        </div>
        <UnsavedChangesBar
          isVisible={isDirty}
          onSave={handleSubmit(onSubmit)}
          onReset={handleReset}
          isSubmitting={isSubmitting}
        />
      </Form>
    </>
  );
}
