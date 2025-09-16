'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { authApi } from '../api'
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
      try {
        // Проверяем наличие токена в localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('supabase_token') : null
        
        if (token) {
          // Проверяем токен через API
          const result = await authApi.getSession()
          console.log('Текущая сессия:', result)
          
          if (result.session) {
            setSession(result.session)
            setUser(result.user)
          } else {
            // Токен невалиден, удаляем его
            if (typeof window !== 'undefined') {
              localStorage.removeItem('supabase_token')
            }
          }
        }
      } catch (error) {
        console.error('Ошибка при получении сессии:', error)
        // В случае ошибки удаляем токен
        if (typeof window !== 'undefined') {
          localStorage.removeItem('supabase_token')
        }
      }
      
      setIsLoading(false)
    }

    getSession()
  }, [router])

  // Отправка кода на email
  const signInWithEmail = async (email: string) => {
    setIsLoading(true)
    console.log('Отправка OTP на email:', email)
    
    try {
      const result = await authApi.signInWithEmail(email)
      console.log('Результат отправки OTP:', result)
      
      setIsLoading(false)
      return { error: null }
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
      const result = await authApi.verifyOtp(email, token)
      console.log('Результат проверки OTP:', result)
      
      if (result.data?.session) {
        // Сохраняем токен в localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('supabase_token', result.data.session.access_token)
        }
        
        setSession(result.data.session)
        setUser(result.data.session.user)
        router.push('/settings')
      }
      
      setIsLoading(false)
      return { error: null }
    } catch (e) {
      console.error('Ошибка при проверке OTP:', e)
      setIsLoading(false)
      return { error: e }
    }
  }

  // Выход из системы
  const signOut = async () => {
    setIsLoading(true)
    
    try {
      await authApi.signOut()
      
      // Удаляем токен из localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('supabase_token')
      }
      
      setSession(null)
      setUser(null)
      setIsLoading(false)
      router.push('/login')
      
      return { error: null }
    } catch (e) {
      console.error('Ошибка при выходе:', e)
      setIsLoading(false)
      return { error: e }
    }
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
