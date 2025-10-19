import { mockRequest } from "@/shared/utils";

/**
 * Получение списка курсов
 */
export const getCourses = async () => {
  console.log("📚 Fetching courses list...");

  return mockRequest(
    {
      courses: [
        { id: "1", title: "React Основы", description: "Изучение React с нуля" },
        { id: "2", title: "TypeScript Advanced", description: "Продвинутый TypeScript" },
        { id: "3", title: "Next.js Full Stack", description: "Полный курс Next.js" },
      ],
      total: 3,
      page: 1,
      limit: 10,
    },
    { delay: 800, successRate: 0.95 }
  );
};

/**
 * Получение единичного курса
 */
export const getCourse = async (id: string) => {
  console.log(`📚 Fetching course with id: ${id}...`);

  return mockRequest(
    {
      id,
      title: `Course ${id}`,
      description: `Описание курса ${id}`,
      lessons: [
        { id: "1", title: "Урок 1", duration: 1800 },
        { id: "2", title: "Урок 2", duration: 2400 },
      ],
      author: { id: "1", name: "Иван Иванов" },
      createdAt: new Date().toISOString(),
    },
    { delay: 600 }
  );
};
