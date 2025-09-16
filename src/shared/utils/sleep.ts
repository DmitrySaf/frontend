/**
 * Utility function to create a delay (sleep)
 * @param ms - milliseconds to wait
 * @returns Promise that resolves after the specified delay
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
