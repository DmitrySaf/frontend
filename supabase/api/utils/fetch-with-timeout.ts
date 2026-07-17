const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * Оборачивает fetch таймаутом — у supabase-js его нет по умолчанию, из-за чего
 * зависший запрос давал бы «вечный скелетон». Сигнал таймаута совмещается с
 * сигналом вызывающего (отмена запроса TanStack при анмаунте) через AbortSignal.any;
 * если он недоступен в рантайме — используем только таймаут (главное — не зависнуть).
 * Таймаут = обычная ошибка запроса → срабатывают retry/эскалация queryClient.
 */
export function createFetchWithTimeout(timeoutMs = DEFAULT_TIMEOUT_MS): typeof fetch {
  return (input, init) => {
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    const callerSignal = init?.signal;

    const signal =
      callerSignal && typeof AbortSignal.any === "function"
        ? AbortSignal.any([callerSignal, timeoutSignal])
        : (timeoutSignal ?? callerSignal);

    return fetch(input, { ...init, signal });
  };
}
