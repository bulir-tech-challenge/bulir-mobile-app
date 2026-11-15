import { useToast } from '@/components/ui/Toast'
import { useCreateBooking } from '@/hooks/useBookings'
import { toErrorMessage } from '@/lib/errors'
import type { Service } from '@/types'

export function useBookService(onBooked: () => void) {
  const toast = useToast()
  const { createBooking, isCreatingBooking, createBookingError, resetCreateBooking } = useCreateBooking()

  const book = async (service: Service) => {
    try {
      await createBooking({ serviceId: service.id })
      toast.show(`Reserva de "${service.name}" confirmada`)
      onBooked()
    } catch {
      // o erro fica em createBookingError e aparece no painel
    }
  }

  return {
    book,
    isBooking: isCreatingBooking,
    errorMessage: toErrorMessage(createBookingError, 'Não foi possível concluir a reserva'),
    resetError: resetCreateBooking,
  }
}
