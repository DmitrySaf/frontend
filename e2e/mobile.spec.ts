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
  await expect(page.getByText("новости")).toBeVisible();

  await page.getByText("новости").click();
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

test("настройки: мобильные пиллы навигации работают", async ({ page }) => {
  await page.goto("/settings/profile");
  await expect(page.getByText("Настройки аккаунта")).toBeVisible();
  await page.getByRole("link", { name: "Транзакции" }).click();
  await expect(page.getByText("Подписка — Базовый").first()).toBeVisible();
});
