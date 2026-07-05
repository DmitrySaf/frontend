import { REQUIRED_MESSAGE } from "@/shared/constants";
import { z } from "zod";

export const LESSON_TITLE_MAX_LENGTH = 100;
export const MODULE_TITLE_MAX_LENGTH = 60;

export const lessonFormSchema = z.object({
  title: z
    .string()
    .min(1, REQUIRED_MESSAGE)
    .max(LESSON_TITLE_MAX_LENGTH, `Не длиннее ${LESSON_TITLE_MAX_LENGTH} символов`),
  description: z.string(),
});

export type LessonFormData = z.infer<typeof lessonFormSchema>;
