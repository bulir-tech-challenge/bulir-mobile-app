import { useState } from 'react'
import { useToast } from '@/components/ui/Toast'
import { useCancelBooking } from '@/hooks/useBookings'
import { toErrorMessage } from '@/lib/errors'
import type { Booking } from '@/types'

/** Fluxo "pedir confirmação → cancelar → avisar" para uma reserva. */
export function useCancelBookingAction() {
  const toast = useToast()
  const { cancelBooking, isCancellingBooking } = useCancelBooking()
  const [target, setTarget] = useState<Booking | null>(null)

  const confirm = async () => {
    if (!target) return
    try {
      await cancelBooking(target.id)
      toast.show('Reserva cancelada e valor devolvido ao cliente')
    } catch (error) {
      toast.show(toErrorMessage(error, 'Não foi possível cancelar a reserva') ?? '', 'error')
    } finally {
      setTarget(null)
    }
  }

  return { target, request: setTarget, dismiss: () => setTarget(null), confirm, isCancelling: isCancellingBooking }
}
