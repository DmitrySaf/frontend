// Global composables exports
// Доменные хуки теперь находятся в соответствующих entities/features
// Здесь должны быть только общие хуки типа useLocalStorage, useDebounce и т.д.
export { useServerQuery } from './useServerQuery';
export { useSupabaseRealtime } from './useSupabaseRealtime';
