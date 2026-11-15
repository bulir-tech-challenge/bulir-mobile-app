import type { ReactNode } from 'react'
import { Text, View } from 'react-native'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { formatKz } from '@/lib/format'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
  showProvider?: boolean
  action: ReactNode
}

export function ServiceCard({ service, showProvider = true, action }: ServiceCardProps) {
  return (
    <Card className="gap-3">
      {showProvider && service.provider ? (
        <View className="flex-row items-center gap-2">
          <Avatar name={service.provider.name} size={28} />
          <Text numberOfLines={1} className="flex-1 text-xs font-medium text-text-muted">
            {service.provider.name}
          </Text>
        </View>
      ) : null}
      <View className="gap-1">
        <Text className="font-display text-base text-navy-900">{service.name}</Text>
        <Text numberOfLines={3} className="text-sm text-text-muted">
          {service.description}
        </Text>
      </View>
      <View className="flex-row items-center justify-between gap-3">
        <Text className="font-display-bold text-lg text-navy-900">{formatKz(service.price)}</Text>
        {action}
      </View>
    </Card>
  )
}
