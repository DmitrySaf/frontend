import { sleep } from "./sleep";

export interface MockRequestOptions {
  /** Delay in milliseconds before resolving */
  delay?: number;
  /** Success rate (0-1), used to simulate occasional failures */
  successRate?: number;
  /** Custom error message for failures */
  errorMessage?: string;
}

/**
 * Mock request utility for creating fake API calls during development
 * @param data - Mock data to return
 * @param options - Configuration options for the mock request
 * @returns Promise that resolves with mock data after a delay
 */
export const mockRequest = async <T>(data: T, options: MockRequestOptions = {}): Promise<T> => {
  const { delay = 1000, successRate = 1, errorMessage = "Mock request failed" } = options;

  const startTime = Date.now();
  const isServer = typeof window === "undefined";
  const context = isServer ? "[Server]" : "[Client]";

  console.log(
    `🚀 ${context} Mock Request starting - delay: ${delay}ms, success rate: ${successRate * 100}%`
  );

  // Add delay to simulate network request
  await sleep(delay);

  const duration = Date.now() - startTime;

  // Simulate occasional failures based on success rate
  if (Math.random() > successRate) {
    console.error(`🔴 ${context} Mock Request Failed after ${duration}ms: ${errorMessage}`);
    throw new Error(errorMessage);
  }

  console.log(`🟢 ${context} Mock Request Success after ${duration}ms:`, {
    dataType: typeof data,
    hasData: !!data,
    ...(data && typeof data === "object" && "length" in data
      ? { length: (data as any).length }
      : {}),
    ...(data && typeof data === "object" && "projects" in data
      ? { projectsCount: (data as any).projects?.length }
      : {}),
  });

  return data;
};

/**
 * Mock request that always fails
 * @param errorMessage - Error message to throw
 * @param delay - Delay before throwing error
 */
export const mockFailedRequest = async (
  errorMessage = "Mock request failed",
  delay = 1000
): Promise<never> => {
  await sleep(delay);
  console.error(`🔴 Mock Request Failed: ${errorMessage}`);
  throw new Error(errorMessage);
};
