import { z } from "zod";
import { REQUIRED_MESSAGE } from "@/shared/constants";

export const POST_TITLE_MAX_LENGTH = 120;
export const POST_CONTENT_MAX_LENGTH = 10_000;
export const COMMENT_MAX_LENGTH = 1000;

export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, REQUIRED_MESSAGE)
    .max(POST_TITLE_MAX_LENGTH, `Не длиннее ${POST_TITLE_MAX_LENGTH} символов`),
  content: z
    .string()
    .min(1, REQUIRED_MESSAGE)
    .max(POST_CONTENT_MAX_LENGTH, `Не длиннее ${POST_CONTENT_MAX_LENGTH} символов`),
});

export type PostFormData = z.infer<typeof postFormSchema>;
