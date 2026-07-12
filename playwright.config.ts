import { defineConfig, devices } from "@playwright/test";

/**
 * E2E-конфигурация (этап 16).
 * Прогоны серийные: спеки делят одно сид-сообщество «Пиксель» и живую Supabase-базу,
 * а сеть до неё бывает медленной — параллелизм даёт флаки, надёжность важнее скорости.
 */
export default defineConfig({
  testDir: "./e2e",
  // Живая Supabase-база за медленной сетью + холодная компиляция маршрутов Next
  // легко дают 30с+ на первый запрос — таймауты щедрые осознанно.
  timeout: 120_000,
  expect: { timeout: 35_000 },
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 1,
  reporter: [["list"]],
  globalSetup: "./e2e/helpers/global-setup.ts",
  use: {
    baseURL: "http://localhost:3000",
    navigationTimeout: 60_000,
    actionTimeout: 30_000,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      testIgnore: /mobile/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      testMatch: /mobile/,
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000/login",
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
