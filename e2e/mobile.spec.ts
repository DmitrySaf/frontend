import { expect, test } from "@playwright/test";
import { AUTHOR_EMAIL, signInAs } from "./helpers/auth";

/**
 * Слой 4: мобильный каркас (проект "mobile", iPhone 13 390×844) —
 * drawer, навигация по каналам, отправка сообщения с тача.
 */

test.beforeEach(async ({ context }) => {
  await signInAs(context, AUTHOR_EMAIL);
});

test("drawer открывается, ведёт в канал и закрывается", async ({ page }) => {
  await page.goto("/communities/pixel/obschiy-chat");
  await expect(page.getByPlaceholder("Написать в #общий-чат…")).toBeVisible();

  await page.getByRole("button", { name: "Открыть меню" }).click();
  // Десктопный сайдбар всегда в DOM (скрыт на мобиле), поэтому «новости» есть и там,
  // и в открытом drawer — берём видимый экземпляр (drawer)
  const newsLink = page.getByText("новости").filter({ visible: true });
  await expect(newsLink).toBeVisible();

  await newsLink.click();
  await page.waitForURL(/novosti/);
  // Переход закрывает drawer
  await expect(page.getByText("Запускаем четвёртый поток курса по Figma")).toBeVisible();
});

test("сообщение отправляется с мобильного композера", async ({ page }) => {
  await page.goto("/communities/pixel/obschiy-chat");
  const composer = page.getByPlaceholder("Написать в #общий-чат…");
  await expect(composer).toBeVisible();

  const message = `Мобильное сообщение ${Date.now().toString().slice(-5)}`;
  await composer.fill(message);
  await composer.press("Enter");
  await expect(page.getByText(message)).toBeVisible();
});

test("настройки: iOS-список навигации работает", async ({ page }) => {
  await page.goto("/settings");
  await expect(page.getByRole("heading", { name: "Настройки" })).toBeVisible();
  await page.getByRole("link", { name: "Транзакции" }).click();
  await expect(page.getByText("Подписка — Базовый").first()).toBeVisible();
  // «‹ Настройки» возвращает к списку
  await page.getByRole("link", { name: "Настройки" }).click();
  await expect(page.getByRole("link", { name: "Профиль" })).toBeVisible();
});
