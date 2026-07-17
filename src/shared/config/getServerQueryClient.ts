import "server-only";

import { cache } from "react";
import { makeQueryClient } from "./queryConfig";

/**
 * Серверный QueryClient для SSR-префетча (рекомендация TanStack Advanced SSR).
 * React.cache даёт один инстанс на запрос — все префетчи одного рендера копятся в
 * него, затем dehydrate + HydrationBoundary передают состояние клиенту. Между
 * запросами — свежий клиент (нет утечки данных между пользователями).
 */
export const getServerQueryClient = cache(makeQueryClient);
