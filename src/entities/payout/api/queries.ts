import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyPayoutMethods } from "./api";
import { payoutQueryKeys } from "./constants";
import type { PayoutMethod } from "./types";

/**
 * Карты для выплат текущего пользователя
 */
export const useMyPayoutMethodsQuery = () => {
  return useQuery<PayoutMethod[]>({
    queryKey: payoutQueryKeys.myMethods,
    queryFn: async () => {
      const records = await getMyPayoutMethods();
      return records.map((record) => ({
        id: record.id,
        last4: record.last4,
        brand: record.brand,
        holderName: record.holder_name,
        isDefault: record.is_default,
      }));
    },
  });
};

/**
 * Хук для инвалидации карт
 */
export const useInvalidateMyPayoutMethods = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: payoutQueryKeys.myMethods });
  };
};
