import { api } from './api'
import type { ApiSuccessResponse, LoginResponse, UserResponse } from '@/types'
import type { LoginFormData, RegisterFormData } from '@/types/schemas'

export const authService = {
  async login(credentials: LoginFormData): Promise<LoginResponse> {
    const res = await api.post<ApiSuccessResponse<LoginResponse>>('/auth/login', credentials)
    return res.data.data
  },

  async register(payload: RegisterFormData): Promise<UserResponse> {
    const res = await api.post<ApiSuccessResponse<UserResponse>>('/auth/register', payload)
    return res.data.data
  },
}
