import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().min(1, "Введите email").email("Введите корректный email адрес"),
});

export const confirmationSchema = z.object({
  email: z.string().email(),
  confirmationCode: z
    .string()
    .min(6, "Код должен содержать 6 символов")
    .max(6, "Код должен содержать 6 символов")
    .regex(/^\d+$/, "Код должен содержать только цифры"),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type ConfirmationFormData = z.infer<typeof confirmationSchema>;

// Константы по умолчанию
export const DEFAULT_EMAIL_VALUES = {
  email: "",
};

export const DEFAULT_CONFIRMATION_VALUES = {
  email: "",
  confirmationCode: "",
};
