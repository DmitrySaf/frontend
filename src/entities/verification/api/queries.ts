import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyVerification } from "./api";
import { verificationQueryKeys } from "./constants";
import type { VerificationState } from "./types";

/**
 * Статус верификации текущего пользователя
 */
export const useMyVerificationQuery = () => {
  return useQuery<VerificationState>({
    queryKey: verificationQueryKeys.myVerification,
    queryFn: async () => {
      const record = await getMyVerification();
      if (!record) return { status: "none", kind: null, submittedAt: null };
      return { status: record.status, kind: record.kind, submittedAt: record.submitted_at };
    },
  });
};

/**
 * Хук для инвалидации статуса верификации
 */
export const useInvalidateMyVerification = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: verificationQueryKeys.myVerification });
  };
};
