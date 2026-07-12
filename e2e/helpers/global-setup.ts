/**
 * Прогрев перед сьютом: dev-сервер компилирует каждый маршрут при первом заходе
 * (легко 20-40с). Прогоняем HTTP-запрос по каждому маршруту (он же дёргает Supabase
 * при рендере), чтобы первый тест не съедал таймаут на холодном старте.
 */

const ROUTES = [
  "/login",
  "/pixel",
  "/definitely-not-a-page",
  "/communities",
  "/communities/pixel/obschiy-chat",
  "/communities/pixel/novosti",
  "/communities/pixel/kurs-po-figme",
  "/communities/pixel/razbory-maketov",
  "/communities/pixel/admin/dashboard",
  "/communities/pixel/admin/appearance",
  "/communities/pixel/admin/settings",
  "/settings/profile",
  "/settings/verification",
  "/settings/payment",
  "/settings/billing",
];

async function warm(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    await fetch(url, { signal: controller.signal });
  } catch {
    // Прогрев best-effort: цель — заставить сервер скомпилировать маршрут
  } finally {
    clearTimeout(timer);
  }
}

export default async function globalSetup() {
  const base = "http://localhost:3000";
  process.stdout.write("[global-setup] warming routes…\n");

  // Последовательно: параллельный залп на dev-сервере провоцирует MODULE_NOT_FOUND
  for (const route of ROUTES) {
    const started = Date.now();
    await warm(base + route, 90_000);
    process.stdout.write(`  ${route} (${Date.now() - started}ms)\n`);
  }
  process.stdout.write("[global-setup] warm-up complete\n");
}
