import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'
import type { ApiErrorResponse } from '@/types'

/** Token em memória: o interceptor lê daqui, sem I/O a cada pedido. */
let authToken: string | null = null
let unauthorizedHandler: (() => void) | null = null

export const setAuthToken = (token: string | null): void => {
  authToken = token
}

/** O SessionProvider regista aqui o que fazer quando a API responde 401. */
export const onUnauthorized = (handler: (() => void) | null): void => {
  unauthorizedHandler = handler
}

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 15000,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // 401 com sessão ativa = token expirado/inválido. No login (sem token) o 401 é só "credenciais erradas".
    if (error.response?.status === 401 && authToken) {
      unauthorizedHandler?.()
    }
    return Promise.reject(error)
  },
)

export const extractErrorMessage = (error: unknown, fallback = 'Ocorreu um erro inesperado'): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorResponse | undefined
    if (data?.message) {
      return Array.isArray(data.errors) && data.errors.length > 0
        ? `${data.message}: ${data.errors.join(', ')}`
        : data.message
    }
    if (!error.response) return 'Sem ligação ao servidor. Verifique a rede e a URL da API.'
  }
  if (error instanceof Error) return error.message
  return fallback
}
