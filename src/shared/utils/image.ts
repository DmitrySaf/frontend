/**
 * Файл → data URL с даунскейлом через canvas.
 * В мок-режиме data URL хранится в localStorage и переживает перезагрузку;
 * при подключении БД заменяется на загрузку в Supabase Storage.
 */
export function fileToDataUrl(file: File, maxWidth = 1280): Promise<string> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const scale = Math.min(1, maxWidth / image.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);

      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Не удалось обработать изображение"));
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Не удалось прочитать изображение"));
    };

    image.src = objectUrl;
  });
}
