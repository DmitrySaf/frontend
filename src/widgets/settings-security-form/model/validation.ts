import { z } from "zod";

export const securitySettingsSchema = z.object({
  joinedVisible: z.boolean().optional(),
  ownedVisible: z.boolean().optional(),
  messagingAllowed: z.boolean().optional(),
});

export type SecuritySettingsData = z.infer<typeof securitySettingsSchema>;
