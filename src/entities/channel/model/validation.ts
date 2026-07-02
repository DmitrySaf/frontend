import { z } from "zod";
import { REQUIRED_MESSAGE } from "@/shared/constants";

export const CHANNEL_NAME_MAX_LENGTH = 32;

export const createChannelSchema = z
  .object({
    type: z.enum(["chat", "posts", "course"]),
    name: z
      .string()
      .min(1, REQUIRED_MESSAGE)
      .max(CHANNEL_NAME_MAX_LENGTH, `Не длиннее ${CHANNEL_NAME_MAX_LENGTH} символов`),
    categoryId: z.string().optional(),
    newCategoryName: z.string().optional(),
  })
  .refine((data) => data.categoryId || data.newCategoryName?.trim(), {
    message: "Выберите категорию",
    path: ["categoryId"],
  });

export type CreateChannelFormData = z.infer<typeof createChannelSchema>;
