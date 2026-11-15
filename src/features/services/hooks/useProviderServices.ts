import { useToast } from '@/components/ui/Toast'
import { useAuth } from '@/hooks/useAuth'
import { useServices } from '@/hooks/useServices'
import { toErrorMessage } from '@/lib/errors'
import type { Service } from '@/types'

/** Serviços do prestador autenticado + remoção com feedback. */
export function useProviderServices() {
  const toast = useToast()
  const { user } = useAuth()
  const { services, isLoadingServices, servicesError, deleteService, isDeletingService } = useServices()

  const remove = async (service: Service) => {
    try {
      await deleteService(service.id)
      toast.show(`"${service.name}" foi removido`)
    } catch (error) {
      toast.show(toErrorMessage(error, 'Não foi possível remover o serviço') ?? '', 'error')
    }
  }

  return {
    services: services.filter((s) => s.providerId === user?.id),
    isLoading: isLoadingServices,
    errorMessage: toErrorMessage(servicesError, 'Não foi possível carregar os serviços'),
    remove,
    isRemoving: isDeletingService,
  }
}
