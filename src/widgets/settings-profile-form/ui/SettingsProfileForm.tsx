"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Textarea } from "@/shared/components";
import { Loader2, Plus } from "lucide-react";
import { userSettingsSchema, type UserSettingsData, SOCIAL_NETWORKS } from "../model";
import { SocialLinkInput } from "./SocialLinkInput";
import { CustomLinkInput } from "./CustomLinkInput";
import { UnsavedChangesBar } from "./UnsavedChangesBar";
import { cn } from "@/shared/utils";

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
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
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
        <Input name="name" size="l" label="Имя" error={errors.name?.message} />

        <Input name="username" size="l" label="Имя пользователя" prefix="@" error={errors.username?.message} />

        <Textarea
          name="bio"
          label="О себе"
          placeholder="Расскажите о себе"
          size="l"
          rows={3}
          error={errors.bio?.message}
        />

        {/* Social Links Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Социальные сети</h2>

          {/* Static social networks */}
          {SOCIAL_NETWORKS.map((social) => (
            <SocialLinkInput
              key={social.key}
              name={social.key}
              label={social.label}
              domain={social.domain}
              prefix={social.baseUrl}
              error={errors[social.key]?.message}
            />
          ))}
          {fields.map((field, index) => (
            <CustomLinkInput
              key={field.id}
              index={index}
              error={errors.customLinks?.[index]?.url?.message}
              onRemove={() => remove(index)}
              showRemove={fields.length > 1}
            />
          ))}
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
