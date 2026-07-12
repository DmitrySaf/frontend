import { type BrowserContext, expect, test } from "@playwright/test";
import { AUTHOR_EMAIL, JOINER_EMAIL, signInAs } from "./helpers/auth";

/**
 * Слой 2: сквозной жизненный цикл — автор создаёт сообщество, наполняет его,
 * открывает продажи; участник платно вступает, общается и уходит; автор удаляет
 * сообщество (заодно чистим за собой тестовые данные).
 */

test.describe.serial("Жизненный цикл: автор → участник → удаление", () => {
  const communityName = `E2E Poток ${Date.now().toString().slice(-6)}`;
  let communityPath = ""; // /communities/<slug>
  let storefrontSlug = "";

  let authorContext: BrowserContext;

  test.beforeAll(async ({ browser }) => {
    authorContext = await browser.newContext();
    await signInAs(authorContext, AUTHOR_EMAIL);
  });

  test.afterAll(async () => {
    await authorContext.close();
  });

  test("автор создаёт сообщество", async () => {
    const page = await authorContext.newPage();
    await page.goto("/communities/pixel/obschiy-chat");
    await page.getByRole("button", { name: "Создать сообщество" }).click();
    await expect(page.getByText("Создать новое сообщество")).toBeVisible();

    await page.locator('input[name="displayName"]').fill(communityName);
    await page.getByRole("button", { name: "Создать", exact: true }).click();

    await page.waitForURL(/\/communities\/(?!pixel)[a-z0-9-]+/, { timeout: 45_000 });
    communityPath = new URL(page.url()).pathname.split("/").slice(0, 3).join("/");
    storefrontSlug = communityPath.split("/")[2];

    // Триггер создал структуру по умолчанию
    await expect(page.getByText("общий-чат").first()).toBeVisible();
    await page.close();
  });

  test("автор публикует пост в новом канале", async () => {
    const page = await authorContext.newPage();
    await page.goto(communityPath);
    await expect(page.getByText("общий-чат").first()).toBeVisible();

    // «+» категории появляется по ховеру — на всякий случай кликаем принудительно
    await page.getByRole("button", { name: "Новый таб" }).first().click({ force: true });
    await expect(page.getByText("Новый таб").first()).toBeVisible();
    await page.getByRole("button", { name: "Посты" }).click();
    await page.locator('input[name="name"]').fill("новости");
    await page.getByRole("button", { name: "Создать", exact: true }).click();

    await page.waitForURL(/novosti/, { timeout: 45_000 });
    await page.getByText("Написать пост для сообщества…").click();
    await page.getByPlaceholder("Заголовок").fill("Первый пост от e2e");
    await page.getByPlaceholder("Расскажите подробнее…").fill("Текст поста, созданного автотестом.");
    await page.getByRole("button", { name: "Опубликовать", exact: true }).last().click();

    await expect(page.getByText("Первый пост от e2e")).toBeVisible();
    await page.close();
  });

  test("автор добавляет тариф и открывает видимость", async () => {
    const page = await authorContext.newPage();
    await page.goto(`${communityPath}/admin/settings`);

    await page.getByRole("button", { name: "Добавить тариф" }).click();
    await page.locator('input[name="name"]').fill("Базовый");
    await page.locator('input[name="priceRubles"]').fill("990");
    await page.getByRole("button", { name: "Создать", exact: true }).click();
    await expect(page.getByText("₽ 990 / мес").first()).toBeVisible({ timeout: 30_000 });

    await page.getByText("Открытое").click();
    await page.getByRole("button", { name: "Сохранить" }).first().click();
    // Тост об успехе
    await expect(page.getByText(/сохранен|обновлен/i).first()).toBeVisible({ timeout: 20_000 });
    await page.close();
  });

  test("участник платно вступает и пишет в чат", async ({ browser }) => {
    const joinerContext = await browser.newContext();
    await signInAs(joinerContext, JOINER_EMAIL);
    const page = await joinerContext.newPage();

    await page.goto(`/${storefrontSlug}`);
    await expect(page.getByRole("button", { name: "Присоединиться" })).toBeVisible();
    await page.getByText("Базовый").click();
    await page.getByRole("button", { name: "Присоединиться" }).click();

    await expect(page.getByText("Оформление подписки")).toBeVisible();
    await page.getByRole("button", { name: /Оплатить/ }).click();

    await page.waitForURL(new RegExp(communityPath), { timeout: 60_000 });
    const composer = page.getByPlaceholder("Написать в #общий-чат…");
    await expect(composer).toBeVisible();

    const message = `Привет от e2e ${Date.now().toString().slice(-5)}`;
    await composer.fill(message);
    await composer.press("Enter");
    await expect(page.getByText(message)).toBeVisible();

    // Membership действительно записан: участник покидает сообщество
    await page.getByRole("button", { name: "Меню сообщества" }).click();
    await page.getByText("Покинуть сообщество").click();
    await page.getByRole("button", { name: "Покинуть", exact: true }).click();
    await page.waitForURL(/\/communities(?:\/|$|\?)/, { timeout: 45_000 });

    await joinerContext.close();
  });

  test("продажа видна в дашборде автора", async () => {
    const page = await authorContext.newPage();
    await page.goto(`${communityPath}/admin/dashboard`);
    await expect(page.getByText("Доход за 30 дней")).toBeVisible();
    // Единственная продажа тарифа за 990 — в статистике тарифов
    await expect(page.getByText("1 чел.").first()).toBeVisible();
    await page.close();
  });

  test("автор удаляет сообщество (чистка данных)", async () => {
    const page = await authorContext.newPage();
    await page.goto(`${communityPath}/admin/settings`);
    await page.getByRole("button", { name: "Удалить сообщество" }).click();
    await page.getByRole("button", { name: "Удалить", exact: true }).click();
    await page.waitForURL(/\/communities(?:\/|$|\?)/, { timeout: 45_000 });

    // Витрина удалённого сообщества гостю отвечает единым 404-экраном
    const guestContext = await page.context().browser()?.newContext();
    if (guestContext) {
      const guestPage = await guestContext.newPage();
      await guestPage.goto(`/${storefrontSlug}`);
      await expect(guestPage.getByText("Страница не найдена")).toBeVisible();
      await guestContext.close();
    }
    await page.close();
  });
});
