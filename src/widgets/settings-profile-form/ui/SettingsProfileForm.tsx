"use client";

import { Button, Form, Input, Skeleton, Textarea } from "@/shared/components";
import { cn } from "@/shared/utils";
import { GlobeBold16 } from "@frosted-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
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
      <div className="space-y-6">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton width={90} height={13} radius={4} />
            <Skeleton height={48} radius={12} />
          </div>
        ))}
        <div className="space-y-2">
          <Skeleton width={90} height={13} radius={4} />
          <Skeleton height={96} radius={12} />
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
                size="lg"
                prefix={social.prefix}
                Icon={
                  <Image src={social.icon} alt={social.id} width={20} height={20} unoptimized />
                }
                error={errors[social.id]?.message}
              />
            ))}
            <Input
              name="website"
              size="lg"
              prefix="https://"
              Icon={GlobeBold16}
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
