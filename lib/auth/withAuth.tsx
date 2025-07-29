'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/AuthContext'
import { useEffect } from 'react'

export default function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuth(props: P) {
    const { user, isLoading } = useAuth()
    console.log(user, isLoading)
    const router = useRouter()

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/auth-page')
      }
    }, [user, isLoading, router])

    // Показываем загрузку, пока проверяем авторизацию
    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
      )
    }

    // Если пользователь авторизован, рендерим компонент
    if (user) {
      return <Component {...props} />
    }

    // Пустой фрагмент во время редиректа
    return null
  }
} 