import { z } from "zod";

/**
 * Profile validation schema with social links
 */
export const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(50, "Максимум 50 символов")
    .optional()
    .nullable(),
  display_name: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(100, "Максимум 100 символов")
    .optional()
    .nullable(),
  avatar_url: z.string().url("Неверный URL").optional().nullable(),
  bio: z.string().max(500, "Максимум 500 символов").optional().nullable(),
  social_links: z
    .array(
      z.object({
        platform: z.enum(["instagram", "telegram", "vk", "youtube", "website"]),
        label: z.string().max(50, "Максимум 50 символов").optional().nullable(),
        link: z.string().url("Неверный URL"),
      })
    )
    .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
