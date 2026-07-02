"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Form } from "@/shared/components";
import { emailSchema, type EmailFormData, DEFAULT_EMAIL_VALUES } from "../model/validation";

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
        size="l"
        label="Почта"
        placeholder="example@gmail.com"
        error={errors.email?.message}
      />

      <Button type="submit" theme="primary" size="l" isLoading={isSubmitting} fluid>
        {isSubmitting ? "Отправляем код…" : "Продолжить"}
      </Button>
    </Form>
  );
}
