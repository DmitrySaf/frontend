import { z } from "zod";

export const userSettingsSchema = z.object({
  name: z.string().min(1, "Введите имя").max(100, "Имя не должно превышать 100 символов"),
  username: z
    .string()
    .min(1, "Введите имя пользователя")
    .max(50, "Имя пользователя не должно превышать 50 символов")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Имя пользователя может содержать только буквы, цифры и подчеркивания"
    ),
  email: z.string().min(1, "Введите email").email("Введите корректный email адрес"),
  bio: z.string().max(500, "Описание не должно превышать 500 символов").optional(),
  joinedVisible: z.boolean(),
  ownedVisible: z.boolean(),
});

export const securitySettingsSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Введите корректный номер телефона")
    .optional()
    .or(z.literal("")),
  joinedVisible: z.boolean(),
  ownedVisible: z.boolean(),
});

export type UserSettingsData = z.infer<typeof userSettingsSchema>;
export type SecuritySettingsData = z.infer<typeof securitySettingsSchema>;
