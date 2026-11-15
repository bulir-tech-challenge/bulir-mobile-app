import { Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { Sheet } from '@/components/ui/Sheet'
import { formatKz } from '@/lib/format'
import { useBookService } from '../hooks/useBookService'
import type { Service } from '@/types'

interface BookServiceSheetProps {
  service: Service | null
  balance: number
  onClose: () => void
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <Text className="text-sm text-text-muted">{label}</Text>
      <Text className={`text-sm ${strong ? 'font-semibold' : ''} text-navy-900`}>{value}</Text>
    </View>
  )
}

export function BookServiceSheet({ service, balance, onClose }: BookServiceSheetProps) {
  const router = useRouter()
  const { book, isBooking, errorMessage, resetError } = useBookService(onClose)

  const close = () => {
    resetError()
    onClose()
  }

  const insufficient = service ? balance < service.price : false

  return (
    <Sheet visible={service !== null} title="Confirmar reserva" onClose={close}>
      {service ? (
        <>
          <Text className="text-sm text-text-muted">{service.name}</Text>
          <View className="gap-3 rounded-2xl bg-navy-900/[0.03] p-4">
            {service.provider ? <Row label="Prestador" value={service.provider.name} /> : null}
            <Row label="Valor do serviço" value={formatKz(service.price)} strong />
            <Row label="O teu saldo" value={formatKz(balance)} />
            {!insufficient ? <Row label="Saldo após a reserva" value={formatKz(balance - service.price)} /> : null}
          </View>

          {insufficient ? <Alert message="Saldo insuficiente para esta reserva. Carrega a tua carteira para continuar." /> : null}
          {errorMessage ? <Alert message={errorMessage} /> : null}

          <View className="gap-2">
            {insufficient ? (
              <Button
                title="Carregar saldo"
                onPress={() => {
                  close()
                  router.navigate('/wallet')
                }}
              />
            ) : (
              <Button title="Confirmar reserva" isLoading={isBooking} onPress={() => void book(service)} />
            )}
            <Button title="Voltar" variant="ghost" onPress={close} />
          </View>
        </>
      ) : null}
    </Sheet>
  )
}
