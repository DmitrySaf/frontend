import { readFileSync } from "node:fs";
import path from "node:path";
import type { BrowserContext } from "@playwright/test";

/**
 * Программный вход для e2e: UI-логин работает только по OTP-письму,
 * поэтому сессия получается password-грантом (тестовые пользователи сида)
 * и кладётся в куки формата @supabase/ssr — приложение видит обычную сессию.
 * Тестовые пользователи создаются сидом этапа 15 и удаляются после этапа 16.
 */

const env = Object.fromEntries(
  readFileSync(path.join(__dirname, "..", "..", ".env.local"), "utf8")
    .split("\n")
    .filter((line) => line.includes("="))
    .map((line) => [line.slice(0, line.indexOf("=")).trim(), line.slice(line.indexOf("=") + 1).trim()])
);

export const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_KEY = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;
const PROJECT_REF = new URL(SUPABASE_URL).hostname.split(".")[0];

export const E2E_PASSWORD = process.env.E2E_PASSWORD ?? "BeanTest!2026";
export const AUTHOR_EMAIL = "author@bean.test";
export const MEMBER_EMAIL = "member@bean.test";
/** Участник без membership в «Пикселе»-подобных свежих сообществах — для сценариев вступления */
export const JOINER_EMAIL = "daniil@bean.test";

const sessionCache = new Map<string, Record<string, unknown>>();

async function fetchSession(email: string): Promise<Record<string, unknown>> {
  const cached = sessionCache.get(email);
  if (cached) return cached;

  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: E2E_PASSWORD }),
  });
  const session = (await response.json()) as Record<string, unknown>;
  if (!session.access_token) {
    throw new Error(`e2e login failed for ${email}: ${JSON.stringify(session).slice(0, 200)}`);
  }
  sessionCache.set(email, session);
  return session;
}

/** Кука @supabase/ssr: "base64-" + base64url(JSON сессии), чанки по 3180 символов */
function sessionToCookies(session: Record<string, unknown>) {
  const raw = `base64-${Buffer.from(JSON.stringify(session)).toString("base64url")}`;
  const CHUNK = 3180;
  const pairs =
    raw.length <= CHUNK
      ? [[`sb-${PROJECT_REF}-auth-token`, raw] as const]
      : Array.from({ length: Math.ceil(raw.length / CHUNK) }, (_, index) => [
          `sb-${PROJECT_REF}-auth-token.${index}`,
          raw.slice(index * CHUNK, (index + 1) * CHUNK),
        ] as const);

  return pairs.map(([name, value]) => ({
    name,
    value,
    domain: "localhost",
    path: "/",
    httpOnly: false,
    secure: false,
    sameSite: "Lax" as const,
  }));
}

export async function signInAs(context: BrowserContext, email: string): Promise<void> {
  const session = await fetchSession(email);
  await context.addCookies(sessionToCookies(session));
}
