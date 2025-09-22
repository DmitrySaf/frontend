"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@/shared/components";
import { 
  emailSchema, 
  type EmailFormData, 
  DEFAULT_EMAIL_VALUES
} from "../model/validation";

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => void;
  isLoading: boolean;
}

export function EmailForm({ onSubmit, isLoading }: EmailFormProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema as any),
    defaultValues: DEFAULT_EMAIL_VALUES,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        id="email"
        type="email"
        label="Почта"
        placeholder="example@gmail.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Button 
        type="submit"
        theme="primary"
        size="l"
        isLoading={isLoading}
        fluid
      >
        Продолжить
      </Button>
    </form>
  );
}
