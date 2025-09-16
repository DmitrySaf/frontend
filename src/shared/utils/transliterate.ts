import { transliterate as transliterateLib } from 'transliteration'

/**
 * Транслитерирует текст и делает его пригодным для URL
 * @param text - исходный текст
 * @returns транслитерированный и очищенный текст
 */
export function transliterate(text: string): string {
  return transliterateLib(text)
    .toLowerCase()
    // Заменяем пробелы и спецсимволы на дефисы
    .replace(/[^a-z0-9]/g, '-')
    // Убираем множественные дефисы
    .replace(/-+/g, '-')
    // Убираем дефисы в начале и конце
    .replace(/^-|-$/g, '')
}
