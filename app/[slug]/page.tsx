import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Profile({ params }: ProfilePageProps) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  if (!decodedSlug.startsWith("@")) {
    notFound();
  }

  const username = decodedSlug.slice(1);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      { username }
    </div>
  );
} 