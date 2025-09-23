import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { API_BASE_URL }

// Интерсептор для запросов (добавление авторизации, логирование)
// apiClient.interceptors.request.use(
//   async (config) => {
    
//     return config
//   },
//   (error) => {
//     console.error('📤 Request Error:', error)
//     return Promise.reject(error)
//   }
// )

// Интерсептор для ответов (обработка ошибок, логирование)
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log(`📥 API Response: ${response.status} ${response.config.url}`)
//     return response
//   },
//   (error) => {
//     console.error('📥 Response Error:', {
//       status: error.response?.status,
//       url: error.config?.url,
//       message: error.message,
//     })
    
//     // Здесь можно добавить глобальную обработку ошибок
//     // например, редирект на страницу логина при 401
    
//     return Promise.reject(error)
//   }
// )
