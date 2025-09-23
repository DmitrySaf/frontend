import { useCoursesServerQuery } from "@/entities/course";
import { HydrationBoundary } from "@/shared/components";
import { CourseList } from "@/pages/course-list";

export default async function CoursesPage() {
  // Используем новый SSR хук
  const { dehydratedState } = await useCoursesServerQuery();

  return (
    <HydrationBoundary state={dehydratedState}>
      <CourseList />
    </HydrationBoundary>
  );
}
