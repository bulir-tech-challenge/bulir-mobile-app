import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@/features/auth/session-context'
import { queryKeys } from '@/lib/query-client'
import { authService } from '@/services/auth.service'
import { usersService } from '@/services/users.service'
import type { UserResponse } from '@/types'
import type { LoginFormData, RegisterFormData } from '@/types/schemas'

export function useAuth() {
  const queryClient = useQueryClient()
  const { token, signIn, signOut } = useSession()

  const userQuery = useQuery<UserResponse>({
    queryKey: queryKeys.profile,
    queryFn: usersService.getProfile,
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  })

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormData) => authService.login(credentials),
    onSuccess: async ({ accessToken, user }) => {
      queryClient.setQueryData(queryKeys.profile, user)
      await signIn(accessToken)
    },
  })

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterFormData) => authService.register(payload),
  })

  return {
    user: userQuery.data,
    isAuthenticated: !!token,
    isLoadingUser: userQuery.isLoading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    logout: signOut,
  }
}
