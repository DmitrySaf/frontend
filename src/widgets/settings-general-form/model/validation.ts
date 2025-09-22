import { z } from "zod";

export const userSettingsSchema = z.object({
  name: z
    .string()
    .min(1, "Введите имя")
    .max(100, "Имя не должно превышать 100 символов"),
  username: z
    .string()
    .min(1, "Введите имя пользователя")
    .max(50, "Имя пользователя не должно превышать 50 символов")
    .regex(/^[a-zA-Z0-9_]+$/, "Имя пользователя может содержать только буквы, цифры и подчеркивания"),
  email: z
    .string()
    .min(1, "Введите email")
    .email("Введите корректный email адрес"),
  bio: z
    .string()
    .max(500, "Описание не должно превышать 500 символов")
    .optional(),
});

export type UserSettingsData = z.infer<typeof userSettingsSchema>;

