"use client";

import type { Channel } from "@/entities/channel";
import { useCommunityRole } from "@/entities/member";
import { useDeletePostMutation, usePostsQuery, usePostsRealtime } from "@/entities/post";
import { DeleteDialog } from "@/shared/components";
import { Loader2, Newspaper } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { PostCard } from "./PostCard";
import { PostComposer } from "./PostComposer";

export function PostsScreen({ channel }: { channel: Channel }) {
  const { data: posts, isLoading } = usePostsQuery(channel.id);
  usePostsRealtime(channel.id);
  const deletePost = useDeletePostMutation();
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  // Публикуют только админы (участники читают и реагируют)
  const params = useParams();
  const { isAdmin } = useCommunityRole((params?.slug as string) ?? "");
  const canPost = isAdmin;

  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="max-w-[720px] w-full mx-auto px-6 py-5 space-y-4">
        {canPost && <PostComposer channelId={channel.id} />}

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="size-6 animate-spin text-gray-500" />
          </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isAdmin={isAdmin}
              onDelete={() => setDeletingPostId(post.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="size-14 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
              <Newspaper className="size-6 text-gray-500" />
            </div>
            <p className="text-[15px] font-semibold text-black">Пока нет постов</p>
            <p className="text-sm text-gray-600 max-w-56">
              Опубликуйте первый пост — участники увидят его в этой ленте.
            </p>
          </div>
        )}
      </div>

      <DeleteDialog
        isOpen={deletingPostId !== null}
        onClose={() => setDeletingPostId(null)}
        onDelete={async () => {
          if (deletingPostId) {
            await deletePost.mutateAsync({ postId: deletingPostId, channelId: channel.id });
          }
        }}
        title="Удалить пост?"
        description="Пост будет удалён вместе с лайками и комментариями. Это действие нельзя отменить."
      />
    </div>
  );
}
