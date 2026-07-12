import { expect, test } from "@playwright/test";
import { AUTHOR_EMAIL, MEMBER_EMAIL, signInAs } from "./helpers/auth";

/**
 * Слой 3: realtime — сообщение автора появляется у участницы без перезагрузки.
 * Требует живого WebSocket до Supabase; при мёртвой сети тест честно упадёт.
 */

test("сообщение доставляется во второе окно по realtime", async ({ browser }) => {
  const authorContext = await browser.newContext();
  const memberContext = await browser.newContext();
  await signInAs(authorContext, AUTHOR_EMAIL);
  await signInAs(memberContext, MEMBER_EMAIL);

  const authorPage = await authorContext.newPage();
  const memberPage = await memberContext.newPage();

  await authorPage.goto("/communities/pixel/obschiy-chat");
  await memberPage.goto("/communities/pixel/obschiy-chat");

  const composer = authorPage.getByPlaceholder("Написать в #общий-чат…");
  const memberComposer = memberPage.getByPlaceholder("Написать в #общий-чат…");
  await expect(composer).toBeVisible();
  await expect(memberComposer).toBeVisible();
  // Даём каналу время на подписку
  await authorPage.waitForTimeout(3000);

  const message = `Realtime-проверка ${Date.now().toString().slice(-6)}`;
  await composer.fill(message);
  await composer.press("Enter");

  await expect(authorPage.getByText(message)).toBeVisible();
  await expect(memberPage.getByText(message)).toBeVisible({ timeout: 30_000 });

  await authorContext.close();
  await memberContext.close();
});
