import { z } from "zod";

const socialLinkSchema = z
  .string()
  .regex(/^[a-zA-Z0-9_.]*$/, "Может содержать только буквы, цифры, точки и подчеркивания")
  .optional()
  .or(z.literal(""));

const customLinkItemSchema = z.object({
  url: z.string().refine((val) => val === "" || z.string().url().safeParse(val).success, {
    message: "Введите корректную ссылку",
  }),
});

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
  bio: z.string().max(500, "Описание не должно превышать 500 символов"),
  telegram: socialLinkSchema,
  vk: socialLinkSchema,
  instagram: socialLinkSchema,
  youtube: socialLinkSchema,
  customLinks: z.array(customLinkItemSchema),
});

export type UserSettingsData = z.infer<typeof userSettingsSchema>;
