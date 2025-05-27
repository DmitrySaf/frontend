'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

// Определение типа контекста авторизации
type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signInWithEmail: (email: string) => Promise<{ error: any }>
  verifyOtp: (email: string, token: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
}

// Создание контекста с начальными значениями
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signInWithEmail: async () => ({ error: null }),
  verifyOtp: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
})

// Хук для использования контекста авторизации
export const useAuth = () => useContext(AuthContext)

// Провайдер контекста авторизации
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    // Получение текущей сессии при загрузке
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Ошибка при получении сессии:', error)
      }
      
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
      
      // Логируем для отладки
      console.log('Текущая сессия:', session)
      console.log('Текущий пользователь:', session?.user)
    }

    getSession()

    // Подписка на изменения авторизации
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Изменение состояния авторизации:', _event, session)
      
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)

      // Если пользователь авторизован и находится на странице авторизации,
      // перенаправляем его на страницу настроек
      if (session && window.location.pathname === '/auth-page') {
        router.push('/settings')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  // Отправка кода на email
  const signInWithEmail = async (email: string) => {
    setIsLoading(true)
    console.log('Отправка OTP на email:', email)
    
    try {
      // Проверка настроек Supabase
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Supabase Key присутствует:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      console.log('Redirect URL:', `${origin}/auth-page`);
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          // Убираем redirectTo, так как мы используем OTP, а не магические ссылки
        },
      })
      
      console.log('Результат отправки OTP:', data, error)
      
      setIsLoading(false)
      return { error }
    } catch (e) {
      console.error('Ошибка при отправке OTP:', e)
      setIsLoading(false)
      return { error: e }
    }
  }

  // Подтверждение кода
  const verifyOtp = async (email: string, token: string) => {
    setIsLoading(true)
    console.log('Проверка OTP:', email, token)
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      })
      
      console.log('Результат проверки OTP:', data, error)
      
      setIsLoading(false)
      
      // Если ошибок нет и пользователь успешно авторизован, перенаправляем на настройки
      if (!error && (await supabase.auth.getSession()).data.session) {
        router.push('/settings')
      }
      
      return { error }
    } catch (e) {
      console.error('Ошибка при проверке OTP:', e)
      setIsLoading(false)
      return { error: e }
    }
  }

  // Выход из системы
  const signOut = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signOut()
    setIsLoading(false)
    if (!error) {
      router.push('/auth-page')
    }
    return { error }
  }

  const value = {
    user,
    session,
    isLoading,
    signInWithEmail,
    verifyOtp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 