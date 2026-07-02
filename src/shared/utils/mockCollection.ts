import { sleep } from "./sleep";

// Задержка имитирует сетевой запрос, чтобы UI честно проживал loading-состояния
const MOCK_DELAY_MS = 150;

const STORAGE_PREFIX = "bean:mock:";

interface MockRecord {
  id: string;
}

/**
 * localStorage-коллекция для мок-данных (UI-first этап).
 * Форма записей повторяет docs/db-schema.md, чтобы подключение реальной БД
 * свелось к замене этих функций на Supabase-запросы.
 */
export function createMockCollection<T extends MockRecord>(name: string) {
  const storageKey = `${STORAGE_PREFIX}${name}`;

  const read = (): T[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? (JSON.parse(raw) as T[]) : [];
    } catch {
      return [];
    }
  };

  const write = (records: T[]): void => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(records));
  };

  return {
    async list(): Promise<T[]> {
      await sleep(MOCK_DELAY_MS);
      return read();
    },

    async insert(record: Omit<T, "id"> & { id?: string }): Promise<T> {
      await sleep(MOCK_DELAY_MS);
      const full = { ...record, id: record.id ?? crypto.randomUUID() } as T;
      write([...read(), full]);
      return full;
    },

    async insertMany(records: T[]): Promise<T[]> {
      await sleep(MOCK_DELAY_MS);
      write([...read(), ...records]);
      return records;
    },

    async update(id: string, patch: Partial<T>): Promise<T> {
      await sleep(MOCK_DELAY_MS);
      const records = read();
      const index = records.findIndex((record) => record.id === id);
      if (index === -1) {
        throw new Error("Запись не найдена");
      }
      const updated = { ...records[index], ...patch, id };
      records[index] = updated;
      write(records);
      return updated;
    },

    async remove(id: string): Promise<void> {
      await sleep(MOCK_DELAY_MS);
      write(read().filter((record) => record.id !== id));
    },
  };
}
