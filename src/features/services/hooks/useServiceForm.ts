import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/Toast'
import { useServices } from '@/hooks/useServices'
import { toErrorMessage } from '@/lib/errors'
import { serviceSchema } from '@/types/schemas'
import type { Service } from '@/types'
import type { ServiceFormData } from '@/types/schemas'

const emptyValues = { name: '', description: '', price: undefined }

/** Cria quando `service` é null, edita caso contrário. */
export function useServiceForm(service: Service | null, onDone: () => void) {
  const toast = useToast()
  const { createService, updateService, isCreatingService, isUpdatingService, createServiceError, updateServiceError } = useServices()

  const form = useForm<ServiceFormData>({ resolver: zodResolver(serviceSchema), defaultValues: emptyValues })

  useEffect(() => {
    form.reset(service ? { name: service.name, description: service.description, price: service.price } : emptyValues)
  }, [service]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = form.handleSubmit(async (values) => {
    try {
      if (service) {
        await updateService({ id: service.id, data: values })
        toast.show('Serviço atualizado')
      } else {
        await createService(values)
        toast.show('Serviço publicado')
      }
      onDone()
    } catch {
      // o erro fica em *ServiceError
    }
  })

  return {
    control: form.control,
    // handleSubmit espera um evento web; no onPress do RN não há nenhum.
    onSubmit: () => void submit(),
    isEditing: service !== null,
    isSubmitting: isCreatingService || isUpdatingService,
    errorMessage: toErrorMessage(service ? updateServiceError : createServiceError, 'Não foi possível guardar o serviço'),
  }
}
