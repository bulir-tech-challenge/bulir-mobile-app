import { useAuth } from '@/hooks/useAuth'
import { useBookings } from '@/hooks/useBookings'
import { useServices } from '@/hooks/useServices'

/** Indicadores do painel, calculados a partir das reservas e serviços do utilizador. */
export function useOverviewStats() {
  const { user } = useAuth()
  const { bookings, isLoadingBookings } = useBookings()
  const { services, isLoadingServices } = useServices()

  const confirmed = bookings.filter((b) => b.status === 'CONFIRMED')
  const recent = [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3)

  return {
    user,
    isLoading: isLoadingBookings || isLoadingServices,
    confirmedCount: confirmed.length,
    publishedServices: services.filter((s) => s.providerId === user?.id).length,
    availableServices: services.length,
    recent,
  }
}
