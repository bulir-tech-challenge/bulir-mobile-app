import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@/features/auth/session-context'
import { queryKeys } from '@/lib/query-client'
import { usersService } from '@/services/users.service'
import type { UserResponse } from '@/types'
import type { DepositFormData } from '@/types/schemas'

export function useWallet() {
  const queryClient = useQueryClient()
  const { token } = useSession()

  const profileQuery = useQuery<UserResponse>({
    queryKey: queryKeys.profile,
    queryFn: usersService.getProfile,
    enabled: !!token,
  })

  const depositMutation = useMutation({
    mutationFn: (data: DepositFormData) => usersService.deposit(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.profile, updatedUser)
    },
  })

  return {
    user: profileQuery.data,
    balance: profileQuery.data?.balance ?? 0,
    isLoading: profileQuery.isLoading,
    deposit: depositMutation.mutateAsync,
    isDepositing: depositMutation.isPending,
    depositError: depositMutation.error,
  }
}
