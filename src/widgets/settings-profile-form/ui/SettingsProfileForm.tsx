"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Textarea } from "@/shared/components";
import { Globe, Loader2, Plus } from "lucide-react";
import { userSettingsSchema, type UserSettingsData, SOCIAL_NETWORKS } from "../model";
import { UnsavedChangesBar } from "./UnsavedChangesBar";
import { cn } from "@/shared/utils";
import Image from "next/image";

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
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Социальные сети</h2>

          {/* Static social networks */}
          <div className="space-y-2">
          {SOCIAL_NETWORKS.map((social) => (
            <Input
              name={social.id}
              size="m"
              prefix={social.prefix}
              prefixElement={
                <div className="flex items-center justify-center w-8 h-8 border border-gray-400 rounded-[10px] shadow">
                  <Image
                    src={social.icon}
                    alt={social.id}
                    width={24}
                    height={24}
                    unoptimized
                  />
                </div>
              }
              error={errors[social.id]?.message}
            />
            ))}
            <Input
              name="website"
              size="m"
              prefix="https://"
              prefixElement={
                <div className="flex items-center justify-center w-8 h-8 border border-gray-400 rounded-[10px]">
                  <Globe className="w-6 h-6" />
                </div>
              }
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
