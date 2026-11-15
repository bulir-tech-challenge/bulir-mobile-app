import { FlatList, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { EmptyState } from '@/components/ui/EmptyState'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { Spinner } from '@/components/ui/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { formatKz } from '@/lib/format'
import { useBookingList } from '../hooks/useBookingList'
import { useCancelBookingAction } from '../hooks/useCancelBookingAction'
import { BookingItem } from './BookingItem'

function cancelDescription(isClient: boolean, amount: number | undefined): string {
  const value = amount === undefined ? '' : formatKz(amount)
  return isClient
    ? `Vais receber ${value} de volta na tua carteira.`
    : `${value} serão devolvidos ao cliente e debitados do teu saldo.`
}

export function BookingsScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const { bookings, isLoading, errorMessage, refetch } = useBookingList()
  const cancel = useCancelBookingAction()

  if (!user) return <Spinner />
  const isClient = user.role === 'CLIENT'

  return (
    <View className="flex-1">
      <FlatList
        data={bookings}
        keyExtractor={(booking) => booking.id}
        contentContainerClassName="gap-3 p-5"
        onRefresh={() => void refetch()}
        refreshing={false}
        ListHeaderComponent={
          <View className="mb-2 gap-4">
            <ScreenHeader
              title="Reservas"
              description={isClient ? 'O histórico dos serviços que reservaste.' : 'O histórico das reservas feitas nos teus serviços.'}
            />
            {errorMessage ? <Alert message={errorMessage} /> : null}
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <Spinner />
          ) : (
            <EmptyState
              image={require('../../../../assets/images/cleaning.svg')}
              title="Ainda sem reservas"
              description={isClient ? 'Escolhe um serviço e faz a tua primeira reserva em poucos toques.' : 'Quando um cliente reservar um dos teus serviços, aparece aqui.'}
              action={isClient ? <Button title="Explorar serviços" onPress={() => router.navigate('/services')} /> : undefined}
            />
          )
        }
        renderItem={({ item }) => (
          <BookingItem
            booking={item}
            counterpartName={(isClient ? item.service?.provider?.name : item.client?.name) ?? 'Utilizador'}
            action={
              item.status === 'CONFIRMED' ? (
                <Button title="Cancelar" variant="ghost" className="h-9 px-3" onPress={() => cancel.request(item)} />
              ) : undefined
            }
          />
        )}
      />

      <ConfirmDialog
        visible={cancel.target !== null}
        danger
        title="Cancelar reserva?"
        description={cancelDescription(isClient, cancel.target?.amount)}
        confirmLabel="Cancelar reserva"
        isLoading={cancel.isCancelling}
        onClose={cancel.dismiss}
        onConfirm={() => void cancel.confirm()}
      />
    </View>
  )
}
