import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { formatDate, formatKz } from '@/lib/format'
import { BookingStatusBadge } from './BookingStatusBadge'
import type { Booking } from '@/types'

interface BookingItemProps {
  booking: Booking
  /** Nome da outra parte, para o avatar. */
  counterpartName: string
  action?: ReactNode
}

export function BookingItem({ booking, counterpartName, action }: BookingItemProps) {
  return (
    <Card className="gap-3">
      <View className="flex-row items-center gap-3">
        <Avatar name={counterpartName} size={42} />
        <View className="flex-1">
          <Text numberOfLines={1} className="font-semibold text-navy-900">
            {booking.service?.name ?? 'Serviço removido'}
          </Text>
          <Text numberOfLines={1} className="text-xs text-text-muted">
            Prestador: {booking.service?.provider?.name ?? '—'}
          </Text>
          <Text numberOfLines={1} className="text-xs text-text-muted">
            Cliente: {booking.client?.name ?? '—'}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="gap-1">
          <Text className="font-display-bold text-base text-navy-900">{formatKz(booking.amount)}</Text>
          <Text className="text-xs text-text-light-muted">{formatDate(booking.createdAt)}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <BookingStatusBadge status={booking.status} />
          {action}
        </View>
      </View>
    </Card>
  )
}
