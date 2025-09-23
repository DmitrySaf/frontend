'use client'

import { usePostsQuery } from "@/entities/post";
import { Loader2 } from "lucide-react";

export default function PostList() {
  const { data: postsData, isLoading, error } = usePostsQuery();

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Посты</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
            <p className="text-gray-600">Загружаем посты...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Посты</h1>
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Ошибка загрузки</h2>
              <p className="text-gray-600">Не удалось загрузить посты</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log('📝 Posts data:', postsData);

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Посты</h1>
      <div className="space-y-4">
        {postsData?.posts?.map((post: any) => (
          <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-3">{post.content}</p>
            <div className="text-sm text-gray-500">
              Автор: {post.author}
            </div>
          </div>
        )) || (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-500">Посты не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
