import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { API_BASE_URL }

// Интерсептор для запросов (добавление авторизации, логирование)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    
    // Добавляем авторизационные заголовки
    const token = typeof window !== 'undefined' ? localStorage.getItem('supabase_token') : null
    // if (token) {
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IkFpWDlqK2RoVnFIWmVtVnEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3dkb3ZjbW9menJ1bGtzdWVmc2VyLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkZGQxMjYyYS01N2Y5LTQyMDUtOWViOS0xOWY1Mzk4MDk2NzUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU4MDQ4NzgyLCJpYXQiOjE3NTgwNDUxODIsImVtYWlsIjoiYXJrYWRpeS5wYXJvdm96b3YwMUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiYXJrYWRpeS5wYXJvdm96b3YwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJkZGQxMjYyYS01N2Y5LTQyMDUtOWViOS0xOWY1Mzk4MDk2NzUifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvdHAiLCJ0aW1lc3RhbXAiOjE3NTgwNDUxODJ9XSwic2Vzc2lvbl9pZCI6IjVhODk0Nzc2LWQ0MDQtNDlhOC05MWFkLThhOTk4YzI5ZmJlMiIsImlzX2Fub255bW91cyI6ZmFsc2V9.YfRHuo3rDSLPOl4Rb6GZG9xl_MxUGrPNSvLR-0H3dYY`
    // }
    
    return config
  },
  (error) => {
    console.error('📤 Request Error:', error)
    return Promise.reject(error)
  }
)

// Интерсептор для ответов (обработка ошибок, логирование)
apiClient.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('📥 Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
    })
    
    // Здесь можно добавить глобальную обработку ошибок
    // например, редирект на страницу логина при 401
    
    return Promise.reject(error)
  }
)
