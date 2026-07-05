import {
  getCommunities as _getCommunities,
  getCommunity as _getCommunity,
  createCommunity as _createCommunity,
  updateCommunity as _updateCommunity,
  deleteCommunity as _deleteCommunity,
  type Community as CommunityRecord,
} from "@/api/communities";
import { getAuthUser } from "@/api/auth";
import { type TypedSupabaseClient } from "@/api";
import { createBrowserClient } from "@/api/browser-client";
import { createMockCollection } from "@/shared/utils";
import type { CreateCommunityData } from "../model";
import type {
  CommunityExtrasRecord,
  CommunityProfile,
  UpdateCommunityProfileInput,
} from "./types";

// Расширенные поля сообщества (описание, оформление, видимость) — mock до этапа БД
const communityExtras = createMockCollection<CommunityExtrasRecord>("communities_extras");

// ============================================================
// DEMO MOCK — демо-сообщества для проверки без Supabase.
// Удаляется на этапе 13 (подключение БД).
// ============================================================
const demoCommunities = createMockCollection<CommunityRecord & { id: string }>("communities_demo");
const demoSeeded = createMockCollection<{ id: string }>("communities_demo_seeded");

async function ensureDemoCommunities(): Promise<(CommunityRecord & { id: string })[]> {
  const seeded = await demoSeeded.list();

  if (seeded.length === 0) {
    const now = new Date().toISOString();
    await demoCommunities.insertMany([
      {
        id: "bean-university",
        name: "bean-university",
        display_name: "Bean University",
        created_at: now,
        updated_at: now,
      },
      {
        id: "klub-avtorov",
        name: "klub-avtorov",
        display_name: "Клуб авторов",
        created_at: now,
        updated_at: now,
      },
    ]);
    // Первое демо-сообщество — открытое с описанием (витрина доступна сразу);
    // второе остаётся hidden — для проверки 404 и инвайтов
    await communityExtras.insert({
      id: "bean-university",
      description:
        "Закрытое сообщество для тех, кто строит личный бренд и зарабатывает на контенте. Курсы, разборы и поддержка комьюнити.",
      cover_url: null,
      logo_url: null,
      visibility: "live",
    });
    await demoSeeded.insert({ id: "seeded" });
  }

  return demoCommunities.list();
}

async function findDemoCommunity(
  slug: string
): Promise<(CommunityRecord & { id: string }) | null> {
  const all = await ensureDemoCommunities();
  return all.find((record) => record.name === slug) ?? null;
}

const DEFAULT_EXTRAS: Omit<CommunityExtrasRecord, "id"> = {
  description: "",
  cover_url: null,
  logo_url: null,
  visibility: "hidden",
};

/** Миграция значений старой модели видимости (public/private → live/hidden) */
function normalizeVisibility(value: string): CommunityExtrasRecord["visibility"] {
  if (value === "public") return "live";
  if (value === "private") return "hidden";
  if (value === "unlisted" || value === "live") return value;
  return "hidden";
}

export const getCommunityExtras = async (slug: string): Promise<CommunityExtrasRecord> => {
  const all = await communityExtras.list();
  const found = all.find((record) => record.id === slug);
  if (!found) return { id: slug, ...DEFAULT_EXTRAS };
  return { ...found, visibility: normalizeVisibility(found.visibility) };
};

/** Карта slug → extras для всех сообществ (логотипы в rail) */
export const getAllCommunityExtras = async (): Promise<CommunityExtrasRecord[]> => {
  return communityExtras.list();
};

/**
 * Полный профиль сообщества: базовые поля из Supabase + расширенные из mock
 */
export const getCommunityProfile = async (
  client: TypedSupabaseClient,
  slug: string
): Promise<CommunityProfile> => {
  const [community, extras] = await Promise.all([
    getCommunity(client, slug),
    getCommunityExtras(slug),
  ]);

  return {
    name: community.name,
    displayName: community.display_name,
    description: extras.description,
    coverUrl: extras.cover_url,
    logoUrl: extras.logo_url,
    visibility: extras.visibility,
  };
};

