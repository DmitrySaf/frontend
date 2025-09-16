import axios from 'axios'

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерсептор для запросов (добавление авторизации, логирование)
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    
    // Здесь можно добавить авторизационные заголовки
    // const token = getAuthToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
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
