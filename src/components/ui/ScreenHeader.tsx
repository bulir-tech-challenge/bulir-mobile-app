import type { ReactNode } from 'react'
import { Text, View } from 'react-native'

interface ScreenHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function ScreenHeader({ title, description, action }: ScreenHeaderProps) {
  return (
    <View className="flex-row items-end justify-between gap-3">
      <View className="flex-1 gap-1">
        <Text accessibilityRole="header" className="font-display-bold text-2xl text-navy-900">
          {title}
        </Text>
        {description ? <Text className="text-sm text-text-muted">{description}</Text> : null}
      </View>
      {action}
    </View>
  )
}