/**
 * Обновление профиля сообщества: display_name — в Supabase, остальное — в mock extras
 */
export const updateCommunityProfile = async (
  input: UpdateCommunityProfileInput
): Promise<void> => {
  const client = createBrowserClient();

  if (input.displayName !== undefined) {
    const demo = await findDemoCommunity(input.slug);
    if (demo) {
      // DEMO MOCK: имя демо-сообщества меняется локально
      await demoCommunities.update(demo.id, {
        display_name: input.displayName,
        updated_at: new Date().toISOString(),
      });
    } else {
      const { error } = await _updateCommunity(client, input.slug, {
        display_name: input.displayName,
      });
      if (error) {
        throw new Error(error.message || "Ошибка при сохранении названия");
      }
    }
  }

  const current = await getCommunityExtras(input.slug);
  const next: CommunityExtrasRecord = {
    ...current,
    description: input.description ?? current.description,
    cover_url: input.coverUrl !== undefined ? input.coverUrl : current.cover_url,
    logo_url: input.logoUrl !== undefined ? input.logoUrl : current.logo_url,
    visibility: input.visibility ?? current.visibility,
  };

  const all = await communityExtras.list();
  if (all.some((record) => record.id === input.slug)) {
    await communityExtras.update(input.slug, next);
  } else {
    await communityExtras.insert(next);
  }
};

/**
 * Получение списка сообществ
 */
export const getCommunities = async (client: TypedSupabaseClient): Promise<CommunityRecord[]> => {
  const demo = await ensureDemoCommunities();

  // DEMO MOCK: Supabase может быть недоступен — демо-сообщества работают всегда
  let real: CommunityRecord[] = [];
  try {
    const { data } = await _getCommunities(client);
    real = data ?? [];
  } catch {
    real = [];
  }

  const demoSlugs = new Set(demo.map((record) => record.name));
  return [...demo, ...real.filter((record) => !demoSlugs.has(record.name))];
};

/**
 * Получение единичного сообщества
 */
export const getCommunity = async (
  client: TypedSupabaseClient,
  name: string
): Promise<CommunityRecord> => {
  // DEMO MOCK: демо-сообщества резолвятся без Supabase
  const demo = await findDemoCommunity(name);
  if (demo) return demo;

  const { data, error } = await _getCommunity(client, name);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Community not found");
  }

  return data;
};

/**
 * Создание нового сообщества
 */
export const createCommunity = async (data: CreateCommunityData): Promise<void> => {
  const client = createBrowserClient();

  // Получаем текущего пользователя
  const { data: userData, error: userError } = await getAuthUser(client);

  if (userError || !userData?.user) {
    throw new Error("Необходимо войти в систему для создания сообщества");
  }

  try {
    const { error } = await _createCommunity(client, {
      name: data.name,
      display_name: data.displayName,
      owner_id: userData.user.id,
    });
    if (error) {
      throw new Error(error.message || "Ошибка при создании сообщества");
    }
  } catch (error) {
    // DEMO MOCK: Supabase недоступен — создаём локальное демо-сообщество
    const existing = await findDemoCommunity(data.name);
    if (existing) {
      throw new Error("Сообщество с таким адресом уже существует");
    }
    const now = new Date().toISOString();
    await demoCommunities.insert({
      id: data.name,
      name: data.name,
      display_name: data.displayName,
      created_at: now,
      updated_at: now,
    });
  }
};

/**
 * Удаление сообщества
 */
export const deleteCommunity = async (name: string): Promise<void> => {
  // DEMO MOCK: демо-сообщество удаляется локально
  const demo = await findDemoCommunity(name);
  if (demo) {
    await demoCommunities.remove(demo.id);
    return;
  }

  const client = createBrowserClient();

  const { error } = await _deleteCommunity(client, name);

  if (error) {
    throw new Error(error.message || "Ошибка при удалении сообщества");
  }
};
