import Image from "next/image";
import { User } from "lucide-react";
import type { CommunityAuthor } from "../model";

interface AuthorCardProps {
  author: CommunityAuthor;
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
      {author.avatarUrl ? (
        <div className="relative size-10 overflow-hidden rounded-full">
          <Image
            src={author.avatarUrl}
            alt={author.displayName}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100">
          <User className="size-5 text-gray-500" />
        </div>
      )}
      <span className="text-sm font-medium text-gray-900">{author.displayName}</span>
    </div>
  );
};
