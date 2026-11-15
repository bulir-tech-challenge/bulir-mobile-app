import { ScrollView, Text, View } from 'react-native'
import { Briefcase, CalendarCheck } from 'lucide-react-native'
import { Card } from '@/components/ui/Card'
import { ScreenHeader } from '@/components/ui/ScreenHeader'
import { Spinner } from '@/components/ui/Spinner'
import { formatDate, formatKz } from '@/lib/format'
import { BookingStatusBadge } from '@/features/bookings/components/BookingStatusBadge'
import { useOverviewStats } from '../hooks/useOverviewStats'
import { StatCard } from './StatCard'

export function OverviewScreen() {
  const stats = useOverviewStats()
  if (!stats.user) return <Spinner />

  const { user } = stats
  const isClient = user.role === 'CLIENT'

  return (
    <ScrollView contentContainerClassName="gap-5 p-5">
      <ScreenHeader
        title={`Olá, ${user.name.split(' ')[0]}`}
        description={isClient ? 'Resumo da tua atividade na Bulir.' : 'Resumo do teu negócio na Bulir.'}
      />

      <View className="flex-row gap-3">
        <StatCard icon={CalendarCheck} label="Reservas confirmadas" value={String(stats.confirmedCount)} />
        <StatCard
          icon={Briefcase}
          label={isClient ? 'Serviços disponíveis' : 'Serviços publicados'}
          value={String(isClient ? stats.availableServices : stats.publishedServices)}
        />
      </View>

      <Card className="gap-3">
        <Text className="font-display text-lg text-navy-900">Reservas recentes</Text>
        {stats.isLoading ? (
          <Spinner />
        ) : stats.recent.length === 0 ? (
          <Text className="py-4 text-center text-sm text-text-muted">Ainda não há reservas.</Text>
        ) : (
          stats.recent.map((booking) => (
            <View key={booking.id} className="flex-row items-center justify-between gap-3 border-t border-slate-100 pt-3">
              <View className="flex-1">
                <Text numberOfLines={1} className="text-sm font-medium text-navy-900">
                  {booking.service?.name ?? 'Serviço removido'}
                </Text>
                <Text className="text-xs text-text-light-muted">{formatDate(booking.createdAt)}</Text>
              </View>
              <View className="items-end gap-1">
                <Text className="text-sm font-semibold text-navy-900">{formatKz(booking.amount)}</Text>
                <BookingStatusBadge status={booking.status} />
              </View>
            </View>
          ))
        )}
      </Card>
    </ScrollView>
  )
}
