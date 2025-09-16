import { mockRequest } from '@/shared/utils'

/**
 * Получение списка постов
 */
export const getPosts = async () => {
  console.log('📝 Fetching posts list...')
  
  return mockRequest(
    {
      posts: [
        { id: '1', title: 'Первый пост', content: 'Содержимое первого поста', author: 'Автор 1' },
        { id: '2', title: 'Второй пост', content: 'Содержимое второго поста', author: 'Автор 2' },
        { id: '3', title: 'Третий пост', content: 'Содержимое третьего поста', author: 'Автор 3' }
      ],
      total: 3,
      page: 1,
      limit: 10
    },
    { delay: 700, successRate: 0.9 }
  )
}

/**
 * Получение единичного поста
 */
export const getPost = async (id: string) => {
  console.log(`📝 Fetching post with id: ${id}...`)
  
  return mockRequest(
    {
      id,
      title: `Post ${id}`,
      content: `Полное содержимое поста ${id}`,
      author: { id: '1', name: 'Автор поста', avatar: '/avatar.jpg' },
      tags: ['tag1', 'tag2'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20)
    },
    { delay: 500 }
  )
}
