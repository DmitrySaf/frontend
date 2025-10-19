interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
  membersCount?: number;
  coursesCount?: number;
  postsCount?: number;
}

export default function ProjectCard({
  id,
  title,
  description,
  membersCount = 0,
  coursesCount = 0,
  postsCount = 0,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 mb-4">{description}</p>}

      <div className="flex items-center space-x-4 text-sm text-gray-500">
        <span>{membersCount} участников</span>
        <span>{coursesCount} курсов</span>
        <span>{postsCount} постов</span>
      </div>
    </div>
  );
}
