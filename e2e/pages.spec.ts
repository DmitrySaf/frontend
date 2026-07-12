import { type Page, expect, test } from "@playwright/test";
import { AUTHOR_EMAIL, MEMBER_EMAIL, signInAs } from "./helpers/auth";

/**
 * Слой 1: все страницы рендерятся с данными и без ошибок в консоли —
 * для гостя, автора и участника (сид-сообщество «Пиксель»).
 */

const IGNORED_CONSOLE = [
  "hydrat", // легаси-гидрация /login — разбор на этапе 18
  'unique "key"', // легаси SettingsProfileForm — этап 18
  "WebSocket", // realtime при нестабильной сети
  "Failed to load resource", // сетевые флаки картинок Storage
];

function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message.slice(0, 300)}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    if (IGNORED_CONSOLE.some((part) => text.includes(part))) return;
    errors.push(`console: ${text.slice(0, 300)}`);
  });
  return errors;
}

test.describe("Гость", () => {
  test("логин: форма почты рендерится и переходит к шагу кода", async ({ page }) => {
    const errors = watchErrors(page);
    // OTP стабим локально (перехват fetch до сети), чтобы не слать реальное письмо
    await page.route(/\/auth\/v1\/otp/, (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: "{}" })
    );
    await page.goto("/login");
    await expect(page.getByText("Почта")).toBeVisible();

    const email = page.locator('input[name="email"]');
    await email.fill("demo@bean.test");
    await expect(email).toHaveValue("demo@bean.test");
    await page.getByRole("button", { name: "Продолжить" }).click();
    await expect(page.getByText("Введите код подтверждения")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("гостя не пускает в приложение", async ({ page }) => {
    await page.goto("/communities");
    await page.waitForURL(/\/login/);
  });

  test("витрина «Пикселя»: тарифы, автор, CTA", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/pixel");
    await expect(page.getByRole("heading", { name: "Пиксель" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Присоединиться" })).toBeVisible();
    await expect(page.getByText("Базовый")).toBeVisible();
    await expect(page.getByText("Годовой")).toBeVisible();
    await expect(page.getByText("Навсегда")).toBeVisible();
    await expect(page.getByText("Автор сообщества")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("несуществующий адрес — единый 404 витрины", async ({ page }) => {
    // Верхнеуровневые пути захватывает catch-all [slug]: hidden-сообщество
    // и несуществующее выглядят одинаково (спецификация приватности, этап 9)
    await page.goto("/definitely-not-a-page");
    await expect(page.getByText("Страница не найдена")).toBeVisible();
    await expect(page.getByText("Возможно, ссылка устарела или сообщества не существует.")).toBeVisible();
  });
});

test.describe("Автор", () => {
  test.beforeEach(async ({ context }) => {
    await signInAs(context, AUTHOR_EMAIL);
  });

  const cases: Array<{ path: string; markers: string[] }> = [
    { path: "/communities/pixel/obschiy-chat", markers: ["Всем привет! Сегодня в 19:00"] },
    { path: "/communities/pixel/novosti", markers: ["Запускаем четвёртый поток курса по Figma"] },
    { path: "/communities/pixel/kurs-po-figme", markers: ["Знакомство с интерфейсом", "Просмотр"] },
    { path: "/communities/pixel/admin/dashboard", markers: ["Доход за 30 дней", "Тарифы"] },
    { path: "/communities/pixel/admin/appearance", markers: ["Внешний вид"] },
    { path: "/communities/pixel/admin/settings", markers: ["Видимость", "Удалить сообщество"] },
    { path: "/settings/profile", markers: ["Настройки аккаунта", "Социальные сети"] },
    { path: "/settings/verification", markers: ["Верификация пройдена"] },
    { path: "/settings/payment", markers: ["Добавленные карты"] },
    { path: "/settings/billing", markers: ["Подписка — Базовый"] },
    { path: "/pixel", markers: ["Открыть сообщество"] },
  ];

  for (const { path, markers } of cases) {
    test(`страница ${path}`, async ({ page }) => {
      const errors = watchErrors(page);
      await page.goto(path);
      for (const marker of markers) {
        await expect(page.getByText(marker).first()).toBeVisible();
      }
      expect(errors).toEqual([]);
    });
  }

  test("композер постов доступен автору", async ({ page }) => {
    await page.goto("/communities/pixel/novosti");
    await expect(page.getByText("Написать пост для сообщества…")).toBeVisible();
  });

  test("модалка создания сообщества открывается по «+» в rail", async ({ page }) => {
    await page.goto("/communities/pixel/obschiy-chat");
    await page.getByRole("button", { name: "Создать сообщество" }).click();
    await expect(page.getByText("Создать новое сообщество")).toBeVisible();
    await expect(page.getByText("Название сообщества")).toBeVisible();
  });
});

test.describe("Участница", () => {
  test.beforeEach(async ({ context }) => {
    await signInAs(context, MEMBER_EMAIL);
  });

  test("чат доступен, композер на месте", async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto("/communities/pixel/obschiy-chat");
    await expect(page.getByPlaceholder("Написать в #общий-чат…")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("посты читает, но публиковать не может", async ({ page }) => {
    await page.goto("/communities/pixel/novosti");
    await expect(page.getByText("Запускаем четвёртый поток курса по Figma")).toBeVisible();
    await expect(page.getByText("Написать пост для сообщества…")).toHaveCount(0);
  });

  test("private-канал по гранту открывается", async ({ page }) => {
    await page.goto("/communities/pixel/razbory-maketov");
    await expect(page.getByPlaceholder("Написать в #разборы-макетов…")).toBeVisible();
  });

  test("курс показывает её прогресс", async ({ page }) => {
    await page.goto("/communities/pixel/kurs-po-figme");
    await expect(page.getByText("2/6")).toBeVisible();
  });

  test("админка закрыта", async ({ page }) => {
    await page.goto("/communities/pixel/admin/dashboard");
    await expect(page.getByText("Нет доступа")).toBeVisible();
  });
});
