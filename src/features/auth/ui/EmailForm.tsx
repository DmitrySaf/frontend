"use client";

import { Button, Form, Input } from "@/shared/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DEFAULT_EMAIL_VALUES, type EmailFormData, emailSchema } from "../model/validation";

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => Promise<void>;
}

export function EmailForm({ onSubmit }: EmailFormProps) {
  const methods = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: DEFAULT_EMAIL_VALUES,
  });

  const {
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
      <Input
        name="email"
        size="xl"
        label="Почта"
        placeholder="example@gmail.com"
        error={errors.email?.message}
      />

      <Button type="submit" theme="primary" size="xl" isLoading={isSubmitting} fluid>
        {isSubmitting ? "Отправляем код…" : "Продолжить"}
      </Button>
    </Form>
  );
}
