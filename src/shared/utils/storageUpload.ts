import { createBrowserClient } from "@/api/browser-client";

/**
 * Заливает картинку в Storage и возвращает публичный URL.
 * Принимает data:-URL (результат fileToDataUrl); обычные URL возвращает как есть —
 * это позволяет сохранять формы, где обложку не меняли.
 */
export async function uploadDataUrlImage(
  bucket: string,
  path: string,
  dataUrl: string
): Promise<string> {
  if (!dataUrl.startsWith("data:")) return dataUrl;

  const blob = await (await fetch(dataUrl)).blob();
  const client = createBrowserClient();

  const { error } = await client.storage.from(bucket).upload(path, blob, {
    contentType: blob.type || "image/jpeg",
    upsert: true,
  });

  if (error) {
    throw new Error(error.message || "Не удалось загрузить изображение");
  }

  return client.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
